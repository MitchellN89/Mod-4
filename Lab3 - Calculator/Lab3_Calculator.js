let calculation = ["0"];
let currentOperation = "number";
let limit = 3; // I've added this as I might try challenge myself and make a calc that takes any number of data and uses BEDMAS to evalutate

const output = document.querySelector("#output");
const calculationString = document.querySelector("#calculation-string");

function inputNumber(number) {
  if (checkLimit("number")) {
    return;
  }
  if (currentOperation === "number") {
    appendCurrentValue(number);
  } else if (currentOperation === "operator") {
    commit();
    currentOperation = "number";
    inputNumber(number);
  }
}

function inputMinus(operator) {
  if (checkLimit("operator")) {
    return;
  }
  console.log(calculation[0]);
  if (calculation[0] == "0") {
    replaceCurrentValue("-");
  } else {
    inputOperator(operator);
  }
}

function inputOperator(operator) {
  if (checkLimit("operator")) {
    return;
  }
  if (currentOperation === "operator") {
    replaceCurrentValue(operator);
  } else if (
    currentOperation === "number" &&
    calculation[0] !== "0" &&
    calculation[0] !== "-"
  ) {
    commit();
    currentOperation = "operator";
    inputOperator(operator);
  }
}

function inputPeriod() {
  if (!calculation[calculation.length - 1].includes(".")) {
    inputNumber(".");
  }
}

function appendCurrentValue(value) {
  calculation[calculation.length - 1] += value;
  render();
}

function replaceCurrentValue(value) {
  calculation[calculation.length - 1] = value;
  render();
}

function commit() {
  if (currentOperation === "number") {
    calculation[calculation.length - 1] = parseFloat(
      calculation[calculation.length - 1]
    );
  }
  calculation.push("");
}

function checkLimit(operation) {
  if (!limit) false;
  if (calculation.length <= limit && currentOperation === operation) {
    return false;
  } else if (calculation.length >= limit && currentOperation !== operation) {
    return true;
  }
}

function render() {
  const calcStr = calculation.slice(0, calculation.length - 1).join(" ");
  const currentVal = calculation[calculation.length - 1];
  console.log("currentVal:", currentVal);

  calculationString.innerHTML = calcStr;
  // output.innerHTML = currentVal;

  output.innerHTML = !isNaN(currentVal) ? parseFloat(currentVal) : currentVal;

  if (!isNaN(currentVal)) {
    output.innerHTML = parseFloat(currentVal);
    if (currentVal.slice(-1) === ".") {
      output.innerHTML += ".";
    }
  } else {
    output.innerHTML = currentVal;
  }
}

function reset() {
  calculation = ["0"];
  currentOperation = "number";
  render();
}

function calculate(operator) {
  if (currentOperation === "operator" || currentOperation === "calculated") {
    return;
  }
  commit();
  currentOperation = "calculated";
  replaceCurrentValue(operator);
  evaluate();
  render();
}

function evaluate() {
  // I might redo this function to allow for multiple numbers to be calculated using BEDMAS

  const [firstNum, operator, lastNum] = calculation;
  let result;
  switch (operator) {
    case "+":
      result = firstNum + lastNum;
      break;
    case "−":
      result = firstNum - lastNum;
      break;
    case "×":
      result = firstNum * lastNum;
      break;
    case "÷":
      result = firstNum / lastNum;
      break;
  }
  calculation.push(result);
}
