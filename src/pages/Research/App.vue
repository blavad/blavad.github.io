<template>
  <!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
  <HelloWorld msg="RESEARCH"/>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">

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
    color: #211F1F;
}

.logo-strava {
    color: #e06118;
}

.logo-link {
    color: #052646;
}
</style>
