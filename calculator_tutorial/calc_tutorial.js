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
    // console.log(firstNum)
    // console.log(secondNum)
    // console.log(operator)
    // console.log(result)
    console.log('calculation ' + firstNum + operator + secondNum)
    return result.toString()
}
// const calculator = document.querySelector('.calculator')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset['action']
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const firstNumber = calculator.dataset['firstNum']
        const operator = calculator.dataset['operator']
        const prevKeyType = calculator.dataset['previousKeyType']
        const secondNumber = displayedNum

        console.log('firstnumber ' + firstNumber)
        console.log('operator ' + operator)
        console.log('prevKey ' + prevKeyType)
        console.log('secondNumber ' + secondNumber)
        console.log('----------------------------------------')

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

        if (!action) {

            if (displayedNum === '0' || prevKeyType === 'operator') {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            if (firstNumber) { console.log('firstnumber') }
            if (operator) { console.log('operator ' + operator) }
            console.log('prevKey ' + prevKeyType)
            if (prevKeyType != 'operator') { console.log('prevKeyType') }
            if (firstNumber && operator && prevKeyType != 'operator' && prevKeyType != 'calculate') {
                console.log('test')
                display.textContent = calculate(firstNumber, secondNumber, operator)
            }

            key.classList.add('is-depressed')
            calculator.dataset['previousKeyType'] = 'operator'
            calculator.dataset['operator'] = action
            calculator.dataset['firstNum'] = display.textContent
            // calculator.dataset['firstNum'] = displayedNum

        }
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator') {
                display.textContent = '0.'
            }

            calculator.dataset.previousKeyType = 'decimal'
        }
        if (action === 'clear') {
            console.log('clear key!')
            calculator.dataset.previousKeyType = 'clear'
        }
        if (action === 'calculate') {

            const calculatedResult = calculate(firstNumber, secondNumber, operator)
            display.textContent = calculatedResult
            calculator.dataset.previousKeyType = 'calculate'
            // calculator.dataset['firstNum'] = display.textContent
        }
    }
})

