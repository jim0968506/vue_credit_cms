import request from "@/utils/request"

export const createLoan = (data) => {
  return request({
    //貸款申請提交介面
    url: "/loan/create",
    method: "post",
    data,
  })
}
export const getLoanList = (params) => {
  return request({
    url: "/loan/list",
    method: "get",
    params,
  })
}
//編輯提交介面
export const updateLoan = (data) => {
  return request({
    url: "/loan/update",
    method: "put",
    data,
  })
}
//刪除申請介面
export const deleteLoan = (id) => {
  return request({
    url: "/loan/delete/" + id,
    method: "delete",
  })
}
// 提交審核介面
export const submitApprove = (id) => {
  return request({
    url: "/loan/submitToApprove",
    method: "post",
    data: {
      id,
    },
  })
}
// 審批-初審-查詢介面
export const queryList = (params) => {
  return request({
    url: "/approve/first/list",
    method: "get",
    params,
  })
}
// 初審通過/拒絕介面
export const approveFirst = (id, flag) => {
  //呼叫時傳入flag，改變呼叫的是通過或者是失敗的介面
  return request({
    url: "/approve/first/" + flag,
    method: "post",
    data: {
      loanId: id,
      appId: id,
    },
  })
}
// 審批-終審-查詢介面
export const queryEndList = (params) => {
  return request({
    url: "/approve/end/list",
    method: "get",
    params,
  })
}
// 審批 - 終審-通過/拒絕介面
export const approveEnd = (id, flag) => {
  return request({
    url: "/approve/end/" + flag,
    method: "POST",
    data: {
      appId: id,
      loanId: id,
    },
  })
}
// 合同管理-合同列表介面
export const contractList = (params) => {
  return request({
    url: "/contract/list",
    method: "get",
    params,
  })
}

// 合同管理- 生成合同介面
export const generateContract = (id) => {
  return request({
    url: "/contract/createFile",
    method: "post",
    data: {
      id,
    },
  })
}

// 合同管理- 下載合同介面
export const downloadContract = (id) => {
  return request({
    url: "/contract/download",
    method: "get",
    params: {
      id,
    },
  })
}
