// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 新增地图 GET /map/add */
export async function add1(options?: { [key: string]: any }) {
  return request<string>("/map/add", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查看地图列表 GET /map/list */
export async function list1(options?: { [key: string]: any }) {
  return request<string>("/map/list", {
    method: "GET",
    ...(options || {}),
  });
}
