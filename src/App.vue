<template>
  <header class="header">
    <img src="./assets/logo.png" alt="Logo" class="header__img" />

    <div class="header__icon" v-if="mobileView" @click="isOpen = !isOpen">
      <i class="fas fa-bars" v-if="!isOpen"></i>
      <i class="fas fa-times" v-if="isOpen"></i>
    </div>

    <div class="header__menu" v-if="isOpen">
      <Nav @btn-click="sortMovies" />
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
    <h1 @click="test" v-if="movies.length !== 0">{{ title }}</h1>
    <div class="movies">
      <h1 v-if="movies.length === 0">{{ errMessage }}</h1>
      <Movie :movies="movies" />
    </div>
  </div>
</template>

<script>
import { API_KEY, BASE_URL } from './config.js';
import Nav from './components/Nav.vue';
import Movie from './components/Movie.vue';

export default {
  name: 'App',
  components: { Nav, Movie },
  data() {
    return {
      mobileView: false,
      isOpen: false,
      search: '',
      title: '',
      restUrl: '',
      movies: [],
      errMessage: 'There are no results that match your search'
    };
  },
  created() {
    this.handleView();
    this.sortMovies('movie/popular?');
  },
  methods: {
    ////////////////// START TEST /////////////////
    test() {
      console.log(this.restUrl);
      this.sortMovies(this.restUrl + '&page=2');
      this.title = this.title;
    },
    ////////////////// END TEST /////////////////
    handleView() {
      this.mobileView = window.innerWidth <= 800;
    },
    sortMovies(url, id = '') {
      this.restUrl = url;
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
        // console.log(data);
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

<style lang="scss">
.header {
  position: relative;
  margin-bottom: 10rem;
  padding: 0 3rem;
  height: 6rem;
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
    padding: 3rem;
    background: darken($color-dark-one, 5%);

    .nav {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin-bottom: 3rem;

      &__btn,
      &__menu {
        width: 100%;
      }
    }
  }
}

.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

h1 {
  margin-left: 2rem;
  margin-bottom: 5rem;
  font-size: 3rem;
  letter-spacing: 1.5px;

  @include respond(phone) {
    text-align: center;
    margin: 3rem;
  }
}
</style>
