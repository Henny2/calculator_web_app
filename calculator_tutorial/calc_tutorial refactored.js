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
function getKeyType(key) {
    const action = key.dataset.action
    if (!action) return 'number'
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator'
    else return action
}
function updateCalculatorState(key, calculator, calculatedValue, displayedNum) {
    // Variables and properties needed
    // 1. key
    // 2. calculator
    // 3. calculatedValue
    // 4. displayedNum
    // 5. modValue
    modValue = calculator.dataset.modValue

    const keyType = getKeyType(key)
    calculator.dataset.previousKeyType = keyType
    // change depressed state to not depressed for all keys
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
    if (keyType === 'number') { /* ... */ }
    if (keyType === 'decimal') { /* ... */ }
    if (keyType === 'operator') {
        key.classList.add('is-depressed')
        calculator.dataset['operator'] = key.dataset.action
        if (firstNumber &&
            operator &&
            prevKeyType != 'operator' &&
            prevKeyType != 'calculate'
        ) {
            key.dataset.firstNum = calculatedValue
        }
        else {
            key.dataset.firstNum = displayedNum
        }

    }
    if (keyType === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }
    }
    if (keyType !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
    }
    if (keyType === 'calculate') {
        if (firstNum && prevKeyType === 'calculate') {
            key.dataset.modValue = modValue
        }
        else {
            key.dataset.modValue = displayedNum
        }
    }
}

function createResultString(key, state, displayedNum) {
    // Variables & properties required are:
    // 1. keyContent
    // 2. displayedNum
    // 3. previousKeyType
    // 4. action
    // 5. calculator.dataset.firstValue
    // 6. calculator.dataset.operator
    // 7. calculator.dataset.modValue
    const keyContent = key.textContent
    const action = key.dataset.action
    const prevKeyType = state.previousKeyType
    const operator = state.operator
    const modValue = state.modValue
    const firstNumber = state.firstNum
    const keyType = getKeyType(key)

    if (keyType === 'number') {
        if (
            displayedNum === '0' ||
            prevKeyType === 'operator' ||
            prevKeyType === 'calculate'
        ) {
            return keyContent
        } else {
            return displayedNum + keyContent
        }
    }
    if (keyType === 'decimal') {
        if (!displayedNum.includes('.')) return displayedNum + '.'
        if (
            prevKeyType === 'operator' ||
            prevKeyType === 'calculate'
        ) return '0.'
        return displayedNum // in case neither of the two if's apply
    }
    if (keyType === 'operator') {
        let firstNumber = calculator.dataset['firstNum']
        const operator = calculator.dataset.operator
        const secondNumber = displayedNum
        if (firstNumber &&
            operator &&
            prevKeyType != 'operator' &&
            prevKeyType != 'calculate'
        ) {
            return calculate(firstNumber, secondNumber, operator)
        }
        else {
            return displayedNum
        }
    }
    if (keyType === 'clear') {
        return 0
    }
    if (keyType === 'calculate') {
        let firstNumber = calculator.dataset['firstNum']
        const operator = calculator.dataset['operator']
        let secondNumber = displayedNum
        if (firstNumber) {
            if (prevKeyType === 'calculate') {
                firstNumber = displayedNum
                secondNumber = calculator.dataset.modValue
            }
            return calculate(firstNumber, secondNumber, operator)
        }
        else {
            return displayedNum
        }
    }
}


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const displayedNum = display.textContent
        const key = e.target
        const resultString = createResultString(key, displayedNum, calculator.dataset)
        display.textContent = resultString
        updateCalculatorState(key, calculator, resultString, displayedNum)
    }
})

