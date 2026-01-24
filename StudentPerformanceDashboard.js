/*ASSIGNMENT 2:
-------------
Student Performance Dashboard

You are working on a college result analysis system.

Test Data:
const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

Tasks:
    1. filter() students who passed (marks ≥ 40)
    2. map() to add a grade field
              ≥90 → A
              ≥75 → B
              ≥60 → C
              else → D

   3. reduce() to calculate average marks
   4. find() the student who scored 92
   5. findIndex() of student "Kiran"
    */

   // Test Data
const studentData = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

// 1. Passed students
const passedStudents = studentData.filter(s => s.marks >= 40);
console.log(passedStudents);

// 2. Add grade
const studentsWithGrades = studentData.map(s => ({
  ...s,
  grade:
    s.marks >= 90 ? "A" :
    s.marks >= 75 ? "B" :
    s.marks >= 60 ? "C" : "D"
}));
console.log(studentsWithGrades);

// 3. Average marks
const averageMarks =
  studentData.reduce((sum, s)=>sum+s.marks,0)/studentData.length;
console.log("Average Marks:", averageMarks);

// 4. Student who scored 92
const student92 = studentData.find(s =>s.marks===92);
console.log("Student with 92:", student92);

// 5. Index of Kiran
const kiranIndex = studentData.findIndex(s=>s.name==="Kiran");
console.log("Kiran Index:", kiranIndex);