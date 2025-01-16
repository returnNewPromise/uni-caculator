function infixToPostfix(infixExpression: string[]): string {
  console.log(infixExpression);
  const stack = []; // 运算符栈
  const output = []; // 后缀表达式
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "(": 0 }; // 运算符优先级
  for (let i = 0; i < infixExpression.length; i++) {
    const char = infixExpression[i];
    // 如果是操作数，直接输出
    if (/[0-9]/.test(char)) {
      output.push(char);
    } else if (char === "(") {
      // 左括号入栈
      stack.push(char);
    } else if (char === ")") {
      // 遇到右括号，将栈顶运算符弹出并输出，直到遇到左括号
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop(); // 弹出左括号
    } else {
      // 遇到运算符
      while (
        stack.length &&
        precedence[char] <= precedence[stack[stack.length - 1]]
      ) {
        output.push(stack.pop());
      }
      stack.push(char);
    }
  }

  // 将栈中剩余的运算符输出
  while (stack.length) {
    output.push(stack.pop());
  }
  return output;
}

function evaluatePostfix(expression: string): string {
  const stack: string[] = [];
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (!isNaN(char)) {
      stack.push(parseFloat(char));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[char](a, b));
    }
  }
  return stack.pop();
}

function areNumbersEqual(current, roundNum) {
  return Math.abs(current - roundNum) < Number.EPSILON * 10;
}

export default function expressionEval(expression: string) {
  const result = evaluatePostfix(
    //fix: negative nums operation return Nam
    //在减法前添加+号解决
    //fix  / * 运算符只能被匹配一次
    infixToPostfix(
      expression
        .replaceAll("-", "+-")
        .split(/([+/*])/)
        .filter((item, index) => {
          //删除开头的"+"
          if (item === "+" && index === 1) {
            return false;
          }
          return item !== undefined && item !== "" && !item.startsWith(".");
        })
    )
  );
  const fixNumber = areNumbersEqual(result, Number(result).toFixed(4))
    ? result.toFixed(4)
    : result;
  //parseFloat自动去除多余的0
  // console.log(fixNumber);
  return parseFloat(fixNumber).toString();
}
