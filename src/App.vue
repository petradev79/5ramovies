<template>
  <header class="header">
    <img src="./assets/logo.png" alt="Logo" class="header__img" />
    <Nav @btn-click="sortMovies" />
    <input
      class="search"
      type="text"
      placeholder="Search"
      v-model="search"
      @keyup.enter="sortMovies('search/movie?query=' + search)"
    />
  </header>

  <div class="container">
    <h1>{{ title }}</h1>
    <div class="movies">
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
      search: '',
      title: '',
      restUrl: '',
      movies: []
    };
  },
  created() {
    this.sortMovies('movie/popular?');
  },
  methods: {
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
        // console.log(data.results);
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
      const date = movie.release_date.split('-')[0];
      const overview = movie.overview;

      return { id, title, img, rating, date, overview };
    }
  }
};
</script>

<style lang="scss">
.header {
  margin-bottom: 10rem;
  padding: 0 3rem;
  background: darken($color-dark-one, 5%);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__img {
    height: 2rem;
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

  &:focus {
    background: $color-dark-one;
    outline: none;
  }

  &::placeholder {
    color: $color-green;
  }
}
</style>
