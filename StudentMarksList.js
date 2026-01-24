/*Assignment 3: Student Marks List
--------------------------------
Scenario : You receive marks from an exam system.

Test data:
const marks = [78, 92, 35, 88, 40, 67];

Tasks:
    1. filter() marks ≥ 40 (pass marks)
    2. map() to add 5 grace marks to each student
    3. reduce() to find highest mark
    4. find() first mark below 40
    5. findIndex() of mark 92*/

let marks=[78, 92, 35, 88, 40, 67];
//1.filter() marks≥40
let result19 = marks.filter(element => element >= 40);
console.log(result19);
//map()
let result20=marks.map(marks=>marks+5)
console.log(result20)
//3.reduce() hightes marks
let result21=marks.reduce((max, mark)=>mark>max?mark:max);
console.log(result21);
//4.find()
let result22=marks.find(element=>element<40);
console.log(result22);
//5.findIndex()
let result23=marks.findIndex(element=>element===92);
console.log(result23);