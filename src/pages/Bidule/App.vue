<template>
  <NavBar active_item_id="5" />
  <div id="header" class="container-fluid text-light text-center">
    <div class="row">
      <SectionTitle :title="lang == 'us' ? 'Bidule' : 'Bidule'" />
    </div>
    <div class="row">
      <div id="myBtnContainer" class="col">
        <button
          class="btn btn-light"
          :class="is_active('all') ? 'active' : ''"
          @click="filter('all')"
        >
          {{ lang == "us" ? "Chat" : "Chat" }}
        </button>
        <button
          class="btn btn-light"
          :class="is_active('ai') ? 'active' : ''"
          @click="filter('ai')"
        >
          {{ lang == "us" ? "Stats" : "Stats" }}
        </button>
      </div>
    </div>
  </div>
  <p v-if="is_active('ai')">Stats</p>
  <ChatWindow v-else />
</template>

<script>
import NavBar from "@/components/nav/NavBar.vue";
import SectionTitle from "@/components/basic/SectionTitle.vue";
import ChatWindow from "@/components/bidule/ChatWindow.vue";

export default {
  name: "App",
  components: {
    NavBar,
    ChatWindow,
    SectionTitle,
  },

  data() {
    return {
      current_filter: "all",
    };
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
$MQMobile: 1120px;
$BACK_COLOR: #6cc1ca;

#app {
  font-family: "Lucida Console", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

@media screen and (max-width: $MQMobile) {
  #header {
    font-weight: bolder;
    // background-image: url("../../assets/images/Big-Data.png");
    background-image: url("../../assets/images/bidule_chat.png");
    // background-color: rgba(145, 65, 0, 0.8);
    background-blend-mode: lighten;
  }
}


@media screen and (min-width: $MQMobile) {
  #header {
    font-weight: bolder;
    // background-image: url("../../assets/images/Big-Data.png");
    background-image: url("../../assets/images/bidule_chat_md.png");
    // background-color: rgba(145, 65, 0, 0.8);
    background-blend-mode: lighten;
  }
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
  color: #e09018;
}

.logo-link {
  color: #052646;
}

#myBtnContainer > .active {
  font-size: bolder;
  color: darken($BACK_COLOR, 20%);
}

.btn {
  margin: 0.5rem;
}
</style>
