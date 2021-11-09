<template>
  <div class="row">
    <div class="col-6">
      <div v-if="fromBidule" class="box bidule">
        {{ msg }}
      </div>
    </div>
    <div class="col-6">
      <div v-if="!fromBidule" class="box user">
        {{ msg }}
      </div>
    </div>
  </div>
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
  margin: 0.5rem 1rem;
  color: white;
  word-break: break-all;
}

.bidule {
  background-color: darken($BIDULE_COLOR, 20%);
  border-radius: 20px 20px 20px 0px;
  float: left;
  text-align: left;
}

.user {
  background-color: darken($USER_COLOR, 20%);
  border-radius: 20px 20px 0px 20px;
  float: right;
  text-align: left;
}
</style>