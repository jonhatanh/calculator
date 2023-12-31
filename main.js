
(function() {

const operation = {
    num1: null,
    num2: null,
    num1String: '',
    num2String: '',
    operator: null,
    res: null,
}

const operations = {
    add(num1, num2) {
        return num1 + num2;
    },
    subtract(num1, num2) {
        return num1 - num2;
    },
    multiply(num1, num2) {
        return num1 * num2;
    },
    divide(num1, num2) {
        return num2 === 0 ? 'Math ERROR' : (num1 / num2);
    },
    pow(num1, exp) {
        return Math.pow(num1, exp);
    }
}

function operate(num1, num2, operator) {
    return operations[operator](num1,num2);
}

function resetCalculator() {
    resetNumber('num1');
    resetNumber('num2');
    operation.operator = null;
    operation.res = null;
}

function addNumberToOperation(number) {
    if(operation.num1 === null) {
        operation.num1String += number;
    } else if(operation.num2 === null) {
        operation.num2String += number;
    } else if (operation.res !== null) {
        resetCalculator();
        operation.num1String += number;
    }
}

function resetNumber(number) {
    operation[number] = null;
    operation[`${number}String`] = '';
}

function addOperatorToOperation(operator) {
    if(operation.num1String === '') return;
    if(operation.operator === null) {
        operation.operator = operator;
        operation.num1 = Number(operation.num1String);
    } else {
        if(operation.num2String === '') {
            operation.operator = operator;
        } else {
            operation.num2 = Number(operation.num2String);
            operation.res = operate(operation.num1, operation.num2, operation.operator);
            operation.num1 = typeof operation.res === 'number' ? Number(Number(operation.res).toFixed(2)) : 0;
            operation.num1String = '' + operation.num1;
            operation.operator = operator;
            resetNumber('num2');
        }
    }
}

function addPoint() {
    if(operation.num1String === '') {
        operation.num1String = '0.';
    } else if (!operation.num1String.includes('.') && operation.num2String === '' && operation.operator === null) {
        operation.num1String += '.';
    }
    if(operation.operator === null) return;
    
    if (operation.num2String === '') {
        operation.num2String = '0.';
    } else if (!operation.num2String.includes('.')) {
        operation.num2String += '.';
    }
}

function deleteInput() {
    if(operation.num2String !== '') {
        operation.res = null;
        operation.num2String = operation.num2String.slice(0, operation.num2String.length - 1);
        if(operation.num2String === '') operation.num2 = null;
    } else if(operation.operator !== null) {
        operation.res = null;
        operation.operator = null;
        operation.num1 = null;
    } else {
        operation.num1String = operation.num1String.slice(0, operation.num1String.length - 1);
    }
    // } else if (operation.)
}

function calcResult() {
    const invalidOperation = operation.num1String === '' || operation.operator === null || operation.num2String === '';
    if(invalidOperation) return;

    operation.num2 = Number(operation.num2String);
    operation.res = operate(operation.num1, operation.num2, operation.operator);
}

function addKeyPressedToOperation(key) {
    const number = Number(key);
    if((number || number === 0) && key !== ' ') {
        addNumberToOperation(number);
        updateInputAndResult();
        return;
    }
    if (key == '.') addPoint();

    const isOperator = stringOperators[key] !== undefined;
    if (isOperator) {
        addOperatorToOperation(key);
        // updateInputAndResult(false);
        // return;
    }
    
    if (key == 'operate') calcResult();

    if (key == 'del') deleteInput();

    if (key == 'ac') resetCalculator();

    updateInputAndResult();
}
const keys = document.querySelectorAll('.key');
const buttonsCollection = []
keys.forEach(key => {
    key.addEventListener('click', (e) => {
        if(e.target.dataset.key === undefined) return;
        buttonsCollection.push(e.target);
        e.target.classList.add('pressed');

        addKeyPressedToOperation(e.target.dataset.key);
    });
    key.addEventListener('transitionend', removeTransition);
})
function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
}

const stringOperators = {
    add: '+',
    subtract: '-',
    multiply: 'x',
    divide: '÷',
    pow: '^',
}

const screenInput = document.getElementById('input');
const screenResult = document.getElementById('result');
function updateInputAndResult() {
    screenInput.value = `${stringToNumber(operation.num1String, false)} ${operation.operator === null ? '' : stringOperators[operation.operator]} ${stringToNumber(operation.num2String, false)}`;
    screenResult.value = operation.res === null ? '0' : `${stringToNumber(operation.res)}`; 
}
updateInputAndResult();

function stringToNumber(string, withDecimalsRounded = true) {
    if(string === null || string === '') return '';
    if (withDecimalsRounded)
        return typeof string === 'number' || string.includes('.') ? Number(string).toFixed(2) : string;
    else
        return typeof string === 'number' || string.includes('.') ? string : string;
}

const keyToWord = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    'x': 'multiply',
    'X': 'multiply',
    '/': 'divide',
    '^': 'pow',
    'Enter': 'operate',
    '=': 'operate',
    'Escape': 'ac',
    'Backspace': 'del',
    'Delete': 'del',
};
window.addEventListener('keydown', e => {
    pressAnimation(e);
    addKeyPressedToOperation(keyToWord[e.key] === undefined ? e.key : keyToWord[e.key])    
})
function pressAnimation(e) {
    const button = document.querySelector(`[data-key="${keyToWord[e.key] === undefined ? e.key : keyToWord[e.key]}"]`)
    if(button === null) return;
    button.classList.add('pressed')
}


})()