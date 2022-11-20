

var fieldCardKlicked1, fieldCardKlicked2, fieldCardKlicked3 = false;
var handCardKlicked1, handCardKlicked2, handCardKlicked3 = false;

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

cardbtnfield1.addEventListener("click", function() {
    if(!fieldCardKlicked1) {
        fieldimag1.style.outline = "auto";
        fieldimag1.style.color = "#ed08e6";
        fieldimag1.style.borderStyle = "solid";
        fieldCardKlicked1 = true;

        fieldimag2.style.outline = "0";
        fieldimag2.style.color = "transparent";

        fieldimag3.style.outline = "0";
        fieldimag3.style.color = "transparent";

        fieldCardKlicked2, fieldCardKlicked3 = false;

    }
    else {
        fieldimag1.style.outline = "0";
        fieldimag1.style.color = "transparent";
        fieldCardKlicked1 = false;
    }
});

cardbtnfield2.addEventListener("mouseover", function() {
    fieldimag2.style.width = "9em";
    fieldimag2.style.height = "auto";

});

cardbtnfield2.addEventListener("mouseout", function() {
    fieldimag2.style.width = "7em";
    fieldimag2.style.height = "auto";

});
cardbtnfield2.addEventListener("click", function() {
    if(!fieldCardKlicked2) {
            fieldimag2.style.outline = "auto";
            fieldimag2.style.color = "#ed08e6";
            fieldimag2.style.borderStyle = "solid";
            fieldCardKlicked2 = true;

            fieldimag1.style.outline = "0";
            fieldimag1.style.color = "transparent";

            fieldimag3.style.outline = "0";
            fieldimag3.style.color = "transparent";

            fieldCardKlicked1, fieldCardKlicked3 = false;
        }
        else {
            fieldimag2.style.outline = "0";
            fieldimag2.style.color = "transparent";
            fieldCardKlicked2 = false;
        }
});

cardbtnfield3.addEventListener("mouseover", function() {
    fieldimag3.style.width = "9em";
    fieldimag3.style.height = "auto";

});

cardbtnfield3.addEventListener("mouseout", function() {
    fieldimag3.style.width = "7em";
    fieldimag3.style.height = "auto";

});
cardbtnfield3.addEventListener("click", function() {
    if(!fieldCardKlicked3) {
        fieldimag3.style.outline = "auto";
        fieldimag3.style.color = "#ed08e6";
        fieldimag3.style.borderStyle = "solid";
        fieldCardKlicked3 = true;

        fieldimag1.style.outline = "0";
        fieldimag1.style.color = "transparent";

        fieldimag2.style.outline = "0";
        fieldimag2.style.color = "transparent";

        fieldCardKlicked1, fieldCardKlicked2 = false;
    }
    else {
        fieldimag3.style.outline = "0";
        fieldimag3.style.color = "transparent";
        fieldCardKlicked3 = false;
    }
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

cardbtnhand1.addEventListener("click", function() {
    if(!handCardKlicked1) {
        handimag1.style.outline = "auto";
        handimag1.style.color = "#ed08e6";
        handimag1.style.borderStyle = "solid";
        handCardKlicked1 = true;

        handimag2.style.outline = "0";
        handimag2.style.color = "transparent";

        handimag3.style.outline = "0";
        handimag3.style.color = "transparent";

        handCardKlicked2, handCardKlicked3 = false;
    }
    else {
        handimag1.style.outline = "0";
        handimag1.style.color = "transparent";
        handCardKlicked1 = false;
    }
});

cardbtnhand2.addEventListener("mouseover", function() {
    handimag2.style.width = "9em";
    handimag2.style.height = "auto";

});

cardbtnhand2.addEventListener("mouseout", function() {
    handimag2.style.width = "7em";
    handimag2.style.height = "auto";

});
cardbtnhand2.addEventListener("click", function() {
    if(!handCardKlicked2) {
        handimag2.style.outline = "auto";
        handimag2.style.color = "#ed08e6";
        handimag2.style.borderStyle = "solid";
        handCardKlicked2 = true;

        handimag1.style.outline = "0";
        handimag1.style.color = "transparent";

        handimag3.style.outline = "0";
        handimag3.style.color = "transparent";

        handCardKlicked1, handCardKlicked3 = false;
    }
    else {
        handimag2.style.outline = "0";
        handimag2.style.color = "transparent";
        handCardKlicked2 = false;
    }
});

cardbtnhand3.addEventListener("mouseover", function() {
    handimag3.style.width = "9em";
    handimag3.style.height = "auto";

});

cardbtnhand3.addEventListener("mouseout", function() {
    handimag3.style.width = "7em";
    handimag3.style.height = "auto";

});

cardbtnhand3.addEventListener("click", function() {
    if(!handCardKlicked3) {
        handimag3.style.outline = "auto";
        handimag3.style.color = "#ed08e6";
        handimag3.style.borderStyle = "solid";
        handCardKlicked3 = true;

        handimag1.style.outline = "0";
        handimag1.style.color = "transparent";

        handimag2.style.outline = "0";
        handimag2.style.color = "transparent";

        handCardKlicked1, handCardKlicked2 = false;
    }
    else {
        handimag3.style.outline = "0";
        handimag3.style.color = "transparent";
        handCardKlicked3 = false;
    }
});
