<template>
  <NavBar active_item_id="0" />

  <!-- Section présentation -->
  <div id="profil-section" class="parallax p-0">
    <div id="profil" class="container text-light">
      <div class="row text-center text-sm-left">
        <div class="col-12 col-sm-4 col-lg-4 p-4 text-center">
          <img
            class="img-fluid arrondie"
            src="@/assets/images/photo-dav-md.jpg"
            alt="Profil David Albert"
          />
        </div>
        <div id="presentation" class="col-12 col-sm-8 col-lg-8 p-4">
          <h1 id="name-title" class="text-light">{{ brand.name }}</h1>
          <p v-html="brand.brief[lang]"></p>
        </div>
      </div>
    </div>
  </div>

  <!-- Section Projects -->
  <ProjectSection :projects="projects[lang]" />

  <!-- Section Projects -->
  <ResearchSection :publications="publications[lang]" />

  <!-- Section Skills -->
  <SkillSection :skills="skills" />

  <!-- Section Contact -->
  <ContactSection :social_media="brand.social_media" />

  <SocialBar :social_media="brand.social_media" />
</template>

<script>
import { mapState } from "vuex";

import ContactSection from "@/components/sections/ContactSection.vue";
import SkillSection from "@/components/sections/SkillSection.vue";
import ProjectSection from "@/components/sections/ProjectSection.vue";
import ResearchSection from "@/components/sections/ResearchSection.vue";
import NavBar from "@/components/nav/NavBar.vue";
import SocialBar from "@/components/SocialBar.vue";

import brand from "@/data/brand.json";
import projects from "@/data/projects.json";
import publications from "@/data/publications.json";
import skills from "@/data/skills.json";

export default {
  name: "App",
  components: {
    ContactSection,
    NavBar,
    SocialBar,
    SkillSection,
    ProjectSection,
    ResearchSection,
  },
  data() {
    return {
      brand: brand,
      skills: skills,
      projects: projects,
      publications: publications,
    };
  },
  computed: {
    ...mapState(["lang"]),
  },
  methods: {
    getUrlVars: function () {
      var vars = {};
      window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
          vars[key] = value;
        }
      );
      return vars;
    },
    getUrlParam: function (parameter, defaultvalue) {
      var urlparameter = defaultvalue;
      if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = this.getUrlVars()[parameter];
      }
      return urlparameter;
    },
  },
};
</script>

<style lang="scss">
// $color_1: #ffffff;
// $color_2: #c58787;
// $color_3: #f5f5f5;
// $color_4: #333333;

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

.logo-docker {
  color: #2496ed;
}

.logo-link {
  color: #052646;
}
#profil-section {
  background-image: url("../../assets/images/Big-Data2.png");
  background-size: cover;
  background-blend-mode: lighten;
  background-color: rgba(255, 255, 255, 0.2);
}

#profil {
  font-size: 1.1rem;
}

#profil a {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.2rem 0.6rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
}

#unboared-link {
  color:#ff2453;
}

#sdms-link {
  color: #8cd6f8;
}

#presentation {
  // background-color: black;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}
</style>
