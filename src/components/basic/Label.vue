<template>
  <span
    :data-tip="description"
    :style="'background-color:' + color"
    class="px-2 my-0 mr-2 arrondie toolTip bottom"
  >
    {{ name }}
  </span>
</template>

<script>
export default {
  name: "Label",
  props: {
    name: String,
    description: String,
    color: String,
  },
};
</script>

<style scoped>
* {
  color: white;
  font-size: 0.9rem;
}

.toolTip {
  cursor: help;
  padding: 0 10px;
  border-radius: 10px;
  position: relative;
  transition: all 0.3s ease 0s;
  opacity: 0.7;
}

.toolTip:hover {
  opacity: 1.0;
}

.toolTip:before,
.toolTip:after {
  content: attr(data-tip);
  background: rgb(71, 71, 71);
  font-size: 12px;
  font-weight: 500;
  width: 170px;
  padding: 5px 10px;
  white-space: normal;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
}
.toolTip:after {
  content: "";
  height: 10px;
  width: 10px;
  padding: 0;
}
.toolTip:hover:before,
.toolTip:hover:after {
  opacity: 1;
  visibility: visible;
}
.toolTip.bottom:before,
.toolTip.bottom:after {
  transform: translateX(-50%) rotateY(90deg);
  position: absolute;
  left: 50%;
  top: 140%;
}
.toolTip.bottom:after {
  border: none;
  transform: translateX(-50%) rotate(-135deg) rotateY(90deg);
  top: 130%;
}
.toolTip.bottom:hover:before {
  transform: translateX(-50%) rotateY(0);
}
.toolTip.bottom:hover:after {
  transform: translateX(-50%) rotate(-135deg) rotateY(0);
}
@media only screen and (max-width: 767px) {
  .toolTip {
    margin: 0 0 20px;
  }
}
</style>