import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store"
if (localStorage.getItem("token")) {
  store.dispatch("getMenuList")
}
Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/layout/layout.vue"),
    children: [
      {
        meta: {
          title: "首頁",
        },
        path: "home",
        component: () => import("@/views/HomeView.vue"),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
