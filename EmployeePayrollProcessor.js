/*ASSIGNMENT 3:
-------------
Employee Payroll Processor

You are building a salary processing module in a company HR app.

Test data:
const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

Tasks:
    1. filter() employees from IT department
    2. map() to add:
            netSalary = salary + 10% bonus

    3. reduce() to calculate total salary payout
    4. find() employee with salary 30000
    5. findIndex() of employee "Neha"*/

    const employeeData = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

// 1. IT employees
const itEmployees = employeeData.filter(e => e.department === "IT");

// 2. Add net salary (10% bonus)
const salaryWithBonus = employeeData.map(e => ({
  ...e,
  netSalary: e.salary + e.salary * 0.10
}));

// 3. Total salary payout
const totalSalary = employeeData.reduce(
  (sum, e) => sum + e.salary, 0
);

// 4. Employee with salary 30000
const salary30000 = employeeData.find(e => e.salary === 30000);

// 5. Index of Neha
const nehaIndex = employeeData.findIndex(e => e.name === "Neha");

console.log(itEmployees);
console.log(salaryWithBonus);
console.log("Total Salary:", totalSalary);
console.log("Salary 30000:", salary30000);
console.log("Neha Index:", nehaIndex);