<template>
  <nav class="nav">
    <button class="nav__btn" @click="onClick('movie/popular?')">
      popular
    </button>

    <button class="nav__btn" @click="onClick('movie/top_rated?')">
      top rated
    </button>

    <button class="nav__btn" @click="genres.isOpen = !genres.isOpen">
      genres <i class="fas fa-caret-down"></i>
      <div class="nav__menu" v-if="genres.isOpen">
        <div v-for="genre in genres.results" :key="genre.id">
          <button
            class="nav__btn"
            @click="
              onClick('discover/movie?with_genres=' + genre.id, genre.name)
            "
          >
            {{ genre.name }}
          </button>
        </div>
      </div>
    </button>

    <button class="nav__btn" @click="years.isOpen = !years.isOpen">
      years <i class="fas fa-caret-down"></i>
      <div class="nav__menu" v-if="years.isOpen">
        <div v-for="year in years.results" :key="year">
          <button
            class="nav__btn"
            @click="
              onClick('discover/movie?primary_release_year=' + year, year)
            "
          >
            {{ year }}
          </button>
        </div>
      </div>
    </button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      // prettier-ignore
      genres: {
        isOpen: false,
        results: [{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}]
      },
      // prettier-ignore
      years: {
        isOpen: false,
        results: [2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000]

      }
    };
  },
  methods: {
    onClick(url, titleParam) {
      this.$emit('btn-click', url, titleParam);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  &__btn {
    position: relative;
    width: 15rem;
    height: 6rem;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    background: transparent;
    color: darken($color-white, 15%);
    border: none;
    cursor: pointer;

    &:hover {
      background: $color-dark-two;
      color: $color-white;
    }

    i {
      font-size: 1.4rem;
      margin-left: 0.3rem;
    }
  }

  &__menu {
    position: absolute;
    background: $color-dark-two;
    top: 100%;
    z-index: 1;

    .nav__btn {
      height: 3.5rem;
    }
  }
}
</style>
