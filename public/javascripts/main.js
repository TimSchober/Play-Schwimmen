
var cardbtn1 = document.getElementsByClassName("cardbtn")[0]; // button 1
var cardbtn2 = document.getElementsByClassName("cardbtn")[1]; // button 2
var cardbtn3 = document.getElementsByClassName("cardbtn")[2]; // button 3

var imag1 = document.getElementsByClassName("play-card")[0]; // image 1
var imag2 = document.getElementsByClassName("play-card")[1]; // image 1
var imag3 = document.getElementsByClassName("play-card")[2]; // image 1

// erste Button
cardbtn1.addEventListener("mouseover", function() {
    imag1.style.width = "9em";
    imag1.style.height = "auto";

});
cardbtn1.addEventListener("mouseout", function() {
    imag1.style.width = "7em";
    imag1.style.height = "auto";

});

// Zweite Button
cardbtn2.addEventListener("mouseover", function() {
    imag2.style.width = "9em";
    imag2.style.height = "auto";

});
cardbtn2.addEventListener("mouseout", function() {
    imag2.style.width = "7em";
    imag2.style.height = "auto";

});

// Dritte Button
cardbtn3.addEventListener("mouseover", function() {
    imag3.style.width = "9em";
    imag3.style.height = "auto";

});
cardbtn3.addEventListener("mouseout", function() {
    imag3.style.width = "7em";
    imag3.style.height = "auto";

});

/*-----------------Fieldcards---------------------*/

var cardbtnfield1 = document.getElementsByClassName("cardbtnfield")[0]; // fieldbutton 1
var cardbtnfield2 = document.getElementsByClassName("cardbtnfield")[1]; // fieldbutton 2
var cardbtnfield3 = document.getElementsByClassName("cardbtnfield")[2]; // fieldbutton 3

var fieldimag1 = document.getElementsByClassName("play-card-field")[0]; // fieldimage 1
var fieldimag2 = document.getElementsByClassName("play-card-field")[1]; // fieldimage 2
var fieldimag3 = document.getElementsByClassName("play-card-field")[2]; // fieldimage 3

cardbtnfield1.addEventListener("mouseover", function() {
    fieldimag1.style.width = "9em";
    fieldimag1.style.height = "auto";

});

cardbtnfield1.addEventListener("mouseout", function() {
    fieldimag1.style.width = "7em";
    fieldimag1.style.height = "auto";

});

cardbtnfield2.addEventListener("mouseover", function() {
    fieldimag2.style.width = "9em";
    fieldimag2.style.height = "auto";

});

cardbtnfield2.addEventListener("mouseout", function() {
    fieldimag2.style.width = "7em";
    fieldimag2.style.height = "auto";

});

cardbtnfield3.addEventListener("mouseover", function() {
    fieldimag3.style.width = "9em";
    fieldimag3.style.height = "auto";

});

cardbtnfield3.addEventListener("mouseout", function() {
    fieldimag3.style.width = "7em";
    fieldimag3.style.height = "auto";

});

/*--------------------Handcard-------------------------*/

var cardbtnhand1 = document.getElementsByClassName("cardbtnhand")[0]; // handbutton 1
var cardbtnhand2 = document.getElementsByClassName("cardbtnhand")[1]; // handbutton 2
var cardbtnhand3 = document.getElementsByClassName("cardbtnhand")[2]; // handbutton 3

var handimag1 = document.getElementsByClassName("play-card-hand")[0]; // handimage 1
var handimag2 = document.getElementsByClassName("play-card-hand")[1]; // handimage 2
var handimag3 = document.getElementsByClassName("play-card-hand")[2]; // handimage 3

cardbtnhand1.addEventListener("mouseover", function() {
    handimag1.style.width = "9em";
    handimag1.style.height = "auto";

});

cardbtnhand1.addEventListener("mouseout", function() {
    handimag1.style.width = "7em";
    handimag1.style.height = "auto";

});

cardbtnhand2.addEventListener("mouseover", function() {
    handimag2.style.width = "9em";
    handimag2.style.height = "auto";

});

cardbtnhand2.addEventListener("mouseout", function() {
    handimag2.style.width = "7em";
    handimag2.style.height = "auto";

});

cardbtnhand3.addEventListener("mouseover", function() {
    handimag3.style.width = "9em";
    handimag3.style.height = "auto";

});

cardbtnhand3.addEventListener("mouseout", function() {
    handimag3.style.width = "7em";
    handimag3.style.height = "auto";

});
