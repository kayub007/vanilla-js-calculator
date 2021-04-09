const calculator = document.querySelector('.calculator')
const btns = calculator.querySelector('.calculator-btns')
const screen = document.querySelector('.calculator-screen')

btns.addEventListener('click', event => {

  if (event.target.matches('button')) {
    const btn = event.target
    const todo = btn.dataset.todo
    const btnText = btn.textContent
    const displayedNum = screen.textContent

    const previousBtnClicked = calculator.dataset.previousBtnClicked
    
    Array.from(btn.parentNode.children)
      .forEach(btnItem => btnItem.classList.remove('is-depressed'))

    if (!todo) {
      if (
        displayedNum === "0" || 
        previousBtnClicked === "operator" ||
        previousBtnClicked === "equalto") {
        screen.textContent = btnText
      }else {
        screen.textContent = displayedNum + btnText
      }
      calculator.dataset.previousBtnClicked = 'number'
    }

    if (
      todo == "add" || 
      todo == "subtract" || 
      todo == "multiply" || 
      todo == "divide" ) {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

        if (
          firstValue && 
          operator && 
          previousBtnClicked !== 'operator' &&
          previousBtnClicked !== 'equalto') {
          
          const calcValue = calculate(firstValue, operator, secondValue)
          
          screen.textContent = calcValue
          calculator.dataset.firstValue = calcValue
        }else {
          calculator.dataset.firstValue = displayedNum
        }

      btn.classList.add("is-depressed")
      
      calculator.dataset.previousBtnClicked = 'operator'
      calculator.dataset.operator = todo
      console.log(firstValue, operator, secondValue);

    }

    if (todo == "clear") {
      if (btn.textContent === "AC") {
        calculator.dataset.firstValue = ''
        calculator.dataset.updatedValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousBtnClicked = ''
      }else {
        btn.textContent = 'AC'
      }
      console.log(event.target);
      screen.textContent = 0
      calculator.dataset.previousBtnClicked = 'clear'
    }
    if (todo !== "clear") {
      const clearBtn = calculator.querySelector('[data-todo=clear]')
      clearBtn.textContent = "CE"
    }

    if (todo == "decimal") {
      if (!displayedNum.includes(".")) {
        screen.textContent = displayedNum + '.'
      }else if (previousBtnClicked === "operator" || previousBtnClicked === "equalto") {
        screen.textContent = "0."
      }
      calculator.dataset.previousBtnClicked = 'decimal'
    }

    if (todo == "equalto") {
      let firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      let secondValue = displayedNum

      if (firstValue) {
        if (previousBtnClicked === 'equalto') {
          firstValue = displayedNum
          secondValue = calculator.dataset.updatedValue
        }
        screen.textContent = calculate(firstValue, operator, secondValue)
      }

      calculator.dataset.updatedValue = secondValue
      calculator.dataset.previousBtnClicked = 'equalto'
    }

  }
})

const calculate = (input1, operator, input2) => {
  let result = ''

  if (operator === 'add') {
    result = parseFloat(input1) + parseFloat(input2)
  } else if (operator === 'subtract') {
    result = parseFloat(input1) - parseFloat(input2)
  } else if (operator === 'multiply') {
    result = parseFloat(input1) * parseFloat(input2)
  } else if (operator === 'divide') {
    result = parseFloat(input1) / parseFloat(input2)
  }

  return result
}
