<template>
  <br />
  <div class="row box" :class="fromBidule ? 'bidule' : 'user'">
      {{ msg }}
  </div>
  <br />
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Message",
  props: {
    fromBidule: Boolean,
    msg: String,
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>

<style scoped lang="scss">
$BIDULE_COLOR: #6cc1ca;
$USER_COLOR: #b1b1b1;

.box {
  padding: 0.3rem 1rem;
  margin: 0.3rem 1rem;
  color: white;
  word-break: break-all;
}

.bidule {
  background-color: darken($BIDULE_COLOR, 20%);
  border-radius: 20px 20px 20px 0px;
  float: left;
}

.user {
  background-color: darken($USER_COLOR, 20%);
  border-radius: 20px 20px 0px 20px;
  float: right;
}
</style>