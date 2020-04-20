<template>
  <div id="app">
    <Navigation @logout="logout" :user="user" />
    <router-view
      @addMeeting="addMeeting"
      class="container"
      :user="user"
      @logout="logout"
    />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Firebase from "firebase";
import db from "./src/db";
export default {
  name: "app",
  components: {
    Navigation,
  },
  data: function() {
    return {
      user: null,
    };
  },
  methods: {
    logout: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("login");
        });
    },
    addMeeting: function(payload) {
      db.collection("users").doc(this.user.uid)
      .collection("meetings").add({
        name: payload,
        createdA: Firebase.firestore.fieldValue.serverTimestamp(),
      });
    },
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user.email;
      }
    });
  },
};
</script>
<style lang="scss">
$primary: #000;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
