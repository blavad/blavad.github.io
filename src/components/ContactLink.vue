<template>
  <div :class="'logo logo-' + name.toLowerCase()" class="col-6 col-md-3 p-2">
    <a class="stretched-link" :href="url"></a>
    <i :class="fa_icon" class="fa-3x"></i>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "ContactLink",
  props: {
    name: String,
    text: String,
    url: String,
    fa_icon: String,
  },
  computed: {
    
  }
};
</script>

<style scoped>
</style>