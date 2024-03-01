import axios from "axios"
import router from "@/router"

//Notification是一種錯誤提醒
import { Message, Notification } from "element-ui"

const request = axios.create({
  //設定/api字首
  baseURL: "/api",
})
//請求攔截器
request.interceptors.request.use((config) => {
  //下面是加的內容
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.token = token
  }
  return config
})
//響應攔截器
request.interceptors.response.use((response) => {
  //20000代表成功
  if (response?.data?.code === 20000) {
    // 由於歷史遺留問題, 後端響應的結構不能一次性做到統一,相容處理一下
    if (typeof response?.data?.data === "string")
      Message.success(response?.data?.data)
    if (typeof response?.data?.data?.info === "string")
      Message.success(response?.data?.data?.info)
    return response

    // 603 代表token失效, 處理跳轉到登入
  } else if (response?.data?.code === 603) {
    Notification.error({
      title: "錯誤",
      message: "token失效,請重新登入",
    })
    // 替換到登入頁面，但是如果是login頁面那就不重複跳轉
    let url = window.location.href.split("/")
    if (url[url.length - 1] !== "login") {
      router.replace("/login")
    }
  } else {
    //如果原始的請求狀態不等於200表示響應錯誤
    if (response.status !== 200) {
      Notification.error({
        title: "錯誤",
        message: "響應錯誤",
      })
    }
  }
  return response
})

export default request
