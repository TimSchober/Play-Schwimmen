<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" id="navBar">
    <span class="navbar-brand mb-0 h1">
      <img src="../assets/images/top-bild.png" width="30" height="30" class="d-inline-block align-top" alt=""/>
      Schwimmen
    </span>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active hoverevent">
          <a class="nav-link active" @click="rules">Rules
          </a>
        </li>
<!--        <li class="nav-item hoverevent">-->
<!--          <a class="nav-link active" id="save-xml" @click="saveGameXml" >Save Xml</a>-->
<!--        </li>-->
<!--        <li class="nav-item hoverevent">-->
<!--          <a class="nav-link active" id="save-json" @click="saveGameJson" >Save Json</a>-->
<!--        </li>-->
<!--        <li class="nav-item hoverevent">-->
<!--          <a class="nav-link active" id="load-xml" @click="loadGameXml" >Load Xml</a>-->
<!--        </li>-->
<!--        <li class="nav-item hoverevent">-->
<!--          <a class="nav-link active" id="load-json" @click="loadGameJson" >Load Json</a>-->
<!--        </li>-->
        <li class="nav-item hoverevent">
          <a type="button" class="nav-link active" id="undo-click" @click="undoGame" >Undo</a>
        </li>
        <li class="nav-item hoverevent">
          <a type="button" class="nav-link active" id="redo-click" @click="redoGame" >Redo</a>
        </li>
        <li>
          <button @click="showStats" class="btn btn-primary navbuttonstyle" type="button" >
            Stats
          </button>
        </li>
      </ul>
    </div>
  </nav>
  <StatsComponent class="abstand" v-if="this.show" :game_end_infos="game_end_infos"/>
</template>

<script>
import StatsComponent from "./StatsComponent.vue"
export default {
  name: "NavbarComponent",
  components: {
    StatsComponent
  },
  props: {
    game_end_infos: JSON
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    saveGameXml() {
      this.$emit('saveXml')
    },
    saveGameJson() {
      this.$emit('saveJson')
    },
    loadGameXml() {
      this.$emit('loadJson')
    },
    loadGameJson() {
      this.$emit('loadJson')
    },
    undoGame() {
      this.$emit('undoGame')
    },
    redoGame() {
      this.$emit('redoGame')
    },
    rules() {
      this.$emit('rules')
    },
    showStats() {
      this.show = this.show !== true;
    }
  }
}
</script>

<style scoped>
.abstand {
  margin-top: 3rem;
}
.navbuttonstyle {
  background-color: #545b62 !important;
  border-color: #f8f9fa;
}
.hoverevent:hover {
  cursor: pointer;
}
</style>