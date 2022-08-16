var input = document.getElementById("userinput");
var enterButton = document.getElementById("enter");
var ul = document.querySelector("ul");
var li = document.querySelector("li");


input.addEventListener("click", logType );
input.addEventListener("mouseenter", logType);
input.addEventListener("mouseleave", logType);
input.addEventListener("keypress", logKey);
enterButton.addEventListener("click", addElement);
input.addEventListener("keypress", keyPress)
ul.addEventListener("click", handleClick)

function logType(e) {
    console.log(e.type);
}
function logKey(event) {
    console.log(event);
}

function addElement() {
    var div = document.createElement("div");
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.appendChild(document.createTextNode("Remove"));
    button.classList.add("deleteButton");

    if (input.value.length > 0) {
        li.appendChild(document.createTextNode(input.value));
        div.appendChild(li);
        div.appendChild(button)
        ul.appendChild(div);
        input.value = "";
    }
}

function keyPress(e) {
    if (e.which === 13)
        addElement();
}

function handleClick(e) {
    console.log(e.target);
    console.log(e.target.className);
    console.log(e.target.classList);
    console.log(e.target.nodeName);
    console.log(e.target.textContent);
    if (e.target.nodeName == "LI")
        e.target.classList.toggle("done");
    else if (e.target.nodeName == "BUTTON") {
        e.target.parentElement.remove();
        // e.target.previousSibling.remove();
        // e.target.remove();
    }
}





// var button = document.getElementById("enter");
// var input = document.getElementById("userinput");
// var ul = document.querySelector("ul");
//
// function inputLength() {
// 	return input.value.length;
// }
//
// function createListElement() {
// 	var li = document.createElement("li");
// 	li.appendChild(document.createTextNode(input.value));
// 	ul.appendChild(li);
// 	input.value = "";
// }
//
// function addListAfterClick() {
// 	if (inputLength() > 0) {
// 		createListElement();
// 	}
// }
//
// function addListAfterKeypress(event) {
// 	if (inputLength() > 0 && event.keyCode === 13) {
// 		createListElement();
// 	}
// }
//
// button.addEventListener("click", addListAfterClick);
//
// input.addEventListener("keypress", addListAfterKeypress);