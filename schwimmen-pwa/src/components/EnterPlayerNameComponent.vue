<template>
  <h2 id="player-amoutn-label">
    <div class="row">
      <div class="col-1 col-sm-2"></div>
      <div class="form-group col-10 col-sm-8 ">
        <label class="label1gamestat1" id="first-label">Player {{ this.playernumber }} name</label>
        <label class="label2gamestat1" id="second-label"></label>
        <div id="pl_am_name_textfield">
          <input type="text" v-model="name" autofocus="autofocus" class="form-control iputs" id="playername" aria-describedby="emailHelp" placeholder="Enter Name">
          <button @click="setPlayerName" type="button" id="name-button" class="btn btn-primary form-control iputs" style="width: 25% !important;">Ok</button>
        </div>
      </div>
    </div>
  </h2>
</template>

<script>
export default {
  name: "NotEnoughPlayersComponent",
  props: {
    playernumber: Number
  },
  methods: {
    setPlayerName() {
      if (this.name !== "") {
        let tempname = this.name
        this.name = ""
        this.$emit('name', tempname)
      }
    }
  },
  data() {
    return {
      name: ""
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