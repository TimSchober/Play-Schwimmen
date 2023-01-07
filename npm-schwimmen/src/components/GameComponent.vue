<template>
  <div>
    <div class="row">
      <div class="col-5"></div>
      <div class="col-2">
        <h1 class="playernamecenter"> Enemy </h1>
      </div>
      <div class="col-5"></div>
    </div>

    <div class="row">
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <ThreeNonPlayableCardsComponent />
      </div>
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
    </div>

    <div class="row">
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <ThreeCardsComponent
            :firstCardColor="firstCardColor"
            :firstCardNumber="firstCardNumber"
            :secondCardColor="secondCardColor"
            :secondCardNumber="secondCardNumber"
            :thirdCardColor="thirdCardColor"
            :thirdCardNumber="thirdCardNumber"
            @clicked="test"
        />
      </div>
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
    </div>

    <div class="row">
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <ThreeCardsComponent
            :firstCardColor="firstCardColor"
            :firstCardNumber="firstCardNumber"
            :secondCardColor="secondCardColor"
            :secondCardNumber="secondCardNumber"
            :thirdCardColor="thirdCardColor"
            :thirdCardNumber="thirdCardNumber"
            @clicked="test"
        />
      </div>
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
    </div>

    <div class="row">
      <div class="col-5"></div>
      <div class="col-2" >
        <h1 class="playernamecenter">player_name</h1>
      </div>
      <div class="col-5"></div>
    </div>

    <div class="row">
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <button @click="changeOneCard" type="button"  id="changeoncard" class="btn btn-primary buttonstyle btn-change-one">Change Card</button>
        <button @click="changeAllCards" type="button"  id="tackall" class="btn btn-primary buttonstyle btn-change-all">Take All</button>
        <button @click="knock" type="button"  id="knock" class="btn btn-primary buttonstyle btn-knock">Knock</button>
        <button @click="nothing" type="button"  id="nothing" class="btn btn-primary buttonstyle btn-nothing">Nothing</button>
      </div>
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
    </div>
  </div>
</template>

<script>
import ThreeCardsComponent from "./ThreeCardsComponent.vue";
import ThreeNonPlayableCardsComponent from "./ThreeNonPlayableCardsComponent.vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "GameComponent",
  components: {
    ThreeCardsComponent,
    ThreeNonPlayableCardsComponent
  },
  props: {
    firstCardColor: String,
    firstCardNumber: String,
    secondCardColor: String,
    secondCardNumber: String,
    thirdCardColor: String,
    thirdCardNumber: String,
  },
  methods: {
    test(val) {
      console.log(val)
    },
    nothing() {
      console.log("nothing")
    },
    knock() {
      console.log("knock")
    },
    changeAllCards() {
      console.log("changeAllCards")
    },
    changeOneCard() {
      console.log("changeOneCard")
    }
  },
}
</script>

<style scoped>
.playernamecenter {
  margin: 0 auto;
  text-transform: capitalize;
}
.buttonstyle {
  display: inline-flex;
  margin: 0 auto;
  width: 8em;
  background-color: #545b62 !important;
  border-color: #f8f9fa;
}
</style>