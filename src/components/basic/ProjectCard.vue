<template>
  <div
    v-if="is_short && show"
    class="project-card mx-2"
    style="cursor: pointer"
    :onclick="'window.location=\'' + page + '\';'"
  >
    <div class="pic">
      <img
        :src="require(`@/assets/images/projects/${img}`)"
        height="200"
        alt="Card image cap"
      />
    </div>
    <div class="card-content">
      <h3 class="title">{{ title }}</h3>
      <Label
        v-for="lab_name in labels"
        :key="lab_name"
        :name="lab_name"
        :color="lab_info[lab_name]['color']"
      />
      <p class="post px-3 pt-2" v-html="content"></p>
    </div>
    <ul class="social">
      <li>
        <a v-if="page" :href="page" class="logo logo-link"
          ><i class="fas fa-link"></i
        ></a>
      </li>
      <li>
        <a v-if="pdf" :href="pdf" class="logo logo-pdf"
          ><i class="far fa-file-pdf"></i
        ></a>
      </li>
      <li>
        <a
          v-if="github"
          :href="'https://github.com/blavad/' + github"
          class="logo logo-github"
          ><i class="fab fa-github"></i
        ></a>
      </li>
    </ul>
  </div>

  <div
    v-else-if="!is_short && show"
    class="card"
    :onclick="'window.location=\'' + page + '\';'"
  >
    <div class="row no-gutters">
      <div class="col-auto">
        <img
          :src="require(`@/assets/images/projects/${img}`)"
          class="img-fluid w-200px"
          alt="Project Picture"
        />
      </div>
      <div class="col">
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text" v-html="content"></p>
        </div>
      </div>
    </div>
    <div class="card-footer w-100 text-muted">
      <div class="container-fluid p-0 m-0">
        <div class="row">
          <div class="col-8">
            {{ lang == "us" ? "Fields" : "Thèmes" }} :
            <Label
              v-for="lab_name in labels"
              :key="lab_name"
              :name="lab_name"
              :description="lab_info[lab_name]['brief']"
              :color="lab_info[lab_name]['color']"
            />
          </div>
          <div class="col-4">
            <div class="float-right">
              <a
                v-if="github"
                :href="'https://github.com/blavad/' + github"
                class="logo logo-github d-inline"
              >
                <i class="fab fa-github fa-2x"></i>
              </a>
              <a v-if="pdf" :href="pdf" class="logo logo-pdf d-inline">
                <i class="far fa-file-pdf fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Label from "@/components/basic/Label.vue";
import lab_info from "@/data/project_label.json";

export default {
  name: "ProjectCard",
  components: {
    Label,
  },
  props: {
    title: String,
    content: String,
    github: String,
    pdf: String,
    page: String,
    labels: Array,
    img: String,
    is_short: { type: Boolean, default: true },
    show: { type: Boolean, default: true },
  },
  data() {
    return {
      lab_info: lab_info,
      hide: false,
    };
  },
  methods: {
    getLabels: function () {
      let lab_str = "";
      this.labels.forEach((element) => {
        lab_str += element;
        lab_str += " ";
      });
      return lab_str;
    },
    computed: {
      ...mapState(["lang"]),
    },
  },
};
</script>

<style scoped>
.h-200px {
  height: 200px;
}

.w-200px {
  width: 200px;
}

.logo {
  margin: 0.5rem;
}

.card {
  margin: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 4px rgba(10, 10, 10, 0.15);
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 16px 16px rgba(10, 10, 10, 0.75);
}

.card-title {
  font-weight: bold;
  text-transform: uppercase;
  color: #333;
}

.project-card {
  text-align: center;
  position: relative;
  box-shadow: 0 8px 8px rgba(10, 10, 10, 0.15);
}
.project-card:before {
  content: "";
  border: 4px solid #0e76a8;
  opacity: 0;
  position: absolute;
  top: -7px;
  left: -7px;
  bottom: -7px;
  right: -7px;
  transform: scale(1.03);
  transition: all 0.6s ease 0s;
}
.project-card:hover:before {
  opacity: 1;
  transform: scale(1);
}
.project-card .pic {
  position: relative;
}
.project-card .pic:before {
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all 0.6s ease 0s;
}
.project-card:hover .pic:before {
  opacity: 1;
}
.project-card img {
  width: 100%;
  height: auto;
}
.project-card .card-content {
  padding: 30px 0 20px;
  position: relative;
  top: 0;
  transition: all 0.6s ease 0s;
}
.project-card:hover .card-content {
  top: -50%;
}
.project-card .title {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0 0 7px 0;
  transition: all 0.6s ease 0s;
}
.project-card:hover .title {
  color: #fff;
}
.project-card .post {
  display: block;
  text-align: justify;
  text-justify: inter-word;
  font-size: 17px;
  font-weight: 500;
  color: #707070;
  /* text-transform: capitalize; */
  transition: all 0.6s ease 0s;
}
.project-card:hover .post {
  /* color: #00ccff; */
  color: #8cd6f8;
}
.project-card .social {
  width: 100%;
  padding: 0;
  margin: 0 0 30px;
  list-style: none;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  transform: scale(0);
  transition: all 0.6s ease 0s;
}
.project-card:hover .social {
  opacity: 1;
  transform: scale(1);
}
.project-card .social li {
  display: inline-block;
}
.project-card .social li a {
  display: block;
  padding: 0 15px;
  font-size: 30px;
  border-right: 1px solid #000000;
  position: relative;
  transition: all 0.3s ease 0s;
}
.project-card .social li:last-child a {
  border-right: none;
}
@media only screen and (max-width: 990px) {
  .project-card {
    margin-bottom: 30px;
  }
}
</style>