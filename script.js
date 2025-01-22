const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

function clearDisplay() {
  display.value = '';
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function appendNumber(number) {
  display.value += number;
}

function appendOperator(operator) {
  if (display.value === '') return;
  const lastChar = display.value[display.value.length - 1];
  if ('+-*/.%'.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + operator;
  } else {
    display.value += operator;
  }
}

function calculateResult() {
  try {
    const sanitizedExpression = sanitizeExpression(display.value);
    const result = eval(sanitizedExpression);

    if (!isFinite(result) || isNaN(result)) {
      display.value = 'Error';
    } else {
      addHistory(sanitizedExpression, result);
      display.value = result;
    }
  } catch (error) {
    display.value = 'Error';
  }
}

function sanitizeExpression(expression) {
  return expression.replace(/[^0-9+\-*/().%]/g, ''); // Allow only valid characters
}

function addHistory(equation, result) {
  const historyItem = document.createElement('li');
  historyItem.textContent = `${equation} = ${result}`;
  historyList.prepend(historyItem);
}
