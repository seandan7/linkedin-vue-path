<template>
  <div id="app">
    <Navigation @logout="logout" :user="user" />
    <router-view
      @addMeeting="addMeeting"
      @logout="logout"
      @deleteMeeting="deleteMeeting"
      @checkIn="checkIn"
      class="container"
      :user="user"
      :meetings="meetings"
      :error="error"
    />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Firebase from "firebase";
import db from "./db";
export default {
  name: "app",
  components: {
    Navigation,
  },
  data: function() {
    return {
      user: null,
      meetings: [],
      error: null,
    };
  },
  methods: {
    deleteMeeting: function(payload) {
      db.collection("users")
        .doc(this.users.id)
        .collection("meetings")
        .doc(payload)
        .delete();
    },
    checkIn: function(payload) {
      db.collection("users")
        .doc(payload.userId)
        .collection("meetings")
        .doc(payload.meetingID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            db.collection("users")
              .doc(payload.userID)
              .collection("meetings")
              .doc(payload.meetingID)
              .collection("attendees")
              .add({
                displayName: payload.displayName,
                email: payload.email,
                createdAt: Firebase.firestore.FieldValue.serverTimestamp,
              })
              .then(() => {
                this.$router.push("/");
              });
          } else {
            this.error = "Sorry, no such meeting";
          }
        });
    },
    logout: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("login");
        });
    },
    addMeeting: function(payload) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("meetings")
        .add({
          name: payload,
          createdA: Firebase.firestore.fieldValue.serverTimestamp(),
        });
    },
  },
  mounted() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user.email;
        db.collection("users")
          .doc(this.user.uid)
          .collection("meetings")
          // check db for changes
          .onSnapshot((snapshot) => {
            const snapData = [];
            snapshot.forEach((doc) => {
              snapData.push({
                id: doc.id,
                name: doc.data().name,
              });
            });
            this.meetings = snapData.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              } else if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              } else {
                return 0;
              }
            });
          });
      }
    });
  },
};
</script>
<style lang="scss">
$primary: #000;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
