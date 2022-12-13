const app = Vue.createApp({})

app.component('board-body', {
    data() {
        return {
            websocketVUE: new WebSocket("ws://localhost:9000/websocket"),
            data: {},
            gameStatus: "",
            player_amount: "",
            player_name: "",
            game_cards: "",
        }
    },
    methods: {
        connectWebSocket() {
            this.websocketVUE.onopen = (event) => {
                console.log("opening connection to Websocket")
                this.websocket.send("opening connection")
            }

            this.websocketVUE.onclose = (event) => {
                console.log("Closed connection to Websocket")
            };

            this.websocketVUE.onerror = (event) => {
                console.log("Websocket caused error: " + error)
            };

            this.websocketVUE.onmessage = (event) => {
                console.log("message received");
                if (typeof e.data === "string") {
                    console.log(e.data)
                    let json = JSON.parse(e.data)
                    updateInfoPanel(json);
                    refreshOnClickEvents();
                }
                this.game_state = this.data.game_state
                this.player_amount = this.data.player_amount
                this.player_name = this.data.player_name
                this.game_cards = this.data.game_cards
                this.updateInfoPanel()
            };
        },
        processCmdWS(cmd, data) {
            this.websocketVUE.send("{ \"cmd\": \"" + cmd + "\", \"data\": \"" + data + "\" }")
        },
        processCommand(cmd, returnData) {
            this.post("POST", "/command", {"cmd": cmd, "data": returnData}).then(() => {
            })
        },
        post(method, url, returnData, cmd) {
            return $.ajax({
                method: method,
                url: url,
                data: JSON.stringify(returnData),
                dataType: "json",
                contentType: "application/json",

                success: function (response) {
                    this.data = response;
                },
                error: function (response) {
                    console.log("Error")
                    console.error(response);
                }
            });
        },
        getData() {
            let that = this;

            return $.ajax({
                method: "GET",
                url: "/status",
                dataType: "json",
                success: function (response) {
                    that.data = response;
                    that.game_state = response.game_state
                    that.player_amount = response.player_amount
                    that.player_name = response.player_name
                    that.game_cards = response.game_cards
                    that.updateGameBoard()
                    console.log(response);
                }
            });
        },
        updateInfoPanel(data) {
            template: `
                <div class="board-body" id="help">
                  <div class="game-state" id="boardBody">
                    <h2 class="h2" id="player-amoutn-label">
                      <div class="row">
                        <div class="col-1 col-sm-2"></div>
                        <div class="form-group col-10 col-sm-8 classgamestate">
                          <label class="label1gamestat1" id="first-label"></label>
                          <label class="label2gamestat1" id="second-label"></label>
                          <div id="pl_am_name_textfield"></div>
                        </div>
                        <div class="col-1 col-sm-2"></div>
                      </div>
                      <div class="row">
                        <div class="col-4 col-sm-4"></div>
                        <div class="col-4 col-sm-4" id="amount-btn">
                        </div>
                        <div class="col-4 col-sm-4"></div>
                      </div>
                    </h2>
                  </div>
                 </div>
            `
        },
        changeAllCards() {
            resetGame();
            this.processCmdWS("all", "")
        },

        changeOneCard() {
            let handCardIndex = cardhandindex;
            let fieldCardIndex = cardfieldindex;
            if (handCardIndex === -1 || fieldCardIndex === -1) return;
            let cardsToChange = handCardIndex.toString() + "G" +  fieldCardIndex.toString();
            resetGame()
            this.processCmdWS("y", cardsToChange)
            cardhandindex = -1;
            cardfieldindex = -1;
        },

        knock() {
            resetGame();
            this.processCmdWS("k", "")
        },
        setNextRound() {
            let nextRoundLabel = document.getElementById("nextRoundLabel");
            let nextRoundButtonDiv = document.getElementById("nextRoundButtonDiv");
            nextRoundLabel.remove();
            nextRoundButtonDiv.remove();
            this.processCmdWS("nr", "")
        },
        undo() {
            this.processCmdWS("u", "")
        },
        redo() {
            this.processCmdWS("Z", "")
        },
        saveGame() {
            this.processCmdWS("saveJson", "")
        },
        loadGame() {
            this.processCmdWS("loadJson", "")
        },
        setPlayerAmount() {
            const amount = $('#players').get(0).value;
            this.processCmdWS("amount", amount)
        },
        setPlayerName() {
            const name = $('#playername').get(0).value;
            this.processCmdWS("addplayer", name)
        }
    },
    template: `
            <p class="text-center">
                game_state
            </p>
        `
})

app.component('game-start', {
    template: `
    <div class="row">
        <div v-if="game-state === no_player_amount" class="col-1 col-sm-2"></div>
        <div class="form-group col-10 col-sm-8 classgamestate">
            <label class="label1gamestat1" id="first-label"></label>
            <label class="label2gamestat1" id="second-label"></label>
            <div id="pl_am_name_textfield"></div>
        </div>
        <div class="col-1 col-sm-2"></div>
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
        <nav
          class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark"
          id="navBar"
        >
          <span class="navbar-brand mb-0 h1">
            <img
              src="assets/images/top-bild.png"
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            Schwimmen
          </span>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link active" href="/"
                  >Rules <span class="sr-only">(current)</span></a
                >
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown1"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Game
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <a
                    class="dropdown-item btn-save"
                    id="save-xml"
                    onclick="savexml('saveXml')"
                    href="#"
                    >Save Xml</a
                  >
                  <a
                    class="dropdown-item btn-save"
                    id="save-json"
                    onclick="savejson('saveJson')"
                    href="#"
                    >Save Json</a
                  >
                  <a
                    class="dropdown-item btn-load"
                    id="load-xml"
                    onclick="loadxml('loadXml')"
                    href="#"
                    >Load Xml</a
                  >
                  <a
                    class="dropdown-item btn-load"
                    id="load-json"
                    onclick="loadjson('loadJson')"
                    href="#"
                    >Load Json</a
                  >
                </div>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown2"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Edit
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <a
                    class="dropdown-item btn-undo"
                    id="undo-click"
                    onclick="undo('r')"
                    href="#"
                    >Undo</a
                  >
                  <a
                    class="dropdown-item btn-redo"
                    id="redo-click"
                    onclick="redo('z')"
                    href="#"
                    >Redo</a
                  >
                </div>
              </li>
              <li>
                <button
                  class="btn btn-primary navbuttonstyle"
                  type="button"
                  data-toggle="collapse"
                  data-target="#multiCollapseExample1"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample1"
                >
                  Stats
                </button>
              </li>
            </ul>
          </div>
        </nav>
        `
})

app.mount('#gameBody')