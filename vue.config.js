module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "@/scss/_variables.scss";
        @import "@/scss/_general.scss";
        @import "@/scss/_mixins.scss";
        `
      }
    }
  }
};
