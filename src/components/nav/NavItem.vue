<template>
  <li class="nav-item dropdown" :class="active" v-if="sub_items">
    <a
      class="nav-link dropdown-toggle"
      :href="path"
      :id="name + 'Dropdown'"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i :v-if="icon" :class="icon"></i>
      {{ name }}
    </a>
    <div class="dropdown-menu" :aria-labelledby="name + 'Dropdown'">
      <a
        class="dropdown-item"
        v-for="sub_item in sub_items"
        :key="name + '_' + sub_item.name"
        :href="sub_item.path"
      >
        <i :v-if="sub_item.icon" :class="sub_item.icon"></i>
        {{ sub_item.name }}
        <i v-if="sub_item.locked" class="fas fa-lock"></i
      ></a>
    </div>
  </li>

  <li class="nav-item" :class="active" v-else>
    <a class="nav-link" :href="path">
      <i :v-if="icon" :class="icon"></i>
      {{ name }}
    </a>
  </li>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    name: String,
    path: String,
    icon: String,
    sub_items : Array,
    active: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>

<style scoped>
.nav-link:hover {
  color: #0e76a8;
}

.dropdown:hover > .dropdown-menu {
  display: block;
  top: 50px;
  box-shadow: 0 2px 2px rgba(10, 10, 10, 0.5);
}

.dropdown-item:hover {
  background-color: #0e76a8;
  color: white;
}

.nav-item {
  padding: 0.5rem 1rem;
}

</style>