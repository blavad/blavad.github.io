<template>
  <div class="row box" :class="fromBidule ? 'bidule' : 'user'">
      {{ msg }}
  </div>
  <br />
  <br />
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserInput",
  props: {
    fromBidule: Boolean,
    msg: String,
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>

<style scoped>
.box {
  padding: 0.3rem 1rem;
  margin: 0.3rem 1rem;
  color: white;
  word-break: break-all;
}

.bidule {
  background-color: rgb(90, 90, 90);
  border-radius: 20px 20px 20px 0px;
  float: left;
}

.user {
  background-color: rgb(12, 71, 110);
  border-radius: 20px 20px 0px 20px;
  float: right;
}
</style>