import Vue from "vue"
import Vuex from "vuex"
import { userInfo } from "@/apis/user.js"
import router from "@/router/index"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //聲明一個選單陣列,開始從本地儲存中讀取，使用JSON.parse是因為存的時候轉成JSON，如果沒有給你個空陣列
    menuList: JSON.parse(localStorage.getItem("menuList")) || [],
    userName: localStorage.getItem("userName") || "",
  },
  mutations: {
    //用於改變選單陣列的值，順便持久化儲存
    GETMENULIST(state, menuList) {
      state.menuList = menuList
      //轉成JSON物件
      localStorage.setItem("menuList", JSON.stringify(menuList))
    },
    NAMEUPDATE(state, userName) {
      state.userName = userName
      localStorage.setItem("userName", userName)
    },
  },
  actions: {
    async getMenuList({ commit }) {
      //使用這個請求方法，獲取使用者角色，需要請求頭中有token
      let res = await userInfo()
      //如果返回不等於20000代表token失效了
      if (res.data.code !== 20000) return
      let role = res.data.data.roles[0].name
      //請求選單列表
      let res2 = await axios.get("/menus.json")
      //用list儲存選單列表
      let list = res2.data
      let menuList = []
      let routes = []
      //使用者判斷
      if (role === "administrator") {
        //如果是管理員則獲得所有許可權
        routes = list
      } else if (role === "input") {
        //如果是銷售人員則獲得銷售許可權
        routes = list.filter(
          (item) =>
            (item.meta &&
              item.meta.roles &&
              item.meta.roles.indexOf(role) != -1) ||
            item.meta.title === "首頁"
        )
      } else if (role === "approve") {
        //如果是審核人員則獲得審批管理的初審許可權
        routes = list.filter(
          (item) =>
            (item.meta &&
              item.meta.roles &&
              item.meta.roles.indexOf(role) != -1) ||
            item.meta.title === "首頁"
        )
        //過濾掉審批管理的終審
        routes = routes.map((item) => {
          if (item.children) {
            item.children.forEach((it, index) => {
              if (it.meta.title === "終審") {
                delete item.children[index]
              }
            })
          }
          return item
        })
      }
      //接收格式化的選單
      menuList = routes.map((item) => {
        //如果選單有childeren
        if (item.children) {
          item.children.map((it) => {
            let path = it.path1
            it.component = () => import(`@/views${path}.vue`)
          })
        }
        //如果選單沒有childeren
        let url = item.component
        item.component = () => import(`@/layout/${url}.vue`)
        //把路由新增到路由器中
        router.addRoute(item)

        //格式化選單，把path和meta拿出來
        let { path, meta } = item
        if (item.children) {
          //如果有children把他也格式化
          item.children = item.children.map((it) => {
            let { meta, path } = it
            return { path, title: meta.title }
          })
          return { path, title: meta.title, children: item.children }
        }
        //沒有children就直接格式化
        return { path, title: meta.title }
      })
      //呼叫mutations的方法
      commit("GETMENULIST", menuList)
    },
  },
})
