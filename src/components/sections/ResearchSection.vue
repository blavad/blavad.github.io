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

      <Publication
        v-for="publi in publications"
        :key="publi.title"
        :title="publi.title"
        :authors="publi.authors"
        :date="publi.date"
        :url="publi.url"
        :abstract="publi.abstract"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Publication from "@/components/basic/Publication.vue";
import SectionTitle from "@/components/basic/SectionTitle.vue";

export default {
  name: "ResearchSection",
  props: {
    publications: Object,
  },
  components: {
    Publication,
    SectionTitle
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>

<style lang="scss" scoped>
#research {
  // background-image: url("../../assets/images/fractale-blue.png");
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

</style>