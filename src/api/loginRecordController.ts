// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 根据ID查询登录日志详情 GET /loginRecord/manage/get */
export async function loginRecordGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginRecordGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RLoginRecord>("/loginRecord/manage/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询登录日志列表 POST /loginRecord/manage/page */
export async function loginRecordPage(
  body: API.LoginRecordQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoLoginRecord>("/loginRecord/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
