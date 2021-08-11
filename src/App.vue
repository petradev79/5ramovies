<template>
  <header class="header">
    <img src="./assets/logo.png" alt="Logo" class="header__img" />

    <div class="header__icon" v-if="mobileView" @click="isOpen = !isOpen">
      <i class="fas fa-bars" v-if="!isOpen"></i>
      <i class="fas fa-times" v-if="isOpen"></i>
    </div>

    <div class="header__menu" v-if="isOpen">
      <NavPhone @btn-click="sortMovies" />
      <input
        class="search search--mobile"
        type="text"
        placeholder="Search"
        v-model="search"
        @keyup.enter="sortMovies('search/movie?query=' + search)"
      />
    </div>

    <Nav @btn-click="sortMovies" v-if="!mobileView" />
    <input
      class="search"
      type="text"
      placeholder="Search"
      v-model="search"
      @keyup.enter="sortMovies('search/movie?query=' + search)"
      v-if="!mobileView"
    />
  </header>

  <div class="container">
    <h1 v-if="movies.length !== 0">{{ title }}</h1>
    <div class="movies flex-center-wrap">
      <h1 v-if="movies.length === 0">{{ errMessage }}</h1>
      <Movie :movies="movies" />
    </div>
    <div class="pagination flex-center-center">
      <span
        class="page"
        :class="currentPages === 5 ? 'disabled' : ''"
        @click="prevPages"
        >prev 10 pages</span
      >
      <Page
        @btn-click="changePage"
        :totalPages="totalPages"
        :currentPages="currentPages"
      />
      <span
        class="page"
        :class="currentPages >= totalPages - 5 ? 'disabled' : ''"
        @click="nextPages"
        >next 10 pages</span
      >
    </div>

    <p class="copyright">
      <span>Designed and Developed by Ivan Petrović.</span> Copyright &copy;
      2021 5ramovies. All rights reserved.
    </p>
  </div>
</template>

<script>
import { API_KEY, BASE_URL } from './config.js';
import Nav from './components/Nav.vue';
import NavPhone from './components/NavPhone.vue';
import Movie from './components/Movie.vue';
import Page from './components/Page.vue';

export default {
  name: 'App',
  components: { Nav, NavPhone, Movie, Page },
  data() {
    return {
      mobileView: false,
      isOpen: false,
      search: '',
      titleParam: '',
      title: '',
      restUrl: '',
      movies: [],
      totalPages: 0,
      currentPages: 5,
      errMessage: 'There are no results that match your search'
    };
  },
  created() {
    this.handleView();
    this.sortMovies('movie/popular?');
  },
  methods: {
    prevPages() {
      if (this.currentPages === 5) return;
      this.currentPages -= 10;
    },
    nextPages() {
      if (this.currentPages >= this.totalPages - 5) return;
      this.currentPages += 10;
    },
    changePage(page) {
      this.sortMovies(this.restUrl + `&page=${page}`, this.titleParam);
    },
    handleView() {
      this.mobileView = window.innerWidth <= 800;
    },
    sortMovies(url, id = '') {
      this.restUrl = url;
      this.titleParam = id;
      if (url.includes('popular')) this.title = 'Most Popular Movies';
      if (url.includes('top')) this.title = 'Top Rated Movies';
      if (url.includes('year')) this.title = `Movies Release ${id}`;
      if (url.includes('genres')) this.title = `${id} Movies`;
      if (url.includes('search'))
        this.title = `Movies Search by ${this.search.charAt(0).toUpperCase() +
          this.search.slice(1)}`;
      this.getMovies();
      this.search = '';
    },
    async getMovies() {
      try {
        const res = await fetch(
          `${BASE_URL}${this.restUrl}&api_key=${API_KEY}`
        );
        if (!res.ok) throw new Error(`${this.errMessage} (${res.status})`);
        const data = await res.json();
        this.movies = data.results.map(this.generateMovie);
        this.totalPages = data.total_pages;
        console.log(data);
        // console.log(this.movies);
      } catch (err) {
        console.log(err.message);
      }
    },
    generateMovie(movie) {
      const id = movie.id;
      const title = movie.title;
      const img = movie.poster_path;
      const rating = movie.vote_average;
      const date = movie.release_date?.split('-')[0];
      const overview = movie.overview;

      return { id, title, img, rating, date, overview };
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  padding: 0 3rem;
  height: 6rem;
  width: 100%;
  background: darken($color-dark-one, 5%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  &__img {
    height: 2rem;
  }

  &__icon {
    font-size: 2rem;
  }

  &__menu {
    position: absolute;
    top: 6rem;
    left: 0;
    width: 100%;
    height: 100vh;
    padding: 3rem;
    background: darken($color-dark-one, 5%);
  }
}

.search {
  background: transparent;
  color: $color-white;
  border: 2px solid $color-dark-one;
  padding: 0.7rem 2rem;
  border-radius: 5rem;
  font-family: inherit;
  font-size: 1.4rem;

  &--mobile {
    width: 100%;
  }

  &:focus {
    background: $color-dark-one;
    outline: none;
  }

  &::placeholder {
    color: $color-green;
  }
}

.pagination {
  margin: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid darken($color-dark-one, 5%);
  flex-wrap: wrap;
}

.page {
  padding: 1rem;
  margin: 0.5rem;
  background: darken($color-dark-one, 5%);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: $color-dark-two;
  }
}

.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
