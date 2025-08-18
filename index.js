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
	let result;

	const val1 = Number(calculation[0]);
	const val2 = Number(calculation[2]);
	const oper = calculation[1];

	if (oper === "+") {
		result = val1 + val2;
	} else if (oper === "-") {
		result = val1 - val2;
	} else if (oper === "*") {
		result = val1 * val2;
	} else {
		result = val1 / val2;
	}

	output.innerHTML = result;
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
