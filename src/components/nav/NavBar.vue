<template>
  <!-- Bootstrap CSS -->

  <div id="nav"></div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0 m-0">
    <NavBrand
      class="my-1"
      :logo_path="brand.logo"
      :logo_alt="brand.logo_alt"
      :extra_name="brand.name"
    />

    <button
      class="navbar-toggler m-2"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <NavItem
          v-for="item in nav_items[lang]"
          :key="item.name"
          :name="item.name"
          :path="item.path"
          :icon="item.icon"
          :sub_items="item.sub_items"
          :active="active_item_id == item.id ? 'active' : ''"
        />
        <NavConfig
          v-for="config in page_config"
          :key="config.type"
          :type="config.type"
          :icon="config.icon"
          :available="config.available"
        />
      </ul>
    </div>
  </nav>
</template>

<script>
import nav_it from "@/data/nav_items.json";
import page_config from "@/data/page_config.json";
import brand from "@/data/brand.json";
import NavItem from "@/components/nav/NavItem.vue";
import NavBrand from "@/components/nav/NavBrand.vue";
import NavConfig from "@/components/nav/NavConfig.vue";
import { mapState } from 'vuex'


export default {
  name: "NavBar",
  props: {
    active_item_id: {
      type: Int8Array,
      required: true,
      default() {
        return 0;
      },
    }
  },
  data() {
    return {
      nav_items: nav_it,
      page_config: page_config,
      brand: brand,
    };
  },
  components: {
    NavItem,
    NavBrand,
    NavConfig,
  },
   computed: {
    ...mapState([
      'lang'
    ])
  }
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 2px rgba(10, 10, 10, 0.15);
}

#nav {
  padding: 30px;
}
</style>