// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 登录日志列表 GET /loginLog/list */
export async function list(options?: { [key: string]: any }) {
  return request<string>("/loginLog/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 登录日志列表 PUT /loginLog/list */
export async function list3(options?: { [key: string]: any }) {
  return request<string>("/loginLog/list", {
    method: "PUT",
    ...(options || {}),
  });
}

/** 登录日志列表 POST /loginLog/list */
export async function list2(options?: { [key: string]: any }) {
  return request<string>("/loginLog/list", {
    method: "POST",
    ...(options || {}),
  });
}

/** 登录日志列表 DELETE /loginLog/list */
export async function list5(options?: { [key: string]: any }) {
  return request<string>("/loginLog/list", {
    method: "DELETE",
    ...(options || {}),
  });
}

/** 登录日志列表 PATCH /loginLog/list */
export async function list4(options?: { [key: string]: any }) {
  return request<string>("/loginLog/list", {
    method: "PATCH",
    ...(options || {}),
  });
}
