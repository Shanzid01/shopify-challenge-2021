<template>
  <div id="app" class="content">
    <div class="content">
      <h2 class="content-title">
        👑
        <span class="font-weight-bolder font-size-22">Movie nominations</span>
      </h2>
      <div>
        <div class="movie-selections-container">
          <MovieSelection v-for="n in 5" :key="n" :id="`movie-${n}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Halfmoon from "@/helpers/Halfmoon.ts";
import MovieSelection from "@/components/MovieSelection.vue";
require("halfmoon/css/halfmoon-variables.min.css");

@Component({ components: { MovieSelection } })
export default class App extends Vue {
  mounted() {
    Halfmoon.init();
  }
}
</script>

<style lang="scss">
.movie-selections-container {
  display: flex;
  flex-wrap: wrap;
}

* {
  -webkit-tap-highlight-color: transparent;
}
</style>
