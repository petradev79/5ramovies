<template>
  <div class="container">
    <MainDetails :movie="movie" />
    <div class="test">
      <div class="poster">
        <img :src="movie.img" alt="movie.title" />
      </div>
      <Videos :movie="movie" />
    </div>
  </div>
</template>

<script>
import { API_KEY, BASE_URL } from '../config.js';
import MainDetails from '../components/MovieDetails/MainDetails.vue';
import Videos from '../components/MovieDetails/Videos.vue';

export default {
  components: { MainDetails, Videos },
  data() {
    return {
      id: this.$route.params.id,
      movie: {}
    };
  },
  created() {
    this.getMovie();
  },
  methods: {
    async getMovie() {
      try {
        const res = await fetch(
          `${BASE_URL}movie/${this.id}?api_key=${API_KEY}&append_to_response=videos`
        );
        if (!res.ok) throw new Error(`${this.errMessage} (${res.status})`);
        const data = await res.json();
        this.generateMovie(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    },
    generateMovie(movie) {
      this.movie = {
        title: movie.title,
        date: movie.release_date?.split('-')[0],
        runtime: `${Math.floor(movie.runtime / 60)}h ${
          movie.runtime % 60 !== 0 ? (movie.runtime % 60) + 'min' : ''
        }`,
        rating: movie.vote_average,
        votes: movie.vote_count,
        popularity: movie.popularity,
        genres: movie.genres.map(g => g.name),
        img: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
        videos: movie.videos.results.map(p => p.key),
        tagline: movie.tagline,
        overview: movie.overview,
        budget: movie.budget,
        revenue: movie.revenue,
        homepage: movie.homepage,
        production: movie.production_companies.map(v => v.name)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  display: flex;
  justify-content: space-between;
}

.poster {
  height: 485px;

  img {
    height: 100%;
  }
}
</style>
