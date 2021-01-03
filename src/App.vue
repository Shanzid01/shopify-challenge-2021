<template>
  <div id="app" class="content">
    <div class="content">
      <h2 class="content-title">
        👑
        <span class="font-weight-bolder font-size-22">Movie nominations</span>
      </h2>
      <div
        v-if="nominees.length === maxNominees"
        class="alert alert-primary mb-10 d-inline-block"
        role="alert"
      >
        Thank you for choosing your nominations!
      </div>
      <div>
        <div class="movie-selections-container">
          <MovieSelection
            class="movie-selection"
            v-for="n in maxNominees"
            :key="n"
            :id="`movie-${n}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Halfmoon from "@/helpers/Halfmoon.ts";
import MovieSelection from "@/components/MovieSelection.vue";
import gsap from "gsap";
import NomineeModule from "./store/modules/NomineeModule";

require("halfmoon/css/halfmoon-variables.min.css");

@Component({ components: { MovieSelection } })
export default class App extends Vue {
  maxNominees = 5;

  mounted() {
    Halfmoon.init();
    this.animateIntoView();
  }

  animateIntoView() {
    const selections = document.querySelectorAll(".movie-selection");
    let delay = 0;
    for (const i in selections) {
      gsap.fromTo(
        selections[i],
        {
          top: 10,
          opacity: 0,
        },
        {
          opacity: 1,
          top: 0,
          duration: 0.12,
          delay,
        }
      );
      delay += 0.1;
    }
  }

  get nominees() {
    return NomineeModule.nominees;
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

@media only screen and (max-width: 600px) {
  .content,
  .movie-selections-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .content-title {
    text-align: center;
  }
}
</style>
