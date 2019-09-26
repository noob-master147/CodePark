const buttonOne = document.getElementById('buttonOne');
const buttonTwo = document.getElementById('buttonTwo');
const buttonThree = document.getElementById('buttonThree');

var counterOne = 0
var counterTwo = 0
var counterThree = 0

buttonOne.onclick = function() {
    counterOne += 1
    buttonOne.innerHTML = counterOne;
}

buttonTwo.onclick = function() {
    counterTwo += 1
    buttonTwo.innerHTML = counterTwo;
}

buttonThree.onclick = function() {
    counterThree += 1
    buttonThree.innerHTML = counterThree;
}



// var count = 0;
// var button = document.getElementById("countButton");
// var display = document.getElementById("displayCount");

// button.onclick = function(){
//   count++;
//   display.innerHTML = count;
// }