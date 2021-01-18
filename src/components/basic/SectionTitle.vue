<template>
  <div class="section-title col text-center">
    <a v-if="link" class="stretched-link" :href="link"></a>
    <h2 class="d-inline section-title"> {{ title }} </h2> 
    <i v-if="link" class="d-inline fa fa-angle-double-right fa-2x px-2"></i>
    <hr />
  </div>
</template>

<script>
export default {
  name: "SectionTitle",
  props: {
    title: String,
    link: String,
  },
};
</script>

<style scoped>
.section-title {
  text-shadow: 2px 2px 0 rgb(100, 100, 100);
}
</style>