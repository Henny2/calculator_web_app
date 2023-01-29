const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')
function calculate(firstNum, secondNum, operator) {
    firstVal = parseFloat(firstNum)
    secondVal = parseFloat(secondNum)
    let result = 0
    if (operator === 'add') return firstVal + secondVal
    if (operator === 'subtract') return firstVal - secondVal
    if (operator === 'multiply') return firstVal * secondVal
    if (operator === 'divide') return firstVal / secondVal
    console.log('calculation ' + firstNum + operator + secondNum)
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset['action']
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const prevKeyType = calculator.dataset['previousKeyType']
        // let firstNumber = calculator.dataset['firstNum']
        const operator = calculator.dataset['operator']

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

        if (!action) {
            if (displayedNum === '0' ||
                prevKeyType === 'operator' ||
                prevKeyType === 'calculate'
            ) {
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
            let firstNumber = calculator.dataset['firstNum']
            const operator = calculator.dataset.operator
            const secondNumber = displayedNum

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists

            if (firstNumber &&
                operator &&
                prevKeyType != 'operator' &&
                prevKeyType != 'calculate'
            ) {
                const calcValue = calculate(firstNumber, secondNumber, operator)
                display.textContent = calcValue
                calculator.dataset['firstNum'] = calcValue
            }
            else {
                calculator.dataset['firstNum'] = displayedNum
            }
            key.classList.add('is-depressed')
            calculator.dataset['previousKeyType'] = 'operator'
            calculator.dataset['operator'] = action
        }
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (
                prevKeyType === 'operator' ||
                prevKeyType === 'calculate'
            ) {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }
        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstNum = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            }
            else {
                key.textContent = 'AC'
            }
            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
        if (action === 'calculate') {
            let firstNumber = calculator.dataset['firstNum']
            const operator = calculator.dataset['operator']
            let secondNumber = displayedNum
            console.log(secondNumber)

            if (firstNumber) {
                if (prevKeyType === 'calculate') {
                    firstNumber = displayedNum
                    secondNumber = calculator.dataset.modValue
                }
                display.textContent = calculate(firstNumber, secondNumber, operator)
            }

            calculator.dataset['modValue'] = secondNumber
            calculator.dataset['previousKeyType'] = 'calculate'
        }
    }
})

