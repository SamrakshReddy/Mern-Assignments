/*ASSIGNMENT 5: 
-------------
Bank Transaction Analyzer

You are building a bank statement summary.

Test data:
const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];


Tasks:
    1. filter() all credit transactions
    2. map() to extract only transaction amounts
    3. reduce() to calculate final account balance
    4. find() the first debit transaction
    5. findIndex() of transaction with amount 10000*/
console.log("ASSIGNMENT 5");

// Test Data
const transactionData = [
  {id:1, type:"credit",amount:5000},
  {id:2, type:"debit",amount:2000},
  {id:3, type:"credit",amount:10000},
  {id:4, type:"debit",amount:3000}
];

// 1. Credit transactions
const creditTransactions=transactionData.filter(t => t.type==="credit");

// 2. Extract amounts
const amounts=transactionData.map(t=>t.amount);

// 3. Final balance
const finalBalance=transactionData.reduce(
  (balance, t) =>
    t.type ==="credit" ? balance+t.amount:balance-t.amount,
  0
);

// 4. First debit transaction
const firstDebit=transactionData.find(t=>t.type==="debit");

// 5. Index of amount 10000
const index10000=transactionData.findIndex(t => t.amount===10000);

console.log(creditTransactions);
console.log(amounts);
console.log("Final Balance:", finalBalance);
console.log("First Debit:", firstDebit);
console.log("Index of 10000:", index10000);
