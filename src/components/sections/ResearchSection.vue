<template>
  <!-- Projects -->
  <div id="research" class="container-fluid mb-4 bg-dark text-light">
    <!-- <SectionTitle /> -->
    <SectionTitle :title="lang == 'us' ? 'Research Interests' : 'Recherche'" />
    <p>
      My main research topic is about the resolution of collaborative multi-agent problems with RL methods.
    </p>
    <h1 class="">Publications en cours:</h1>
    <ul>
        <li>SDMS</li>
        <li>Serialized</li>
        <li>Hisrarchical</li>
    </ul>
  </div>

</template>

<script>
import { mapState } from "vuex";
import SectionTitle from "@/components/basic/SectionTitle.vue";

export default {
  name: "ProjectSection",
  props: {
    publications: Object,
  },
  components: {
    SectionTitle,
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>

<style scoped>
</style>