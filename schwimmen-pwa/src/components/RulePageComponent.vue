<template>
  <body class="rule-body">
  <nav class="navbar fixed-top colour">
    <div class="container-fluid topinhalt">
      <h1>
        <img
            src="../assets/images/top-bild.png"
            alt="Logo"
            width="65"
            height="60"
            class="d-inline-block align-text-top"
        />
        Play Schwimmen
      </h1>
    </div>
  </nav>
  <section class="container-fluid body-inhalt">
    <div class="row con">
      <div class="col-1 col-sm-1 col-md-1 col-lg-1"></div>
      <div class="col-10 col-sm-10 col-md-8 col-lg-6">
        <article>
          <h3 class="alert alert-dark kaestchen" role="alert">
            Tim Schober & Ayaz Hasan
          </h3>
          <p>Here you can play the game "Schwimmen"</p>

          <h4 class="alert alert-secondary kaestchen" role="alert">Rules</h4>
          <p>
            Every Player is getting three cards. The goal of the game is to not
            be the one with the smallest card value. To achieve this goal the
            player can swap either one or all of his cards with the three cards
            on the field, he is also allowed to skip a round or to "knock",
            which means that there's one last round left til the cards are
            counted. When two cards have the same colour(for example spades)
            their value is added together. The Value of a card is defined as
            followed:
          </p>
          <ul class="list-group listschriftgrosse">
            <li class="list-group-item disabled listitem">
              An ace has a value of 11
            </li>
            <li class="list-group-item disabled listitem">
              A face card such as king, queen or jack has a value of 10
            </li>
            <li class="list-group-item disabled listitem">
              Every card with a number has a value of this very number
            </li>
            <li class="list-group-item disabled listitem">
              Three cards of the same face or number but different colour is
              defined as a value of 30 1/2
            </li>
          </ul>

          <h4 class="alert alert-secondary kaestchen" role="alert">
            How to play our version:
          </h4>
          <p>
            First of all you have to type with how many players you want to
            play. It is possible to play with up to nine players.
          </p>

          <p>After that you can give every player a name</p>

          <p>Now the game can start and a GUI will pop up.</p>

          <p>
            In the bottom left corner you can see the name of the current
            player. This player can now decide if he wants to:
          </p>
          <ul class="list-group listschriftgrosse">
            <li class="list-group-item disabled listitem">
              change one of his cards by selecting the card of the field he
              wants to get and the card of his hand he wants to throw on the
              field and by pressing the ChangeOneCard button afterwards.
            </li>
            <li class="list-group-item disabled listitem">
              change all of his cards by pressing the ChangeAllCards button.
            </li>
            <li class="list-group-item disabled listitem">
              knock by pressing the Knock button, doing that will end the game
              after the next round.
            </li>
            <li class="list-group-item disabled listitem">
              skip this round by pressing the Skip button.
            </li>
          </ul>

          <p>
            The game will either end by someone who knocked or if someone gets
            31 points which is called a stop. To continue the game u have to
            type "nr" and the player with the least points loose one life.
          </p>
          <p>
            If a player has no more lives left he will be removed from the game
            and the rest of the players can continue playing til only one player
            is left.
          </p>
          <a class="btn btn-outline-light end-of-page" @click="onclick">
            <h5>to Play</h5>
          </a>
        </article>
      </div>
      <div class="col-1 col-sm-1 col-md-3 col-lg-5"></div>
    </div>
  </section>
  </body>
</template>

<script>
export default {
  name: "RulePageComponent",
  methods: {
    onclick() {
      this.$emit('switch')
    }
  }
}
</script>

<style scoped>
.rule-body {
  background: url("@/assets/images/hintergrund.jpg") no-repeat;
  background-size: cover;
  color: #ccd5d9;
  overflow: hidden;
  min-height: 100vh;
  padding: 20px;
}
.topinhalt {
  padding-left: 3em !important;
}
.body-inhalt {
  padding-top: 5em;
}
.listschriftgrosse {
  margin-bottom: 2em !important;
  font-size: 1em;
}
.kaestchen {
  background-color: #1d2c3b !important;
  color: #ede9e2 !important;
}
.listitem {
  color: #dbe2ea !important;
  background-color: #515560 !important;
}
</style>