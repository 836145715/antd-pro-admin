// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 根据ID查询用户优惠券详情 GET /memberCoupon/manage/get */
export async function memberCouponGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memberCouponGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RMemberCoupon>("/memberCoupon/manage/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询用户已领取的优惠券列表 POST /memberCoupon/manage/page */
export async function memberCouponPage(
  body: API.MemberCouponQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoMemberCoupon>("/memberCoupon/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
