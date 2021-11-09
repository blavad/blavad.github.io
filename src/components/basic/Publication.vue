<template>
  <div class="publication px-4 py-2 bg-light text-dark">
    <span v-if="url" class="publication-title">
      <a :href="url">{{ title }}</a>
    </span>
    <span v-else class="publication-title">{{ title }}</span
    >, <span class="pauthors">{{ authors }}</span
    >,
    <span class="pdate">[{{ date }}]</span>
    <p class="pabstract">{{ abstract }}</p>
  </div>
</template>

<script>
export default {
  name: "Publication",
  props: {
    title: String,
    url: String,
    date: String,
    authors: String,
    abstract: String,
  },
};
</script>

<style scoped>
.publication {
  margin: 2rem 0rem;
  opacity: 76%;
  border-radius: 4px;
}

.publication-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0e76a8;
}

.publication-title a {
  font-weight: bold;
  color: #0e76a8;
}

.pauthors {
  font-size: 1rem;
  font-style: italic;
  font-weight: bolder;
}

.pdate {
  font-size: 1rem;
  font-weight: bolder;
}

.pabstract {
  font-size: 1rem;
}
</style>
