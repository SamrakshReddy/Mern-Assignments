/*Assignment 2: Exam Result Summary
---------------------------------
Scenario : Marks are stored subject-wise for a student.

Test data:
const marks = {
  maths: 78,
  physics: 65,
  chemistry: 82,
  english: 55
};

Tasks:
    1. Calculate total marks
    2. Calculate average marks
    3. Find the highest scoring subject
    4. Add a new subject computer: 90*/


const marks = {
  maths: 78,
  physics: 65,
  chemistry: 82,
  english: 55
};
//1,Total marks
let total=0
for (let subject in marks){
    total=total+marks[subject]
}
console.log("total marks:",total)
//2.average marks
let average=total/Object.keys(marks).length;
console.log("Average Marks:",average);
//3.highest scoring subject
let highestMarks=Math.max(...Object.values(marks));
let result=Object.entries(marks).find(
  ([subject, mark])=>mark===highestMarks
);
console.log("Highest Subject:",result[0]);
console.log("Highest Marks:",result[1]);
//4.add computer:90
marks.computer=90;
console.log("Updated Marks:",marks);