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

// IDEA: setting one variable for the current_val and one variable for the running sum/diff etc




console.log('end')
function calculate(operator){
    // current_val = +document.getElementById('calculation').innerText
    // console.log(current_val) 
    console.log(document.getElementById(operator).className)
    if (document.getElementById(operator).className === 'operators') {
        // operators 
        console.log('operators clicked')
        current_operator = operator
    }
    else {
        // numbers
        // display the clicked number 
        console.log('clicked number')
        if (operator === ""){
            document.getElementById('calculation').innerText = +operator
        
        }
        document.getElementById('calculation').innerText = +operator
        current_operator = ""
    }
    console.log(operator)

}
