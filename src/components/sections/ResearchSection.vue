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

      <div class="px-4 py-2 bg-light text-dark publi">
        <div class="publi-title">Test</div>,
        <div class="pauthors">David</div>,
        <div class="pdate">[2021]</div>
        <p class="pabstract">blablabla</p>
      </div>
<!-- 
      <Publication
        v-for="p in publications"
        :key="p.title"
        :title="p.title"
        :authors="p.authors"
        :date="p.date"
        :url="p.url"
        :abstract="p.abstract"
      /> -->
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

.publi {
  // opacity: 76%;
  border-radius: 4px;
  margin: 1rem 0rem;
}

.publi-title {
  display: inline;
  font-size: 1.2rem;
  font-weight: bold;
  color: #0e76a8;
}

// .publi-title a {
//   font-weight: bold;
//   color: #0e76a8;
// }

.pauthors {
  display: inline;
  font-size: 1rem;
  font-style: italic;
  font-weight: bolder;
}

.pdate {
  display: inline;
  font-size: 1rem;
  font-weight: bolder;
}

.pabstract {
  font-size: 1rem;
}


.parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
}

#description {
  margin: 0 2.5rem;
  font-weight: bolder;
}

#research {
  background-image: url("../../assets/images/fractale-blue.png");
  background-color: rgba(0, 0, 0, 0.2);
  background-blend-mode: darken;
  font-size: 1rem;
  background-size: cover;
}
</style>