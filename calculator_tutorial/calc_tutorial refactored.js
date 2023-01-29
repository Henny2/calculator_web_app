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
    // modValue = calculator.dataset["modValue"]
    const {
        firstValue,
        operator,
        modValue,
        previousKeyType
    } = calculator.dataset
    const keyType = getKeyType(key)
    calculator.dataset.previousKeyType = keyType
    // change depressed state to not depressed for all keys
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
    if (keyType === 'operator') {
        key.classList.add('is-depressed')
        calculator.dataset['operator'] = key.dataset.action
        if (firstValue &&
            operator &&
            previousKeyType != 'operator' &&
            previousKeyType != 'calculate'
        ) {
            calculator.dataset.firstValue = calculatedValue
        }
        else {
            calculator.dataset.firstValue = displayedNum
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
        if (firstValue && previousKeyType === 'calculate') {
            key.dataset.modValue = modValue
        }
        else {
            key.dataset.modValue = displayedNum
        }
    }
}



// APART FROM THE ONE LINE EARLY IT'S the same
function createResultString(key, displayedNum, state) {
    // Variables & properties required are:
    // 1. keyContent
    // 2. displayedNum
    // 3. previousKeyType
    // 4. action
    // 5. calculator.dataset.firstValue
    // 6. calculator.dataset.operator
    // 7. calculator.dataset.modValue
    const keyContent = key.textContent
    // const action = key.dataset.action  // the solution did not have this here
    const previousKeyType = state.previousKeyType
    const operator = state.operator
    const modValue = state.modValue
    let firstValue = state.firstValue
    console.log("STATE " + state["firstValue"])
    const keyType = getKeyType(key)

    if (keyType === 'number') {
        if (
            displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) {
            console.log('here2')
            console.log("keyContent " + keyContent)
            return keyContent
        } else {
            console.log('here')
            console.log('here')
            console.log("displayedNum " + displayedNum)
            console.log("displayedNum + keyContent " + displayedNum + keyContent)
            return displayedNum + keyContent
        }
    }
    if (keyType === 'decimal') {
        if (!displayedNum.includes('.')) return displayedNum + '.'
        if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
        ) return '0.'
        return displayedNum // in case neither of the two if's apply
    }
    if (keyType === 'operator') {
        // let firstValue = calculator.dataset['firstValue']
        const operator = calculator.dataset.operator
        const secondNumber = displayedNum
        if (firstValue &&
            operator &&
            previousKeyType != 'operator' &&
            previousKeyType != 'calculate'
        ) {
            return calculate(firstValue, secondNumber, operator)
        }
        else {
            return displayedNum
        }
    }
    if (keyType === 'clear') {
        return 0
    }
    if (keyType === 'calculate') {
        console.log("CALCULATE")
        console.log(firstValue)
        // let firstValue = calculator.dataset['firstValue']

        const operator = calculator.dataset['operator']
        let secondNumber = displayedNum
        if (firstValue) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum
                secondNumber = calculator.dataset.modValue
            }
            return calculate(firstValue, secondNumber, operator)
        }
        else {
            return displayedNum
        }
    }
}


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const displayedNum = display.textContent
        console.log('displayedNum ' + displayedNum)
        const key = e.target
        const resultString = createResultString(key, displayedNum, calculator.dataset)
        console.log("RESULT")
        console.log(resultString)
        console.log("RESULT")
        display.textContent = resultString
        updateCalculatorState(key, calculator, resultString, displayedNum)
    }
})


// Todo: check wha I display, maybe I display an object instead of the content of the object

// ---------------------
// below is the solution
// ---------------------


// NOTE: 
// This is the final source code file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-3

// const calculate = (n1, operator, n2) => {
//     const firstNum = parseFloat(n1)
//     const secondNum = parseFloat(n2)
//     if (operator === 'add') return firstNum + secondNum
//     if (operator === 'subtract') return firstNum - secondNum
//     if (operator === 'multiply') return firstNum * secondNum
//     if (operator === 'divide') return firstNum / secondNum
// }

// const getKeyType = key => {
//     const { action } = key.dataset
//     if (!action) return 'number'
//     if (
//         action === 'add' ||
//         action === 'subtract' ||
//         action === 'multiply' ||
//         action === 'divide'
//     ) return 'operator'
//     // For everything else, return the action
//     return action
// }



// const createResultString = (key, displayedNum, state) => {
//     const keyContent = key.textContent
//     const keyType = getKeyType(key)
//     const {
//         firstValue,
//         operator,
//         modValue,
//         previousKeyType
//     } = state

//     if (keyType === 'number') {
//         return displayedNum === '0' ||
//             previousKeyType === 'operator' ||
//             previousKeyType === 'calculate'
//             ? keyContent
//             : displayedNum + keyContent
//     }

//     if (keyType === 'decimal') {
//         if (!displayedNum.includes('.')) return displayedNum + '.'
//         if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
//         return displayedNum
//     }

//     if (keyType === 'operator') {
//         return firstValue &&
//             operator &&
//             previousKeyType !== 'operator' &&
//             previousKeyType !== 'calculate'
//             ? calculate(firstValue, operator, displayedNum)
//             : displayedNum
//     }
//     if (keyType === 'clear') return 0

//     if (keyType === 'calculate') {
//         return firstValue
//             ? previousKeyType === 'calculate'
//                 ? calculate(displayedNum, operator, modValue)
//                 : calculate(firstValue, operator, displayedNum)
//             : displayedNum
//     }
// }


// const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
//     const keyType = getKeyType(key)
//     const {
//         firstValue,
//         operator,
//         modValue,
//         previousKeyType
//     } = calculator.dataset

//     calculator.dataset.previousKeyType = keyType

//     if (keyType === 'operator') {
//         calculator.dataset.operator = key.dataset.action
//         calculator.dataset.firstValue = firstValue &&
//             operator &&
//             previousKeyType !== 'operator' &&
//             previousKeyType !== 'calculate'
//             ? calculatedValue
//             : displayedNum
//     }

//     if (keyType === 'calculate') {
//         calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
//             ? modValue
//             : displayedNum
//     }

//     if (keyType === 'clear' && key.textContent === 'AC') {
//         calculator.dataset.firstValue = ''
//         calculator.dataset.modValue = ''
//         calculator.dataset.operator = ''
//         calculator.dataset.previousKeyType = ''
//     }
// }

// const updateVisualState = (key, calculator) => {
//     const keyType = getKeyType(key)
//     Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

//     if (keyType === 'operator') key.classList.add('is-depressed')
//     if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
//     if (keyType !== 'clear') {
//         const clearButton = calculator.querySelector('[data-action=clear]')
//         clearButton.textContent = 'CE'
//     }
// }

// const calculator = document.querySelector('.calculator')
// const display = calculator.querySelector('.calculator__display')
// const keys = calculator.querySelector('.calculator__keys')

// keys.addEventListener('click', e => {
//     if (!e.target.matches('button')) return
//     const key = e.target
//     const displayedNum = display.textContent
//     const resultString = createResultString(key, displayedNum, calculator.dataset)
//     console.log("RESULT")
//     console.log(resultString)
//     console.log("RESULT")

//     display.textContent = resultString
//     updateCalculatorState(key, calculator, resultString, displayedNum)
//     updateVisualState(key, calculator)
// })


