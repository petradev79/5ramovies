<template>
  <div class="pagination flex-center-center">
    <span
      class="page page--text flex-center-center"
      v-if="currentPage != 1"
      @click="onClick(1)"
      >First</span
    >
    <span
      class="page flex-center-center"
      v-if="currentPage != 1"
      @click="onClick(currentPage - 1)"
    >
      <i class="fas fa-angle-double-left"></i>
    </span>
    <span
      :class="currentPage === page ? 'active' : ''"
      class="page flex-center-center"
      v-for="page in pageButtons(totalPages, 20, currentPage)"
      :key="page"
      @click="onClick(page)"
    >
      {{ page }}
    </span>
    <span
      class="page  flex-center-center"
      v-if="currentPage != Math.ceil(totalPages / 20)"
      @click="onClick(currentPage + 1)"
    >
      <i class="fas fa-angle-double-right"></i>
    </span>
    <span
      class="page page--text flex-center-center"
      v-if="currentPage != Math.ceil(totalPages / 20)"
      @click="onClick(Math.ceil(totalPages / 20))"
      >Last</span
    >
  </div>
</template>

<script>
export default {
  props: ['totalPages', 'currentPage'],
  methods: {
    onClick(page) {
      this.$emit('btn-click', page);
    },
    pageButtons(total, max, current) {
      let beforePages;
      let afterPages;
      let pages = Math.ceil(total / max);

      if (current === 1) {
        beforePages = [];
        afterPages = [current + 1, current + 2, current + 3, current + 4];
      } else if (current === 2) {
        beforePages = [current - 1];
        afterPages = [current + 1, current + 2, current + 3];
      } else if (current === pages) {
        beforePages = [current - 4, current - 3, current - 2, current - 1];
        afterPages = [];
      } else if (current === pages - 1) {
        beforePages = [current - 3, current - 2, current - 1];
        afterPages = [current + 1];
      } else {
        beforePages = [current - 2, current - 1];
        afterPages = [current + 1, current + 2];
      }
      return [...beforePages, current, ...afterPages];
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin: 2rem;
}

.page {
  font-size: 1.2rem;
  width: 4rem;
  height: 4rem;
  border: 1px solid lighten($color-dark-one, 5%);
  cursor: pointer;

  &:not(.active):hover {
    background: lighten($color-dark-one, 5%);
  }

  &--text {
    width: auto;
    padding: 0 2rem;
  }
}

.active {
  background: $color-dark-two;
}
</style>
