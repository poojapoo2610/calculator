const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const leftOperand = document.querySelector('.left-operand');
const midOperator = document.querySelector('.mid-operator');
const rightOperand = document.querySelector('.right-operand');
const answer = document.querySelector('.answer');
const equals = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');
const backspaceBtn = document.querySelector('.backspace');
const clearEntryBtn = document.querySelector('.clear-entry');
const percentBtn = document.querySelector('.percent');
const reciprocalBtn = document.querySelector('.reciprocal');
const squareBtn = document.querySelector('.square');
const sqrtBtn = document.querySelector('.sqrt');
const plusMinusBtn = document.querySelector('.plus-minus');


// OPERATOR FUNCTIONS
function add(a, b) { // Function for + operator (Callback)
    return a + b;
}

function subtract(a, b) { // Function for - operator (Callback)
    return a - b;
}

function multiply(a, b) { // Function for * operator (Callback)
    return a * b;
}

function divide(a, b) { // Function for / operator (Callback)
    if (!b) return 'You thought'
    return a / b;
}

function operate(a, b, math) { // Will operate on expression (Callback)
    return math(a, b);
}

function runExpression() { // Function for = operator
    if (leftOperand.innerText && midOperator.innerText && rightOperand.innerText) {
        switch (midOperator.innerText) {
            case '+': {
                let result = operate(parseFloat(leftOperand.innerText),
                    parseFloat(rightOperand.innerText), add);
                answer.innerText = roundDecimal(result);
                break;
            }
            case '-': {
                let result = operate(parseFloat(leftOperand.innerText),
                    parseFloat(rightOperand.innerText), subtract);
                answer.innerText = roundDecimal(result);
                break;
            }
            case '*': {
                let result = operate(parseFloat(leftOperand.innerText),
                    parseFloat(rightOperand.innerText), multiply);
                answer.innerText = roundDecimal(result);
                break;
            }
            case '/': {
                let result = operate(parseFloat(leftOperand.innerText),
                    parseFloat(rightOperand.innerText), divide);
                answer.innerText = roundDecimal(result);
                break;
            }
        }
    }
}

// INPUT FUNCTIONS
function inputDigit() { // Inputs digit using button (Callback)
    if (answer.innerText) {
        clearDisplay();
        leftOperand.innerText += this.innerText;
    } else if (!midOperator.innerText) {
        leftOperand.innerText += this.innerText;
    } else {
        rightOperand.innerText += this.innerText;
    }
}

function inputDigitKey(e) { // Inputs digit using key (Callback)
    if (answer.innerText) {
        clearDisplay();
        leftOperand.innerText += parseFloat(e.key);
    } else if (!midOperator.innerText) {
        leftOperand.innerText += parseFloat(e.key);
    } else {
        rightOperand.innerText += parseFloat(e.key);
    }
}

function inputOperator() { // Inputs operator using button (Callback)
    if (answer.innerText) {
        let newAnswer = answer.innerText
        clearDisplay();
        leftOperand.innerText = newAnswer;
        midOperator.innerText += this.innerText;
    } else if (!midOperator.innerText) {
        midOperator.innerText += this.innerText;
    } else if (midOperator.innerText && rightOperand.innerText) {
        runExpression();
        leftOperand.innerText = answer.innerText;
        answer.innerText = '';
        midOperator.innerText += this.innerText;
    }
}

function inputOperatorKey(e) { // Inputs operator using key (Callback)
    if (answer.innerText) {
        let newAnswer = answer.innerText
        clearDisplay();
        leftOperand.innerText = newAnswer;
        midOperator.innerText += e.key;
    } else if (!midOperator.innerText) {
        midOperator.innerText += e.key;
    } else if (midOperator.innerText && rightOperand.innerText) {
        runExpression();
        leftOperand.innerText = answer.innerText;
        answer.innerText = '';
        midOperator.innerText += e.key;
    }
}

function inputDecimal() { // Input decimal using button (Callback)
    if (!midOperator.innerText) {
        if (leftOperand.innerText.includes('.')) return;
        leftOperand.innerText += this.innerText;
    } else {
        if (rightOperand.innerText.includes('.')) return;
        rightOperand.innerText += this.innerText;
    }
}

function inputDecimalKey(e) { // Input decimal using key (Callback)
    if (!midOperator.innerText) {
        if (leftOperand.innerText.includes('.')) return;
        leftOperand.innerText += e.key;
    } else {
        if (rightOperand.innerText.includes('.')) return;
        rightOperand.innerText += e.key;
    }
}

