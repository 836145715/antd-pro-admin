// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 强制清除缓存 GET /main/clearCache */
export async function clearCache(options?: { [key: string]: any }) {
  return request<API.RVoid>("/main/clearCache", {
    method: "GET",
    ...(options || {}),
  });
}

/** 用户登录 POST /main/login */
export async function loginMain(
  body: API.LoginReqDto,
  options?: { [key: string]: any }
) {
  return request<API.RLoginInfoDto>("/main/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录信息 POST /main/loginInfo */
export async function loginInfo(options?: { [key: string]: any }) {
  return request<API.RLoginInfoDto>("/main/loginInfo", {
    method: "POST",
    ...(options || {}),
  });
}

/** 用户退出登录 GET /main/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.RVoid>("/main/logout", {
    method: "GET",
    ...(options || {}),
  });
}
