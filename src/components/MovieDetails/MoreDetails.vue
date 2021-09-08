<template>
  <div class="more">
    <div class="more__left">
      <div class="overview">
        <div class="tagline">{{ movie.tagline }}</div>
        <p>{{ movie.overview }}</p>
      </div>
      <div class="cast">
        <div class="cast__title" @click="seeFullCast = !seeFullCast">
          See Full Cast
          <i v-if="seeFullCast" class="fas fa-caret-up"></i>
          <i v-if="!seeFullCast" class="fas fa-caret-down"></i>
        </div>
        <div v-if="seeFullCast">
          <div class="actor" v-for="actor in movie.cast" :key="actor">
            <div class="actor__name">
              <img
                class="actor__img"
                :src="
                  actor?.img !== null
                    ? 'https://image.tmdb.org/t/p/w45/' + actor.img
                    : 'https://via.placeholder.com/45'
                "
                :alt="actor.name"
              />

              <span>{{ actor.name }}</span>
            </div>

            <div class="actor__role">
              <i class="fas fa-ellipsis-h separator"></i>
              {{ actor.character }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more__right">
      <div class="productions">
        <div class="productions__title">Production companies</div>
        <div
          class="production"
          v-for="production in movie.production"
          :key="production"
        >
          {{ production }}
        </div>
      </div>
      <div class="budget">
        <div>
          Movie budget
        </div>
        <div>${{ movie.budget }}</div>
      </div>
      <div class="revenue">
        <div>
          Movie revenue
        </div>
        <div>${{ movie.revenue }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie'],
  data() {
    return {
      seeFullCast: false
    };
  }
};
</script>

<style lang="scss" scoped>
.more {
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;

  @include respond(phone) {
    flex-direction: column-reverse;
    margin: 0 2rem;
  }

  &__left {
    width: 50%;

    @include respond(phone) {
      width: 100%;
    }
  }
}

.overview {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid lighten($color-dark-two, 5%);

  p {
    font-size: 1.2rem;
    letter-spacing: 1px;
    line-height: 1.6;
  }
}

.productions__title,
.cast__title {
  margin-bottom: 2rem;
  width: max-content;
  font-size: 1.4rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: darken($color-white, 20%);
  cursor: pointer;
}

.tagline {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.actor {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 1.4rem;

  &__img {
    width: 2.5rem;
    margin-right: 1rem;

    img {
      width: 100%;
    }
  }

  &__role {
    text-align: left;
    flex-basis: 50%;
    width: max-content;

    display: flex;
    align-items: flex-end;

    i {
      margin-right: 1rem;
    }
  }
}

.productions {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid lighten($color-dark-two, 5%);
}

.production {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  letter-spacing: 1px;
}

.revenue,
.budget {
  margin-bottom: 2rem;
  font-size: 1.4rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  @include respond(phone) {
    padding-bottom: 2rem;
    border-bottom: 1px solid lighten($color-dark-two, 5%);
  }
}
</style>
