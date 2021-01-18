<template>
  <li class="nav-item dropdown">
    <a  class="nav-link dropdown-toggle"  :id="type + 'Dropdown'"  role="button"  data-toggle="dropdown"  aria-haspopup="true"  aria-expanded="false">
      <i
        :v-if="icon"
        :class="icon + $store.state[type]"
      ></i>
      {{ $store.state[type] }}
    </a>
    <div class="dropdown-menu" :aria-labelledby="type + 'Dropdown'">
      <button
        class="dropdown-item"
        v-for="value in available"
        @click="update(type, value)"
        :key="type + '_' + value"
      >
        <i :v-if="icon" :class="icon + value"></i>
        {{ value }}
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "NavConfig",
  props: {
    type: String,
    icon: String,
    available: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  methods: {
    update(element, value) {
      // this.$store.dispatch("update");
      this.$store.state[element] = value;
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