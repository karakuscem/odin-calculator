// Buttons
const digits = document.querySelectorAll(".digits");
const operators = document.querySelectorAll(".operators");
const allClear = document.querySelector(".all-clear");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
// Results
const previousOperandText = document.querySelector(".previous-operand")
const currentOperandText = document.querySelector(".current-operand")

// Variables to store numbers and operator
let currentOperand = ""
let currentOperator = ""
let previousOperand = ""

// Clear function that clears everything on screen
function clearScreen() {
    currentOperand = "";
    previousOperand = "";
    currentOperator = "";
}

// Delete function to delete last entered object
function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

// Append numbers
function appendNumber(number) {
    currentOperand = currentOperand.toString() + number.toString();
}
// Choose operator
function chooseOperation(operation) {
    // If current number is empty do nothing
    if (currentOperand === "") return;
    // If previous number is not empty then calculate
    if (previousOperand !== "") {
        compute()
    }
    // Choose operator
    currentOperator = operation;
    // Assign current operand to previous operand and give empty string to current operand
    previousOperand = currentOperand;
    currentOperand = "";
}

// Calculate
function compute() {
    // Define variable, turn string numbers to INT
    let computation
    const prev = parseInt(previousOperand)
    const current = parseInt(currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    // Do calculation according to operator
    switch (currentOperator) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "/":
            computation = prev / current
            break
        case "%":
            computation = prev % current
            break
        case "x":
            computation = prev * current
            break
        default:
            return
    }
    currentOperand = computation;
    currentOperator = undefined;
    previousOperand = "";
}

// Function to update display
function updateDisplay() {
    currentOperandText.textContent = currentOperand;
    if (currentOperator != null) {
        previousOperandText.textContent = 
            `${previousOperand} ${currentOperator}`
    }
}

// Add event listener for digits, call appendNumber and updateDisplay
digits.forEach(digit => {
    digit.addEventListener("click", () => {
        appendNumber(digit.value);
        updateDisplay();
    })
})

// Add event listener for operator, call chooseOperation and updateDisplay
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        chooseOperation(operator.value);
        updateDisplay()
    })
})

// Add event listener for equals, allClear, clear and call necessary functions
equals.addEventListener("click", button => {
    compute();
    updateDisplay();
})

allClear.addEventListener("click", button => {
    clearScreen();
    updateDisplay();
})

clear.addEventListener("click", button => {
    deleteLast();
    updateDisplay();
})