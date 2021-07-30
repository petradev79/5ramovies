<template>
  <div v-for="movie in movies" :key="movie.id">
    <div class="movie">
      <img :src="imgPath + movie.img" :alt="movie.title" />
      <div class="movie__info">
        <h2 class="movie__title" v-if="movie.title.length > 20">
          {{ movie.title.substring(0, 20) + '...' }}
        </h2>
        <h2 class="movie__title" v-if="movie.title.length <= 20">
          {{ movie.title }}
        </h2>
        <div class="movie__cta">
          <span class="movie__rating">
            <i class="far fa-star" :class="getRating(movie)"></i>
            {{ movie.rating }}/10</span
          >
          <span class="movie__date">
            <i class="far fa-calendar-check"></i>
            {{ movie.date }}</span
          >
        </div>
      </div>
      <div class="movie__overview">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movies'],
  data() {
    return {
      imgPath: 'https://image.tmdb.org/t/p/w500/'
    };
  },
  methods: {
    getRating(movie) {
      if (movie.rating >= 8) {
        return 'green';
      } else if (movie.rating >= 5) {
        return 'purple';
      } else {
        return 'red';
      }
    }
  }
};
</script>

<style lang="scss">
.movie {
  position: relative;
  width: 26rem;
  margin: 2rem;
  background: $color-dark-two;
  border-radius: 0.5rem;
  box-shadow: 5px 7px 7px rgba($color-black, 0.3);
  overflow: hidden;

  img {
    width: 100%;
  }

  &__info {
    padding: 2rem 1rem;
    letter-spacing: 1px;
  }

  &__title {
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }

  &__cta {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    font-weight: 400;
  }

  &__rating {
    padding: 0.5rem 0;
    font-weight: 600;
  }

  &__date {
    padding: 0.5rem 1rem;
    background: $color-dark-one;
  }

  &__overview {
    padding: 2rem 1rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: $color-white;
    color: $color-gray;

    max-height: 100%;
    transform: translateY(100%);
    transition: transform 0.3s ease-in;

    h3 {
      margin-bottom: 1rem;
      font-size: 1.6rem;
      line-height: 1.5;
    }

    p {
      font-size: 1.3rem;
      line-height: 1.5;
    }
  }

  &:hover &__overview {
    transform: translateY(0);
  }
}

.green {
  color: $color-green;
}

.purple {
  color: $color-purple;
}

.red {
  color: $color-red;
}
</style>
