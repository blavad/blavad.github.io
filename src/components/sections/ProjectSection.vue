<template>
  <!-- Projects -->
  <div id="projects" class="container mb-4">
    <!-- <SectionTitle /> -->
    <div class="row">
      <SectionTitle :title="(lang=='us')?'Projects':'Projets'" link="/projects" />
    </div>

    <!--Carousel Wrapper-->
    <div id="multi-projects" class="carousel slide" data-ride="carousel">
      <!--Indicators-->
      <ol class="carousel-indicators">
        <li data-target="#multi-projects" data-slide-to="0" class="active"></li>
        <li data-target="#multi-projects" data-slide-to="1"></li>
        <li data-target="#multi-projects" data-slide-to="2"></li>
      </ol>
      <!--/.Indicators-->

      <!--Slides-->
      <div class="carousel-inner" role="listbox">
        <!--First slide-->
        <div class="carousel-item active">
          <div class="row my-4">
            <div class="col-md-4">
              <ProjectCard
                :title="projects[0].short_title"
                :content="projects[0].brief"
                :img="projects[0].img"
                :page="projects[0].page"
                :github="projects[0].github"
                :pdf="projects[0].pdf"
                :labels="projects[0].labels"
              />
            </div>

            <div class="col-md-4">
              <ProjectCard
                :title="projects[1].short_title"
                :content="projects[1].brief"
                :img="projects[1].img"
                :page="projects[1].page"
                :github="projects[1].github"
                :pdf="projects[1].pdf"
                :labels="projects[1].labels"
              />
            </div>

            <div class="col-md-4">
              <ProjectCard
                :title="projects[2].short_title"
                :content="projects[2].brief"
                :img="projects[2].img"
                :page="projects[2].page"
                :github="projects[2].github"
                :pdf="projects[2].pdf"
                :labels="projects[2].labels"
              />
            </div>
          </div>
        </div>
        <!--/.First slide-->

        <!--Second slide-->
        <div class="carousel-item">
          <div class="row my-4">
            <div class="col-md-4">
              <ProjectCard
                :title="projects[3].short_title"
                :content="projects[3].brief"
                :img="projects[3].img"
                :page="projects[3].page"
                :github="projects[3].github"
                :pdf="projects[3].pdf"
                :labels="projects[3].labels"
              />
            </div>

            <div class="col-md-4 clearfix">
              <ProjectCard
                :title="projects[4].short_title"
                :content="projects[4].brief"
                :img="projects[4].img"
                :page="projects[4].page"
                :github="projects[4].github"
                :pdf="projects[4].pdf"
                :labels="projects[4].labels"
              />
            </div>

            <div class="col-md-4 clearfix">
              <ProjectCard
                :title="projects[5].short_title"
                :content="projects[5].brief"
                :img="projects[5].img"
                :page="projects[5].page"
                :github="projects[5].github"
                :pdf="projects[5].pdf"
                :labels="projects[5].labels"
              />
            </div>
          </div>
        </div>
        <!--/.Second slide-->

        <!--Third slide-->
        <div class="carousel-item">
          <div class="row my-4">
            <div class="col-md-4">
              <ProjectCard
                :title="projects[6].short_title"
                :content="projects[6].brief"
                :img="projects[6].img"
                :page="projects[6].page"
                :github="projects[6].github"
                :pdf="projects[6].pdf"
                :labels="projects[6].labels"
              />
            </div>

            <div class="col-md-4 clearfix">
              <ProjectCard
                :title="projects[7].short_title"
                :content="projects[7].brief"
                :img="projects[7].img"
                :page="projects[7].page"
                :github="projects[7].github"
                :pdf="projects[7].pdf"
                :labels="projects[7].labels"
              />
            </div>

            <div class="col-md-4 clearfix">
              <ProjectCard
                :title="projects[8].short_title"
                :content="projects[8].brief"
                :img="projects[8].img"
                :page="projects[8].page"
                :github="projects[8].github"
                :pdf="projects[8].pdf"
                :labels="projects[8].labels"
              />
            </div>
          </div>
        </div>
        <!--/.Third slide-->
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
import ProjectCard from "@/components/basic/ProjectCard.vue";
import SectionTitle from "@/components/basic/SectionTitle.vue";

export default {
  name: "ProjectSection",
  props: {
    projects: Object,
  },
  components: {
    ProjectCard,
    SectionTitle,
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>

<style scoped>
.carousel-indicators {
  bottom: -3rem;
}

.carousel-indicators li {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #211f1f;
  /* background-color: #1f2021; */
}

.carousel-control-prev {
  left: -8rem;
}

.carousel-control-next {
  right: -8rem;
}

.our-team {
  text-align: center;
  position: relative;
}
.our-team:before {
  content: "";
  border: 4px solid #083d77;
  opacity: 0;
  position: absolute;
  top: -7px;
  left: -7px;
  bottom: -7px;
  right: -7px;
  transform: scale(1.03);
  transition: all 0.6s ease 0s;
}
.our-team:hover:before {
  opacity: 1;
  transform: scale(1);
}
.our-team .pic {
  position: relative;
}
.our-team .pic:before {
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all 0.6s ease 0s;
}
.our-team:hover .pic:before {
  opacity: 1;
}
.our-team img {
  width: 100%;
  height: auto;
}
.our-team .team-content {
  padding: 30px 0 20px;
  position: relative;
  top: 0;
  transition: all 0.6s ease 0s;
}
.our-team:hover .team-content {
  top: -50%;
}
.our-team .title {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0 0 7px 0;
  transition: all 0.6s ease 0s;
}
.our-team:hover .title {
  color: #fff;
}
.our-team .post {
  display: block;
  font-size: 17px;
  font-weight: 500;
  color: #707070;
  text-transform: capitalize;
  transition: all 0.6s ease 0s;
}
.our-team:hover .post {
  color: #ffcc00;
}
.our-team .social {
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
.our-team:hover .social {
  opacity: 1;
  transform: scale(1);
}
.our-team .social li {
  display: inline-block;
}
.our-team .social li a {
  display: block;
  padding: 0 15px;
  font-size: 18px;
  color: #083d77;
  border-right: 1px solid #083d77;
  position: relative;
  transition: all 0.3s ease 0s;
}
.our-team .social li a:hover {
  color: #ffcc00;
}
.our-team .social li:last-child a {
  border-right: none;
}
@media only screen and (max-width: 990px) {
  .our-team {
    margin-bottom: 30px;
  }
}
</style>