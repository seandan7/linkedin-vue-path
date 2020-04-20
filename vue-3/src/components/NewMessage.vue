<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="messageBody"
            label="Message"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn class="mr-4" @click.prevent="submit">submit</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import store from "../store.js";
export default {
  data: function() {
    return {
      messageBody: "",
    };
  },
  methods: {
    async submit() {
      try {
        let msg = await axios.post("http://localhost:3000/messages", {
          message: this.messageBody,
        }).data;
        store.state.messages.push(msg.message);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
