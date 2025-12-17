// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 用户登录 POST /main/login */
export async function login(
  body: API.LoginReqDto,
  options?: { [key: string]: any }
) {
  return request<API.RLoginRspDto>("/main/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
