<template>
  <div v-for="page in pageNumber(totalPages, 10, currentPages)" :key="page">
    <div
      @click="onClick(page)"
      class="page flex-center-center"
      :class="{ active: page === active }"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['totalPages', 'currentPages'],
  emits: ['btn-click'],
  data() {
    return {
      active: 1
    };
  },
  methods: {
    onClick(page) {
      this.$emit('btn-click', page);
      this.active = page;
    },
    pageNumber(total, max, cur) {
      const half = Math.round(max / 2);
      let to = max;

      if (cur + half >= total) {
        to = total;
      } else if (cur > half) {
        to = cur + half;
      }

      let from = to - max;

      return Array.from({ length: max }, (_, i) => i + 1 + from);
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 3rem;
  height: 3rem;
  margin: 0.5rem;
  background: darken($color-dark-one, 5%);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: $color-dark-two;
  }
}

.active {
  background: $color-dark-two;
}
</style>
