from flask import Flask, render_template, jsonify, request, send_from_directory

# Create Flask app with correct static folder pointing to current directory
app = Flask(__name__, static_folder='.', static_url_path='', template_folder='.')

@app.route("/")
def index():
    return render_template("index.html")

# =============================================
# ALGORITHM GENERATORS
# =============================================

def bubble_sort_steps(arr):
    n = len(arr)
    arr = arr[:]
    comparisons = 0
    swaps = 0
    array_accesses = 0

    for i in range(n):
        for j in range(0, n - i - 1):
            comparisons += 1
            array_accesses += 2
            yield {
                "type": "compare",
                "indices": [j, j + 1],
                "stats": {
                    "comparisons": comparisons,
                    "swaps": swaps,
                    "array_accesses": array_accesses
                }
            }

            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swaps += 1
                array_accesses += 4
                yield {
                    "type": "swap",
                    "indices": [j, j + 1],
                    "array": arr[:],
                    "stats": {
                        "comparisons": comparisons,
                        "swaps": swaps,
                        "array_accesses": array_accesses
                    }
                }
        yield {
            "type": "sorted",
            "index": n - i - 1,
            "stats": {
                "comparisons": comparisons,
                "swaps": swaps,
                "array_accesses": array_accesses
            }
        }
    return arr

def insertion_sort_steps(arr):
    arr = arr[:]
    n = len(arr)
    comparisons = 0
    swaps = 0
    array_accesses = 0

    for i in range(1, n):
        key = arr[i]
        array_accesses += 1
        j = i - 1

        yield {
            "type": "compare",
            "indices": [i, j],
            "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
        }

        while j >= 0 and arr[j] > key:
            comparisons += 1
            array_accesses += 2
            yield {
                "type": "compare",
                "indices": [j, j + 1],
                "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
            }
            arr[j + 1] = arr[j]
            swaps += 1
            array_accesses += 2
            yield {
                "type": "swap",
                "indices": [j, j + 1],
                "array": arr[:],
                "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
            }
            j -= 1

        arr[j + 1] = key
        swaps += 1
        array_accesses += 1
        yield {
            "type": "swap",
            "indices": [j + 1, i],
            "array": arr[:],
            "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
        }

    for k in range(n):
        yield {
            "type": "sorted",
            "index": k,
            "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
        }
    return arr

def quick_sort_steps(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    arr = arr[:]
    comparisons = 0
    swaps = 0
    array_accesses = 0

    def _quick_sort(arr, low, high):
        nonlocal comparisons, swaps, array_accesses
        if low < high:
            pi = yield from _partition(arr, low, high)
            yield from _quick_sort(arr, low, pi - 1)
            yield from _quick_sort(arr, pi + 1, high)
        elif low == high:
            yield {
                "type": "sorted",
                "index": low,
                "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
            }
        return arr

    def _partition(arr, low, high):
        nonlocal comparisons, swaps, array_accesses
        pivot = arr[high]
        array_accesses += 1
        i = low - 1

        yield {
            "type": "pivot",
            "index": high,
            "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
        }

        for j in range(low, high):
            comparisons += 1
            array_accesses += 2
            yield {
                "type": "compare",
                "indices": [j, high],
                "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
            }
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                swaps += 1
                array_accesses += 4
                yield {
                    "type": "swap",
                    "indices": [i, j],
                    "array": arr[:],
                    "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
                }

        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        swaps += 1
        array_accesses += 4
        yield {
            "type": "swap",
            "indices": [i + 1, high],
            "array": arr[:],
            "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
        }
        yield {
            "type": "sorted",
            "index": i + 1,
            "stats": {"comparisons": comparisons, "swaps": swaps, "array_accesses": array_accesses}
        }
        return i + 1

    yield from _quick_sort(arr, low, high)
    return arr

ALGO_META = {
    "bubble": {
        "name": "Bubble Sort",
        "time_complexity": "O(n²)",
        "space_complexity": "O(1)",
        "description": "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
    },
    "insertion": {
        "name": "Insertion Sort",
        "time_complexity": "O(n²)",
        "space_complexity": "O(1)",
        "description": "Builds the final sorted array one item at a time by inserting each new element into its correct position."
    },
    "quick": {
        "name": "Quick Sort",
        "time_complexity": "O(n log n) avg, O(n²) worst",
        "space_complexity": "O(log n)",
        "description": "Divide-and-conquer algorithm. Picks a pivot and partitions the array around it, then recursively sorts the sub‑arrays."
    }
}

def get_algorithm_steps(algo_name, arr):
    if algo_name == "bubble":
        return bubble_sort_steps(arr)
    elif algo_name == "insertion":
        return insertion_sort_steps(arr)
    elif algo_name == "quick":
        return quick_sort_steps(arr)
    else:
        return bubble_sort_steps(arr)

@app.route("/sort", methods=["POST"])
def sort():
    data = request.get_json()
    array = data["array"]
    algorithm = data.get("algorithm", "bubble")
    steps = list(get_algorithm_steps(algorithm, array))
    return jsonify({
        "steps": steps,
        "meta": ALGO_META[algorithm]
    })

if __name__ == "__main__":
    app.run(debug=True)