
var cardfieldindex = -1;
var cardhandindex = -1;

$(document).ready(function () {
        getData().then(() => {
            updateInfoPanel();
            refreshOnClickEvents();
        })
    }
)

function resetGame() {

    let anotherCards1Div = document.getElementById("a-cards");
    let fieldCards1Div = document.getElementById("f-cards");
    let handCards1Div = document.getElementById("h-cards");
    let gameButtonsDiv = document.getElementById("gameButtons");
    let nameLabelDiv = document.getElementById("name-label");
    let anotherPlayerNameDiv = document.getElementById("another-name-label");

    anotherCards1Div.remove();
    fieldCards1Div.remove();
    handCards1Div.remove();
    gameButtonsDiv.remove();
    nameLabelDiv.remove();
    anotherPlayerNameDiv.remove();
}

//Game dara from controller
let data = {};

function getData() {
    return $.ajax({
        method: "GET",
        url: "/status",
        dataType: "json",
        success: function (response) {
            console.log("Success")
            console.log(data)
            data = response;
        }
    });
}

function changeAllCards() {
    resetGame()
    processCommand("all", "")
}

function changeOneCard() {

    let handCardIndex = cardhandindex;
    let fieldCardIndex = cardfieldindex;
    if (handCardIndex == -1 || fieldCardIndex == -1) return;
    let cardsToChange = handCardIndex.toString() + "G" +  fieldCardIndex.toString();

    resetGame()
    processCommand("y", cardsToChange)

    cardhandindex = -1;
    cardfieldindex = -1;
}

function knock() {
    resetGame()
    processCommand("k", "")
}

function setNextRound() {
    let nextRoundLabel = document.getElementById("nextRoundLabel");
    let nextRoundButtonDiv = document.getElementById("nextRoundButtonDiv");

    nextRoundLabel.remove();
    nextRoundButtonDiv.remove();
    processCommand("nr", "")
}

function undo() {
    processCommand("u", "")
}

function redo() {
    processCommand("z", "")
}

function saveGame() {
    processCommand("saveJson", "")
}

function loadGame(l) {
    processCommand("loadJson", "")
}

function setPlayerAmount() {
    const amount = $('#players').get(0).value;
    processCommand("amount", amount)
}

function setPlayerName() {
    const name = $('#playername').get(0).value;
    processCommand("addplayer", name)
}


