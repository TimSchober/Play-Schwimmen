<template>
  <button class="cardbtn" type="button">
    <img alt="some Game Card" :src="require('../assets/images/' + cardNumber + '_of_' + cardColor + 's.png')" class="play-card" :class="{ active: isSelected }" />
  </button>
</template>

<script>

export default {
  name: 'GamecardComponent',
  props: {
    isSelected: Boolean,
    cardColor: String,
    cardNumber: String
  }
}
</script>

<style scoped>
.active {
  outline: auto;
  color: #ed08e6;
  border-style: solid;
}

.play-card {
  border: 1px black;
  border-radius: 5px;
  width: 7em;
  height: auto;
  cursor: default;
}

.play-card:hover {
  width: 9em;
  height: auto;
  cursor: pointer;
}

.cardbtn {
  outline: 0 !important;
  color: transparent;
  background-color: transparent;
  border-color: transparent;
  cursor: default;
}
</style>