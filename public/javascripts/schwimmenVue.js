const app = Vue.createApp({})

app.component('info-panel', {
    data() {
        return {
            websocketVUE: new WebSocket("ws://localhost:9000/websocket"),
            game_state: '',
            player_amount: '',
            player_name: '',
            fieldCards: '',
            handCards: '',
            game_end_infos: '',
            player_num: 1,
            cardfieldindex: -1,
            cardhandindex: -1,
            fieldCardKlicked1: false,
            fieldCardKlicked2: false,
            fieldCardKlicked3: false,
            handCardKlicked1: false,
            handCardKlicked2: false,
            handCardKlicked3: false,
        }
    },
     methods: {
        connectWebSocket() {
            this.websocketVUE.onopen = (event) => {
                console.log("opening connection to Websocket")
                this.websocketVUE.send("opening connection")
            };

            this.websocketVUE.onclose = () => {
                console.log("Closed connection to Websocket")
            };

            this.websocketVUE.onerror = (error) => {
                console.log("Websocket caused error: " + error)
            };

            this.websocketVUE.onmessage = (event) => {
                console.log("message received");
                if (typeof event.data === "string") {
                    console.log(event.data);
                    this.data = JSON.parse(event.data);
                    this.game_state = this.data.game_state.game_state
                    this.player_amount = this.data.player_amount.player_amount
                    this.player_name = this.data.player_name.player_name
                    this.fieldCards  = this.data.game_cards.field_cards
                    this.handCards = this.data.game_cards.player_cards
                    this.game_end_infos = this.data.game_end_infos
                    console.log(this.game_end_infos);
                    console.log(this.fieldCards);
                    console.log(this.data);
                }
            };
        },
        setPlayerAmount() {
            const player_amount = $('#players').get(0).value;
            console.log("Amount Button");
            this.websocketVUE.send("{ \"cmd\": \"amount\", \"data\": " + player_amount + " }")
        },
        setPlayerName() {
            const player_name = $('#playername').get(0).value;
            console.log("Name Button");
            this.websocketVUE.send("{ \"cmd\": \"addplayer\", \"data\": " + JSON.stringify(player_name) + " }")
            $('#playername').get(0).value = '';
            this.player_num = this.player_num + 1;
        },
        changeAllCards() {
            this.websocketVUE.send("{ \"cmd\": \"all\", \"data\": \"\" }")
            console.log("changeAllCards Button");
        },
        chacgeOneCard() {
            let handCardIndex = this.cardhandindex;
            let fieldCardIndex = this.cardfieldindex;
            if (handCardIndex === -1 || fieldCardIndex === -1) return;
            let cardsToChange = handCardIndex.toString() + "G" +  fieldCardIndex.toString();

            this.websocketVUE.send("{ \"cmd\": \"y\", \"data\": " + JSON.stringify(cardsToChange) + " }")

            let fieldimag1 = document.getElementsByClassName("play-card-field")[0]; // fieldimage 1
            let fieldimag2 = document.getElementsByClassName("play-card-field")[1]; // fieldimage 2
            let fieldimag3 = document.getElementsByClassName("play-card-field")[2]; // fieldimage 3
            let handimag1 = document.getElementsByClassName("play-card-hand")[0]; // handimage 1
            let handimag2 = document.getElementsByClassName("play-card-hand")[1]; // handimage 2
            let handimag3 = document.getElementsByClassName("play-card-hand")[2]; // handimage 3

            fieldimag1.style.outline = "0";
            fieldimag1.style.color = "transparent";

            fieldimag2.style.outline = "0";
            fieldimag2.style.color = "transparent";

            fieldimag3.style.outline = "0";
            fieldimag3.style.color = "transparent";

            handimag1.style.outline = "0";
            handimag1.style.color = "transparent";

            handimag2.style.outline = "0";
            handimag2.style.color = "transparent";

            handimag3.style.outline = "0";
            handimag3.style.color = "transparent";

            this.cardhandindex = -1;
            this.cardfieldindex = -1;
            this.fieldCardKlicked1 = false;
            this.fieldCardKlicked2 = false;
            this.fieldCardKlicked3 = false;
            this.handCardKlicked1 = false;
            this.handCardKlicked2 = false;
            this.handCardKlicked3 =  false;

            console.log("chacgeOneCard Button");
        },
        knock() {
            console.log("knock Button");
            this.websocketVUE.send("{ \"cmd\": \"k\", \"data\": \"\" }")
        },
        nothing() {
            console.log("knock Button");
            this.websocketVUE.send("{ \"cmd\": \"n\", \"data\": \"\" }")
        },
        setNextRound() {
            console.log("setNextRound Button");
            this.websocketVUE.send("{ \"cmd\": \"nr\", \"data\": \"\" }")
        },
        undoGame() {
            console.log("undo Button");
            this.websocketVUE.send("{ \"cmd\": \"u\", \"data\": \"\" }")
        },
        redoGame() {
            console.log("redo Button");
            this.websocketVUE.send("{ \"cmd\": \"z\", \"data\": \"\" }")
        },
        saveGame(art) {
            console.log("saveGame Button");
            if (art === "xml") {
                this.websocketVUE.send("{ \"cmd\": \"saveXml\", \"data\": " + JSON.stringify(art) + " }")
            }
            if (art === "json") {
                this.websocketVUE.send("{ \"cmd\": \"saveJson\", \"data\": " + JSON.stringify(art) + " }")
            }
        },
        loadGame(art) {
            console.log("loadGame Button");
            if (art === "xml") {
                this.websocketVUE.send("{ \"cmd\": \"loadXml\", \"data\": " + JSON.stringify(art) + " }")
            }
            if (art === "json") {
                this.websocketVUE.send("{ \"cmd\": \"loadJson\", \"data\": " + JSON.stringify(art) + " }")
            }
        },
        setNextRound() {
            console.log("setNextRound Button");
            this.websocketVUE.send("{ \"cmd\": \"nr\", \"data\": \"\" }")
        },
        aCard1ActionHover() {
            let imag1 = document.getElementsByClassName("play-card")[0];
            imag1.style.width = "9em";
            imag1.style.height = "auto";

        },
        aCard2ActionHover() {
            let imag2 = document.getElementsByClassName("play-card")[1];
            imag2.style.width = "9em";
            imag2.style.height = "auto";
        },
        aCard3ActionHover() {
            let imag3 = document.getElementsByClassName("play-card")[2];
            imag3.style.width = "9em";
            imag3.style.height = "auto";
        },
        aCard1ActionOut() {
            let imag1 = document.getElementsByClassName("play-card")[0];
            imag1.style.width = "7em";
            imag1.style.height = "auto";
        },
        aCard2ActionOut() {
            let imag2 = document.getElementsByClassName("play-card")[1];
            imag2.style.width = "7em";
            imag2.style.height = "auto";
        },
        aCard3ActionOut() {
            let imag3 = document.getElementsByClassName("play-card")[2];
            imag3.style.width = "7em";
            imag3.style.height = "auto";
        },
        fCard1ActionHover() {
            let fieldimag1 = document.getElementsByClassName("play-card-field")[0];
            fieldimag1.style.width = "9em";
            fieldimag1.style.height = "auto";
        },
        fCard2ActionHover() {
            let fieldimag2 = document.getElementsByClassName("play-card-field")[1];
            fieldimag2.style.width = "9em";
            fieldimag2.style.height = "auto";
        },
        fCard3ActionHover() {
            let fieldimag3 = document.getElementsByClassName("play-card-field")[2];
            fieldimag3.style.width = "9em";
            fieldimag3.style.height = "auto";
        },
        fCard1ActionOut() {
            let fieldimag1 = document.getElementsByClassName("play-card-field")[0];
            fieldimag1.style.width = "7em";
            fieldimag1.style.height = "auto";
        },
        fCard2ActionOut() {
            let fieldimag2 = document.getElementsByClassName("play-card-field")[1];
            fieldimag2.style.width = "7em";
            fieldimag2.style.height = "auto";
        },
        fCard3ActionOut() {
            let fieldimag3 = document.getElementsByClassName("play-card-field")[2];
            fieldimag3.style.width = "7em";
            fieldimag3.style.height = "auto";
        },
        hCard1ActionHover() {
            let handimag1 = document.getElementsByClassName("play-card-hand")[0];
            handimag1.style.width = "9em";
            handimag1.style.height = "auto";
        },
        hCard2ActionHover() {
            let handimag2 = document.getElementsByClassName("play-card-hand")[1];
            handimag2.style.width = "9em";
            handimag2.style.height = "auto";
        },
        hCard3ActionHover() {
            let handimag3 = document.getElementsByClassName("play-card-hand")[2];
            handimag3.style.width = "9em";
            handimag3.style.height = "auto";
        },
        hCard1ActionOut() {
            let handimag1 = document.getElementsByClassName("play-card-hand")[0];
            handimag1.style.width = "7em";
            handimag1.style.height = "auto";
        },
        hCard2ActionOut() {
            let handimag2 = document.getElementsByClassName("play-card-hand")[1];
            handimag2.style.width = "7em";
            handimag2.style.height = "auto";
        },
        hCard3ActionOut() {
            let handimag3 = document.getElementsByClassName("play-card-hand")[2];
            handimag3.style.width = "7em";
            handimag3.style.height = "auto";
        },

        selectFCard1() {
            let fieldimag1 = document.getElementsByClassName("play-card-field")[0]; // fieldimage 1
            let fieldimag2 = document.getElementsByClassName("play-card-field")[1]; // fieldimage 2
            let fieldimag3 = document.getElementsByClassName("play-card-field")[2]; // fieldimage 3
            this.cardfieldindex = 0;
            if(!this.fieldCardKlicked1) {
                fieldimag1.style.outline = "auto";
                fieldimag1.style.color = "#ed08e6";
                fieldimag1.style.borderStyle = "solid";
                this.fieldCardKlicked1 = true;

                fieldimag2.style.outline = "0";
                fieldimag2.style.color = "transparent";

                fieldimag3.style.outline = "0";
                fieldimag3.style.color = "transparent";

                this.fieldCardKlicked2 = false;
                this.fieldCardKlicked3 = false;

            }
            else {
                fieldimag1.style.outline = "0";
                fieldimag1.style.color = "transparent";
                this.fieldCardKlicked1 = false;
            }
        },

        selectFCard2() {
            let fieldimag1 = document.getElementsByClassName("play-card-field")[0]; // fieldimage 1
            let fieldimag2 = document.getElementsByClassName("play-card-field")[1]; // fieldimage 2
            let fieldimag3 = document.getElementsByClassName("play-card-field")[2]; // fieldimage 3
            this.cardfieldindex = 1;
            if(!this.fieldCardKlicked2) {
                    fieldimag2.style.outline = "auto";
                    fieldimag2.style.color = "#ed08e6";
                    fieldimag2.style.borderStyle = "solid";
                    this.fieldCardKlicked2 = true;

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
                    this.fieldCardKlicked2 = false;
                }
        },
        selectFCard3() {
            let fieldimag1 = document.getElementsByClassName("play-card-field")[0]; // fieldimage 1
            let fieldimag2 = document.getElementsByClassName("play-card-field")[1]; // fieldimage 2
            let fieldimag3 = document.getElementsByClassName("play-card-field")[2]; // fieldimage 3
            this.cardfieldindex = 2;
            if(!this.fieldCardKlicked3) {
                fieldimag3.style.outline = "auto";
                fieldimag3.style.color = "#ed08e6";
                fieldimag3.style.borderStyle = "solid";
                this.fieldCardKlicked3 = true;

                fieldimag1.style.outline = "0";
                fieldimag1.style.color = "transparent";

                fieldimag2.style.outline = "0";
                fieldimag2.style.color = "transparent";

                this.fieldCardKlicked1 = false;
                this.fieldCardKlicked2 = false;
            }
            else {
                fieldimag3.style.outline = "0";
                fieldimag3.style.color = "transparent";
                this.fieldCardKlicked3 = false;
            }
        },
        selectHCard1() {
            let handimag1 = document.getElementsByClassName("play-card-hand")[0]; // handimage 1
            let handimag2 = document.getElementsByClassName("play-card-hand")[1]; // handimage 2
            let handimag3 = document.getElementsByClassName("play-card-hand")[2]; // handimage 3

            this.cardhandindex = 0;
            if(!this.handCardKlicked1) {
                handimag1.style.outline = "auto";
                handimag1.style.color = "#ed08e6";
                handimag1.style.borderStyle = "solid";
                this.handCardKlicked1 = true;

                handimag2.style.outline = "0";
                handimag2.style.color = "transparent";

                handimag3.style.outline = "0";
                handimag3.style.color = "transparent";

                this.handCardKlicked2 = false;
                this.handCardKlicked3 = false;
            }
            else {
                handimag1.style.outline = "0";
                handimag1.style.color = "transparent";
                this.handCardKlicked1 = false;
            }
        },
        selectHCard2() {
            let handimag1 = document.getElementsByClassName("play-card-hand")[0]; // handimage 1
            let handimag2 = document.getElementsByClassName("play-card-hand")[1]; // handimage 2
            let handimag3 = document.getElementsByClassName("play-card-hand")[2]; // handimage 3

            this.cardhandindex = 1;
            if(!this.handCardKlicked2) {
                handimag2.style.outline = "auto";
                handimag2.style.color = "#ed08e6";
                handimag2.style.borderStyle = "solid";
                this.handCardKlicked2 = true;

                handimag1.style.outline = "0";
                handimag1.style.color = "transparent";

                handimag3.style.outline = "0";
                handimag3.style.color = "transparent";

                this.handCardKlicked1 = false;
                this.handCardKlicked3 = false;
            }
            else {
                handimag2.style.outline = "0";
                handimag2.style.color = "transparent";
                this.handCardKlicked2 = false;
            }
        },
        selectHCard3() {
            let handimag1 = document.getElementsByClassName("play-card-hand")[0]; // handimage 1
            let handimag2 = document.getElementsByClassName("play-card-hand")[1]; // handimage 2
            let handimag3 = document.getElementsByClassName("play-card-hand")[2]; // handimage 3

            this.cardhandindex = 2;
            if(!this.handCardKlicked3) {
                handimag3.style.outline = "auto";
                handimag3.style.color = "#ed08e6";
                handimag3.style.borderStyle = "solid";
                this.handCardKlicked3 = true;

                handimag1.style.outline = "0";
                handimag1.style.color = "transparent";

                handimag2.style.outline = "0";
                handimag2.style.color = "transparent";

                this.handCardKlicked1 = false;
                this.handCardKlicked2 = false;
            }
            else {
                handimag3.style.outline = "0";
                handimag3.style.color = "transparent";
                this.handCardKlicked3 = false;
            }
        },
     },

     created() {
         this.connectWebSocket();
     },

    template: `
        <h2 class="h2" id="player-amoutn-label">
            <div class="row">
                <div class="col-1 col-sm-2"></div>
                <div v-if="(game_state === 'no_player_amount')" class="form-group col-10 col-sm-8 classgamestate">
                    <label  class="label1gamestat1" id="first-label">How many Player want to play</label>
                    <label class="label2gamestat1" id="second-label">Player number</label>
                    <div id="pl_am_name_textfield">
                        <input type="number" id="players" autofocus="autofocus" class="form-control iputs" min="2" max="9" aria-describedby="emailHelp" placeholder="Enter player amount (for up to 2-9 Players)"/>
                        <button v-on:click="setPlayerAmount" type="button" id="btn-amount" class="btn btn-primary form-control iputs" style="width: 25% !important;">Ok</button>
                    </div>
                </div>
            </div>
        </h2>

        <h2 class="h2" id="player-amoutn-label">
            <div class="row">
                <div class="col-1 col-sm-2"></div>
                <div v-if="(game_state === 'not_enough_players')" class="form-group col-10 col-sm-8 classgamestate">
                    <label  class="label1gamestat1" id="first-label">Player {{this.player_num}} name</label>
                    <label class="label2gamestat1" id="second-label"></label>
                    <div id="pl_am_name_textfield">
                        <input type="text" autofocus="autofocus" class="form-control iputs" id="playername" aria-describedby="emailHelp" placeholder="Enter Name">
                        <button v-on:click="setPlayerName" type="button" id="name-button" class="btn btn-primary form-control iputs" style="width: 25% !important;">Ok</button>
                    </div>
                </div>
            </div>
        </h2>

        <div v-if="(game_state === 'game_running')" class="row" id="name-label">
            <div class="col-5"></div>
            <div class="col-2 classcol" style="margin-bottom: 1em;">
                <h1 class="playernamecenter"> Enemy </h1>
            </div>
            <div class="col-5"></div>
        </div>

        <div v-if="(game_state === 'game_running')" class="row" id="a-cards" style="margin-bottom: 1rem">
           <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
           <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol">
              <div class="classcardcenter">
                 <button id="cardbtn1" class="cardbtn" type="button" id="cardbutton">
                    <img @mouseover="aCard1ActionHover()" @mouseout="aCard1ActionOut()" id="play-card1" class="play-card" id="dragoncard" src="assets/images/dragon1.png" alt="card background"/>
                 </button>
                 <button id="cardbtn2" class="cardbtn" type="button" id="cardbutton">
                    <img @mouseover="aCard2ActionHover()" @mouseout="aCard2ActionOut()" id="play-card2" class="play-card" id="dragoncard" src="assets/images/dragon1.png" alt="card background" />
                 </button>
                 <button id="cardbtn3" class="cardbtn" type="button" id="cardbutton">
                    <img @mouseover="aCard3ActionHover()" @mouseout="aCard3ActionOut()" id="play-card3" class="play-card" id="dragoncard" src="assets/images/dragon1.png" alt="card background" />
                 </button>
              </div>
           </div>
           <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
        </div>

        <div v-if="(game_state === 'game_running')" class="row" id="f-cards" style="margin-bottom: 1rem">
            <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol">
                <div class="classcardcenter">
                    <button class="cardbtnfield" type="button">
                        <img v-on:click="selectFCard1()" @mouseover="fCard1ActionHover()" @mouseout="fCard1ActionOut()" :src="'assets/images/'+ this.fieldCards[0][0] + '_of_' + this.fieldCards[0][1] + 's.png'" class="play-card-field"/>
                    </button>
                    <button class="cardbtnfield" type="button">
                        <img v-on:click="selectFCard2()" @mouseover="fCard2ActionHover()" @mouseout="fCard2ActionOut()" :src="'assets/images/'+ this.fieldCards[1][0] + '_of_' + this.fieldCards[1][1] + 's.png'" class="play-card-field"/>
                    </button>
                    <button class="cardbtnfield" type="button">
                        <img v-on:click="selectFCard3()" @mouseover="fCard3ActionHover()" @mouseout="fCard3ActionOut()" :src="'assets/images/'+ this.fieldCards[2][0] + '_of_' + this.fieldCards[2][1] + 's.png'" class="play-card-field"/>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="(game_state === 'game_running')" class="row" id="f-cards" style="margin-bottom: 1rem">
            <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol">
                <div class="classcardcenter">
                    <button class="cardbtnhand" type="button">
                        <img v-on:click="selectHCard1()" @mouseover="hCard1ActionHover()" @mouseout="hCard1ActionOut()" :src="'assets/images/'+ this.handCards[0][0] + '_of_' + this.handCards[0][1] + 's.png'" class="play-card-hand"/>
                    </button>
                    <button class="cardbtnhand" type="button">
                        <img v-on:click="selectHCard2()" @mouseover="hCard2ActionHover()" @mouseout="hCard2ActionOut()" :src="'assets/images/'+ this.handCards[1][0] + '_of_' + this.handCards[1][1] + 's.png'" class="play-card-hand"/>
                    </button>
                    <button class="cardbtnhand" type="button">
                        <img v-on:click="selectHCard3()" @mouseover="hCard3ActionHover()" @mouseout="hCard3ActionOut()" :src="'assets/images/'+ this.handCards[2][0] + '_of_' + this.handCards[2][1] + 's.png'" class="play-card-hand"/>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="(game_state === 'game_running')" class="row" id="name-label">
            <div class="col-5"></div>
            <div class="col-2 classcol" style="margin-bottom: 1em;">
                <h1 class="playernamecenter"> {{ player_name }} </h1>
            </div>
            <div class="col-5"></div>
        </div>



        <div v-if="(game_state === 'game_running')" class="row" id="gameButtons">
            <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 classcol">
                <div class="gameButtonsGroup1" style="margin: 0 auto; margin-right: 0;">
                    <button v-on:click="chacgeOneCard" type="button"  id="changeoncard" class="btn btn-primary buttonstyle btn-change-one">Change Card</button>
                    <button v-on:click="changeAllCards" type="button"  id="tackall" class="btn btn-primary buttonstyle btn-change-all">Take All</button>
                </div>
                <div class="gameButtonsGroup2" style="margin: 0 auto; margin-left: 0;">
                    <button v-on:click="knock" type="button"  id="knock" class="btn btn-primary buttonstyle btn-knock">Knock</button>
                    <button v-on:click="nothing" type="button"  id="nothing" class="btn btn-primary buttonstyle btn-nothing">Nothing</button>
                </div>
            </div>
            <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
        </div>

        <div v-if="(game_state === 'game_ended')" class="row" id="finalstatstitle">
            <div class="col-4 col-sm-3"></div>
            <h2 class="col-4 col-sm-6 h2" id="titleLabel" style="text-align: center;">Game Ended</h2>
            <div class="col-4 col-sm-3"></div>
        </div>

        <div v-if="(game_state === 'game_ended')" v-for="player in this.game_end_infos" class="row" id="finalstats">
            <div class="col-4 col-sm-3"></div>
            <h2 class="col-4 col-sm-6" id="nextRoundLabel" style="text-align: center;"> {{player.player_name}} has, {{player.player_life}} lifes, {{player.player_card_points}} points </h2>
            <div class="col-4 col-sm-3"></div>
        </div>

        <div v-if="(game_state === 'game_ended')" class="row" style="margin-top: 2em;" id="nextRoundButtonDiv">
            <div class="col-4 col-sm-5"></div>
            <button v-on:click="setNextRound()" type="button" id="nextRound" class="btn btn-primary buttonstyle col-4 col-sm-2" style="display: block;">Start next Round</button>
            <div class="col-4 col-sm-5"></div>
        </div>
    `
})

