<template>
  <NavBar active_item_id="1" />
  <!-- Section présentation -->

  <div id="header" class="container-fluid text-light text-center">
    <div class="row">
      <SectionTitle :title="lang == 'us' ? 'Ernest' : 'Ernest'" />
    </div>
  </div>
  <div class="container-fluid">
    <h2> Step 1 : Nettoyage d'Ernest</h2>
    <p>
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA.
      <br>
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA.
    </p>
    <h2> Step 2 : Modélisation de l'aménagement</h2>

    <p>
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA.
    </p>
    <h2> Step 3 : Modélisation de l'aménagement</h2>

    <p>
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA
      BLBALBLABLABLABABLBALBLABLABLABABLBALBLABLABLABA.
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

import NavBar from "@/components/nav/NavBar.vue";
import SectionTitle from "@/components/basic/SectionTitle.vue";

export default {
  name: "App",
  components: {
    NavBar,
    SectionTitle,
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>

<style lang="scss">
#app {
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: left;
  // color: $color_4;
  // background-color: red;
  font-family: "Lucida Console", Courier, monospace;
  // background-image: url("../../../assets/images/projects/ernest-h.jpg");
}

.container,
.container-fluid {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.see-more {
  color: black;
}

/* Other styles */

.parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.arrondie {
  -moz-border-radius: 5rem;
  -webkit-border-radius: 5rem;
  border-radius: 5rem;
}

#header {
  font-weight: bolder;
  // background-image: url("../../assets/images/Big-Data.png");
  // background-image: url("../../../assets/images/Big-Data.png");
  background-image: url("../../../assets/images/projects/ernest-h.jpg");
  // background-color: rgba(255, 255, 255, 0.2);
  background-blend-mode: lighten;
}
</style>
