
<template>
  <div id="chat-window" class="container-fluid">
    <header class="chat-header p-2">
      <h4>Bidule Assistant</h4>
    </header>
    <p>Hi, I am Bidule. I am David's assistant. How can I help you ?</p>
    <p>{{ answer }}</p>
    <input v-model="question" />
  </div>
</template>


<script>
import _ from "lodash";
import axios from "axios";

export default {
  name: "ChatWindow",
  props: {},
  data() {
    return {
      question: "",
      answer:
        "Je ne peux pas vous donner une réponse avant que vous ne posiez une question !",
    };
  },

  watch: {
    // à chaque fois que la question change, cette fonction s'exécutera
    question: function () {
      this.answer = "J'attends que vous arrêtiez de taper...";
      this.debouncedGetAnswer();
    },
  },
  created: function () {
    // _.debounce est une fonction fournie par lodash pour limiter la fréquence
    // d'exécution d'une opération particulièrement coûteuse.
    // Dans ce cas, nous voulons limiter la fréquence d'accès à
    // yesno.wtf/api, en attendant que l'utilisateur ait complètement
    // fini de taper avant de faire la requête ajax. Pour en savoir
    //  plus sur la fonction `_.debounce` (et sa cousine
    // `_.throttle`), visitez : https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf("?") === -1) {
        this.answer =
          "Les questions contiennent généralement un point d'interrogation. ;-)";
        return;
      }
      this.answer = "Je réfléchis...";
      var vm = this;
      // const axios = require('axios');
      axios
        .get("https://yesno.wtf/api")
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer);
        })
        .catch(function (error) {
          vm.answer = "Erreur ! Impossible d'accéder à l'API." + error;
        });
    },
  },
};
</script>

<style scoped>
.chat-header {
  text-align: center;
  font-weight: bolder;
  background-color: black;
}

.caht-window {
  /* -moz-border-radius: 5rem; */
  /* -webkit-border-radius: 5rem; */
  border-radius: 1rem;
  /* position: fixed; */
  /* bottom: 0px; */
  /* right: 50px; */
  background-color: rgb(197, 203, 206);
  color: rgb(19, 126, 180);
  height: 400px;
  width: 350px;
  overflow-y: scroll;
}
</style>
