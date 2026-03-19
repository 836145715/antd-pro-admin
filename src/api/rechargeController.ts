// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 根据ID查询交易记录详情 GET /recharge/manage/get */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getParams,
  options?: { [key: string]: any }
) {
  return request<API.RRecharge>("/recharge/manage/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询交易记录列表 POST /recharge/manage/page */
export async function page(
  body: API.RechargeQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoRecharge>("/recharge/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