// On Click Events
function refreshOnClickEvents() {
    $('#btn-amount').click(function () {
        setPlayerAmount()
    });
    $('#btn-name').click(function () {
        setPlayerName()
    });
    $('#tackall').click(function () {
        changeAllCards()
    });
    $('#changeoncard').click(function () {
        changeOneCard()
    });
    $('#knock').click(function () {
        knock()
    });
    $('#undo-click').click(function () {
        undo()
    });
    $('#redo-click').click(function () {
        redo()
    });
    $('#save-json').click(function () {
        saveGame()
    });
    $('#load-json').click(function () {
        loadGame()
    });
    $('#nextRound').click(function () {
        setNextRound()
    });

    let fieldCardKlicked1, fieldCardKlicked2, fieldCardKlicked3 = false;
    let handCardKlicked1, handCardKlicked2, handCardKlicked3 = false;

    var cardbtn1 = document.getElementsByClassName("cardbtn")[0]; // button 1
    var cardbtn2 = document.getElementsByClassName("cardbtn")[1]; // button 2
    var cardbtn3 = document.getElementsByClassName("cardbtn")[2]; // button 3

    let imag1 = document.getElementsByClassName("play-card")[0]; // image 1
    let imag2 = document.getElementsByClassName("play-card")[1]; // image 1
    let imag3 = document.getElementsByClassName("play-card")[2]; // image 1

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

    let cardbtnfield1 = document.getElementsByClassName("cardbtnfield")[0]; // fieldbutton 1
    let cardbtnfield2 = document.getElementsByClassName("cardbtnfield")[1]; // fieldbutton 2
    let cardbtnfield3 = document.getElementsByClassName("cardbtnfield")[2]; // fieldbutton 3

    let fieldimag1 = document.getElementsByClassName("play-card-field")[0]; // fieldimage 1
    let fieldimag2 = document.getElementsByClassName("play-card-field")[1]; // fieldimage 2
    let fieldimag3 = document.getElementsByClassName("play-card-field")[2]; // fieldimage 3

    cardbtnfield1.addEventListener("mouseover", function() {
        fieldimag1.style.width = "9em";
        fieldimag1.style.height = "auto";

    });

    cardbtnfield1.addEventListener("mouseout", function() {
        fieldimag1.style.width = "7em";
        fieldimag1.style.height = "auto";

    });

    cardbtnfield1.addEventListener("click", function() {
        cardfieldindex = 0;
        if(!fieldCardKlicked1) {
            fieldimag1.style.outline = "auto";
            fieldimag1.style.color = "#ed08e6";
            fieldimag1.style.borderStyle = "solid";
            fieldCardKlicked1 = true;

            fieldimag2.style.outline = "0";
            fieldimag2.style.color = "transparent";

            fieldimag3.style.outline = "0";
            fieldimag3.style.color = "transparent";

            fieldCardKlicked2 = false;
            fieldCardKlicked3 = false;

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
        cardfieldindex = 1;
        if(!fieldCardKlicked2) {
                fieldimag2.style.outline = "auto";
                fieldimag2.style.color = "#ed08e6";
                fieldimag2.style.borderStyle = "solid";
                fieldCardKlicked2 = true;

                fieldimag1.style.outline = "0";
                fieldimag1.style.color = "transparent";

                fieldimag3.style.outline = "0";
                fieldimag3.style.color = "transparent";

                fieldCardKlicked1 = false;
                fieldCardKlicked3 = false;
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
        cardfieldindex = 2;
        if(!fieldCardKlicked3) {
            fieldimag3.style.outline = "auto";
            fieldimag3.style.color = "#ed08e6";
            fieldimag3.style.borderStyle = "solid";
            fieldCardKlicked3 = true;

            fieldimag1.style.outline = "0";
            fieldimag1.style.color = "transparent";

            fieldimag2.style.outline = "0";
            fieldimag2.style.color = "transparent";

            fieldCardKlicked1 = false;
            fieldCardKlicked2 = false;
        }
        else {
            fieldimag3.style.outline = "0";
            fieldimag3.style.color = "transparent";
            fieldCardKlicked3 = false;
        }
    });

    /*--------------------Handcard-------------------------*/

    let cardbtnhand1 = document.getElementsByClassName("cardbtnhand")[0]; // handbutton 1
    let cardbtnhand2 = document.getElementsByClassName("cardbtnhand")[1]; // handbutton 2
    let cardbtnhand3 = document.getElementsByClassName("cardbtnhand")[2]; // handbutton 3

    let handimag1 = document.getElementsByClassName("play-card-hand")[0]; // handimage 1
    let handimag2 = document.getElementsByClassName("play-card-hand")[1]; // handimage 2
    let handimag3 = document.getElementsByClassName("play-card-hand")[2]; // handimage 3

    cardbtnhand1.addEventListener("mouseover", function() {
        handimag1.style.width = "9em";
        handimag1.style.height = "auto";

    });

    cardbtnhand1.addEventListener("mouseout", function() {
        handimag1.style.width = "7em";
        handimag1.style.height = "auto";

    });

    cardbtnhand1.addEventListener("click", function() {
        cardhandindex = 0;
        if(!handCardKlicked1) {
            handimag1.style.outline = "auto";
            handimag1.style.color = "#ed08e6";
            handimag1.style.borderStyle = "solid";
            handCardKlicked1 = true;

            handimag2.style.outline = "0";
            handimag2.style.color = "transparent";

            handimag3.style.outline = "0";
            handimag3.style.color = "transparent";

            handCardKlicked2 = false;
            handCardKlicked3 = false;
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
        cardhandindex = 1;
        if(!handCardKlicked2) {
            handimag2.style.outline = "auto";
            handimag2.style.color = "#ed08e6";
            handimag2.style.borderStyle = "solid";
            handCardKlicked2 = true;

            handimag1.style.outline = "0";
            handimag1.style.color = "transparent";

            handimag3.style.outline = "0";
            handimag3.style.color = "transparent";

            handCardKlicked1 = false;
            handCardKlicked3 = false;
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
        cardhandindex = 2;
        if(!handCardKlicked3) {
            handimag3.style.outline = "auto";
            handimag3.style.color = "#ed08e6";
            handimag3.style.borderStyle = "solid";
            handCardKlicked3 = true;

            handimag1.style.outline = "0";
            handimag1.style.color = "transparent";

            handimag2.style.outline = "0";
            handimag2.style.color = "transparent";

            handCardKlicked1 = false;
            handCardKlicked2 = false;
        }
        else {
            handimag3.style.outline = "0";
            handimag3.style.color = "transparent";
            handCardKlicked3 = false;
        }
    });

}

function post(method, url, data) {
    return $.ajax({
        method: method,
        url: url,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",

        success: function (response) {
            console.log("Success");
            data = response;
            console.log(data);
        },
        error: function (response) {
            console.log("Error")
            console.error(response);
            console.log(data)
        }
    });
}

function processCommand(cmd, data) {
    post("POST", "/command", {"cmd": cmd, "data": data}).then(() => {
        getData().then(() => {
            updateInfoPanel();
            refreshOnClickEvents();
        })
    })
}


let firstLabel = $('#first-label').get(0);
let secondLabel = $('#second-label').get(0);
let playerAmountInput = $('#players').get(0);
let amountButton = $('#amount-btn').get(0);
let navBar = $('#navbarSupportedContent').get(0);

let nameIput = "<input type=\"text\" autofocus=\"autofocus\" class=\"form-control iputs\" id=\"playername\" aria-describedby=\"emailHelp\" placeholder=\"Enter Name\">";

let userAddBtn = "<div class=\"col-4 col-sm-4\" id=\"name-button\"><button type=\"button\" id=\"btn-name\" class=\"btn btn-primary col-4 col-sm-4\" style=\"margin-top: 2rem; margin-left: 15em;\">Ok</button></div>";

let anotherCards = "<div class=\"row\" id=\"a-cards\" style=\"margin-bottom: 1rem\">\n" +
          "                                  <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
          "                                  <div class=\"col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol\">\n" +
          "                                      <div class=\"classcardcenter\">\n" +
          "                                             <button class=\"cardbtn\" type=\"button\" id=\"cardbutton\">\n" +
          "                                                 <img class=\"play-card\" id=\"dragoncard\" src=\"assets/images/dragon1.png\" alt=\"card background\" />\n" +
          "                                             </button>\n" +
          "                                             <button class=\"cardbtn\" type=\"button\" id=\"cardbutton\">\n" +
          "                                                 <img class=\"play-card\" id=\"dragoncard\" src=\"assets/images/dragon1.png\" alt=\"card background\" />\n" +
          "                                             </button>\n" +
          "                                             <button class=\"cardbtn\" type=\"button\" id=\"cardbutton\">\n" +
          "                                                 <img class=\"play-card\" id=\"dragoncard\" src=\"assets/images/dragon1.png\" alt=\"card background\" />\n" +
          "                                             </button>\n" +
          "                                      </div>\n" +
          "                                  </div>\n" +
          "                                  <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
          "                              </div>"


let gameButtons = "<div class=\"row\" id=\"gameButtons\">\n" +
                  "                     <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
                  "                     <div class=\"col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol\">\n" +
                  "                         <div class=\"classcardcenter\">\n" +
                  "                             <button type=\"button\"  id=\"changeoncard\" class=\"btn btn-primary buttonstyle btn-change-one\">Change Card</button>\n" +
                  "                             <button type=\"button\"  id=\"tackall\" class=\"btn btn-primary buttonstyle btn-change-all\">Take All</button>\n" +
                  "                             <button type=\"button\"  id=\"knock\" class=\"btn btn-primary buttonstyle btn-knock\">Knock</button>\n" +
                  "                         </div>\n" +
                  "                     </div>\n" +
                  "                     <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
                  "                 </div>"

function updateInfoPanel() {

    let game_stat = data.getGameState;

    console.log(game_stat);
    console.log(data);
    console.log(gameBody);


    if (game_stat.includes("type your name")) {

        firstLabel.innerHTML = `<h2 class="h2">${data.getGameState}</h2>`;
        secondLabel.innerHTML = "";
        playerAmountInput.outerHTML = nameIput;
        amountButton.innerHTML = userAddBtn;

    } else if (game_stat.includes("its your turn")) {

        let gameBody = $('#gameBody').get(0);

        var fieldCards1 = "<div class=\"row\" id=\"f-cards\" style=\"margin-bottom: 1rem\">\n" +
                          "                                <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
                          "                               <div class=\"col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol\">\n" +
                          "                                   <div class=\"classcardcenter\">\n"

        var handCards1 = "<div class=\"row\" id=\"h-cards\" style=\"margin-bottom: 1rem\">\n" +
                          "                                <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
                          "                               <div class=\"col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol\">\n" +
                          "                                   <div class=\"classcardcenter\">\n"

        let playerNameLabel =    `<div class="row" id="name-label"><div class="col-5"></div><div class="col-2 classcol"><h1 class="playernamecenter">${data.player_name.player_name}</h1></div><div class="col-5"></div></div>`;
        let anotherPlayerName =  `<div class="row" id="another-name-label"><div class="col-5"></div><div class="col-2 classcol"><h1 class="playernamecenter" style="margin-bottom: 0.5em;">Another Player</h1></div><div class="col-5"></div></div>`;


        $(document).ready(function() {
            $("#playername").remove();
            $("#name-button").remove();
            $("#help").remove();
        });
        let fieldCards = data.gamecards.field_cards;
        let handCards = data.gamecards.player_cards;

         for (let i = 0; i < fieldCards.length; i++) {

             if (fieldCards[i][1] === "spade") {
                 fieldCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                 if (fieldCards[i][0] === "7") {
                      fieldCards1 += "<img src=\"assets/images/7_of_spades.png\" alt=\"7_of_spades\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] === "8") {
                       fieldCards1 += "<img src=\"assets/images/8_of_spades.png\" alt=\"8_of_spades\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] === "9") {
                       fieldCards1 += "<img src=\"assets/images/9_of_spades.png\" alt=\"9_of_spades\" class=\"play-card-field\" />\n";
                 }
                  else if(fieldCards[i][0] === "10") {
                       fieldCards1 += "<img src=\"assets/images/10_of_spades.png\" alt=\"10_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "jack") {
                       fieldCards1 += "<img src=\"assets/images/jack_of_spades.png\" alt=\"jack_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "queen") {
                       fieldCards1 += "<img src=\"assets/images/queen_of_spades.png\" alt=\"queen_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "king") {
                       fieldCards1 += "<img src=\"assets/images/king_of_spades.png\" alt=\"king_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "ace") {
                       fieldCards1 += "<img src=\"assets/images/ace_of_spades.png\" alt=\"ace_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else {
                     fieldCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                  }
                  fieldCards1 += "</button>\n";
             }
             else if (fieldCards[i][1] === "heart") {
                 fieldCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                 if (fieldCards[i][0] === "7") {
                      fieldCards1 += "<img src=\"assets/images/7_of_hearts.png\" alt=\"7_of_hearts\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] === "8") {
                       fieldCards1 += "<img src=\"assets/images/8_of_hearts.png\" alt=\"8_of_hearts\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] === "9") {
                       fieldCards1 += "<img src=\"assets/images/9_of_hearts.png\" alt=\"9_of_hearts\" class=\"play-card-field\" />\n";
                 }
                  else if(fieldCards[i][0] === "10") {
                       fieldCards1 += "<img src=\"assets/images/10_of_hearts.png\" alt=\"10_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "jack") {
                       fieldCards1 += "<img src=\"assets/images/jack_of_hearts.png\" alt=\"jack_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "queen") {
                       fieldCards1 += "<img src=\"assets/images/queen_of_hearts.png\" alt=\"queen_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "king") {
                       fieldCards1 += "<img src=\"assets/images/king_of_hearts.png\" alt=\"king_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "ace") {
                       fieldCards1 += "<img src=\"assets/images/ace_of_hearts.png\" alt=\"ace_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else {
                       fieldCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                  }
                  fieldCards1 += "</button>\n";
             }

             else if (fieldCards[i][1] === "diamond") {
                 fieldCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                 if (fieldCards[i][0] === "7") {
                      fieldCards1 += "<img src=\"assets/images/7_of_diamonds.png\" alt=\"7_of_diamonds\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] === "8") {
                       fieldCards1 += "<img src=\"assets/images/8_of_diamonds.png\" alt=\"8_of_diamonds\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] === "9") {
                       fieldCards1 += "<img src=\"assets/images/9_of_diamonds.png\" alt=\"9_of_diamonds\" class=\"play-card-field\" />\n";
                 }
                  else if(fieldCards[i][0] === "10") {
                       fieldCards1 += "<img src=\"assets/images/10_of_diamonds.png\" alt=\"10_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "jack") {
                       fieldCards1 += "<img src=\"assets/images/jack_of_diamonds.png\" alt=\"jack_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "queen") {
                       fieldCards1 += "<img src=\"assets/images/queen_of_diamonds.png\" alt=\"queen_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "king") {
                       fieldCards1 += "<img src=\"assets/images/king_of_diamonds.png\" alt=\"king_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "ace") {
                       fieldCards1 += "<img src=\"assets/images/ace_of_diamonds.png\" alt=\"ace_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else {
                       fieldCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                  }
                  fieldCards1 += "</button>\n";
             }
             else if (fieldCards[i][1] === "club") {
                 fieldCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                 if (fieldCards[i][0] === "7") {
                      fieldCards1 += "<img src=\"assets/images/7_of_clubs.png\" alt=\"7_of_clubs\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] === "8") {
                       fieldCards1 += "<img src=\"assets/images/8_of_clubs.png\" alt=\"8_of_clubs\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] === "9") {
                       fieldCards1 += "<img src=\"assets/images/9_of_clubs.png\" alt=\"9_of_clubs\" class=\"play-card-field\" />\n";
                 }
                  else if(fieldCards[i][0] === "10") {
                       fieldCards1 += "<img src=\"assets/images/10_of_clubs.png\" alt=\"10_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "jack") {
                       fieldCards1 += "<img src=\"assets/images/jack_of_clubs.png\" alt=\"jack_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "queen") {
                       fieldCards1 += "<img src=\"assets/images/queen_of_clubs.png\" alt=\"queen_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "king") {
                       fieldCards1 += "<img src=\"assets/images/king_of_clubs.png\" alt=\"king_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] === "ace") {
                       fieldCards1 += "<img src=\"assets/images/ace_of_clubs.png\" alt=\"ace_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else {
                       fieldCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                  }
                  fieldCards1 += "</button>\n";
             }
             else {
                 console.log("FieldCardError");
             }
         }
         for (let i = 0; i < handCards.length; i++) {

              if (handCards[i][1] === "spade") {
                  handCards1 += "<button class=\"cardbtnhand\" type=\"button\">\n";
                  if (handCards[i][0] === "7") {
                       handCards1 += "<img src=\"assets/images/7_of_spades.png\" alt=\"7_of_spades\" class=\"play-card-hand\" />\n";
                  }
                  else if(handCards[i][0] === "8") {
                        handCards1 += "<img src=\"assets/images/8_of_spades.png\" alt=\"8_of_spades\" class=\"play-card-hand\" />\n";
                  }
                  else if(handCards[i][0] === "9") {
                        handCards1 += "<img src=\"assets/images/9_of_spades.png\" alt=\"9_of_spades\" class=\"play-card-hand\" />\n";
                  }
                   else if(handCards[i][0] === "10") {
                        handCards1 += "<img src=\"assets/images/10_of_spades.png\" alt=\"10_of_spades\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "jack") {
                        handCards1 += "<img src=\"assets/images/jack_of_spades.png\" alt=\"jack_of_spades\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "queen") {
                        handCards1 += "<img src=\"assets/images/queen_of_spades.png\" alt=\"queen_of_spades\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "king") {
                        handCards1 += "<img src=\"assets/images/king_of_spades.png\" alt=\"king_of_spades\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "ace") {
                        handCards1 += "<img src=\"assets/images/ace_of_spades.png\" alt=\"ace_of_spades\" class=\"play-card-hand\" />\n";
                   }
                   else {
                      handCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                   }
                   handCards1 += "</button>\n";
              }
              else if (handCards[i][1] === "heart") {
                  handCards1 += "<button class=\"cardbtnhand\" type=\"button\">\n";
                  if (handCards[i][0] === "7") {
                       handCards1 += "<img src=\"assets/images/7_of_hearts.png\" alt=\"7_of_hearts\" class=\"play-card-hand\" />\n";
                  }
                  else if(handCards[i][0] === "8") {
                        handCards1 += "<img src=\"assets/images/8_of_hearts.png\" alt=\"8_of_hearts\" class=\"play-card-hand\" />\n";
                  }
                  else if(handCards[i][0] === "9") {
                        handCards1 += "<img src=\"assets/images/9_of_hearts.png\" alt=\"9_of_hearts\" class=\"play-card-hand\" />\n";
                  }
                   else if(handCards[i][0] === "10") {
                        handCards1 += "<img src=\"assets/images/10_of_hearts.png\" alt=\"10_of_hearts\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "jack") {
                        handCards1 += "<img src=\"assets/images/jack_of_hearts.png\" alt=\"jack_of_hearts\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "queen") {
                        handCards1 += "<img src=\"assets/images/queen_of_hearts.png\" alt=\"queen_of_hearts\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "king") {
                        handCards1 += "<img src=\"assets/images/king_of_hearts.png\" alt=\"king_of_hearts\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "ace") {
                        handCards1 += "<img src=\"assets/images/ace_of_hearts.png\" alt=\"ace_of_hearts\" class=\"play-card-hand\" />\n";
                   }
                   else {
                        handCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                   }
                   handCards1 += "</button>\n";
              }

              else if (handCards[i][1] === "diamond") {
                  handCards1 += "<button class=\"cardbtnhand\" type=\"button\">\n";
                  if (handCards[i][0] === "7") {
                       handCards1 += "<img src=\"assets/images/7_of_diamonds.png\" alt=\"7_of_diamonds\" class=\"play-card-hand\" />\n";
                  }
                  else if(handCards[i][0] === "8") {
                        handCards1 += "<img src=\"assets/images/8_of_diamonds.png\" alt=\"8_of_diamonds\" class=\"play-card-hand\" />\n";
                  }
                  else if(handCards[i][0] === "9") {
                        handCards1 += "<img src=\"assets/images/9_of_diamonds.png\" alt=\"9_of_diamonds\" class=\"play-card-hand\" />\n";
                  }
                   else if(handCards[i][0] === "10") {
                        handCards1 += "<img src=\"assets/images/10_of_diamonds.png\" alt=\"10_of_diamonds\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "jack") {
                        handCards1 += "<img src=\"assets/images/jack_of_diamonds.png\" alt=\"jack_of_diamonds\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "queen") {
                        handCards1 += "<img src=\"assets/images/queen_of_diamonds.png\" alt=\"queen_of_diamonds\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "king") {
                        handCards1 += "<img src=\"assets/images/king_of_diamonds.png\" alt=\"king_of_diamonds\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "ace") {
                        handCards1 += "<img src=\"assets/images/ace_of_diamonds.png\" alt=\"ace_of_diamonds\" class=\"play-card-hand\" />\n";
                   }
                   else {
                        handCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                   }
                   handCards1 += "</button>\n";
              }
              else if (handCards[i][1] === "club") {
                  handCards1 += "<button class=\"cardbtnhand\" type=\"button\">\n";
                  if (handCards[i][0] === "7") {
                       handCards1 += "<img src=\"assets/images/7_of_clubs.png\" alt=\"7_of_clubs\" class=\"play-card-hand\" />\n";
                  }
                  else if(handCards[i][0] === "8") {
                        handCards1 += "<img src=\"assets/images/8_of_clubs.png\" alt=\"8_of_clubs\" class=\"play-card-hand\" />\n";
                  }
                  else if(handCards[i][0] === "9") {
                        handCards1 += "<img src=\"assets/images/9_of_clubs.png\" alt=\"9_of_clubs\" class=\"play-card-hand\" />\n";
                  }
                   else if(handCards[i][0] === "10") {
                        handCards1 += "<img src=\"assets/images/10_of_clubs.png\" alt=\"10_of_clubs\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "jack") {
                        handCards1 += "<img src=\"assets/images/jack_of_clubs.png\" alt=\"jack_of_clubs\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "queen") {
                        handCards1 += "<img src=\"assets/images/queen_of_clubs.png\" alt=\"queen_of_clubs\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "king") {
                        handCards1 += "<img src=\"assets/images/king_of_clubs.png\" alt=\"king_of_clubs\" class=\"play-card-hand\" />\n";
                   }
                   else if(handCards[i][0] === "ace") {
                        handCards1 += "<img src=\"assets/images/ace_of_clubs.png\" alt=\"ace_of_clubs\" class=\"play-card-hand\" />\n";
                   }
                   else {
                        handCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                   }
                   handCards1 += "</button>\n";
              }
              else {
                  console.log("HandCardError");
              }
          }
         fieldCards1 += "       </div>\n" +
                     "                       </div>"
         handCards1 += "       </div>\n" +
                              "                       </div>"
         firstLabel.innerHTML = "";

         gameBody.innerHTML = gameBody.innerHTML + anotherPlayerName;
         gameBody.innerHTML = gameBody.innerHTML + anotherCards;
         gameBody.innerHTML = gameBody.innerHTML + fieldCards1;
         gameBody.innerHTML = gameBody.innerHTML + handCards1;
         gameBody.innerHTML = gameBody.innerHTML + playerNameLabel;
         gameBody.innerHTML = gameBody.innerHTML + gameButtons;


    }
    else if (game_stat.includes("start next round with(nr)")) {
        let nextRound = `<h2 class="h2" id="nextRoundLabel">${data.getGameState}</h2>`;
        let nextRoundButton = "<div class=\"row\" id=\"nextRoundButtonDiv\">\n" +
                              "    <div class=\"col-4 col-sm-5\"></div>\n" +
                              "    <button type=\"button\" id=\"nextRound\" class=\"btn btn-primary buttonstyle col-4 col-sm-2\">Start next Round</button>\n" +
                              "    <div class=\"col-4 col-sm-5\"></div>\n" +
                              " </div>"
        gameBody.innerHTML = gameBody.innerHTML + nextRound;
        gameBody.innerHTML = gameBody.innerHTML + nextRoundButton;

    }
}
