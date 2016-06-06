#!/usr/bin/env node


//shows number 1-9 on CLI when prompted with node index.js
var row1 = ["1", "2", "3"];
var row2 = ["4", "5", "6"];
var row3 = ["7", "8", "9"];
var gameBoard = row1 + '\n' + row2 + '\n' +
  row3 + '\n';

//
// console.log(gameBoard);
//
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// rl.question('What is your move? ', (answer) => {
// // for each(var item in row1) {
// //   if (answer === item) {
// //     array.splice(answer, X);
//     console.log(row1);
//   // }
// );
//   rl.close();
// });

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Let's play tic-tac-toe");
console.log(gameBoard);
askQuestion("What is your move");


function askQuestion(question){
  rl.question(question, function(answer) {
    // row1.forEach(item in row1);
      if(answer === item) {
        
        console.log(row1);
  }
})
};
