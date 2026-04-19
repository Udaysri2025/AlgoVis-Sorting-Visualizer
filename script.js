let array = [];
let steps = [];
let currentStepIndex = 0;
let isPlaying = false;
let delay = 50;
let comparisons = 0;
let swaps = 0;
let arrayAccesses = 0;

const container = document.getElementById("array-container");
const comparisonsDisplay = document.getElementById("comparisons-display");
const swapsDisplay = document.getElementById("swaps-display");
const accessesDisplay = document.getElementById("accesses-display");
const stepDisplay = document.getElementById("step-display");
const totalStepsSpan = document.getElementById("total-steps");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stepBtn = document.getElementById("stepBtn");
const progressBar = document.getElementById("progress-bar");
const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");
const algoSelect = document.getElementById("algorithm-select");

const algoNameEl = document.getElementById("algo-name");
const timeComplexityEl = document.getElementById("time-complexity");
const spaceComplexityEl = document.getElementById("space-complexity");
const algoDescriptionEl = document.getElementById("algo-description");

generateArray();

function generateArray() {
    resetState();
    const size = parseInt(sizeSlider.value);
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 380) + 20);
    }
    renderBars(array);
    updateStats(0, 0, 0);
    updateStepCounter(0, 0);
}

function renderBars(arr) {
    container.innerHTML = "";
    const maxVal = Math.max(...arr, 1);
    arr.forEach(val => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${(val / maxVal) * 100}%`;
        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateStats(comp, sw, acc) {
    comparisons = comp;
    swaps = sw;
    arrayAccesses = acc;
    comparisonsDisplay.textContent = comparisons;
    swapsDisplay.textContent = swaps;
    accessesDisplay.textContent = arrayAccesses;
}

function updateStepCounter(current, total) {
    stepDisplay.textContent = current;
    totalStepsSpan.textContent = total;
}

function updateProgress() {
    if (steps.length === 0) return;
    const percent = (currentStepIndex / steps.length) * 100;
    progressBar.style.width = `${percent}%`;
    updateStepCounter(currentStepIndex, steps.length);
}

function updateAlgorithmMeta(meta) {
    algoNameEl.textContent = meta.name;
    timeComplexityEl.textContent = meta.time_complexity;
    spaceComplexityEl.textContent = meta.space_complexity;
    algoDescriptionEl.textContent = meta.description;
}

async function startSorting() {
    if (isPlaying) return;

    if (steps.length === 0 || currentStepIndex === steps.length) {
        playBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        const response = await fetch("/sort", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                array: array, 
                algorithm: algoSelect.value 
            })
        });
        const data = await response.json();
        steps = data.steps;
        currentStepIndex = 0;
        renderBars(array);
        updateStats(0, 0, 0);
        updateAlgorithmMeta(data.meta);
        totalStepsSpan.textContent = steps.length;
        updateStepCounter(0, steps.length);
        playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    }

    isPlaying = true;
    setButtonsState(true);

    const speed = parseInt(speedSlider.value);
    delay = 105 - speed;

    while (currentStepIndex < steps.length && isPlaying) {
        await applyStep(steps[currentStepIndex]);
        currentStepIndex++;
        updateProgress();

        if (currentStepIndex === steps.length) {
            pauseAnimation();
            break;
        }
        await sleep(delay);
    }

    if (currentStepIndex === steps.length) {
        setButtonsState(false);
        isPlaying = false;
    }
}

async function applyStep(step) {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < bars.length; i++) {
        if (!bars[i].classList.contains("sorted")) {
            bars[i].className = "bar";
        }
    }

    if (step.type === "compare") {
        const [i, j] = step.indices;
        bars[i].classList.add("compare");
        bars[j].classList.add("compare");
        updateStats(step.stats.comparisons, step.stats.swaps, step.stats.array_accesses);
    }
    else if (step.type === "swap") {
        const [i, j] = step.indices;
        const maxVal = Math.max(...step.array, 1);
        bars[i].style.height = `${(step.array[i] / maxVal) * 100}%`;
        bars[j].style.height = `${(step.array[j] / maxVal) * 100}%`;
        bars[i].classList.add("swap");
        bars[j].classList.add("swap");
        updateStats(step.stats.comparisons, step.stats.swaps, step.stats.array_accesses);
    }
    else if (step.type === "sorted") {
        const idx = step.index;
        bars[idx].classList.add("sorted");
        updateStats(step.stats.comparisons, step.stats.swaps, step.stats.array_accesses);
    }
    else if (step.type === "pivot") {
        const idx = step.index;
        bars[idx].classList.add("pivot");
        updateStats(step.stats.comparisons, step.stats.swaps, step.stats.array_accesses);
    }

    await sleep(5);
}

function pauseAnimation() {
    isPlaying = false;
    setButtonsState(false);
}

function stepForward() {
    if (currentStepIndex < steps.length) {
        applyStep(steps[currentStepIndex]);
        currentStepIndex++;
        updateProgress();
        if (currentStepIndex === steps.length) {
            setButtonsState(false);
        }
    }
}

function resetState() {
    pauseAnimation();
    steps = [];
    currentStepIndex = 0;
    progressBar.style.width = "0%";
    renderBars(array);
    updateStats(0, 0, 0);
    updateStepCounter(0, 0);
    setButtonsState(false);
    const bars = document.getElementsByClassName("bar");
    for (let bar of bars) {
        bar.className = "bar";
    }
    fetch("/sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ array: [1,2,3], algorithm: algoSelect.value })
    }).then(res => res.json()).then(data => {
        updateAlgorithmMeta(data.meta);
    });
}

function setButtonsState(playing) {
    playBtn.disabled = playing;
    pauseBtn.disabled = !playing;
    stepBtn.disabled = playing || steps.length === 0;
    algoSelect.disabled = playing;
    sizeSlider.disabled = playing;

    if (playing) {
        playBtn.innerHTML = '<i class="fas fa-play"></i> Running...';
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
        if (steps.length > 0 && currentStepIndex < steps.length) {
            stepBtn.disabled = false;
        }
    }
}

sizeSlider.addEventListener("input", () => {
    generateArray();
});

speedSlider.addEventListener("input", () => {
    delay = 105 - parseInt(speedSlider.value);
});

algoSelect.addEventListener("change", () => {
    resetState();
    fetch("/sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ array: [1,2,3], algorithm: algoSelect.value })
    }).then(res => res.json()).then(data => {
        updateAlgorithmMeta(data.meta);
    });
});

window.generateArray = generateArray;
window.startSorting = startSorting;
window.pauseAnimation = pauseAnimation;
window.stepForward = stepForward;
window.resetState = resetState;