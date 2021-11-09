<template>
  <div class="section-title col text-center" :class="(link)?'link':''">
    <a v-if="link" class="stretched-link" :href="link"></a>
    <h2 class="d-inline section-title"> {{ title }} </h2> 
    <i v-if="link" class="d-inline fa fa-angle-double-right fa-2x px-2"></i>
    <hr />
  </div>

</template>

<script>
export default {
  name: "SectionTitle",
  props: {
    title: String,
    link: String,
  },
};
</script>

<style scoped>
.section-title {
  text-shadow: 2px 2px 0 rgb(125, 125, 125);
}

.link:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  background: #0e76a8;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
.link:hover:after { 
  width: 100%; 
  left: 0; 
}
.link:hover {
  cursor: pointer;
  color: #0e76a8;
}

@media screen and (max-height: 300px) {
	ul {
		margin-top: 40px;
	}
}
</style>