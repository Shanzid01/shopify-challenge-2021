<template>
  <div id="app" class="content">
    <div class="content">
      <div class="title">
        <h2 class="content-title d-inline-block">
          🎬
          <span class="font-weight-bolder font-size-24">Movie nominations</span>
        </h2>
        <div class="nav-actions">
          <a
            href="https://github.com/Shanzid01/shopify-challenge-2021"
            data-toggle="tooltip"
            data-title="See source code in GitHub"
            data-placement="bottom"
            :class="`btn mr-5 ${isPhone ? 'btn-square btn-sm' : ''}`"
          >
            <i class="fa fa-github-alt font-size-14" />
            {{ isPhone ? "" : "GitHub" }}
          </a>
          <button
            type="button"
            data-toggle="tooltip"
            :data-title="`Toggle ${isDarkModeOn ? 'light' : 'dark'} mode`"
            data-placement="bottom"
            :class="`btn btn-square btn-primary ${isPhone ? 'btn-sm' : ''}`"
            @click="toggleDarkMode"
          >
            <i v-if="isDarkModeOn" class="fa fa-moon-o font-size-16" />
            <i v-else class="fa fa-sun-o font-size-16" />
          </button>
        </div>
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

  windowWidth = window.screen.width;

  get isPhone(): boolean {
    return this.windowWidth <= 600;
  }

  toggleDarkMode() {
    Halfmoon.toggleDarkMode();
    this.isDarkModeOn = Halfmoon.isDarkModeOn();
  }

  mounted() {
    Halfmoon.init();
    this.animateIntoView();
    Halfmoon.setDarkModeDefault();

    window.onresize = () => (this.windowWidth = window.innerWidth);
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

  .nav-actions {
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
  font-family: "Nunito Sans", sans-serif;
}

:root {
  /* Change primary color from blue to indigo */

  --primary-color: #008060;
  --primary-color-light: #004c3f;
  --primary-color-very-light: #95bf473a;
  --dm-alert-primary-bg-color: transparent;
  --dm-alert-primary-border-color: #004c3f;
  --lm-button-primary-outline-color-focus: #95bf47;
  --primary-box-shadow-color-darker: #00806054;
  --dm-input-box-shadow-focus: #00806054;
  --dm-button-alt-bg-color: #3b3e42;
  --dm-button-alt-bg-color-hover: #2e3033;
}

@media only screen and (max-width: 600px) {
  .content,
  .movie-selections-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
