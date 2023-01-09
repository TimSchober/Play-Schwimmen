<template>
  <RulePageComponent v-if="this.showRules" @switch="this.showRules = false"/>
  <body v-if="this.showRules === false" class="game-body">
    <NavbarComponent @rules="this.showRules = true"
                     :game_end_infos="this.game_end_infos"
                     @undoGame="undoGame"
                     @redoGame="redoGame"/>
    <div class="abstand"></div>
    <EnterPlayerAmountComponent v-if="this.game_state==='no_player_amount'" @amount="setPlayerAmount"/>
    <EnterPlayerNameComponent v-if="this.game_state==='not_enough_players'" @name="setPlayerName" :playernumber="this.player_num"/>
    <GameComponent
        v-if="this.game_state==='game_running'"
        :fieldfirstCardColor="this.fieldCards[0][1]"
        :fieldfirstCardNumber="this.fieldCards[0][0]"
        :fieldsecondCardColor="this.fieldCards[1][1]"
        :fieldsecondCardNumber="this.fieldCards[1][0]"
        :fieldthirdCardColor="this.fieldCards[2][1]"
        :fieldthirdCardNumber="this.fieldCards[2][0]"
        :handfirstCardColor="this.handCards[0][1]"
        :handfirstCardNumber="this.handCards[0][0]"
        :handsecondCardColor="this.handCards[1][1]"
        :handsecondCardNumber="this.handCards[1][0]"
        :handthirdCardColor="this.handCards[2][1]"
        :handthirdCardNumber="this.handCards[2][0]"
        :player_name="this.player_name"
        :cardfieldindex="cardfieldindex"
        :cardhandindex="cardhandindex"
        @fieldSelected="fieldSelected"
        @handSelected="handSelected"
        @nothing="nothing"
        @knock="knock"
        @changeAllCards="changeAllCards"
        @changeOneCard="changeOneCard"
    />
    <ScoreBoardComponent v-if="this.game_state==='game_ended'" @nextround="setNextRound" :game_end_infos="this.game_end_infos"/>
  </body>
</template>

<script>
import RulePageComponent from './components/RulePageComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import EnterPlayerAmountComponent from './components/EnterPlayerAmountComponent.vue'
import EnterPlayerNameComponent from './components/EnterPlayerNameComponent.vue'
import GameComponent from './components/GameComponent.vue'
import ScoreBoardComponent from './components/ScoreBoardComponent.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  components: {
    RulePageComponent,
    NavbarComponent,
    EnterPlayerAmountComponent,
    EnterPlayerNameComponent,
    GameComponent,
    ScoreBoardComponent
  },
  data() {
    return {
      showRules: true,
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
    }
  },
  created() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      this.websocketVUE.onopen = () => {
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
          this.fieldCards = this.data.game_cards.field_cards
          this.handCards = this.data.game_cards.player_cards
          this.game_end_infos = this.data.game_end_infos
          // console.log(this.game_end_infos);
          // console.log(this.fieldCards);
          // console.log(this.data);
        }
      };
    },
    setPlayerAmount(player_amount) {
      console.log("Amount Button");
      this.websocketVUE.send("{ \"cmd\": \"amount\", \"data\": " + player_amount + " }")
    },
    setPlayerName(player_name) {
      console.log("Name Button");
      this.websocketVUE.send("{ \"cmd\": \"addplayer\", \"data\": " + JSON.stringify(player_name) + " }")
      this.player_num = this.player_num + 1;
    },
    fieldSelected(val) {
      this.cardfieldindex = val
    },
    handSelected(val) {
      this.cardhandindex = val
    },
    changeAllCards() {
      this.websocketVUE.send("{ \"cmd\": \"all\", \"data\": \"\" }")
      console.log("changeAllCards Button");
    },
    changeOneCard() {
      if (this.cardfieldindex === -1 || this.cardhandindex === -1) return;
      let cardsToChange = this.cardhandindex.toString() + "G" +  this.cardfieldindex.toString();

      this.websocketVUE.send("{ \"cmd\": \"y\", \"data\": " + JSON.stringify(cardsToChange) + " }")

      this.cardhandindex = -1;
      this.cardfieldindex = -1;
      console.log("changeOneCard Button");
    },
    knock() {
      console.log("knock Button");
      this.websocketVUE.send("{ \"cmd\": \"k\", \"data\": \"\" }")
    },
    nothing() {
      console.log("nothing Button");
      this.websocketVUE.send("{ \"cmd\": \"n\", \"data\": \"\" }")
    },
    setNextRound() {
      console.log("setNextRound Button");
      this.websocketVUE.send("{ \"cmd\": \"nr\", \"data\": \"\" }")
    },
    undoGame() {
      console.log("undo Button");
      this.websocketVUE.send("{ \"cmd\": \"undo\", \"data\": \"\" }")
    },
    redoGame() {
      console.log("redo Button");
      this.websocketVUE.send("{ \"cmd\": \"redo\", \"data\": \"\" }")
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
  },
}
</script>

<style>
.abstand {
  margin-top: 3rem;
}
.game-body {
  background: url("@/assets/images/hintergrund.jpg") no-repeat;
  background-size: cover;
  color: #ccd5d9;
  overflow: hidden;
  min-height: 100vh;
  padding: 20px;
}
</style>
