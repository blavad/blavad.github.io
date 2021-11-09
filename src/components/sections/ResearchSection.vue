<template>
  <!-- Projects -->
  <div id="research" class="container-fluid text-light parallax">
    <div class="container text-light parallax">
      <!-- <SectionTitle /> -->
      <SectionTitle
        :title="lang == 'us' ? 'Research Interests' : 'Recherche'"
      />
      <p id="description">
        My main research interest is about the resolution of collaborative
        multi-agent problems with RL methods.
      </p>

      <Publication
        title="SDMS : An open-source library for POSGs"
        authors="D.Albert & J. Dibangoye"
        date="2021"
        url=""
        abstract="A solver and a library for POSGs."
      />

      <Publication
        title="On continuous-state MDPs in extensive-form"
        authors="J. Arjonilla, D. Albert, J. Dibangoye"
        date="Delayed"
        abstract="This paper presents a novel—yet
more scalable—alternative, namely serial central planning for simultaneous decentralised execution."
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SectionTitle from "@/components/basic/SectionTitle.vue";
import Publication from "@/components/Publication.vue";

export default {
  name: "ResearchSection",
  props: {
    publications: Object,
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

<style scoped>
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
</style>