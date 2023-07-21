  <template>
  <div class="bg-light text-dark">
    <div id="contact" class="container text-center">
      <SectionTitle title="Contact" />
      <br />
      <div class="row">
        <ContactLink
          v-for="s_item in social_media"
          :key="s_item.name"
          :name="s_item.name"
          :url="s_item.url"
          :fa_icon="s_item.fa_icon"
          :text="s_item.text"
        />
      </div>
    </div>
  </div>
</template>


<script>
import ContactLink from "@/components/ContactLink.vue";
import SectionTitle from "@/components/basic/SectionTitle.vue";

export default {
  name: "ContactSection",
  components: {
    ContactLink,
    SectionTitle,
  },
  props: {
    social_media: Object,
  },
};
</script>

<style scoped>
</style>