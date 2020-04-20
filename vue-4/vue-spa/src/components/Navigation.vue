<template>
  <div>
    <nav class="navbar-expand bg-primary navbar-dark">
      <div class="container">
        <div class="row py-2">
          <div class="col-7">
            <router-link class="navbar-brand" to="/">Meeting Log</router-link>
          </div>

          <div classs="col-5 text-right">
            <div class="navbar-nav ml-auto">
              <router-link v-if="user" class="nav-item nav-link" to="/meetings"
                >Meetings</router-link
              >
              <router-link v-if="!user" class="nav-item nav-link" to="/login"
                >Login</router-link
              >
              <router-link v-if="!user" class="nav-item nav-link" to="/register"
                >Register</router-link
              >
              <button class="nav-item btn btn-link" @click="$emit('logout')">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Nav",
  props: ["user"],
};
</script>
