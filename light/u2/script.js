let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";

function calculate(value) {
  if (value === "+" || value === "-" || value === "*" || value === "/") {
    operator = "+";
    firstNumber = result;
    result = "";
  } else if (value === "equal") {
    secondNumber = result;
    result = eval(firstNumber + operator + secondNumber);
  } else if (value === "C") {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = "";
  } else {
    result += value;
  }
  document.getElementById("result").value =result;
}
