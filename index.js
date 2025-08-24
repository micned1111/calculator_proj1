const numberButtons = document.querySelectorAll("#number");
const operationButtons = document.querySelectorAll("#operator");
const calculateButton = document.getElementById("calculate");
const deleteButton = document.getElementById("delete");
const resetButton = document.getElementById("reset");
let output = document.getElementById("output");

let expression = []; // array containing numbers and operators
let currentInput = ""; // variable containing the current number-input

function addNumber(event) {
	const numberVal = event.target.value;

	if (numberVal === "0") {
		if (currentInput === "-") {
			currentInput = numberVal;
		} else {
			if (currentInput !== "0") {
				currentInput += numberVal;
			}
		}
	} else {
		currentInput += numberVal;
	}

	displayExpression();
}

function addOperation(event) {
	const operation = event.target.value;

	if (expression.length === 0 && currentInput === "") {
		if (operation === "-") {
			currentInput = operation;
		}
	} else {
		if (currentInput !== "") {
			expression.push(Number(currentInput));
			currentInput = "";
			expression.push(operation);
		}
	}

	displayExpression();
}

function displayExpression() {
	output.innerText = expression.join(" ") + " " + currentInput;
}

function calculateExpression() {
	if (currentInput !== "") {
		expression.push(Number(currentInput));
		const operations = ["×", "÷", "+", "-"];

		for (let i = 0; i < 4; i += 2) {
			for (let j = 1; j < expression.length; j += 2) {
				if (
					expression[j] === operations[i] ||
					expression[j] === operations[i + 1]
				) {
					const num1 = expression[j - 1];
					const num2 = expression[j + 1];
					const oper = expression[j];

					const result = performOperation(num1, oper, num2);

					if (Number.isNaN(result) || !Number.isFinite(result)) {
						handleError();
						return;
					}

					expression.splice(j - 1, 3, result);
					j -= 2;
				}
			}
		}

		output.innerText = expression;
		currentInput = String(expression);
		expression = [];
	}
}

function performOperation(num1, operator, num2) {
	const operations = {
		"×": (a, b) => a * b,
		"÷": (a, b) => a / b,
		"+": (a, b) => a + b,
		"-": (a, b) => a - b,
	};

	if (operations[operator]) {
		return operations[operator](num1, num2);
	}
}

function handleError() {
	output.innerText = "Error";
	currentInput = "";
	expression = [];
}

function deleteLastElement() {
	if (currentInput !== "") {
		currentInput = currentInput.slice(0, -1);
	} else {
		if (expression.length !== 0) {
			expression.pop();
			currentInput = String(expression.pop());
		}
	}

	displayExpression();
}

function resetExpression() {
	output.innerText = "";
	currentInput = "";
	expression = [];
}

numberButtons.forEach(button => {
    button.addEventListener("click", addNumber)
});

operationButtons.forEach(button => {
    button.addEventListener("click", addOperation)
});

calculateButton.addEventListener("click", calculateExpression);
deleteButton.addEventListener("click", deleteLastElement);
resetButton.addEventListener("click", resetExpression);
