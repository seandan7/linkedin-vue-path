<template>
  <div id="main-app" class="container mt-4">
    <div class="row">
      <add-appointment @add="addApt" />
      <search-appointments
        :myKey="filterKey"
        :myDir="filterDir"
        @requestKey="changeKey"
        @requestDir="changeDir"
        @searchRecords="searchApts"
      />
      <appointment-list
        @edit="editItem"
        @remove="removeItem"
        :appointments="sortedApts"
      />
    </div>
  </div>
</template>

<script>
import AppointmentList from "./components/AppointmentList";
import AddAppointment from "./components/AddAppointment";
import SearchAppointments from "./components/SearchAppointments";
import axios from "axios";
export default {
  name: "MainApp",
  data: function() {
    return {
      appointments: [],
      aptIndex: 1,
      searchTerms: "",
      filterKey: "petName",
      filterDir: "asc",
    };
  },
  components: {
    AppointmentList,
    AddAppointment,
    SearchAppointments,
  },
  computed: {
    searchedApts: function() {
      return this.appointments.filter((item) => {
        return (
          item.petName.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.petOwner.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.aptNotes.toLowerCase().match(this.searchTerms.toLowerCase())
        );
      });
    },
    sortedApts: function() {
      var filterKeyCopy = this.filterKey;
      var filterDirCopy = this.filterDir;
      var searchedCopy = this.searchedApts;
      var sorted = searchedCopy.sort(function(a, b) {
        if (a[filterKeyCopy] > b[filterKeyCopy]) {
          return filterDirCopy === "asc" ? 1 : -1;
        } else if (a[filterKeyCopy] < b[filterKeyCopy]) {
          return filterDirCopy === "desc" ? -1 : 1;
        } else {
          return 0;
        }
      });
      return sorted;
    },
  },
  methods: {
    removeItem: function(apt) {
      this.appointments.splice(this.appointments.indexOf(apt), 1);
    },
    editItem: function(index, field, text) {
      this.appointments[index][field] = text;
    },
    addApt: function(aptData) {
      aptData.aptId = this.aptIndex;
      this.aptIndex++;

      this.appointments.push(aptData);
    },
    searchApts: function(terms) {
      this.searchTerms = terms;
    },
    changeKey: function(value) {
      this.filterKey = value;
    },
    changeDir: function(value) {
      this.filterDir = value;
    },
  },
  mounted() {
    axios.get("./data/appointments.json").then(
      (response) =>
        (this.appointments = response.data.map((item) => {
          item.aptId = this.aptIndex;
          this.aptIndex++;
          return item;
        }))
    );
  },
};
</script>
