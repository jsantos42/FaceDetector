//==============================================================================
// VAR vs LET
// note that for var, scope is only applied within functions, while for let,
// scope is applied within every pair of curly braces (including the if/else
// statements)
//==============================================================================
const exp = 100;
var v1 = false;
let l1 = false;

if (exp > 90) {
    var v1 = true;
    let l1 = true;
    console.log("var inside", v1);
    console.log("let inside", l1);
}
console.log("var outside", v1);
console.log("let outside", l1);

var v2 = false;
let l2 = false;

if (exp > 90) {
    v2 = true;
    l2 = true;
    console.log("var inside", v2);
    console.log("let inside", l2);
}
console.log("var outside", v2);
console.log("let outside", l2);


//==============================================================================
// MAP
//==============================================================================
const array = [1, 2, 3, 4];

// Doubling the values of an array without map
const double = [];
array.forEach((num) => {
	double.push(num * 2)
})

// With map
const mapArray3 = array.map((num) => num * 2)

// Alternative which will not work; with the curly braces we do need the return keyword!
const mapArray4 = array.map((num) => {num * 2})
