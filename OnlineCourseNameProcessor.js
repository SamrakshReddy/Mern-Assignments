
/*Assignment 2: Online Course Name Processor
------------------------------------------
Scenario : You are preparing a course list for display on a website.

Test data:
const courses = ["javascript", "react", "node", "mongodb", "express"];


Tasks:
    1. filter() courses with name length > 5
    2. map() to convert course names to uppercase
    3. reduce() to generate a single string:
              "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"

    4. find() the course "react"
    5. findIndex() of "node"*/

let cources=["javascript", "react", "node", "mongodb", "express"];
// 1. filter()
result14=cources.filter(element=>element.length);
console.log(result14);
//2.map()
result15=cources.map(element=>element.toUpperCase());
console.log(result15)
//4.find()
let result17=cources.find(element=>element=='react');
console.log(result17);
//5/findIndex()
let result18=cources.findIndex(element=>element==='node')
console.log(result18)