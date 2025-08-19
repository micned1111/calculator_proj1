const numberButtons = document.querySelector(".numbers");
const operationButtons = document.querySelector(".operations");

const calculateButton = document.getElementById("calculate");
const resetButton = document.getElementById("reset");

let output = document.getElementById("output");

let expression = []; // array containing numbers and operators
let isLastElementNumber = false; // false == not a number, true == number

function addNumber(event) {
	const numberVal = event.target.value;

	if (isLastElementNumber === false) {
		if (expression.length === 1) {
			expression[0] = "-" + numberVal;
		}
        else {
            expression.push(numberVal);
        }
		isLastElementNumber = true;
	} else {
		expression.push(expression.pop() + numberVal);
	}

	displayExpression();
}

function addOperation(event) {
	const operation = event.target.value;
	expression.push(operation);
	isLastElementNumber = false;

	displayExpression();
}

function displayExpression() {
	let stringExpression = "";
	for (const element of expression) {
		stringExpression += element + " ";
	}
	output.innerHTML = stringExpression;
}

function calculateExpression() {
	const operations = ["*", "/", "+", "-"];

	for (let i = 0; i < 4; i++) {
		for (let j = 1; j < expression.length; j += 2) {
			if (expression[j] === operations[i]) {
				const num1 = Number(expression[j - 1]);
				const num2 = Number(expression[j + 1]);

				const result = performOperation(num1, operations[i], num2);
				expression.splice(j - 1, 3, result);
				j--;
			}
		}
	}

	output.innerHTML = expression;
}

function performOperation(num1, operator, num2) {
	const operations = {
		"*": (a, b) => a * b,
		"/": (a, b) => a / b,
		"+": (a, b) => a + b,
		"-": (a, b) => a - b,
	};

	if (operations[operator]) {
		return operations[operator](num1, num2);
	}
}

function resetExpression() {
	output.innerHTML = "";
	expression = [];
	isLastElementNumber = false;
}

numberButtons.addEventListener("click", addNumber);
operationButtons.addEventListener("click", addOperation);

calculateButton.addEventListener("click", calculateExpression);
resetButton.addEventListener("click", resetExpression);
