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
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown1" role="button" >Game</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
            <a class="dropdown-item btn-save" id="save-xml" @click="saveGameXml" >Save Xml</a>
            <a class="dropdown-item btn-save" id="save-json" @click="saveGameJson" >Save Json</a>
            <a class="dropdown-item btn-load" id="load-xml" @click="loadGameXml" >Load Xml</a>
            <a class="dropdown-item btn-load" id="load-json" @click="loadGameJson" >Load Json</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown2" role="button" >Edit</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
            <a type="button" class="dropdown-item btn-undo" id="undo-click" @click="undoGame" >Undo</a>
            <a type="button" class="dropdown-item btn-redo" id="redo-click" @click="redoGame" >Redo</a>
          </div>
        </li>
        <li>
          <button @click="showStats" class="btn btn-primary navbuttonstyle" type="button" >
            Stats
          </button>
        </li>
      </ul>
    </div>
  </nav>
  <div style="margin-top: 5em; margin-left: 2em">
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="collapse multi-collapse" id="multiCollapseExample1">
          <div class="card card-body">
            <table class="table navtable">
              <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">HasKnocked</th>
                <th scope="col">Lives</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
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
      this.$emit('showStats')
    }
  }
}
</script>

<style scoped>
.navbuttonstyle {
  background-color: #545b62 !important;
  border-color: #f8f9fa;
}
.hoverevent:hover {
  cursor: pointer;
}
</style>