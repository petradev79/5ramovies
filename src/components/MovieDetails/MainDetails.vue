<template>
  <div class="main-details">
    <div class="top">
      <div>
        <div class="top__title">{{ movie.title }}</div>
        <div>
          <span class="top__dt">{{ movie.date }}</span>
          <i class="fas fa-ellipsis-h separator"></i>
          <span class="top__dt">{{ movie.runtime }}</span>
        </div>
      </div>
      <div class="flex-center-center">
        <div class="top__rating">
          <h3>TMDB Rating</h3>
          <div class="top__cta">
            <i class="fas fa-star"></i> {{ movie.rating }}<span>/10</span>
          </div>
        </div>
        <div class="top__rating">
          <h3>User votes</h3>
          <div class="top__cta">
            <i class="fas fa-poll"></i> {{ movie.votes }}
          </div>
        </div>
        <div class="top__rating">
          <h3>Popularity</h3>
          <div class="top__cta">
            <i class="fas fa-sort-amount-up-alt"></i> {{ movie.popularity }}
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="genres">
        <span v-for="(genre, i) in movie.genres" :key="i">{{ genre }}</span>
      </div>
      <div class="videos">{{ movie.videos?.length }} Videos</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie']
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &__title {
    margin-bottom: 1rem;
    font-size: 3rem;
    font-weight: 600;
    letter-spacing: 2px;
  }

  &__dt {
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    color: darken($color-white, 20%);
  }

  .separator {
    margin: 0 1rem;
  }

  &__rating {
    margin-left: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;

    h3 {
      margin-bottom: 1rem;
      font-size: 1.4rem;
      text-transform: uppercase;
      color: darken($color-white, 20%);
    }
  }

  &__cta {
    font-size: 1.5rem;

    i {
      margin-right: 0.5rem;
    }

    .fa-star {
      color: #ffaa00;
    }

    .fa-poll {
      color: $color-purple;
    }

    .fa-sort-amount-up-alt {
      color: $color-green;
    }

    span {
      color: darken($color-white, 20%);
    }
  }
}

.bottom {
  margin: 2rem 0;
  padding: 2rem;
  background: lighten($color-dark-two, 5%);
  border-radius: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .genres {
    span {
      margin-right: 1rem;
      font-size: 1.2rem;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

  .videos {
    font-size: 1.4rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}
</style>
