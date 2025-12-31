// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 删除行程订单 GET /ridingOrder/manager/del */
export async function ridingOrderDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ridingOrderDelParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ridingOrder/manager/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询行程订单 GET /ridingOrder/manager/get */
export async function ridingOrderGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ridingOrderGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RMemberRidingOrder>("/ridingOrder/manager/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据会员ID查询订单列表 GET /ridingOrder/manager/listByMemberId */
export async function ridingOrderListByMemberId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ridingOrderListByMemberIdParams,
  options?: { [key: string]: any }
) {
  return request<API.RListMemberRidingOrder>(
    "/ridingOrder/manager/listByMemberId",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 根据行程ID查询订单 GET /ridingOrder/manager/listByTripId */
export async function ridingOrderGetByTripId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ridingOrderGetByTripIdParams,
  options?: { [key: string]: any }
) {
  return request<API.RMemberRidingOrder>("/ridingOrder/manager/listByTripId", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询用户未付款订单 GET /ridingOrder/manager/listUnpaidByMemberId */
export async function ridingOrderListUnpaidByMemberId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ridingOrderListUnpaidByMemberIdParams,
  options?: { [key: string]: any }
) {
  return request<API.RListMemberRidingOrder>(
    "/ridingOrder/manager/listUnpaidByMemberId",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页查询行程订单 POST /ridingOrder/manager/page */
export async function ridingOrderPage(
  body: API.MemberRidingOrderQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoMemberRidingOrder>("/ridingOrder/manager/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增行程订单 POST /ridingOrder/manager/save */
export async function ridingOrderSave(
  body: API.MemberRidingOrder,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ridingOrder/manager/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新行程订单 POST /ridingOrder/manager/update */
export async function ridingOrderUpdate(
  body: API.MemberRidingOrder,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/ridingOrder/manager/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
