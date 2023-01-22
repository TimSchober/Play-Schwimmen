<template>
  <div class="aligncenter">
    <button class="cardbtn" type="button">
      <img alt="non playable Game Card" :src="require('../assets/images/dragon1.png')" class="play-card" />
    </button>
    <button class="cardbtn" type="button">
      <img alt="non playable Game Card" :src="require('../assets/images/dragon1.png')" class="play-card" />
    </button>
    <button class="cardbtn" type="button">
      <img alt="non playable Game Card" :src="require('../assets/images/dragon1.png')" class="play-card" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ThreeNonPlayableCardsComponent",
}
</script>

<style scoped>
.aligncenter {
  margin: 0 auto;
  display: inherit;
}
.play-card {
  border: 1px black;
  border-radius: 5px;
  width: 7em;
  height: auto;
  cursor: default;
}
.cardbtn {
  outline: 0 !important;
  color: transparent;
  background-color: transparent;
  border-color: transparent;
  cursor: default;
}
</style>