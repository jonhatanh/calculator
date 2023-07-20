

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
    console.log(operation.num1String);
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
    // operation.num1 = operation.res;
    // operation.num1String = '' + operation.num1;
    //operation.operator = null;
    //resetNumber('num1');
    //resetNumber('num2');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', (e) => {
        const key = e.target;
        if(key.dataset.key === undefined) return;
        
        console.log(key);

        // const isNumber = Number(key.dataset.key) !== NaN;
        const number = Number(key.dataset.key);
        if(number || number === 0) {
            addNumberToOperation(number);
            updateInputAndResult();
            return;
        }
        if (key.dataset.key == '.') addPoint();


        const isOperator = stringOperators[key.dataset.key] !== undefined;
        if (isOperator) {
            addOperatorToOperation(key.dataset.key);
            // updateInputAndResult(false);
            // return;
        }
        

        if (key.dataset.key == 'operate') calcResult();

        if (key.dataset.key == 'del') deleteInput();

        if (key.dataset.key == 'ac') resetCalculator();

        updateInputAndResult();
    })
})

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
    console.log(operation);
    // if (withDecimalsRounded) {
    // } else {
    //     screenInput.value = `${stringToNumber(operation.num1String, false)} ${operation.operator === null ? '' : stringOperators[operation.operator]} ${stringToNumber(operation.num2String, false)}`;
    //     screenResult.value = operation.res === null ? '0' : `${stringToNumber(operation.res)}`;
    //     console.log(operation);
    // }
}
updateInputAndResult();

function stringToNumber(string, withDecimalsRounded = true) {
    if(string === null || string === '') return '';
    if (withDecimalsRounded)
        return typeof string === 'number' || string.includes('.') ? Number(string).toFixed(2) : string;
    else
        return typeof string === 'number' || string.includes('.') ? string : string;
}


// function add(num1, num2) {
//     return num1 + num2;
// }
// function subtract(num1, num2) {
//     return num1 - num2;
// }
// function multiply(num1, num2) {
//     return num1 * num2;
// }
// function divide(num1, num2) {
//     return num1 / num2;
// }





})()