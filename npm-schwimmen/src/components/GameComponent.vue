<template>
  <div>
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
  </div>
</template>

<script>
import ThreeCardsComponent from "./ThreeCardsComponent.vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "GameComponent",
  components: {
    ThreeCardsComponent
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
.classcardcenter {
  margin: 0 auto;
  display: inherit;
}
.playernamecenter {
  margin: 0 auto;
  text-transform: capitalize;
}

</style>