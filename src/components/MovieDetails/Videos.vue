<template>
  <div class="videos" v-if="movie.videos?.length > 0">
    <span class="go prev" v-if="showVideo !== 0" @click="showVideo--">
      <i class="fas fa-chevron-left"></i>
    </span>
    <div
      class="video"
      :class="showVideo === i ? 'show' : ''"
      v-for="(key, i) in movie.videos"
      :key="i"
    >
      <iframe
        width="860"
        height="485"
        :src="`https://www.youtube.com/embed/${key}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <span
      class="go next"
      v-if="showVideo !== movie.videos.length - 1"
      @click="showVideo++"
    >
      <i class="fas fa-chevron-right"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: ['movie'],
  data() {
    return {
      showVideo: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.videos {
  position: relative;
  display: inline-block;

  &:hover .go {
    display: block;
    cursor: pointer;
  }
}
.go {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: none;

  i {
    font-size: 5rem;
    color: lighten($color-gray, 10%);
  }
}

.prev {
  left: 1rem;
}

.next {
  right: 1rem;
}

.video {
  display: none;
}
.show {
  display: inline-block;
}
</style>
