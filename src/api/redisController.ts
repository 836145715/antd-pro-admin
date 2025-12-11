// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 根据key获取value GET /redis/get */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getParams,
  options?: { [key: string]: any }
) {
  return request<API.RObject>("/redis/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据key设置value GET /redis/set */
export async function set(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setParams,
  options?: { [key: string]: any }
) {
  return request<API.RBoolean>("/redis/set", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
