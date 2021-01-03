<template>
  <div class="movie-selection-container">
    <Nominee
      v-if="movie"
      :movieID="movie.imdbID"
      @deleteNominee="deleteNominee"
    />
    <div v-else :id="id" class="empty-selection" @click="openSearch">
      <span class="text-muted font-weight-bold font-size-14">
        <i class="fa fa-plus text-muted" />
        Choose nominee
      </span>
      <SearchModal
        v-if="isSearchOpen"
        @close="closeSearch"
        :id="`search-${this.id}`"
        @movieSelected="movieSelected"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SearchModal from "./SearchModal.vue";
import { gsap } from "gsap";
import NomineeModule from "@/store/modules/NomineeModule";
import Nominee from "@/components/Nominee.vue";

@Component({ components: { SearchModal, Nominee } })
export default class MovieSelection extends Vue {
  @Prop({ required: true }) readonly id!: string;
  isSearchOpen = false;

  movie: any = null;

  openSearch() {
    this.isSearchOpen = true;
  }

  closeSearch() {
    this.isSearchOpen = false;
  }

  mounted() {
    const memory = localStorage.getItem(this.id);
    if (memory != null) {
      this.movie = JSON.parse(memory);
      NomineeModule.addNominee(this.movie);
    }
  }

  movieSelected(movieID: string) {
    this.movie = NomineeModule.nominees.find(
      (movie: any) => movie.imdbID === movieID
    );
    localStorage.setItem(this.id, JSON.stringify(this.movie));
  }

  deleteNominee() {
    this.movie = null;
    this.closeSearch();
    localStorage.removeItem(this.id);
  }
}
</script>

<style lang="scss" scoped>
.movie-selection-container {
  width: 300px;
  height: 400px;
  margin: 0px 15px 15px 0px;
  border-radius: 10px;
  position: relative;
  transition: all 120ms ease;

  &:hover {
    -webkit-box-shadow: 0px 0px 31px -10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0px 31px -10px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 31px -10px rgba(0, 0, 0, 0.1);
  }

  .empty-selection {
    height: 100%;
    width: 100%;
    background: rgba(129, 125, 125, 0.07);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }
}

@media only screen and (max-width: 600px) {
  .movie-selection-container {
    margin-right: 7px;
    margin-left: 7px;
  }
}
</style>
