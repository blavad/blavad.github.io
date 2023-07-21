<template>
    <span v-for="n in parseInt(rating)" :key="n" class="dot checked-dot" :style="'background-color: '+ color + ';'"></span>
    <span v-for="j in parseInt(max - rating)" :key="j" class="dot"></span>
</template>


<script>
export default {
  name: "ScoreItem",
  props: {
    rating: Number,
    max: Number,
    size: Number,
    fa_icon: String,
    color: String,
  },
};
</script>

<style scoped>
.dot {
  height: 12px;
  width: 12px;
  margin: 0.3rem;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
}

/* .checked-dot {
  background-color: #e25e06;
} */
</style>