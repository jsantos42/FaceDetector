//==============================================================================
// https://adventofcode.com/2015/day/1
//==============================================================================

const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding: "utf-8"}, (error) => {
    if (error)
        throw error;
})

//==============================================================================
// QUESTION 1
//==============================================================================
console.time('My Q1');
const up = input.match(/\(/g).length;
const down = input.match(/\)/g).length;
console.timeEnd('My Q1');
console.log('Result: ', up - down);

function question1() {
    console.time('Andrei Q1');
    const inputArray = input.split('');
    const answer = inputArray.reduce((acc, current) => {
        if (current === '(')
            return ++acc;
        else if (current === ')')
            return --acc;
    }, 0);
    console.timeEnd('Andrei Q1');
    console.log('Result: ', answer);
}

question1();


//==============================================================================
// QUESTION 2
//==============================================================================
console.time('My Q2');
let floor = 0;
let i = 0;
for (i in input) {
    if (input[i] === '(')
        floor++;
    else if (input[i] === ')')
        floor--;
    if (floor === -1)
        break;
}
console.timeEnd('My Q2')
if (floor === -1)
    console.log('Result: ', Number(i) + 1);


function question2() {
    console.time('Andrei Q2');
    const inputArray = input.split('');
    let floor = 0;
    let counter = 0;
    inputArray.some(current => {
        if (current === '(')
            floor += 1;
        else if (current === ')')
            floor -= 1;
        counter++;
        return floor < 0;
    });
    console.timeEnd('Andrei Q2');
    console.log('Result: ', counter);
}

question2();
