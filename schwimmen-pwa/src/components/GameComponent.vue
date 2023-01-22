<template>
  <div>
    <div class="row">
      <div class="col-5"></div>
      <div class="col-2 cen">
        <h1 class="playernamecenter"> Enemy </h1>
      </div>
      <div class="col-5"></div>
    </div>

    <div class="row">
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 cen">
        <ThreeNonPlayableCardsComponent />
      </div>
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
    </div>

    <div class="row">
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 cen">
        <ThreeCardsComponent
            :firstCardColor="fieldfirstCardColor"
            :firstCardNumber="fieldfirstCardNumber"
            :secondCardColor="fieldsecondCardColor"
            :secondCardNumber="fieldsecondCardNumber"
            :thirdCardColor="fieldthirdCardColor"
            :thirdCardNumber="fieldthirdCardNumber"
            :counter="cardfieldindex"
            @clicked="fieldSelected"
        />
      </div>
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
    </div>

    <div class="row">
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 cen">
        <ThreeCardsComponent
            :firstCardColor="handfirstCardColor"
            :firstCardNumber="handfirstCardNumber"
            :secondCardColor="handsecondCardColor"
            :secondCardNumber="handsecondCardNumber"
            :thirdCardColor="handthirdCardColor"
            :thirdCardNumber="handthirdCardNumber"
            :counter="cardhandindex"
            @clicked="handSelected"
        />
      </div>
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
    </div>

    <div class="row">
      <div class="col-5"></div>
      <div class="col-2 cen" >
        <h1 class="playernamecenter">{{ player_name }}</h1>
      </div>
      <div class="col-5"></div>
    </div>

    <div class="row">
      <div class="col-0 col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 cen">
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

export default {
  name: "GameComponent",
  components: {
    ThreeCardsComponent,
    ThreeNonPlayableCardsComponent
  },
  props: {
    fieldfirstCardColor: String,
    fieldfirstCardNumber: String,
    fieldsecondCardColor: String,
    fieldsecondCardNumber: String,
    fieldthirdCardColor: String,
    fieldthirdCardNumber: String,
    handfirstCardColor: String,
    handfirstCardNumber: String,
    handsecondCardColor: String,
    handsecondCardNumber: String,
    handthirdCardColor: String,
    handthirdCardNumber: String,
    cardfieldindex: Number,
    cardhandindex: Number,
    player_name: String,
  },
  methods: {
    fieldSelected(selectedVal) {
      this.$emit('fieldSelected', selectedVal)
    },
    handSelected(selectedVal) {
      this.$emit('handSelected', selectedVal)
    },
    nothing() {
      this.$emit('nothing')
    },
    knock() {
      this.$emit('knock')
    },
    changeAllCards() {
      this.$emit('changeAllCards')
    },
    changeOneCard() {
      this.$emit('changeOneCard')
    },
  },
}
</script>

<style scoped>
.cen {
  display: inline-flex;
  align-content: center;
  justify-content: center;
}
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