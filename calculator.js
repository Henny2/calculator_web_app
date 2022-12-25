console.log(document)
// adding the event Listeners for the differnt buttons
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
let clicked_val = 0
let calculated_val = 0
// IDEA: setting one variable for the current_val and one variable for the running sum/diff etc


// helper function
// doing the calculation upon clicking a button 
function calculate(operator){
    if (document.getElementById(operator).className === 'operators') {
        // operators 
        console.log('operators clicked')
        if (operator === 'C'){
            calculated_val = 0
            clicked_val = 0
            document.getElementById('calculation').innerText = 0
            current_operator = ""

        }
        else if(operator ==='='){
            document.getElementById('calculation').innerText = calculated_val
        }
        else {
            current_operator = operator
        }

    }
    else {
        // numbers
        // display the clicked number 
        console.log('clicked number')
        clicked_val = +operator
        if (current_operator === ""){
            document.getElementById('calculation').innerText = +operator
            // clicked_val = +operator
            calculated_val = clicked_val
        
        }
        else if (current_operator === "+"){
            calculated_val = calculated_val + clicked_val
            current_operator = ''
        }
        else if (current_operator === "-"){
            calculated_val = calculated_val - clicked_val
            current_operator = ''
        }
        else if (current_operator === "x"){
            calculated_val = calculated_val * clicked_val
            console.log(4*3)
            current_operator = ''
        }
        else if (current_operator === "÷"){
            calculated_val = calculated_val / clicked_val
            current_operator = ''
        }
        else if (current_operator === "="){
            document.getElementById('calculation').innerText = +calculated_val
            current_operator = ''
        }
        
        document.getElementById('calculation').innerText = +operator
        clicked_val = +operator
        current_operator = ""
    }
    console.log('operator ' + operator)
    console.log('clicked_val ' + clicked_val.toString())
    console.log('current_operator ' + current_operator)
    console.log('calculated value ' + calculated_val.toString())


}
