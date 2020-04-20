<template>
  <div class="card mt-5">
    <h2 class="card-header">
      {{ heading }}
    </h2>
    <div class="overflow-hidden">
      <transition name="height-shrink">
        <div class="m-33" v-cloak v-if="elements.length > 0 && showSummary">
          <p>showing {{ elements.length }} items</p>
        </div>
      </transition>
    </div>
    <button
      class="btn btn-primary btn-sm d-inline-block"
      @click.stop="showSummary = !showSummary"
    >
      Toggle summary
    </button>
    <table class="table table-striped table-dark">
      <thead>
        <th>ID</th>
        <th
          :key="index"
          v-for="(element, index) in dataToShow.tableHeadings"
          class="thead-dark"
        >
          {{ element }}
        </th>
        <th>Remove</th>
      </thead>
      <tbody :key="index" v-for="(element, index) in elements">
        <tr>
          <td>{{ index + 1 }}</td>
          <td v-for="(dataPoint, index) in dataToShow.dataPoints" :key="index">
            <span v-if="typeof dataPoint === 'string'">
              {{ element[dataPoint] }}
            </span>
            <span v-else-if="Array.isArray(dataPoint)">
              {{ getObjPathFromArr(dataPoint, element) }}
            </span>
          </td>

          <td>
            <button @click.stop="remove(index)" class="btn btn-warning">
              remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ElementTable",
  data() {
    return {
      showSummary: true, // total items toggler
      elements: [], // this populates on created,
    };
  },

  created() {
    fetch(this.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // this accounts for api urls in which the data is not the first result
        if (this.dataToShow.subDataPath) {
          this.elements = this.getObjPathFromArr(
            this.dataToShow.subDataPath,
            data
          );
        } else {
          this.elements = data;
        }
        // only show number of elements specified. TODO: Allow prop for if url has limit param
        this.elements.splice(this.elementCount);
      });
  },
  methods: {
    log(message) {
      console.log(message);
    },
    remove(index) {
      this.elements.splice(index, 1);
    },
    isOdd(idx) {
      return idx % 2 === 0;
    },
    getObjPathFromArr(arr, start = null) {
      if (start) {
        let fullPath = start;
        console.log(fullPath);
        for (let i = 0; i < arr.length; i++) {
          fullPath = fullPath[arr[i]];
        }
        return fullPath;
      } else {
        let fullPath;
        for (let i = 0; i < arr.length; i++) {
          fullPath = fullPath[arr[i]];
        }
        return fullPath;
      }
    },
  },
  props: {
    url: String,
    heading: String,
    dataToShow: Object,
    elementCount: Number,
  },
};
</script>
<style scoped>
.height-shrink-leave-to,
.height-shrink-enter {
  max-height: 0px !important;
}
.height-shrink-enter-active,
.height-shrink-leave-active {
  max-height: 500px;
  transition: all 0.2s ease-in-out;
}
</style>
