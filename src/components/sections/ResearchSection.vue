<template>
  <!-- Projects -->
  <div id="research" class="parallax p-0">
    <div class="container text-light">
      <!-- <SectionTitle /> -->
      <SectionTitle
        :title="lang == 'us' ? 'Research Interests' : 'Recherche'"
      />
      <p id="description">
        My main research interest is about the resolution of collaborative
        multi-agent problems with RL methods.
      </p>

      <div class="publication px-4 py-2 bg-light text-dark">
        <span class="publication-title">Test</span>,
        <span class="pauthors">David</span>,
        <span class="pdate">[2021]</span>
        <p class="pabstract">blablabla</p>
      </div>

      <Publication
        v-for="p in publications"
        :key="p.title"
        :title="p.title"
        :authors="p.authors"
        :date="p.date"
        :url="p.url"
        :abstract="p.abstract"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SectionTitle from "@/components/basic/SectionTitle.vue";
import Publication from "@/components/basic/Publication.vue";

export default {
  name: "ResearchSection",
  props: {
    publications: Array,
  },
  components: {
    SectionTitle,
    Publication,
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>

<style lang="scss">
#research {
  background-image: url("../../assets/images/fractale-blue.png");
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: darken;
  font-size: 1rem;
  background-size: cover;
}

#description {
  margin: 0 2.5rem;
  font-weight: bolder;
}

.parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
}

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