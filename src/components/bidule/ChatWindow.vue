
<template>
  <div id="chat-window" class="container bg-light">
    <Message
      v-for="d in discution"
      :key="d.msg"
      :fromBidule="d.fromBidule"
      :msg="d.msg"
    />
  </div>
  <div id="userInput" class="container-fluid fixed-bottom">
    <form v-on:submit.prevent="sendMessage(question)">
      <input id="msg-input" v-model="question" />
      <button id="msg-button">
        Send <i class="fas fa-arrow-right"></i>
      </button>
    </form>
  </div>
</template>


<script>
import _ from "lodash";
import axios from "axios";
import Message from "@/components/bidule/Message.vue";

export default {
  name: "ChatWindow",
  props: {},
  components: {
    Message,
  },
  data() {
    return {
      discution: [],
      question: "",
      answer:
        "Je ne peux pas vous donner une réponse avant que vous ne posiez une question !",
    };
  },
  methods: {
    sendMessage: function (msg) {
      var vm = this;
      vm.discution.push({ msg: msg, fromBidule: false });

      axios
        // .get("https://yesno.wtf/api")
        .post("https://bidulebot.herokuapp.com/webhooks/rest/webhook", { "message": msg , "sender": "unknown"})
        .then(function (response) {
          // alert(msg);
          vm.discution.push({
            msg: _.capitalize(response.data[0].text),
            fromBidule: true,
          });
        })
        .then(function () {
          window.scrollTo(
            0,
            document.getElementById("chat-window").scrollHeight
          );
        })
        .catch(function (error) {
          vm.answer = "Erreur ! Impossible d'accéder à l'API." + error;
        });
      this.question = "";
    },
    addEnterKeyPress: function () {
      document
        .querySelector("#msg-input")
        .addEventListener("keyup", (event) => {
          if (event.key !== "Enter") return; // Use `.key` instead.
          document.querySelector("#msg-button").click(); // Things you want to do.
          event.preventDefault(); // No need to `return false;`.
        });
    },
  },
};
</script>

<style scoped lang="scss">
$BACK_COLOR: #b1b1b1;

#chat-window {
  /* -moz-border-radius: 5rem; */
  /* -webkit-border-radius: 5rem; */
  // overflow-y: scroll;
  margin-bottom: 80px;
}

#userInput {
  background-color: $BACK_COLOR;
  padding: 0.7rem;
}

button {
  margin: 1rem;
  background-color: darken($BACK_COLOR, 20%);
  color: white;
}
</style>
