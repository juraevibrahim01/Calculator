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


// Переключатель

const handler = document.querySelector('div.toogle');
const nameHandler = document.getElementById('handle');

handler.addEventListener("click", () => {
    if(nameHandler.textContent == 'sunny') {
        nameHandler.textContent = 'bedtime';
        document.documentElement.style.setProperty("--bacgroun-color", "#1e1e1e");
        document.documentElement.style.setProperty("--arif-symbol", "#ffb54a");
        document.documentElement.style.setProperty("--numbers", "#f1f1f1");
        document.documentElement.style.setProperty("--hover", "#2a2a2a");
        document.documentElement.style.setProperty("--active", "#333333");
        document.documentElement.style.setProperty("--box", "#2c2c2c");
    }
    else {
        nameHandler.textContent = 'sunny';
        document.documentElement.style.setProperty("--bacgroun-color", "rgba(230, 230, 230, 0.747)");
        document.documentElement.style.setProperty("--numbers", "black");
        document.documentElement.style.setProperty("--hover", "rgb(255, 255, 255)");
        document.documentElement.style.setProperty("--active", "rgba(145, 132, 132, 0.747)");
        document.documentElement.style.setProperty("--box", "rgb(255, 255, 255)");
    }
})