app.component('schwimmen-nav', {
    data() {
        return {
            homeLink: "/",
            aboutLink: "/about"
        }
    },
    template: `
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" id="navBar">
          <span class="navbar-brand mb-0 h1">
            <img src="assets/images/top-bild.png" width="30" height="30" class="d-inline-block align-top" alt=""/>
            Schwimmen
          </span>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link active" href="/">Rules
                    <span class="sr-only">(current)</span>
                 </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Game</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <a class="dropdown-item btn-save" id="save-xml" v-on:click="saveGame('saveXml')" href="#">Save Xml</a>
                  <a class="dropdown-item btn-save" id="save-json" v-on:click="saveGame('saveJson')" href="#" >Save Json</a>
                  <a class="dropdown-item btn-load" id="load-xml" v-on:click="loadGame('loadXml')" href="#">Load Xml</a>
                  <a class="dropdown-item btn-load" id="load-json" v-on:click="loadGame('loadJson')" href="#">Load Json</a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Edit</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <a type="button" class="dropdown-item btn-undo" id="undo-click" @click="undoGame()" href="#">Undo</a>
                  <a type="button" class="dropdown-item btn-redo" id="redo-click" @click="redoGame()" href="#">Redo</a>
                </div>
              </li>
              <li>
                <button class="btn btn-primary navbuttonstyle" type="button" data-toggle="collapse" data-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1">
                  Stats
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div style="margin-top: 5em; margin-left: 2em">
            <div class="row">
              <div class="col-12 col-sm-6">
                <div class="collapse multi-collapse" id="multiCollapseExample1">
                  <div class="card card-body">
                    <table class="table navtable">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">HasKnocked</th>
                          <th scope="col">Lives</th>
                        </tr>
                      </thead>
                      <tbody>




                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        </div>
    `
})

// <img :src="'./assets/images/'+ { cardNumber } + '_of_' + { cardColor } + 's.png'" class="play-card" :class="{ active: isSelected }" />

app.mount('#gameBody')