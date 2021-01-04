<template>
  <div :id="id" class="search-window-container">
    <div class="action-buttons">
      <button class="btn" @click="closeModal" type="button">
        <i class="fa fa-times" />
      </button>
    </div>
    <div class="main-content">
      <form
        class="search-input-container form-inline"
        v-on:submit.prevent="getMoviesByTitle"
      >
        <input
          :id="`text-${id}`"
          type="text"
          class="form-control form-control-lg"
          placeholder="Search a movie"
          v-model="searchQuery"
          :disabled="this.loading"
          autocomplete="off"
        />
        <button
          class="btn btn-primary btn-lg"
          type="submit"
          :disabled="this.loading"
        >
          <i :class="`fa ${loading ? 'fa-spinner spin' : 'fa-search'}`" />
        </button>
      </form>
      <div class="search-results">
        <img
          src="@/assets/search-message.svg"
          class="search-message"
          v-if="!searchResults || searchResults.length === 0"
          alt="Search results will appear here"
        />
        <SearchItem
          v-else
          v-for="movie in searchResults"
          :key="movie.imdbID"
          :movieName="movie.Title"
          :moviePoster="movie.Poster"
          :movieYear="movie.Year"
          :movieID="movie.imdbID"
          @selectNominee="selectNominee"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gsap from "gsap";
import { Vue, Component, Prop } from "vue-property-decorator";
import SearchModule from "@/store/modules/SearchModule.ts";
import SearchItem from "@/components/SearchItem.vue";
import NomineeModule from "@/store/modules/NomineeModule";

@Component({ components: { SearchItem } })
export default class SearchModal extends Vue {
  @Prop({ required: true }) readonly id!: string;
  parentNode: any = null;
  animDuration = 0.17;

  searchQuery = "";
  loading = false;

  get searchResults() {
    return SearchModule.searchHistory.get(this.searchQuery);
  }

  mounted() {
    this.registerEscape();

    const html = document.querySelector("html");
    if (html != null) {
      html.style.overflow = "hidden";
    }

    this.parentNode = document.getElementById(this.id)?.parentElement;

    const parentNodeDimension = this.parentNode.getBoundingClientRect();
    gsap
      .fromTo(
        `#${this.id}`,
        {
          opacity: 0,
          width: parentNodeDimension?.width,
          height: parentNodeDimension?.height,
          x: parentNodeDimension?.x,
          y: parentNodeDimension?.y,
          scale: 0,
        },
        {
          opacity: 1,
          width: window.innerWidth,
          height: window.innerHeight,
          x: 0,
          y: 0,
          duration: this.animDuration,
          scale: 1,
        }
      )
      .then(() => {
        document.getElementById(`text-${this.id}`)?.focus();
      });
  }

  closeModal() {
    const html = document.querySelector("html");
    if (html != null) {
      html.style.overflow = "auto";
    }

    const parentNodeDimension = this.parentNode.getBoundingClientRect();
    gsap
      .to(`#${this.id}`, this.animDuration, {
        opacity: 0,
        width: parentNodeDimension?.width,
        height: parentNodeDimension?.height,
        x: parentNodeDimension?.x,
        y: parentNodeDimension?.y,
        scale: 0.5,
      })
      .then(() => {
        this.$emit("close");
      });
  }

  registerEscape() {
    document.onkeydown = (evt: any) => {
      evt = evt || window.event;
      let isEscape = false;
      if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
      } else {
        isEscape = (evt as any).keyCode === 27;
      }
      if (isEscape) {
        this.closeModal();
      }
    };
  }

  async getMoviesByTitle() {
    this.loading = true;
    await SearchModule.getMovieByTitle(this.searchQuery);
    this.loading = false;
  }

  selectNominee(movieID: string) {
    const movie = this.searchResults.find(
      (movie: any) => movie.imdbID === movieID
    );
    NomineeModule.addNominee(movie);
    this.$emit("movieSelected", movieID);
    this.closeModal();
  }
}
</script>

<style lang="scss" scoped>
.dark-mode .search-window-container {
  background: #191c20;
}

.search-window-container {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  overflow: auto;
  cursor: default;
  background: #fff;

  .action-buttons {
    width: 100%;
    padding: 10px 20px 20px 20px;
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    justify-content: flex-end;

    button {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .main-content {
    padding: 10px 20px 0px 20px;
    box-sizing: border-box;

    .search-input-container {
      min-width: 55vw;
      max-width: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0px auto;

      input[type="text"] {
        margin-right: 0px !important;
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
        max-width: 400px;
      }

      button {
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
        width: 30px;
        display: flex;
      }
    }
  }

  .search-results {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .search-message {
      opacity: 0.3;
      margin-top: 10vh;
      max-width: 200px;
    }
  }
}

button {
  justify-content: center;
  align-items: center;
}

.spin {
  animation: rotation 1.5s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
