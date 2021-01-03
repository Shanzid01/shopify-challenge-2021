<template>
  <div id="app" class="content">
    <div class="content">
      <div class="title">
        <h2 class="content-title d-inline-block">
          👑
          <span class="font-weight-bolder font-size-22">Movie nominations</span>
        </h2>
        <button
          type="button"
          class="btn btn-square btn-primary btn-sm"
          @click="toggleDarkMode"
        >
          <i v-if="isDarkModeOn" class="fa fa-moon-o font-size-16" />
          <i v-else class="fa fa-sun-o font-size-16" />
        </button>
      </div>
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

  isDarkModeOn = Halfmoon.isDarkModeOn();

  toggleDarkMode() {
    Halfmoon.toggleDarkMode();
    this.isDarkModeOn = Halfmoon.isDarkModeOn();
  }

  mounted() {
    Halfmoon.init();
    this.animateIntoView();
    Halfmoon.setDarkModeDefault();
  }

  animateIntoView() {
    const selections = document.querySelectorAll(".movie-selection");
    let delay = 0.3;
    for (const i in selections) {
      gsap.fromTo(
        selections[i],
        {
          top: 20,
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
.title {
  width: 100%;

  button {
    float: right;
  }
}

.movie-selections-container {
  display: flex;
  flex-wrap: wrap;

  .movie-selection {
    opacity: 0;
  }
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
