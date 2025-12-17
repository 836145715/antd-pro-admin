// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 新增设备 GET /device/manager/add */
export async function add(options?: { [key: string]: any }) {
  return request<string>("/device/manager/add", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查看设备 GET /device/manager/list */
export async function list(options?: { [key: string]: any }) {
  return request<string>("/device/manager/list", {
    method: "GET",
    ...(options || {}),
  });
}
