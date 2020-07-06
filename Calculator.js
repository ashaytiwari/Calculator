const calculator = document.querySelector('.calculator5');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');
let count = false;
let count2 = false;
let edit = document.getElementById("screen");

// Adding additional event on all the keys of calculator namely Click()
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        // Action for number key pressed
        if (!action) {
            // If textcontent in calculator screen is smaller than 9 then print as usual
            if (display.textContent.length < 9) {
                // If displaycontent on the screen is 0 then print the number
                if (displayedNum === '0' || count === true) {

                    display.textContent = keyContent;
                    count = false;
                    count2 = false;
                }
                // If text content on the calculator screen is any no. then apppend another no.
                else {
                    display.textContent = displayedNum + keyContent;
                }
                calculator.dataset.previousKey = 'number';
            }
            //  If textcontent in calculator screen is more than 9 then change the css property ( fontsize and padding )
            else {
                edit.style.fontSize = '30px';
                edit.style.padding = '3px';
                display.textContent = displayedNum + keyContent;
            }
        }
        // Action for operator key pressed
        else if (action === "add" || action === "min" || action === "mul" || action === "div" || action === "mod" || action === "inv") {

            count = true;
            calculator.dataset.firstValue = displayedNum; //This will store the firstTerm and operator pressed for algebraic calculation
            calculator.dataset.operator = action;
            calculator.dataset.previousKey = 'operator';
        }
        // Action for calculate key pressed
        else if (action === "equal") {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum; // This will store the second term

            if (display.textContent.length < 9) {

                display.textContent = calculate(firstValue, operator, secondValue).toFixed(4);
            }
            else {

                let edit = document.getElementById("screen");
                edit.style.fontSize = '30px';
                edit.style.padding = '3px';
                display.textContent = calculate(firstValue, operator, secondValue).toFixed(4);
            }
            calculator.dataset.previousKey = 'equal';

        }
        // Action for decimal key pressed
        else if (action === "decimal") {
            const decimalBtn = document.getElementsByClassName('decimal');
            const previousKey = calculator.dataset.previousKey;
            if (count2 === true) {
                decimalBtn.disabled = true;
                alert("Syntax Error :-( ");
            }
            else if (previousKey === 'operator') {
                display.textContent = '0' + '.';
                count = false;
            }
            else {
                display.textContent = displayedNum + '.';
            }
            count2 = true;
            calculator.dataset.previousKey = 'decimal';
        }
        // Action for AC key pressed
        else if (action === "clear") {
            if (confirm("Do you really want to clear the calculator display ?"))
                display.textContent = "0";
            // After the AC key pressed Textcontent will adopt their default css properties
            edit.style.fontSize = '60px';
            edit.style.padding = '5px';
        }
    }
})
// Calculate function for algebraic calculation
const calculate = (n1, operator, n2) => {
    if (operator === "add")
        return parseFloat(n1) + parseFloat(n2); //Textcontent on the screen is in the form of string. Hence we have to convert them in a number.
    else if (operator === "min")
        return parseFloat(n1) - parseFloat(n2);
    else if (operator === "mul")
        return parseFloat(n1) * parseFloat(n2);
    else if (operator === "div")
        return parseFloat(n1) / parseFloat(n2);
    else if (operator === "mod")
        return parseFloat(n1) % parseFloat(n2);
    else
        return 1 / parseFloat(n1);
}