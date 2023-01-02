const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')
function calculate(firstNum, secondNum, operator) {
    let result = 0
    if (operator === 'add') {
        result = parseFloat(firstNum) + parseFloat(secondNum)
    }
    else if (operator === 'subtract') {
        result = parseFloat(firstNum) - parseFloat(secondNum)
    }
    else if (operator === 'multiply') {
        result = parseFloat(firstNum) * parseFloat(secondNum)
    }
    else if (operator === 'divide') {
        result = parseFloat(firstNum) / parseFloat(secondNum)
    }
    console.log(firstNum)
    console.log(secondNum)
    console.log(operator)
    console.log(result)
    return result.toString()
}
// const calculator = document.querySelector('.calculator')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset['action']
        const keyContent = key.textContent
        const displayedNum = display.textContent

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
        if (!action) {
            const prevKeyType = calculator.dataset['previousKeyType']
            if (displayedNum === '0' || prevKeyType === 'operator') {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayedNum + keyContent
            }
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed')
            calculator.dataset['previousKeyType'] = 'operator'
            calculator.dataset['operator'] = action
            calculator.dataset['firstNum'] = displayedNum
            // console.log('DISPLAYED ' + displayedNum)
            // console.log('firsNUm ' + document.querySelector('.calculator').dataset.firstNum)
        }
        if (action === 'decimal' && !displayedNum.includes('.')) {
            if (prevKeyType === 'operator') {
                display.textContent = '0.'
            }
            else {
                display.textContent = displayedNum + '.'
            }
        }
        if (action === 'clear') {
            console.log('clear key!')
        }
        if (action === 'calculate') {
            const secondNumber = displayedNum
            const firstNumber = calculator.dataset['firstNum']

            const operator = calculator.dataset['operator']
            const calculatedResult = calculate(firstNumber, secondNumber, operator)
            display.textContent = calculatedResult
        }
    }
})

