const resultDisplay = document.getElementById('result-display');
const buttons = document.querySelectorAll('button[data-value]');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let expression = '';

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleInput(value);
  });
});

clearButton.addEventListener('click', () => {
  expression = '';
  resultDisplay.value = '';
});

equalsButton.addEventListener('click', () => {
  resultDisplay.value = evaluateExpression(expression);
  expression = resultDisplay.value;
});

function handleInput(value) {
  const lastChar = expression.slice(-1);
  const operators = '+-*/';

  if (operators.includes(lastChar) && operators.includes(value)) {
    return; // prevent duplicate operators
  }

  expression += value;
  resultDisplay.value = expression;
}

function evaluateExpression(expr) {
  try {
    const tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
    if (!tokens) throw new Error('Invalid input');

    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const next = parseFloat(tokens[i + 1]);

      if (isNaN(next)) throw new Error('Invalid number');

      switch (operator) {
        case '+':
          result += next;
          break;
        case '-':
          result -= next;
          break;
        case '*':
          result *= next;
          break;
        case '/':
          if (next === 0) return 'Cannot divide by 0';
          result /= next;
          break;
        default:
          throw new Error('Invalid operator');
      }
    }

    return result;
  } catch (err) {
    return 'Error';
  }
}
