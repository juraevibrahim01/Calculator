let result = document.querySelector(".div1"); // Блок результата
let buttons = document.querySelectorAll('.conteiner > div:not(:first-child)');  // Кнопки калькулятора

let previous = "";  // Число до операции
let current = "";   // Число после операции
let operator = null; // Арифметический оператор

function calculate(a, op, b) {
    const prev = parseFloat(a);
    const curr = parseFloat(b);
    if (isNaN(prev) || isNaN(curr)) return "";
    switch(op) {
        case "+": return prev + curr;
        case "-": return prev - curr;
        case "*": return prev * curr;
        case "/": return curr === 0 ? "Ошибка" : prev / curr;
        case "%": return prev % curr;
        default: return curr;
    }
}

function updateDisplay() {
    result.textContent = previous + (operator ? " " + operator + " " : "") + current;
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.textContent;

        // Очистить всё
        if(value === 'AC') {
            previous = "";
            current = "";
            operator = null;
            result.textContent = "0";
            return;
        }

        // Clear (удаление последнего символа)
        if(value === 'CLEAR') {
            if(current !== "") {
                current = current.slice(0, -1);
            } else if(operator !== null) {
                operator = null;
            }
            updateDisplay();
            return;
        }

        // Операции
        if(["+", "-", "*", "/", "%"].includes(value)) {

            // Минус для отрицательного числа
            if(value === "-" && current === "" && (previous === "" || operator !== null)) {
                current = "-";
                updateDisplay();
                return;
            }

            if(current === "" || current === "-") return;

            if(previous !== "" && operator !== null) {
                current = calculate(previous, operator, current).toString();
            }

            operator = value;
            previous = current;
            current = "";
            updateDisplay();
            return;
        }

        // Вычисление
        if(value === "=") {
            if(previous === "" || operator === null || current === "") return;

            const formula = previous + " " + operator + " " + current;
            current = calculate(previous, operator, current).toString();
            previous = "";
            operator = null;
            result.textContent = formula + " = " + current;
            return;
        }

        // Точка
        if(value === ".") {
            if(!current.includes(".")) {
                current = current === "" ? "0." : current + ".";
                updateDisplay();
            }
            return;
        }

        // Цифры
        if(/^[0-9]$/.test(value) || value === "00") {
            if(current === "0") {
                current = value;
            } else {
                current += value;
            }
            updateDisplay();
            return;
        }
    });
});
