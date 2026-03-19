// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 删除优惠券 GET /coupon/manage/del */
export async function couponDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponDelParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/coupon/manage/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询优惠券详情 GET /coupon/manage/get */
export async function couponGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.couponGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RCoupon>("/coupon/manage/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询优惠券列表 POST /coupon/manage/page */
export async function couponPage(
  body: API.CouponQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoCoupon>("/coupon/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增优惠券 POST /coupon/manage/save */
export async function couponSave(
  body: API.Coupon,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/coupon/manage/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新优惠券信息 POST /coupon/manage/update */
export async function couponUpdate(
  body: API.Coupon,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/coupon/manage/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
