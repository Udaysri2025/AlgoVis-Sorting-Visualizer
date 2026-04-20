## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Motivation](#motivation)
- [Features](#features)
- [Algorithms Implemented](#algorithms-implemented)
  - [1. Bubble Sort](#1-bubble-sort)
  - [2. Insertion Sort](#2-insertion-sort)
  - [3. Quick Sort](#3-quick-sort)
- [System Architecture](#system-architecture)
- [Core Concept: Step-Based Execution](#core-concept-step-based-execution)
- [Why Generators Are Used](#why-generators-are-used)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Learning Outcomes](#learning-outcomes)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Author](#author)

---

# 🧬 AlgoVis — Sorting Algorithm Visualizer
**An Interactive Educational Tool for Understanding Classic Sorting Algorithms**

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Flask](https://img.shields.io/badge/Flask-2.3.3-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-orange)

---

## 📌 Project Overview
AlgoVis is a web-based Sorting Algorithm Visualizer that demonstrates how algorithms work internally using step-by-step execution and real-time animation.

---

## 🎯 Motivation
- Make DSA concepts easier to understand  
- Visualize algorithm behavior  
- Connect theory with real execution  
- Demonstrate full-stack integration  

---

## ✨ Features
- Real-time visualization  
- Step-by-step execution  
- Speed control  
- Dynamic array generation  
- Live statistics (comparisons, swaps, accesses)  

---

## 🧠 Algorithms Implemented

### 1. Bubble Sort
- Time: O(n²)  
- Space: O(1)  

### 2. Insertion Sort
- Time: O(n²)  
- Space: O(1)  

### 3. Quick Sort
- Time: O(n log n)  
- Space: O(log n)  

---

## 🏗 System Architecture
Frontend → API → Flask → Algorithm → JSON → Frontend Animation  

---

## ⚙️ Core Concept: Step-Based Execution
The backend generates each step of the algorithm using Python generators, and the frontend animates those steps sequentially.

---

## 🔧 Why Generators Are Used
- Efficient step generation  
- Clean logic  
- Natural representation of algorithm flow  

---

## 📁 Project Structure
- app.py  
- index.html  
- style.css  
- script.js  
- README.md  

---

## ▶️ Setup & Installation
```bash
pip install flask
python app.py
```

Open:
```
http://127.0.0.1:5000/
```

---

## 🎯 Learning Outcomes
- Understanding sorting algorithms  
- Backend API design  
- Frontend animation  
- Full-stack integration  

---

## 🚀 Future Enhancements
- Add Merge Sort  
- Add comparison mode  
- Improve UI  

---

## 📜 License
MIT License  

---

## 👨‍💻 Author
Uday Sri  
GitHub: https://github.com/Udaysri2025
