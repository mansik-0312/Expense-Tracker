// Select UI Elements
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

// Load transactions from local storage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Function to update UI
function updateUI() {
    let totalIncome = 0, totalExpense = 0, balance = 0;

    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.textContent = `${transaction.description}: $${transaction.amount}`;
        li.classList.add(transaction.type);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteTransaction(transaction.id);
        li.appendChild(deleteBtn);

        transactionList.appendChild(li);

        // Calculate totals
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
        balance = totalIncome - totalExpense;
    });

    // Update UI elements
    incomeEl.textContent = totalIncome.toFixed(2);
    expenseEl.textContent = totalExpense.toFixed(2);
    balanceEl.textContent = balance.toFixed(2);
}

// Function to add a transaction
function addTransaction(event) {
    event.preventDefault();
    // Getting User Input
    const description = descriptionInput.value.trim();
    let amount = amountInput.value.trim();
    const type = typeInput.value;

    // Ensure amount is a valid float
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Please enter a valid amount (positive number up to 2 decimal places).");
        return;
    }

    amount = parseFloat(amount).toFixed(2); // Ensure 2 decimal places
    amount = parseFloat(amount); // Convert back to float

    if (description === "") {
        alert("Please enter a valid description.");
        return;
    }

    // If it's an expense, convert amount to negative
    if (type === "expense") {
        amount *= -1;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Clear input fields
    descriptionInput.value = "";
    amountInput.value = "";

    updateUI();
}

// Function to delete a transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
}

// Event Listener for adding transactions
transactionForm.addEventListener("submit", addTransaction);

// Initial UI update
updateUI();
