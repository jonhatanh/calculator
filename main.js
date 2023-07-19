

(function() {

const operation = {
    num1: null,
    num2: null,
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
        return num1 / num2;
    }
}

function operate(num1, num2, operator) {
    return operations[operator](num1,num2);
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