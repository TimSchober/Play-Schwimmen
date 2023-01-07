<template>
  <div class="aligncenter">
    <GamecardComponent @click="clickHandler(0)" :isSelected="counter === 0" :cardColor="firstCardColor" :cardNumber="firstCardNumber" />
    <GamecardComponent @click="clickHandler(1)" :isSelected="counter === 1" :cardColor="secondCardColor" :cardNumber="secondCardNumber" />
    <GamecardComponent @click="clickHandler(2)" :isSelected="counter === 2" :cardColor="thirdCardColor" :cardNumber="thirdCardNumber" />
  </div>
</template>

<script>
import GamecardComponent from "./GamecardComponent.vue";

export default {
  name: "ThreeCardsComponent",
  props: {
    firstCardColor: String,
    firstCardNumber: String,
    secondCardColor: String,
    secondCardNumber: String,
    thirdCardColor: String,
    thirdCardNumber: String,
  },
  components: {
    GamecardComponent
  },
  methods: {
    clickHandler(cardnumber) {
      this.counter = cardnumber;
      this.$emit('clicked', this.counter)
    }
  },
  data() {
    return {
      counter: -1,
    }
  }
}
</script>

<style scoped>
.aligncenter {
  margin: 0 auto;
  display: inherit;
}
</style>