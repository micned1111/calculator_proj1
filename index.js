const numbers = document.querySelector(".numbers");
const operations = document.querySelector(".operations");

const calc = document.getElementById("calculate");
const reset = document.getElementById("reset");

let output = document.getElementById("output");

let calculation = [];
let lastEl = false; // false == not a number, true == number

function addNumber(event) {
	const val = event.target.value;

	if (lastEl === false) {
		calculation.push(val);
		lastEl = true;
	} else {
		let last = calculation.pop();
		last += val;
		calculation.push(last);
	}

	displayCalculation();
}

function addOperation(event) {
	const operation = event.target.value;
	calculation.push(operation);
	lastEl = false;

	displayCalculation();
}

function displayCalculation() {
	let display = "";
	for (const element of calculation) {
		display += element + " ";
	}
	output.innerHTML = display;
}

// basic arithmetic function on two numbers
function calculateResult() {
    checkFirstEl();

	const operations = ["*", "/", "+", "-"];

	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < calculation.length; j++) {
			if (calculation[j] === operations[i]) {
				const num1 = Number(calculation[j - 1]);
				const num2 = Number(calculation[j + 1]);

				const result = performOperation(num1, operations[i], num2);
				calculation.splice(j - 1, 3, result);
                j--;
			}
		}
	}

	output.innerHTML = calculation;
}

function checkFirstEl() {
    if (calculation[0] === "-") {
        negNum = "-" + calculation[1];
        calculation.splice(0, 2, negNum)
    }
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

function resetCalc() {
	output.innerHTML = "";
	calculation = [];
	lastEl = false;
}

numbers.addEventListener("click", addNumber);
operations.addEventListener("click", addOperation);

calc.addEventListener("click", calculateResult);
reset.addEventListener("click", resetCalc);
