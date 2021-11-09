<template>
  <div class="publication card my-4 bg-light text-dark">
    <div class="card-body">
      <span v-if="url" class="publication-title">
        <a :href="url">{{ title }}</a>
      </span>
      <span v-else class="publication-title">{{ title }}</span>
      <span class="authors">, {{ authors }}</span>
      <span class="date">, {{ date }}</span>
      <p class="abstract">{{ abstract }}</p>
    </div>
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
/* Style the Image Used to Trigger the Modal */

.cposition {
  font-style: italic;
  color: #424242;
}

.publication {
  margin: 2rem;
  opacity: 76%;
  max-height: 170px;
  overflow: hidden;
  transition-property: max-height;
  transition-duration: 0.5s;
}

.publication:hover {
  max-height: 400px;
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

.authors {
  font-size: 1.1rem;
  font-style: italic;
  font-weight: bolder;
}

.date {
  font-size: 1.1rem;
  font-weight: bolder;
}

.abstract {
  font-size: 1rem;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}
</style>
