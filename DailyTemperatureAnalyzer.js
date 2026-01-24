/*Assignment 1: Daily Temperature Analyzer
----------------------------------------
Scenario : You are analyzing daily temperatures recorded by a weather app.

Test data:
const temperatures = [32, 35, 28, 40, 38, 30, 42];

Tasks:
    1. filter() temperatures above 35
    2. map() to convert all temperatures from Celsius → Fahrenheit
    3. reduce() to calculate average temperature
    4. find() first temperature above 40
    5. findIndex() of temperature 28
*/

let  temperatures =  [32, 35, 28, 40, 38, 30, 42];
//1.filter()
let result9 = temperatures.filter(element=>element > 35);
console.log(result9);
//2.map()
let result10 = temperatures.map(celcius=>(celcius*9/5) +35 );
console.log(result10);
//reduce()
let result11=temperatures.reduce((accumulator,element)=>accumulator+ element, 0 )/ temperatures.length;
console.log(result11);
//find
let result12=temperatures.find(element=>element>40);
console.log(result12);
//findIndex
let result13=temperatures.findIndex(element=>element===28)
console.log(result13)