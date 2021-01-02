<template>
  <div class="movie-selection-container">
    <div :id="id" class="empty-selection" @click="openSearch">
      <span class="text-muted font-weight-bold font-size-12">
        <i class="fa fa-plus text-muted" />
        Choose nominee
      </span>
      <SearchModal
        v-if="isSearchOpen"
        @close="closeSearch"
        :id="`search-${this.id}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SearchModal from "./SearchModal.vue";
import { gsap } from "gsap";

@Component({ components: { SearchModal } })
export default class MovieSelection extends Vue {
  @Prop({ required: true }) readonly id!: string;
  isSearchOpen = false;

  openSearch() {
    this.isSearchOpen = true;
  }

  closeSearch() {
    this.isSearchOpen = false;
  }
}
</script>

<style lang="scss" scoped>
.movie-selection-container {
  width: 200px;
  height: 260px;
  display: inline-block;
  margin: 0px 15px 15px 0px;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
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
  }
}
</style>
