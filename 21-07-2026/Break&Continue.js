// :::Break:::
// break is used to immediately exit a loop or switch statement.

for (let i = 1; i <= 5; i++) {    
  if (i === 3) {      //When i becomes 3, the loop stops completely.
    break;
  }
  console.log(i);
}
//we also use break in switch case statements. Without break, execution falls through to the next cases.


// :::Continue:::
// continue skips the current iteration and moves to the next one.
for (let i = 1; i <= 5; i++) {
  if (i === 3) {   //3 will skipped because of "continue"
    continue;
  }
  console.log(i);
}

// Difference:
// break    → stop the loop entirely
// continue → skip current iteration only