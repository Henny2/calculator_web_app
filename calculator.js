console.log(document)
const table_rows = document.getElementById('calculator').rows
for (let i = 0; i < table_rows.length; i++) {
    for (let j = 0; j < table_rows[i].cells.length; j++) {
        let operator_text = table_rows[i].cells[j].innerText
        let operator = table_rows[i].cells[j]
        // table_rows[i].cells[j].addEventListener("click", calculate(operator));
        table_rows[i].cells[j].addEventListener("click", function () { calculate(operator_text); });
    }
}
let current_operator = ''
console.log('end')
function calculate(operator){
    current_val = +document.getElementById('calculation').innerText
    console.log(current_val) 
    console.log(document.getElementById(operator).className)
    if (document.getElementById(operator).className === 'operators') {
        // operators 
        current_operator = operator
        
    }
    else {
        // numbers
        if (current_operator === "-"){
            alert('Please select an operator.')
        }
        else if (current_operator === "+"){
            document.getElementById('calculation').innerText = current_val + +operator
            current_operator = ''
        }
        else if (current_operator === "-"){
            document.getElementById('calculation').innerText = current_val - +operator
            current_operator = ''
        }
        else if (current_operator === "="){
            document.getElementById('calculation').innerText = current_val 
            current_operator = ''
        }
        else if (current_operator === "÷"){
            document.getElementById('calculation').innerText = current_val / +operator
            current_operator = ''
        }
        else if (current_operator === "C"){
            document.getElementById('calculation').innerText = 0
            current_operator = ''
        }
        else {
            console.log('something else')
        }

    }
    console.log(operator)

}
