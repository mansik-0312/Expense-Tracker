class ExpenseTracker {
    incomeE1;
    constructor () {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.balanceEl = document.getElementById('balance');
        this.incomeEl = document.getElementById('income');
        this.expenseEl = document.getElementById('expense');
        this.transactionList = document.getElementById('transaction-list');
        this.transactionForm = document.getElementById('transaction-form');
        this.descriptionInput = document.getElementById('description');
        this.amountInput = document.getElementById('amount');
        this.typeInput = document.getElementById('type');

        this.init();
    }

    // Initialize the tracker
    init() {
        this.transactionForm.addEventListener("submit", (event) => this.addTransaction(event));
        this.updateUI();
    }

    updateUI() {
        let totalIncome = 0,
        totalExpense = 0,
        balance = 0;

        this.transactionList.innerHTML= '';

        this.transactions.forEach((transaction) => {
            const li = document.createElement('li');
            li.textContent = `${transaction.description} : $${Math.abs(transaction.amount)}`;
            li.classList.add(transaction.type);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => this.deleteTransaction(transaction.id);
        li.appendChild(deleteBtn);

        this.transactionList.appendChild(li);

        // Calculate total
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += Math.abs(transaction.amount);
        }
        balance = totalIncome - totalExpense;
        });

        // Update UI elements
        this.incomeEl.textContent = totalIncome.toFixed(2);
        this.expenseEl.textContent = totalExpense.toFixed(2);
        this.balanceEl.textContent = balance.toFixed(2);

        // this.incomeE1.textContent = totalIncome.toFixed(2);
    }

    addTransaction(event) {
        event.preventDefault();

        const description = this.descriptionInput.value.trim();
        let amount = this.amountInput.value.trim();
        const type = this.typeInput.value;

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount (positive number up to 2 decimal places).");
            return;
        }

        amount = parseFloat(amount).toFixed(2);
        amount = parseFloat(amount);

        if (description === "") {
            alert("Please enter a valid description.");
            return;
        }

        if (type === "expense") {
            amount *= -1;
        }

        const transaction = {
            id: Date.now(),
            description,
            amount,
            type,
        };

        this.transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(this.transactions));

        // Clear input fields
        this.descriptionInput.value = "";
        this.amountInput.value = "";

        this.updateUI();
    }

    // Delete a transaction
    deleteTransaction(id) {
        this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
        this.updateUI();
    }
}
// Initialize ExpenseTracker
document.addEventListener("DOMContentLoaded", () => {
    new ExpenseTracker();
});