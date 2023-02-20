const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const op1 = document.querySelector('.op1');
const operator = document.querySelector('.mathOperator');
const op2 = document.querySelector('.op2');
const answer = document.querySelector('.answer');
const equals = document.querySelector('.equal');
const clearEntryBtn = document.querySelector('.clear-entry');

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

function runExpression() { 
    // console.log(typeof(op1.innerText))
    if (op1.innerText && operator.innerText && op2.innerText) {
        switch (operator.innerText) {
            case '+': {
                let result = operate(parseInt(op1.innerText), parseInt(op2.innerText), add);
                answer.innerText = result
                break;
            }
            case '-': {
                let result = operate(parseInt(op1.innerText), parseInt(op2.innerText), subtract);
                answer.innerText = result
                break;
            }
            case '*': {
                let result = operate(parseInt(op1.innerText), parseInt(op2.innerText), multiply);
                answer.innerText = result
                break;
            }
            case '/': {
                let result = operate(parseInt(op1.innerText), parseInt(op2.innerText), divide);
                answer.innerText = result
                break;
            }
        }
    }
}

// INPUT FUNCTIONS
function inputDigit() {
    if (answer.innerText) {
        clearDisplay();
        op1.innerText += this.innerText;
    } else if (!operator.innerText) {
        op1.innerText += this.innerText;
    } else {
        op2.innerText += this.innerText;
    }
}


function inputOperator() {
    if (answer.innerText) {
        let newAnswer = answer.innerText
        clearDisplay();
        op1.innerText = newAnswer;
        operator.innerText += this.innerText;
    } else if (!operator.innerText) {
        operator.innerText += this.innerText;
    } else if (operator.innerText && op2.innerText) {
        runExpression();
        op1.innerText = answer.innerText;
        answer.innerText = '';
        operator.innerText = this.innerText;
        op2.innerText = '';
    }
}


// CALCULATOR DISPLAY FUNCTIONS
function clearDisplay() { // Clears display of all text
    op1.innerText = '';
    operator.innerText = '';
    op2.innerText = '';
    answer.innerText = '';
}

// EVENT LISTENERS
digitBtns.forEach(button => button.addEventListener('click', inputDigit))
operatorBtns.forEach(button => button.addEventListener('click', inputOperator))
equals.addEventListener('click', runExpression);
clearEntryBtn.addEventListener('click', clearDisplay);
