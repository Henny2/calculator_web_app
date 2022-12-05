console.log(document)
const table_rows = document.getElementById('calculator').rows
for (let i = 0; i < table_rows.length; i++) {
    for (let j = 0; j < table_rows[i].cells.length; j++) {
        console.log(table_rows[i].cells[j].innerText)
        let operator = table_rows[i].cells[j].innerText
        // table_rows[i].cells[j].addEventListener("click", calculate(operator));
        table_rows[i].cells[j].addEventListener("click", function () { calculate(operator); });
    }
}
console.log('end')
function calculate(operator){
    console.log("This " + operator + " was called!")
}
// for(let i =0; i<3; i++){
//     console.log(document.body)
// }