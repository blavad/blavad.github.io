  <template>
  <div id="skills" class="container-fluid bg-dark text-light pl-4">
    <SectionTitle :title="(lang=='us')?'Skills':'Compétences'" />
    <br />
    <div class="row">
      <div
        v-for="sk in skills"
        :key="sk.name"
        class="col-xs-12 col-md-6 col-lg-3"
      >
        <h4>{{sk.name}}</h4>
        <div class="container pt-0 mt-0">
          <div class="row" v-for="skill in sk.sub_skills" :key="skill.name">
            <div class="col-7">{{ skill.name }}</div>
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
</style>