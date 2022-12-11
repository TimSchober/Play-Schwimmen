let websocket = new WebSocket("ws://localhost:9000/websocket")

$(document).ready(function () {
        connectWebSocket();
    }
)

function connectWebSocket() {

    websocket.onopen = function(event) {
        console.log("opening connection to Websocket")
        websocket.send("opening connection")
    }

    websocket.onclose = function () {
        console.log("Closed connection to Websocket")
    }

    websocket.onerror = function (error) {
        console.log("Websocket caused error: " + error)
    }

    websocket.onmessage = function (e) {
        console.log("message received");
        if (typeof e.data === "string") {
            console.log(e.data)
            let json = JSON.parse(e.data)
            updateInfoPanel(json);
            refreshOnClickEvents();
        }
    }
}

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

function changeAllCards() {
    resetGame()
    websocket.send("{ \"cmd\": \"all\", \"data\": \"\" }")
}

let cardfieldindex = -1;
let cardhandindex = -1;

function changeOneCard() {

    let handCardIndex = cardhandindex;
    let fieldCardIndex = cardfieldindex;
    if (handCardIndex === -1 || fieldCardIndex === -1) return;
    let cardsToChange = handCardIndex.toString() + "G" +  fieldCardIndex.toString();

    resetGame()
    websocket.send("{ \"cmd\": \"y\", \"data\": \"" + cardsToChange + "\" }")

    cardhandindex = -1;
    cardfieldindex = -1;
}

function knock() {
    resetGame()
    websocket.send("{ \"cmd\": \"k\", \"data\": \"\" }")
}

function setNextRound() {
    let nextRoundLabel = document.getElementById("nextRoundLabel");
    let nextRoundButtonDiv = document.getElementById("nextRoundButtonDiv");

    nextRoundLabel.remove();
    nextRoundButtonDiv.remove();
    websocket.send("{ \"cmd\": \"nr\", \"data\": \"\" }")
}

function undo() {
    websocket.send("{ \"cmd\": \"u\", \"data\": \"\" }")
}

function redo() {
    websocket.send("{ \"cmd\": \"z\", \"data\": \"\" }")
}

function saveGame() {
    websocket.send("{ \"cmd\": \"saveJson\", \"data\": \"\" }")
}

function loadGame(l) {
    websocket.send("{ \"cmd\": \"loadJson\", \"data\": \"\" }")
}

function setPlayerAmount() {
    const amount = $('#players').get(0).value;
    websocket.send("{ \"cmd\": \"amount\", \"data\": " + amount + " }")
}

