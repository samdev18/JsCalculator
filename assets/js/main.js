window.addEventListener('load', function (event) {
  document.addEventListener('keydown', pegaTecla);
});
function pegaTecla() {
  let tecla = event.keyCode;
  let valor;
  switch (tecla) {
    case 48:
      valor = 0;
      break;
    case 96:
      valor = 0;
      break;
    case 49:
      valor = 1;
      break;
    case 97:
      valor = 1;
      break;
    case 50:
      valor = 2;
      break;
    case 98:
      valor = 2;
      break;
    case 51:
      valor = 3;
      break;
    case 99:
      valor = 3;
      break;
    case 52:
      valor = 4;
      break;
    case 100:
      valor = 4;
      break;
    case 53:
      valor = 5;
      break;
    case 101:
      valor = 5;
      break;
    case 54:
      valor = 6;
      break;
    case 102:
      valor = 6;
      break;
    case 55:
      valor = 7;
      break;
    case 103:
      valor = 7;
      break;
    case 56:
      valor = 8;
      break;
    case 104:
      valor = 8;
      break;
    case 57:
      valor = 9;
      break;
    case 105:
      valor = 9;
      break;
    case 107:
      valor = "+";
      break;
    case 13:
      valor = "=";
      break;
    case 109:
      valor = "-";
      break;
    case 189:
      valor = "-";
      break;
    case 106:
      valor = "x";
      break;
    case 193:
      valor = "÷";
      break;
    case 111:
      valor = "÷";
      break;
    case 188:
      valor = ".";
      break;
    case 190: valor = ".";
      break;
    case 8:
      clearInput();
      break;
  }
  if (tecla != 8) {
    handleKeyPress(valor);
    evaluate(valor);
  }
}

const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const keys = document.querySelectorAll(".bottom span");

let operation = "";
let answer;
let decimalAdded = false;

const operators = ["+", "-", "x", "÷"];
function handleKeyPress(e) {

  let key = "";
  let lastChar = "";
  if (e.target != null && e.target != undefined) {
    key = e.target.dataset.key;
    lastChar = operation[operation.length - 1];
  } else {
    key = e;
    lastChar = operation[operation.length - 1];
  }
  if (key === "=") {
    return;
  }

  if (key === "." && decimalAdded) {
    return;
  }

  if (operators.indexOf(key) !== -1) {
    decimalAdded = false;
  }

  if (operation.length === 0 && key === "-") {
    operation += key;
    input.innerHTML = operation;
    return;
  }

  if (operation.length === 0 && operators.indexOf(key) !== -1) {
    input.innerHTML = operation;
    return;
  }

  if (operators.indexOf(lastChar) !== -1 && operators.indexOf(key) !== -1) {
    operation = operation.replace(/.$/, key);
    input.innerHTML = operation;
    return;
  }

  if (key) {
    if (key === ".") decimalAdded = true;
    operation += key;
    input.innerHTML = operation;
    return;
  }

}

function evaluate(e) {
  console.log(e.target);
  let key;
  let lastChar;
  if (e.target != null) {
    key = e.target.dataset.key;
    lastChar = operation[operation.length - 1];
  } else {
    key = e;
    lastChar = operation[operation.length - 1];
  }
  if (key === "=" && operators.indexOf(lastChar) !== -1) {
    operation = operation.slice(0, -1);
  }

  if (operation.length === 0) {
    answer = "";
    result.innerHTML = answer;
    return;
  }

  try {

    if (operation[0] === "0" && operation[1] !== "." && operation.length > 1) {
      operation = operation.slice(1);
    }

    const final = operation.replace(/x/g, "*").replace(/÷/g, "/");
    answer = +(eval(final)).toFixed(5);

    if (key === "=") {
      decimalAdded = false;
      operation = `${answer}`;
      answer = "";
      input.innerHTML = operation;
      result.innerHTML = answer;
      return;
    }

    result.innerHTML = answer;

  } catch (e) {
    if (key === "=") {
      decimalAdded = false;
      input.innerHTML = `<span class="error">${operation}</span>`;
      result.innerHTML = `<span class="error">Bad Expression</span>`;
    }
    console.log(e);
  }

}

function clearInput(e) {

  if (e != undefined && e.ctrlKey) {
    operation = "";
    answer = "";
    input.innerHTML = operation;
    result.innerHTML = answer;
    return;
  } else {
    operation = operation.slice(0, -1);
    input.innerHTML = operation;
  }

}

deleteBtn.addEventListener("click", clearInput);
keys.forEach(key => {
  key.addEventListener("click", handleKeyPress);
  key.addEventListener("click", evaluate);
});
