import request from "@/utils/request"

export const doLogin = (user) => {
  return request.post("/user/login", {
    //這裡是後端需要account字元，也就是使用者名稱
    account: user.username,
    password: user.pass,
  })
}
export const logout = () => {
  return request.post("/user/logout")
}
//建立使用者介面
export const createUser = ({ username, password, permission }) => {
  return request.post("/permission/createUser", {
    account: username,
    password,
    role_id: permission,
  })
}
//獲取使用者介面
export const userList = () => {
  return request({
    url: "/user/list?type=new",
    method: "get",
  })
}
export const userInfo = () => {
  return request.get("/user/info")
}
