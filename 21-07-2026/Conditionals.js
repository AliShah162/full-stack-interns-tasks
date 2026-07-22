// conditionals are like paths that work on a specific condition like if this happens then do this, if that happens do that. There are different type of conditionals in js like:
// if
// if...else
// if...else if..else


//:::if statement:::
let age =12
if (age<18) {
    console.log("Age is less than 18");
} 

// :::else if:::
let myage=13
if (myage>18) {
    console.log("Age verified!");
    
    
} else {
    console.log("Age not verified!");
    
}

//:::if...else if..else:::
let marks=92
if (marks>90) {
    console.log("A Grade");
}
else if(marks>80){
    console.log("B Grade");
}
else if(marks>60){
    console.log("C Grade");
}
else if(marks>50){
    console.log("D Grade");
}
else{
    console.log("E Grade");
}

// Ternary Operator (? :)
// Short form of if...else.
let Age = 20;

let result = Age >= 18 ? "Adult" : "Minor";

console.log(result);




//::: Nested Ternary:::
let score =75
let grade =
score>=90 ? "A Grade": score>=80 ? "B Grade" :score>=70? "C grade" :"Fail" //it acts like  if..else...if...else
console.log(grade);


