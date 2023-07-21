<template>
  <!-- The social media icon bar -->
  <div id="social-bar" class="bg-light">
    <a v-for="media in social_media" :key="media.name" :href="media.url" :class="'logo logo-' + media.name.toLowerCase()" class="d-inline">
      <i :class="media.fa_icon"></i>
    </a>
  </div>
</template>

<!-- Optional JavaScript -->

<script>
export default {
  name: "SocialBar",
  props: {
    social_media: Object,
  },
};

// When the user scrolls down 20px from the top of the document, slide down the navbar
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("social-bar").style.top = "68px";
  } else {
    document.getElementById("social-bar").style.top = "10px";
  }
}
</script>

<style>

#social-bar {
    position: fixed;
    top: 10px;
    right: 0px;
    box-shadow: 0 2px 2px rgba(10, 10, 10, 0.50);
    transition: top 0.7s;
}

#social-bar a {
    display: block;
    text-align: center;
    padding: 0.7rem;
    font-size: 1.6rem;
}
</style>