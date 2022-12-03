$(document).ready(function () {
        getData().then(() => {
            updateInfoPanel();
            refreshOnClickEvents();
        })
    }
)

//Game dara from controller
let data = {};

function getData() {
    return $.ajax({
        method: "GET",
        url: "/status",
        dataType: "json",
        success: function (response) {
            data = response;
        }
    });
}

function changeAllCards() {
    processCommand("all", "")
}

function knock() {
    processCommand("k", "")
}

function setNextRound() {
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
let gameBody = $('#gameBody').get(0);

let nameIput = "<input type=\"text\" autofocus=\"autofocus\" class=\"form-control iputs\" id=\"playername\" aria-describedby=\"emailHelp\" placeholder=\"Enter Name\">";

let userAddBtn = "<div class=\"col-4 col-sm-4\" id=\"name-button\"><button type=\"button\" id=\"btn-name\" class=\"btn btn-primary col-4 col-sm-4\" style=\"margin-top: 2rem\">Ok</button></div>";

let anotherCards = "<div class=\"row\" style=\"margin-bottom: 1rem\">\n" +
          "                                  <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
          "                                  <div class=\"col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol\">\n" +
          "                                      <div class=\"classcardcenter\">\n" +
          "                                             <button class=\"cardbtn\" type=\"button\" id=\"cardbutton\">\n" +
          "                                                 <img class=\"play-card\" id=\"dragoncard\" src=\"assets/images/dragon1.png\" alt=\"card background\" />\n" +
          "                                                 <img class=\"play-card\" id=\"dragoncard\" src=\"assets/images/dragon1.png\" alt=\"card background\" />\n" +
          "                                                 <img class=\"play-card\" id=\"dragoncard\" src=\"assets/images/dragon1.png\" alt=\"card background\" />\n" +
          "                                             </button>\n" +
          "                                      </div>\n" +
          "                                  </div>\n" +
          "                                  <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
          "                              </div>"


var fieldCards1 = "<div class=\"row\" style=\"margin-bottom: 1rem\">\n" +
                  "                                <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
                  "                               <div class=\"col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol\">\n" +
                  "                                   <div class=\"classcardcenter\">\n"

var handCards1 = "<div class=\"row\" style=\"margin-bottom: 1rem\">\n" +
                  "                                <div class=\"col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4\"></div>\n" +
                  "                               <div class=\"col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol\">\n" +
                  "                                   <div class=\"classcardcenter\">\n"

var gameButtons = "<div class=\"row\">\n" +
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

    if (game_stat === "\nPlayer 1, type your name:"
        || game_stat === "\nPlayer 2, type your name:"
        || game_stat === "\nPlayer 3, type your name:"
        || game_stat === "\nPlayer 4, type your name:"
        || game_stat === "\nPlayer 5, type your name:"
        || game_stat === "\nPlayer 6, type your name:"
        || game_stat === "\nPlayer 7, type your name:"
        || game_stat === "\nPlayer 8, type your name:"
        || game_stat === "\nPlayer 9, type your name:") {

        firstLabel.innerHTML = `<h2 class="h2">${data.getGameState}</h2>`;
        secondLabel.innerHTML = "";
        playerAmountInput.outerHTML = nameIput;
        amountButton.innerHTML = userAddBtn;

    } else if (game_stat.includes("its your turn")) {
        fieldCards1.innerHTML = "";
        handCards1.innerHTML = "";
        $(document).ready(function() {
            $("#playername").remove();
            $("#name-button").remove();
        });

        let fieldCards = data.gamecards.field_cards;
        let handCards = data.gamecards.player_cards;

         for (i = 0; i < fieldCards.length; i++) {

             if (fieldCards[i][1] == "spade") {
                 fieldCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                 if (fieldCards[i][0] == "7") {
                      fieldCards1 += "<img src=\"assets/images/7_of_spades.png\" alt=\"7_of_spades\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] == "8") {
                       fieldCards1 += "<img src=\"assets/images/8_of_spades.png\" alt=\"8_of_spades\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] == "9") {
                       fieldCards1 += "<img src=\"assets/images/9_of_spades.png\" alt=\"9_of_spades\" class=\"play-card-field\" />\n";
                 }
                  else if(fieldCards[i][0] == "10") {
                       fieldCards1 += "<img src=\"assets/images/10_of_spades.png\" alt=\"10_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "jack") {
                       fieldCards1 += "<img src=\"assets/images/jack_of_spades.png\" alt=\"jack_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "queen") {
                       fieldCards1 += "<img src=\"assets/images/queen_of_spades.png\" alt=\"queen_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "king") {
                       fieldCards1 += "<img src=\"assets/images/king_of_spades.png\" alt=\"king_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "ace") {
                       fieldCards1 += "<img src=\"assets/images/ace_of_spades.png\" alt=\"ace_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else {
                     fieldCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                  }
                  fieldCards1 += "</button>\n";
             }
             else if (fieldCards[i][1] == "heart") {
                 fieldCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                 if (data.gamecards.field_cards[i][0] == "7") {
                      fieldCards1 += "<img src=\"assets/images/7_of_hearts.png\" alt=\"7_of_hearts\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] == "8") {
                       fieldCards1 += "<img src=\"assets/images/8_of_hearts.png\" alt=\"8_of_hearts\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] == "9") {
                       fieldCards1 += "<img src=\"assets/images/9_of_hearts.png\" alt=\"9_of_hearts\" class=\"play-card-field\" />\n";
                 }
                  else if(fieldCards[i][0] == "10") {
                       fieldCards1 += "<img src=\"assets/images/10_of_hearts.png\" alt=\"10_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "jack") {
                       fieldCards1 += "<img src=\"assets/images/jack_of_hearts.png\" alt=\"jack_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "queen") {
                       fieldCards1 += "<img src=\"assets/images/queen_of_hearts.png\" alt=\"queen_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "king") {
                       fieldCards1 += "<img src=\"assets/images/king_of_hearts.png\" alt=\"king_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "ace") {
                       fieldCards1 += "<img src=\"assets/images/ace_of_hearts.png\" alt=\"ace_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else {
                       fieldCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                  }
                  fieldCards1 += "</button>\n";
             }

             else if (fieldCards[i][1] == "diamond") {
                 fieldCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                 if (fieldCards[i][0] == "7") {
                      fieldCards1 += "<img src=\"assets/images/7_of_diamonds.png\" alt=\"7_of_diamonds\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] == "8") {
                       fieldCards1 += "<img src=\"assets/images/8_of_diamonds.png\" alt=\"8_of_diamonds\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] == "9") {
                       fieldCards1 += "<img src=\"assets/images/9_of_diamonds.png\" alt=\"9_of_diamonds\" class=\"play-card-field\" />\n";
                 }
                  else if(fieldCards[i][0] == "10") {
                       fieldCards1 += "<img src=\"assets/images/10_of_diamonds.png\" alt=\"10_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "jack") {
                       fieldCards1 += "<img src=\"assets/images/jack_of_diamonds.png\" alt=\"jack_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "queen") {
                       fieldCards1 += "<img src=\"assets/images/queen_of_diamonds.png\" alt=\"queen_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "king") {
                       fieldCards1 += "<img src=\"assets/images/king_of_diamonds.png\" alt=\"king_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "ace") {
                       fieldCards1 += "<img src=\"assets/images/ace_of_diamonds.png\" alt=\"ace_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else {
                       fieldCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                  }
                  fieldCards1 += "</button>\n";
             }
             else if (fieldCards[i][1] == "club") {
                 fieldCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                 if (fieldCards[i][0] == "7") {
                      fieldCards1 += "<img src=\"assets/images/7_of_clubs.png\" alt=\"7_of_clubs\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] == "8") {
                       fieldCards1 += "<img src=\"assets/images/8_of_clubs.png\" alt=\"8_of_clubs\" class=\"play-card-field\" />\n";
                 }
                 else if(fieldCards[i][0] == "9") {
                       fieldCards1 += "<img src=\"assets/images/9_of_clubs.png\" alt=\"9_of_clubs\" class=\"play-card-field\" />\n";
                 }
                  else if(fieldCards[i][0] == "10") {
                       fieldCards1 += "<img src=\"assets/images/10_of_clubs.png\" alt=\"10_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "jack") {
                       fieldCards1 += "<img src=\"assets/images/jack_of_clubs.png\" alt=\"jack_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "queen") {
                       fieldCards1 += "<img src=\"assets/images/queen_of_clubs.png\" alt=\"queen_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "king") {
                       fieldCards1 += "<img src=\"assets/images/king_of_clubs.png\" alt=\"king_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "ace") {
                       fieldCards1 += "<img src=\"assets/images/ace_of_clubs.png\" alt=\"ace_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else {
                       fieldCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                  }
                  fieldCards1 += "</button>\n";
             }
             else {
                 console.log("FieldCardErorr");
             }
         }
         for (i = 0; i < fieldCards.length; i++) {

              if (handCards[i][1] == "spade") {
                  handCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                  if (handCards[i][0] == "7") {
                       handCards1 += "<img src=\"assets/images/7_of_spades.png\" alt=\"7_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(handCards[i][0] == "8") {
                        handCards1 += "<img src=\"assets/images/8_of_spades.png\" alt=\"8_of_spades\" class=\"play-card-field\" />\n";
                  }
                  else if(handCards[i][0] == "9") {
                        handCards1 += "<img src=\"assets/images/9_of_spades.png\" alt=\"9_of_spades\" class=\"play-card-field\" />\n";
                  }
                   else if(handCards[i][0] == "10") {
                        handCards1 += "<img src=\"assets/images/10_of_spades.png\" alt=\"10_of_spades\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "jack") {
                        handCards1 += "<img src=\"assets/images/jack_of_spades.png\" alt=\"jack_of_spades\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "queen") {
                        handCards1 += "<img src=\"assets/images/queen_of_spades.png\" alt=\"queen_of_spades\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "king") {
                        handCards1 += "<img src=\"assets/images/king_of_spades.png\" alt=\"king_of_spades\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "ace") {
                        handCards1 += "<img src=\"assets/images/ace_of_spades.png\" alt=\"ace_of_spades\" class=\"play-card-field\" />\n";
                   }
                   else {
                      handCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                   }
                   handCards1 += "</button>\n";
              }
              else if (handCards[i][1] == "heart") {
                  handCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                  if (handCards[i][0] == "7") {
                       handCards1 += "<img src=\"assets/images/7_of_hearts.png\" alt=\"7_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(handCards[i][0] == "8") {
                        handCards1 += "<img src=\"assets/images/8_of_hearts.png\" alt=\"8_of_hearts\" class=\"play-card-field\" />\n";
                  }
                  else if(handCards[i][0] == "9") {
                        handCards1 += "<img src=\"assets/images/9_of_hearts.png\" alt=\"9_of_hearts\" class=\"play-card-field\" />\n";
                  }
                   else if(handCards[i][0] == "10") {
                        handCards1 += "<img src=\"assets/images/10_of_hearts.png\" alt=\"10_of_hearts\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "jack") {
                        handCards1 += "<img src=\"assets/images/jack_of_hearts.png\" alt=\"jack_of_hearts\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "queen") {
                        handCards1 += "<img src=\"assets/images/queen_of_hearts.png\" alt=\"queen_of_hearts\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "king") {
                        handCards1 += "<img src=\"assets/images/king_of_hearts.png\" alt=\"king_of_hearts\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "ace") {
                        handCards1 += "<img src=\"assets/images/ace_of_hearts.png\" alt=\"ace_of_hearts\" class=\"play-card-field\" />\n";
                   }
                   else {
                        handCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                   }
                   handCards1 += "</button>\n";
              }

              else if (handCards[i][1] == "diamond") {
                  handCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                  if (handCards[i][0] == "7") {
                       handCards1 += "<img src=\"assets/images/7_of_diamonds.png\" alt=\"7_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(handCards[i][0] == "8") {
                        handCards1 += "<img src=\"assets/images/8_of_diamonds.png\" alt=\"8_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                  else if(handCards[i][0] == "9") {
                        handCards1 += "<img src=\"assets/images/9_of_diamonds.png\" alt=\"9_of_diamonds\" class=\"play-card-field\" />\n";
                  }
                   else if(handCards[i][0] == "10") {
                        handCards1 += "<img src=\"assets/images/10_of_diamonds.png\" alt=\"10_of_diamonds\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "jack") {
                        handCards1 += "<img src=\"assets/images/jack_of_diamonds.png\" alt=\"jack_of_diamonds\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "queen") {
                        handCards1 += "<img src=\"assets/images/queen_of_diamonds.png\" alt=\"queen_of_diamonds\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "king") {
                        handCards1 += "<img src=\"assets/images/king_of_diamonds.png\" alt=\"king_of_diamonds\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "ace") {
                        handCards1 += "<img src=\"assets/images/ace_of_diamonds.png\" alt=\"ace_of_diamonds\" class=\"play-card-field\" />\n";
                   }
                   else {
                        handCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                   }
                   handCards1 += "</button>\n";
              }
              else if (handCards[i][1] == "club") {
                  handCards1 += "<button class=\"cardbtnfield\" type=\"button\">\n";
                  if (fieldCards[i][0] == "7") {
                       handCards1 += "<img src=\"assets/images/7_of_clubs.png\" alt=\"7_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(fieldCards[i][0] == "8") {
                        handCards1 += "<img src=\"assets/images/8_of_clubs.png\" alt=\"8_of_clubs\" class=\"play-card-field\" />\n";
                  }
                  else if(handCards[i][0] == "9") {
                        handCards1 += "<img src=\"assets/images/9_of_clubs.png\" alt=\"9_of_clubs\" class=\"play-card-field\" />\n";
                  }
                   else if(handCards[i][0] == "10") {
                        handCards1 += "<img src=\"assets/images/10_of_clubs.png\" alt=\"10_of_clubs\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "jack") {
                        handCards1 += "<img src=\"assets/images/jack_of_clubs.png\" alt=\"jack_of_clubs\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "queen") {
                        handCards1 += "<img src=\"assets/images/queen_of_clubs.png\" alt=\"queen_of_clubs\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "king") {
                        handCards1 += "<img src=\"assets/images/king_of_clubs.png\" alt=\"king_of_clubs\" class=\"play-card-field\" />\n";
                   }
                   else if(handCards[i][0] == "ace") {
                        handCards1 += "<img src=\"assets/images/ace_of_clubs.png\" alt=\"ace_of_clubs\" class=\"play-card-field\" />\n";
                   }
                   else {
                        handCards1 += "<h2 class=\"h2\">img1 not Found</h2>\n";
                   }
                   handCards1 += "</button>\n";
              }
              else {
                  console.log("HandCardErorr");
              }
          }
         fieldCards1 += "       </div>\n" +
                     "                       </div>"
         handCards1 += "       </div>\n" +
                              "                       </div>"
         firstLabel.innerHTML = "";
         gameBody.innerHTML = gameBody.innerHTML + anotherCards;
         gameBody.innerHTML = gameBody.innerHTML + fieldCards1;
         gameBody.innerHTML = gameBody.innerHTML + handCards1;
         gameBody.innerHTML = gameBody.innerHTML + gameButtons;
    }
}

