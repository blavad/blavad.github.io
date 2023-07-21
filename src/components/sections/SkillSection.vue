  <template>
  <div id="skills" class="container-fluid bg-dark text-light pl-4">
    <SectionTitle :title="lang == 'us' ? 'Technical Skills' : 'Compétences Techniques'" />
    <br />
    <div class="row">
      <div
        v-for="sk in skills"
        :key="sk.name"
        class="col-xs-12 col-md-6 col-lg-3"
      >
        <h4>{{ sk.name }}</h4>
        <div class="container pt-0 mt-0">
          <div class="row" v-for="skill in sk.sub_skills" :key="skill.name">
            <div class="col-7">
              <span v-if="skill.info" :data-tip="skill.info" class="toolTip bottom">{{
                skill.name
              }}</span
              ><span v-else>{{ skill.name }}</span>
            </div>
            <div class="col-5">
              <ScoreItem
                :rating="skill.value"
                max="3"
                size="20"
                color="#e25e06"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import SectionTitle from "@/components/basic/SectionTitle.vue";
import ScoreItem from "@/components/basic/ScoreItem.vue";

export default {
  name: "SkillSection",
  components: {
    SectionTitle,
    ScoreItem,
  },
  props: {
    skills: Object,
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>

<style scoped>

.toolTip {
  cursor: help;
  position: relative;
  transition: all 0.3s ease 0s;
  opacity: 0.7;
}

.toolTip:hover {
  opacity: 1;
}

.toolTip:before,
.toolTip:after {
  content: attr(data-tip);
  background: rgb(180, 180, 180);
  color: black;
  font-size: 14px;
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