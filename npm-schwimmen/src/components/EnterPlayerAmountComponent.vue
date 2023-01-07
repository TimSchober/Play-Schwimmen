<template>
  <h2 id="player-amount-label">
    <div class="row">
      <div class="col-1 col-sm-2"></div>
      <div class="form-group col-10 col-sm-8">
        <label  class="label1gamestat1" id="first-label">How many Player want to play?</label>
        <label class="label2gamestat1" id="second-label">Player number</label>
        <div id="pl_am_name_textfield">
          <input type="number" v-model="amount" id="players" autofocus="autofocus" class="form-control iputs" min="2" max="9" aria-describedby="emailHelp" placeholder="Enter player amount (for up to 2-9 Players)"/>
          <button @click="setPlayerAmount" type="button" id="btn-amount" class="btn btn-primary form-control iputs" style="width: 25% !important;">Ok</button>
        </div>
      </div>
      <div class="col-1 col-sm-2"></div>
    </div>
  </h2>
</template>

<script>
export default {
  name: "EnterPlayerAmountComponent",
  methods: {
    setPlayerAmount() {
      if (1 < this.amount < 10) {
        this.$emit('amount', this.amount)
      }
    }
  },
  data() {
    return {
      amount: 2,
    }
  }
}
</script>

<style scoped>
.label1gamestat1 {
  margin: 0 auto;
  display: inherit;
  margin-top: 2em;
}
.label2gamestat1 {
  margin: 0 auto;
  display: inherit;
  margin-top: 4em;
}
.iputs {
  margin: 0 auto;
  display: inherit;
  margin-top: 2em;
  width: 50% !important;
}
</style>