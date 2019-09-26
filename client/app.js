const buttonOne = document.getElementById('buttonOne');
const buttonTwo = document.getElementById('buttonTwo');
const buttonThree = document.getElementById('buttonThree');

const countOne = document.getElementById("countOne");
const countTwo = document.getElementById("countTwo");
const countThree = document.getElementById("countThree");

var counterOne = 0
var counterTwo = 0
var counterThree = 0

buttonOne.onclick = function() {
    counterOne += 1
    countOne.innerHTML = counterOne;
}

buttonTwo.onclick = function() {
    counterTwo += 1
    countTwo.innerHTML = counterTwo;
}

buttonThree.onclick = function() {
    counterThree += 1
    countThree.innerHTML = counterThree;
}



// var count = 0;
// var button = document.getElementById("countButton");
// var display = document.getElementById("displayCount");

// button.onclick = function(){
//   count++;
//   display.innerHTML = count;
// }