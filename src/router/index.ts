import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ListItems from "../views/ListItems.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "ListItems",
    component: ListItems,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login") next({ name: "Login" });
  else next();
});

export default router;
