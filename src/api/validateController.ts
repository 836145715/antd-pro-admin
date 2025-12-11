// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 此处后端没有提供注释 POST /validate/test */
export async function test(
  body: API.TestReqDto,
  options?: { [key: string]: any }
) {
  return request<API.RObject>("/validate/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /validate/test2 */
export async function test2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.test2Params,
  options?: { [key: string]: any }
) {
  return request<API.RObject>("/validate/test2", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /validate/test3 */
export async function test3(options?: { [key: string]: any }) {
  return request<API.RObject>("/validate/test3", {
    method: "GET",
    ...(options || {}),
  });
}
