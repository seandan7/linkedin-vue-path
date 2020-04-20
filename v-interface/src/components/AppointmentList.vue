<template>
  <div class="w-100">
    <div class="list-group list-group-flush">
      <div
        class="border-top py-3 list-group-item d-flex flex-column align-items-start"
        v-for="(apt, index) in appointments"
        :key="apt.aptIndex"
      >
        <button
          class="mr-2 btn btn-sm btn-danger"
          @click="$emit('remove', apt)"
        >
          <font-awesome-icon icon="trash" />
        </button>
        <div class="w-100">
          <div class="d-flex justify-content-between">
            <span
              class="h4 text-primary"
              contenteditable="contenteditable"
              @blur="$emit('edit', index, 'petName', $event.target.innerText)"
              >{{ apt.petName }}</span
            >
            <span class="">{{ formattedDate(apt.aptDate) }}</span>
          </div>
          <div class="owner-name">
            <span class="font-weight-bold text-primary mr-1">Owner: </span>
            <span
              contenteditable="contenteditable"
              @blur="$emit('edit', index, 'petOwner', $event.target.innerText)"
              >{{ apt.petOwner }}</span
            >
          </div>
          <div
            contenteditable="contenteditable"
            @blur="$emit('edit', index, 'aptNotes', $event.target.innerText)"
          >
            {{ apt.aptNotes }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import moment from "moment";
export default {
  name: "AppointmentList",
  props: ["appointments"],
  components: {
    FontAwesomeIcon,
  },
  methods: {
    formattedDate: function(date) {
      return moment(new Date(date)).format("MM-DD-YY, h:mm a");
    },
  },
};
</script>
