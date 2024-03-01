import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
//引入normalize.css重製樣式
import "@/assets/normalize.css"
import "element-ui/lib/theme-chalk/index.css"
//從elementui中引出Table
import ElementUI, { Table } from "element-ui"
//注意，這裡是處理table寬度報錯的問題
const fixElTableErr = (table) => {
  const oldResizeListener = table.methods.resizeListener
  table.methods.resizeListener = function () {
    window.requestAnimationFrame(oldResizeListener.bind(this))
  }
}

// ！！！！一定要在Vue.use之前執行此函數
fixElTableErr(Table)

Vue.config.productionTip = false

//使用elementUI
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
