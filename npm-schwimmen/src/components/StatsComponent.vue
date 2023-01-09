<template>
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
      <div v-for="item in game_end_infos" :key="item.player_name">
        <tr>
          <td>
            {{item.player_name}}
          </td>
          <td>
            {{item.player_has_knoked}}
          </td>
          <td>
            {{item.player_life}}
          </td>
        </tr>
      </div>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "StatsComponent",
  props: {
    game_end_infos: JSON
  },
}
</script>

<style scoped>

</style>