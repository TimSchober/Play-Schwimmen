<template>
  <div class="row" id="finalstatstitle">
    <div class="col-4 col-sm-3"></div>
    <h2 class="col-4 col-sm-6" id="titleLabel" style="text-align: center;">Game Ended</h2>
    <div class="col-4 col-sm-3"></div>
  </div>
  <div v-for="item in game_end_infos" :key="item.player_name">
    <div class="row" id="finalstats">
      <div class="col-4 col-sm-3"></div>
      <h2  class="col-4 col-sm-6" id="nextRoundLabel" style="text-align: center;"> {{item.player_name}} has {{item.player_life}} lifes and {{item.player_card_points}} points </h2>
      <div class="col-4 col-sm-3"></div>
    </div>
  </div>

  <div class="row" style="margin-top: 2em;" id="nextRoundButtonDiv">
    <div class="col-4 col-sm-5"></div>
    <button @click="setNextRound" type="button" id="nextRound" class="btn btn-primary buttonstyle col-4 col-sm-2" style="display: block;">Start next Round</button>
    <div class="col-4 col-sm-5"></div>
  </div>
</template>

<script>
export default {
  name: "ScoreBoardComponent",
  props: {
    game_end_infos: JSON
  },
  methods: {
    setNextRound() {
      this.$emit('nextround')
    }
  },
}
</script>

<style scoped>
.buttonstyle {
  display: inherit;
  margin: 0 auto;
  width: 8em;
  background-color: #545b62 !important;
  border-color: #f8f9fa;
}
</style>