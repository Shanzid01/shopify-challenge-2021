<template>
  <div class="w-300 mw-full d-inline-block">
    <div
      :class="`card p-0 m-5 movie-card ${isNominee ? 'nominee-selected' : ''}`"
      @click="selectNominee"
    >
      <img
        :src="posterURL"
        class="img-fluid rounded-top poster-image"
        :alt="`poster-${movieName}`"
      />
      <div class="content ml-15 mr-15 mb-10 mt-5">
        <span
          class="font-weight-medium font-size-18 w-200 d-inline-block text-truncate"
        >
          {{ movieName }}
        </span>
        <span class="text-muted font-size-16 d-block">
          {{ movieYear }}
        </span>
        <div class="text-right">
          <button class="btn" :disabled="isNominee" @click="selectNominee">
            {{ isNominee ? "Nominated" : "Nominate" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import NomineeModule from "@/store/modules/NomineeModule.ts";

@Component
export default class SearchItem extends Vue {
  @Prop({ default: "N/A" }) readonly movieName!: string;
  @Prop({ default: "N/A" }) readonly movieYear!: string;
  @Prop({ default: "N/A" }) readonly moviePoster!: string;
  @Prop({ default: "N/A" }) readonly movieID!: string;

  fallbackPoster =
    "https://images.vexels.com/media/users/3/205332/isolated/preview/53b0ac1b3ac1a8bbae6d61c3f1c2fa16-film-reel-black-by-vexels.png";

  get posterURL() {
    if (this.moviePoster == null || this.moviePoster === "N/A") {
      return this.fallbackPoster;
    } else {
      return this.moviePoster;
    }
  }

  get isNominee() {
    return NomineeModule.nominees.find(
      (nominee: any) => nominee["imdbID"] === this.movieID
    ) === undefined
      ? false
      : true;
  }

  selectNominee() {
    if (!this.isNominee) {
      this.$emit("selectNominee", this.movieID);
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-card {
  cursor: pointer;

  .poster-image {
    width: 300px;
    height: 400px;
    object-fit: cover;
  }
}

.nominee-selected {
  border: 5px solid #1eda69;
  border-radius: 8px;
  cursor: not-allowed;
}
</style>
