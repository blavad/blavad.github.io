<template>
  <NavBar active_item_id="3" />
  <video
    class="img-fluid"
    playsinline="playsinline"
    autoplay=""
    muted=""
    loop="loop"
  >
    <source :src="require(`@/assets/videos/lac_gelee.mp4`)" type="video/mp4" />
  </video>

  <div class="middle">
    <h1>COMING SOON</h1>
    <hr />
  </div>

  <div class="bottomleft">
    <p style="color: black">Mes voyages (Malaisie, Corée, Maroc, etc)</p>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  computed: {
    slow_down_video: function () {
      const video = document.querySelector("video");
      video.playbackRate = 0.5;
      return true;
    },
  },
};
</script>

<style lang="scss">
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
    color: #211F1F;
}

.logo-strava {
    color: #e06118;
}

.logo-link {
    color: #052646;
}

video {
  position: fixed; right: 0; bottom: 0;
  min-width: 100%; min-height: 100%;
  width: auto; height: auto; z-index: -100;
  // background: url("../../assets/images/malaisie2.jpg") no-repeat;
  background-color: rgb(218, 218, 218);
  background-size: cover;
}

.bottomleft {
  position: absolute;
  bottom: 0;
  left: 16px;
}

.middle {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