function setPlayerName() {
    const name = $('#playername').get(0).value;
    websocket.send("{ \"cmd\": \"addplayer\", \"data\": \"" + name + "\" }")
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

    let cardbtn1 = document.getElementsByClassName("cardbtn")[0]; // button 1
    let cardbtn2 = document.getElementsByClassName("cardbtn")[1]; // button 2
    let cardbtn3 = document.getElementsByClassName("cardbtn")[2]; // button 3

    let imag1 = document.getElementsByClassName("play-card")[0]; // image 1
    let imag2 = document.getElementsByClassName("play-card")[1]; // image 1
    let imag3 = document.getElementsByClassName("play-card")[2]; // image 1

    // Erster Button
    cardbtn1.addEventListener("mouseover", function() {
        imag1.style.width = "9em";
        imag1.style.height = "auto";
    });
    cardbtn1.addEventListener("mouseout", function() {
        imag1.style.width = "7em";
        imag1.style.height = "auto";
    });

    // Zweiter Button
    cardbtn2.addEventListener("mouseover", function() {
        imag2.style.width = "9em";
        imag2.style.height = "auto";
    });
    cardbtn2.addEventListener("mouseout", function() {
        imag2.style.width = "7em";
        imag2.style.height = "auto";
    });

    // Dritter Button
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

let firstLabel = $('#first-label').get(0);
let secondLabel = $('#second-label').get(0);
let playerAmountInput = $('#pl_am_name_textfield').get(0);
let amountButton = $('#amount-btn').get(0);
let navBar = $('#navbarSupportedContent').get(0);

let nameInput = "<input type=\"text\" autofocus=\"autofocus\" class=\"form-control iputs\" id=\"playername\" aria-describedby=\"emailHelp\" placeholder=\"Enter Name\">";
let amountInput = "<input type=\"number\" id=\"players\" autofocus=\"autofocus\" class=\"form-control iputs\" min=\"2\" max=\"9\" aria-describedby=\"emailHelp\" placeholder=\"Enter player amount (for up to 2-9 Players)\"/>"

let userAddBtn = "<div class=\"col-4 col-sm-4\" id=\"name-button\"><button type=\"button\" id=\"btn-name\" class=\"btn btn-primary col-4 col-sm-4\" style=\"margin-top: 2rem; margin-left: 15em;\">Ok</button></div>";
let userAmountBtn = "<div class=\"col-4 col-sm-4\" id=\"name-button\"><button type=\"button\" id=\"btn-amount\" class=\"btn btn-primary col-4 col-sm-4\" style=\"margin-top: 2rem; margin-left: 15em;\">Ok</button></div>";


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

function updateInfoPanel(data) {

    let game_states = data.game_state.game_state;

    console.log(data);
    console.log(gameBody);
    console.log("I'm here ... ")

    if (game_states.includes("no_player_amount")) {

        firstLabel.innerHTML = '<h2 class="h2">Welcome to Schwimmen! How many players want to play?</h2>';
        secondLabel.innerHTML = '<label class="label2gamestat1" id="second-label">Possible player amount is 2-9</label>';
        playerAmountInput.innerHTML = amountInput;
        amountButton.innerHTML = userAmountBtn;

    } else if (game_states.includes("not_enough_players")) {

        firstLabel.innerHTML = `<h2 class="h2">Type your Name:</h2>`;
        secondLabel.innerHTML = "";
        playerAmountInput.innerHTML = nameInput;
        amountButton.innerHTML = userAddBtn;

    } else if (game_states.includes("game_running")) {

        let gameBody = $('#gameBody').get(0);

        let fieldCards1 = "<div class=\"row\" id=\"f-cards\" style=\"margin-bottom: 1rem\">\n" +
                          "                                <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
                          "                               <div class=\"col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol\">\n" +
                          "                                   <div class=\"classcardcenter\">\n"

        let handCards1 = "<div class=\"row\" id=\"h-cards\" style=\"margin-bottom: 1rem\">\n" +
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
        let fieldCards = data.game_cards.field_cards;
        let handCards = data.game_cards.player_cards;

        for (let i = 0; i < fieldCards.length; i++) {
            fieldCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
            fieldCards1 += "<img src=\"assets/images/" + fieldCards[i][0] + "_of_" + fieldCards[i][1] + "s.png\" alt=\"" + fieldCards[i][0] + "_of_" + fieldCards[i][1] + "s\" class=\"play-card-field\" />\n";
            fieldCards1 += "</button>\n";
        }

        for (let i = 0; i < handCards.length; i++) {
            handCards1 += "<button class=\"cardbtnhand\" type=\"button\">\n";
            handCards1 += "<img src=\"assets/images/" + handCards[i][0] + "_of_" + handCards[i][1] + "s.png\" alt=\"" + handCards[i][0] + "_of_" + handCards[i][1] + "s\" class=\"play-card-hand\" />\n";
            handCards1 += "</button>\n";
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

    } else if (game_states.includes("game_ended")) {
        let nextRound = `<h2 class="h2" id="nextRoundLabel">Game Ended</h2>`;
        let nextRoundButton = "<div class=\"row\" id=\"nextRoundButtonDiv\">\n" +
                              "    <div class=\"col-4 col-sm-5\"></div>\n" +
                              "    <button type=\"button\" id=\"nextRound\" class=\"btn btn-primary buttonstyle col-4 col-sm-2\">Start next Round</button>\n" +
                              "    <div class=\"col-4 col-sm-5\"></div>\n" +
                              " </div>"
        gameBody.innerHTML = gameBody.innerHTML + nextRound;
        gameBody.innerHTML = gameBody.innerHTML + nextRoundButton;
    }
}
