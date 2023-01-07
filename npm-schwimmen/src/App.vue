<template>
  <GameComponent
    firstCardColor="spade"
    firstCardNumber="7"
    secondCardColor="heart"
    secondCardNumber="7"
    thirdCardColor="diamond"
    thirdCardNumber="king"
  />
</template>

<script>
import GameComponent from './components/GameComponent.vue'

export default {
  name: 'App',
  components: {
    GameComponent
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
