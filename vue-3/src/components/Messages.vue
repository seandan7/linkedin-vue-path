<template>
  <div class="container">
    <h4 class="display-1">Messages</h4>
    <v-list>
      <v-list-item v-for="item in store.state.messages" :key="item.title">
        <v-list-item-content class="highlight">
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import axios from "axios";
import store from "../store.js";
export default {
  data: function() {
    return {
      store,
    };
  },
  async created() {
    store.state.messages = await axios
      .get("http://localhost:3000/messages")
      .then((data) => data.data);
  },
};
</script>

<style scoped>
.highlight:hover {
  background: #eee;
}
</style>