function onKeyDown(e) { // Decides which function to run based on which key was pressed
    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' ||
        e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' ||
        e.key === '8' || e.key === '9') {
        inputDigitKey(e);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        inputOperatorKey(e);
    } else if (e.key === '.') {
        inputDecimalKey(e);
    } else if (e.key === '%') {
        percent();
    } else if (e.key === 'Backspace') {
        backspace();
    } else if (e.key === 'Enter' || e.key === '=') {
        runExpression();
    }
}


// OTHER OPERATOR FUNCTIONS
function percent() { // Turns number into a percent decimal form
    if (!midOperator.innerText) {
        leftOperand.innerText = leftOperand.innerText / 100;
    } else {
        rightOperand.innerText = rightOperand.innerText / 100;
    }
}

function reciprocal() { // Gives you the reciprocal value of a number
    if (!midOperator.innerText) {
        leftOperand.innerText = 1 / leftOperand.innerText;
    } else {
        rightOperand.innerText = 1 / rightOperand.innerText;
    }
}

function square() { // Outputs the squared value of an input
    if (!midOperator.innerText) {
        leftOperand.innerText = leftOperand.innerText ** 2;
    } else {
        rightOperand.innerText = rightOperand.innerText ** 2;
    }
}

function sqrt() { // Outputs the square root value of an input
    if (!midOperator.innerText) {
        leftOperand.innerText = Math.sqrt(leftOperand.innerText);
    } else {
        rightOperand.innerText = Math.sqrt(rightOperand.innerText);
    }
}

function plusMinus() { // Turns a positive integer negative and vice versa
    if (answer.innerText) {
        leftOperand.innerText = answer.innerText;
        answer.innerText = '';
        if (leftOperand.innerText < 0) {
            leftOperand.innerText = Math.abs(leftOperand.innerText);
        } else {
            leftOperand.innerText = -Math.abs(leftOperand.innerText);
        }
    } else if (!midOperator.innerText) {
        if (leftOperand.innerText < 0) {
            leftOperand.innerText = Math.abs(leftOperand.innerText);
        } else {
            leftOperand.innerText = -Math.abs(leftOperand.innerText);
        }
    } else {
        if (rightOperand.innerText < 0) {
            rightOperand.innerText = Math.abs(rightOperand.innerText);
        } else {
            rightOperand.innerText = -Math.abs(rightOperand.innerText);
        }
    }
}


// CALCULATOR DISPLAY FUNCTIONS
function clearDisplay() { // Clears display of all text
    leftOperand.innerText = '';
    midOperator.innerText = '';
    rightOperand.innerText = '';
    answer.innerText = '';
}

function clearEntry() { // Clear the latest entry on the display
    if (answer.innerText) {
        clearDisplay();
    } else if (!midOperator.innerText) {
        leftOperand.innerText = '';
    } else {
        rightOperand.innerText = '';
    }
}

function backspace() { // Delete latest character entered
    if (!midOperator.innerText) {
        leftOperand.innerText = leftOperand.innerText.slice(0, -1);
    } else {
        rightOperand.innerText = rightOperand.innerText.slice(0, -1);
    }
}


// SIDE FUNCTIONS
function decimalCount(num) { // Counts the amount of decimals in a number
    const numStr = String(num);
    if (numStr.includes('.')) {
        return numStr.split('.')[1].length;
    }
    return 0;
}

function roundDecimal(num) { // Will round decimals if more than 5 decimal places
    if (decimalCount(num) > 5) {
        return num.toFixed(5);
    }
    return num;
}


// EVENT LISTENERS
digitBtns.forEach(button => button.addEventListener('click', inputDigit))
operatorBtns.forEach(button => button.addEventListener('click', inputOperator))
equals.addEventListener('click', runExpression);
clearBtn.addEventListener('click', clearDisplay);
clearEntryBtn.addEventListener('click', clearEntry);
decimal.addEventListener('click', inputDecimal);
backspaceBtn.addEventListener('click', backspace);
percentBtn.addEventListener('click', percent);
reciprocalBtn.addEventListener('click', reciprocal);
squareBtn.addEventListener('click', square);
sqrtBtn.addEventListener('click', sqrt);
plusMinusBtn.addEventListener('click', plusMinus);
window.addEventListener('keydown', onKeyDown);