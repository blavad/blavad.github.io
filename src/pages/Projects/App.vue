<template>
  <NavBar active_item_id="1" />
  <!-- Section présentation -->

  <div id="header" class="container-fluid text-light text-center">
    <div class="row">
      <SectionTitle :title="lang == 'us' ? 'Projects' : 'Projets'" />
    </div>
    <div class="row">
      <div id="myBtnContainer" class="col">
        <button
          class="btn btn-light"
          :class="is_active('all') ? 'active' : ''"
          @click="filter('all')"
        >
          {{ lang == "us" ? "Show all" : "Voir tous" }}
        </button>
        <button
          class="btn btn-light"
          :class="is_active('ai') ? 'active' : ''"
          @click="filter('ai')"
        >
          {{
            lang == "us"
              ? "Artificial Intelligence"
              : "Intelligence Artificielle"
          }}
        </button>
        <button
          class="btn btn-light"
          :class="is_active('computing') ? 'active' : ''"
          @click="filter('computing')"
        >
          {{ lang == "us" ? "Computing" : "Informatique" }}
        </button>
        <button
          class="btn btn-light"
          :class="is_active('web') ? 'active' : ''"
          @click="filter('web')"
        >
          {{ lang == "us" ? "Web" : "Web" }}
        </button>
        <button
          class="btn btn-light"
          :class="is_active('diy') ? 'active' : ''"
          @click="filter('diy')"
        >
          {{ lang == "us" ? "DIY" : "DIY" }}
        </button>
      </div>
    </div>
  </div>
  <div id="content" class="container-fluid bg-light">
    <ProjectCard
      v-for="proj in projects[lang]"
      :key="proj.short_title"
      :title="proj.long_title"
      :content="proj.description"
      :img="proj.img2"
      :page="proj.page"
      :labels="proj.labels"
      :github="proj.github"
      :pdf="proj.pdf"
      :is_short="false"
      :show="current_filter == 'all' || proj.labels.includes(current_filter)"
    />
  </div>

  <SocialBar :social_media="brand.social_media" />

  <!-- 

  <div class="container-fluid text-light text-center bg-dark fixed-bottom">
    <div class="row">
      <div class="col">
        <input v-model="question" />
        <button>Send</button>
      </div>
    </div>
  </div> -->
</template>

<script>
import { mapState } from "vuex";

import NavBar from "@/components/nav/NavBar.vue";
import SectionTitle from "@/components/basic/SectionTitle.vue";
import ProjectCard from "@/components/basic/ProjectCard.vue";
import SocialBar from "@/components/SocialBar.vue";
import projects from "@/data/projects.json";
import brand from "@/data/brand.json";

export default {
  name: "App",
  components: {
    NavBar,
    SectionTitle,
    ProjectCard,
    SocialBar,
  },
  data() {
    return {
      projects: projects,
      brand: brand,
      current_filter: "all",
    };
  },
  computed: {
    ...mapState(["lang"]),
  },
  methods: {
    filter: function (name) {
      this.current_filter = name;
    },
    is_active: function (name) {
      return this.current_filter == name;
    },
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

#app {
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: left;
  // color: $color_4;
  // background-color: $color_3;
  font-family: "Lucida Console", Courier, monospace;
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

// Logo

.logo:hover {
  color: rgb(180, 180, 180);
  /* color: rgb(119, 119, 119); */
}

.logo-linkedin {
  color: #0e76a8;
}

.logo-mail {
  color: rgb(180, 46, 46);
}

.logo-pdf {
  color: rgb(180, 46, 46);
}

.logo-github {
  color: #211f1f;
}

.logo-strava {
  color: #e06118;
}

.logo-link {
  color: #052646;
}

.fixed-under-nav {
  top: 70px;
  position: fixed;
}

#header {
  font-weight: bolder;
  background-image: url("../../assets/images/Big-Data2.png");
  // background-image: url("../../assets/images/Big-Data.png");
  background-color: rgba(255, 255, 255, 0.2);
  background-blend-mode: lighten;
}

#myBtnContainer > .active {
  font-size: bolder;
  color: #0e76a8;
}

.btn {
  margin: 0.5rem;
}

#content > .card {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
