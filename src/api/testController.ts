// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 新增测试路由 GET /test/add */
export async function add(options?: { [key: string]: any }) {
  return request<string>("/test/add", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查看测试路由列表 GET /test/list */
export async function list(options?: { [key: string]: any }) {
  return request<string>("/test/list", {
    method: "GET",
    ...(options || {}),
  });
}
