<template>
  <div class="nominee">
    <img :src="posterURL" :alt="`poster-${nomineeTitle}`" class="poster" />
    <div class="nominee-info">
      <div class="backdrop" />
      <span class="font-weight-semi-bold font-size-18">{{ nomineeTitle }}</span>
      <span>&nbsp;({{ nomineeYear }})</span>
    </div>
  </div>
</template>

<script lang="ts">
import NomineeModule from "@/store/modules/NomineeModule";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Nominee extends Vue {
  @Prop({ default: "N/A" }) readonly movieID!: string;

  fallbackPoster =
    "https://images.vexels.com/media/users/3/205332/isolated/preview/53b0ac1b3ac1a8bbae6d61c3f1c2fa16-film-reel-black-by-vexels.png";

  get nominee() {
    return NomineeModule.nominees.find(
      (nominees) => nominees["imdbID"] === this.movieID
    );
  }

  get posterURL() {
    if (this.nominee["Poster"] == null || this.nominee["Poster"] === "N/A") {
      return this.fallbackPoster;
    } else {
      return this.nominee["Poster"];
    }
  }

  get nomineeTitle() {
    return this.nominee["Title"];
  }

  get nomineeYear() {
    return this.nominee["Year"];
  }
}
</script>

<style lang="scss" scoped>
.nominee {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .poster {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .nominee-info {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
    min-height: 50px;
    padding: 20px 20px 10px 20px;
    color: white;

    .backdrop {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      background: linear-gradient(
        0deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(0, 0, 1, 0.8) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      z-index: 99;
    }

    span {
      position: relative;
      z-index: 100;
    }
  }
}
</style>
