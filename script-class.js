class ExpenseTracker {
    constructor () {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.balanceE1 = document.getElementById('balance');
        this.incomeE1 = document.getElementById('income');
        this.expenseE1 = document.getElementById('expense');
        this.transactionList = document.getElementById('transaction-list');
        this.transactionForm = document.getElementById('transaction-form');
        this.descriptionInput = document.getElementById('description');
        this.amountInput = document.getElementById('amount');
        this.typeInput = document.getElementById('type');

        this.init();
    }

    // Initialize the tracker
    init() {
        
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
        })
    }
}