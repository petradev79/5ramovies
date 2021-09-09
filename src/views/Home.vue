<template>
  <div class="container">
    <h1 v-if="movies.length !== 0">{{ title }}</h1>
    <div class="movies flex-center-wrap">
      <div class="error-wrapper" v-if="movies.length === 0">
        <h1>{{ errMessage }}</h1>
      </div>
      <Movie :movies="movies" />
    </div>

    <Pagination
      v-if="movies.length !== 0"
      :totalPages="totalPages"
      :currentPage="currentPage"
      @btn-click="changePage"
    />

    <p class="copyright">
      <span>Designed and Developed by Ivan Petrović.</span> Copyright &copy;
      2021 5ramovies. All rights reserved.
    </p>
  </div>
</template>

<script>
import Movie from '../components/Movie.vue';
import Pagination from '../components/Pagination.vue';
import Loader from '../components/Loader.vue';

export default {
  name: 'App',
  components: { Movie, Pagination, Loader },
  props: ['movies', 'totalPages', 'currentPage', 'title', 'errMessage'],
  emits: ['chooseMovie'],
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    }
  }
};
</script>
