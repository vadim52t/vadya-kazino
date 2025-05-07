
let balance = 1000;

function getColor(num) {
    if (num === 0) return 'green';
    const red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
    return red.includes(num) ? 'red' : 'black';
}

function spin() {
    const betInput = document.getElementById("betInput").value.trim().toLowerCase();
    const amount = parseInt(document.getElementById("amountInput").value);
    const result = document.getElementById("result");

    if (!betInput || isNaN(amount) || amount <= 0) {
        result.textContent = "Введите корректную ставку и сумму.";
        return;
    }

    if (amount > balance) {
        result.textContent = "Недостаточно монет.";
        return;
    }

    document.getElementById("roulette").style.animation = "spin 2s ease-out";

    setTimeout(() => {
        const number = Math.floor(Math.random() * 37);
        const color = getColor(number);
        let win = false;

        if (!isNaN(betInput)) {
            win = parseInt(betInput) === number;
            balance += win ? amount * 35 : -amount;
        } else if (betInput === 'red' || betInput === 'black') {
            win = betInput === color;
            balance += win ? amount : -amount;
        } else {
            result.textContent = "Ставьте на число (0–36) или цвет (red/black).";
            return;
        }

        document.getElementById("balance").textContent = balance;
        result.textContent = `Выпало ${number} (${color}). ` + (win ? "Ты выиграл!" : "Ты проиграл.");
        document.getElementById("roulette").style.animation = "none";
    }, 2000);
}
