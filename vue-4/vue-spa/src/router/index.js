import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Meetings from "../views/Meetings.vue";
import Register from "../views/Register.vue";
import CheckIn from "../views/CheckIn";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/meetings",
    name: "Meetings",
    component: Meetings,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "*",
    redirect: "/",
  },
  {
    path: "/checkin/:userId/:meetingId",
    name: "CheckIn",
    component: CheckIn,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
