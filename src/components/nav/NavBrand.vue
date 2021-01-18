<template>
  <a class="navbar-brand mx-3" href="/"
    ><img :src="require(`@/assets/images/${logo_path}.png`)" :alt="logo_alt" /> {{extra_name}}
  </a>
</template>

<script>
export default {
  name: "NavBrand",
  props: {
    logo_path: String,
    logo_alt: String,
    extra_name: String,
  },
  methods: {
    resolve_img_url: function (path) {
      let images = require.context('@/assets/images/', false, /\.png$|\.jpg$/)
      return images("@/"+path)
    }
  }
};
</script>

<style scoped>
</style>