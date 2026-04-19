\# 🧬 AlgoVis — Sorting Algorithm Visualizer



\*\*An Interactive Educational Tool for Understanding Classic Sorting Algorithms\*\*



!\[License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

!\[Python](https://img.shields.io/badge/Python-3.8%2B-blue)

!\[Flask](https://img.shields.io/badge/Flask-2.3.3-green)

!\[JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-orange)



\---



\## 📖 Table of Contents



\- \[Project Overview](#-project-overview)

\- \[Motivation \& Learning Objectives](#-motivation--learning-objectives)

\- \[Live Demo](#-live-demo)

\- \[Features](#-features)

\- \[Algorithms Implemented](#-algorithms-implemented)

\- \[System Architecture](#-system-architecture)

\- \[Project Structure](#-project-structure)

\- \[Detailed Component Breakdown](#-detailed-component-breakdown)

\- \[How the Visualization Works](#-how-the-visualization-works)

\- \[Setup \& Installation](#-setup--installation)

\- \[Usage Guide](#-usage-guide)

\- \[Author](#-author)



\---



\## 📌 Project Overview



\*\*AlgoVis\*\* is a web-based Sorting Algorithm Visualizer built to bridge the gap between abstract algorithmic theory and practical understanding. It provides a step-by-step, real-time visual representation of how fundamental sorting algorithms operate on integer arrays.



The system highlights:



\- \*\*Comparisons\*\* – When two elements are evaluated

\- \*\*Swaps / Overwrites\*\* – When elements exchange positions or shift

\- \*\*Pivot Selection\*\* – In Quick Sort

\- \*\*Array Accesses\*\* – Total read/write operations



All metrics are updated live, helping users connect visual behavior with theoretical time and space complexity.



\---



\## 🎯 Motivation \& Learning Objectives



This project was developed to achieve the following educational goals:



1\. \*\*Visual Understanding of Sorting Algorithms\*\*  

&#x20;  Observe exactly how Bubble Sort, Insertion Sort, and Quick Sort manipulate data step by step.



2\. \*\*Quantify Algorithmic Efficiency\*\*  

&#x20;  Live counters for Comparisons, Swaps, and Array Accesses provide concrete data that directly reflect Big‑O notation.



3\. \*\*Demonstrate Full‑Stack Integration\*\*  

&#x20;  Clean separation between Python/Flask backend (algorithm logic) and JavaScript frontend (animation and UI).



4\. \*\*Practice Professional Software Engineering\*\*  

&#x20;  Modular functions, generator-based step yielding, and comprehensive documentation.



\---



\## 🌐 Live Demo



> \*Replace the link below with your deployed URL after hosting.\*



🔗 \*\*\[View Live Application](https://your-app.onrender.com)\*\*



\---



\## ✨ Features



| Category | Details |

|----------|---------|

| \*\*Algorithms\*\* | Bubble Sort, Insertion Sort, Quick Sort |

| \*\*Execution Control\*\* | Play, Pause, Step Forward, Reset |

| \*\*Visual Feedback\*\* | Color-coded bars for comparisons, swaps, pivots, and sorted elements |

| \*\*Live Metrics\*\* | Comparisons, Swaps, Array Accesses (updated in real time) |

| \*\*Algorithm Info Panel\*\* | Displays time complexity, space complexity, and a brief description |

| \*\*Progress Tracking\*\* | Step counter and progress bar |

| \*\*Responsive UI\*\* | Non-scrollable dashboard that fits within 100vh; glassmorphism dark theme |

| \*\*Flat Structure\*\* | All files in a single directory for simplicity |



\---



\## 🧠 Algorithms Implemented



\### 1. Bubble Sort

\- \*\*Time Complexity:\*\* O(n²) worst/average, O(n) best

\- \*\*Space Complexity:\*\* O(1)

\- \*\*Stability:\*\* Yes



Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. After each pass, the largest unsorted element "bubbles" to its correct position.



\### 2. Insertion Sort

\- \*\*Time Complexity:\*\* O(n²) worst/average, O(n) best

\- \*\*Space Complexity:\*\* O(1)

\- \*\*Stability:\*\* Yes



Builds the final sorted array one item at a time by taking each element and inserting it into its correct position within the already sorted portion of the list.



\### 3. Quick Sort

\- \*\*Time Complexity:\*\* O(n log n) average, O(n²) worst

\- \*\*Space Complexity:\*\* O(log n) (recursive stack)

\- \*\*Stability:\*\* No



A divide-and-conquer algorithm that selects a pivot element and partitions the array into two sub-arrays (elements less than pivot and elements greater than pivot), then recursively sorts the sub-arrays.



\---



\## 🏗 System Architecture

┌─────────────────────────────────────────────────┐

│ WEB BROWSER │

│ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │

│ │ index.html │ │ style.css │ │ script.js│ │

│ └──────┬──────┘ └─────────────┘ └────┬────┘ │

│ │ │ │

│ └──────────── Fetch API ─────────┘ │

│ POST /sort │

└────────────────────────┬────────────────────────┘

│

▼

┌─────────────────────────────────────────────────┐

│ FLASK SERVER (Python) │

│ ┌───────────────────────────────────────────┐ │

│ │ app.py │ │

│ │ • Routes: / , /sort │ │

│ │ • Algorithm dispatcher │ │

│ │ • Generators: bubble, insertion, quick │ │

│ └───────────────────────────────────────────┘ │

└─────────────────────────────────────────────────┘



\*\*Flow:\*\*

1\. User selects algorithm, adjusts speed/size, and clicks Play.

2\. Frontend sends array and algorithm choice to `/sort` endpoint.

3\. Backend executes the appropriate generator, yielding step objects.

4\. All steps are collected and returned as JSON.

5\. Frontend iterates through steps, animating bar heights/colors and updating metrics.



\---



\## 📁 Project Structure



All files are kept in a \*\*single flat directory\*\* for maximum simplicity:



sorting-visualizer/

├── app.py # Flask backend, algorithm generators, API routes

├── index.html # Main HTML structure

├── style.css # All styling (dark theme, glassmorphism)

├── script.js # Frontend logic, animation controller

├── requirements.txt # Python dependencies

└── README.md # Project documentation



\---



\## 🔍 Detailed Component Breakdown



\### Backend (`app.py`)



| Component | Purpose |

|-----------|---------|

| `bubble\_sort\_steps(arr)` | Generator yielding compare/swap/sorted steps for Bubble Sort |

| `insertion\_sort\_steps(arr)` | Generator for Insertion Sort |

| `quick\_sort\_steps(arr)` | Recursive generator for Quick Sort (Lomuto partition) |

| `ALGO\_META` | Dictionary storing theoretical complexity and descriptions |

| `@app.route("/sort")` | POST endpoint that returns steps and metadata as JSON |

| `@app.route("/")` | Serves the main HTML page |



\*\*Why Generators?\*\*  

Using Python's `yield` allows the backend to produce a sequence of algorithmic states efficiently without materializing the entire history in memory at once.



\### Frontend (`index.html`, `style.css`, `script.js`)



| File | Responsibility |

|------|----------------|

| `index.html` | Semantic structure: navbar, visualizer area, info panel, controls |

| `style.css` | Dark theme, flexbox layout, glassmorphism effects, color classes for animation states |

| `script.js` | Array generation, API communication, animation loop, state management, DOM updates |



\*\*Key JavaScript Functions:\*\*

\- `generateArray()` – Creates new random array and renders bars

\- `startSorting()` – Fetches steps and begins animation

\- `applyStep(step)` – Updates bar colors/heights and metrics for a single step

\- `pauseAnimation()` / `stepForward()` – Manual control

\- `resetState()` – Returns to initial unsorted state



\---



\## ⚙️ How the Visualization Works



1\. \*\*Array Generation\*\* – A random array of integers is created and displayed as vertical bars (height ∝ value).



2\. \*\*API Request\*\* – Frontend sends the array and selected algorithm to `/sort`.



3\. \*\*Step Generation\*\* – Backend runs the algorithm, yielding a step object for every atomic operation:

&#x20;  ```json

&#x20;  {

&#x20;    "type": "compare" | "swap" | "sorted" | "pivot",

&#x20;    "indices": \[i, j],

&#x20;    "array": \[...],        // Only for "swap"

&#x20;    "stats": { "comparisons": 42, "swaps": 15, "array\_accesses": 120 }

&#x20;  }

