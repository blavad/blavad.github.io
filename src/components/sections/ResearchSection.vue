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
        <div class="publication-title">Test</div>,
        <div class="pauthors">David</div>,
        <div class="pdate">[2021]</div>
        <p class="pabstract">blablabla</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SectionTitle from "@/components/basic/SectionTitle.vue";

export default {
  name: "ResearchSection",
  props: {
    publications: Array,
  },
  components: {
    SectionTitle,
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

</style>