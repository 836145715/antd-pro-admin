// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 删除行程 GET /trip/manager/del */
export async function tripDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tripDelParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/trip/manager/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询行程 GET /trip/manager/get */
export async function tripGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tripGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RTrip>("/trip/manager/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据用户ID查询行程列表 GET /trip/manager/listByMemberId */
export async function tripListByMemberId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tripListByMemberIdParams,
  options?: { [key: string]: any }
) {
  return request<API.RListTrip>("/trip/manager/listByMemberId", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据自行车编号查询行程列表 GET /trip/manager/listByQrNumber */
export async function tripListByQrNumber(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tripListByQrNumberParams,
  options?: { [key: string]: any }
) {
  return request<API.RListTrip>("/trip/manager/listByQrNumber", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询行程 POST /trip/manager/page */
export async function tripPage(
  body: API.TripQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoTrip>("/trip/manager/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增行程 POST /trip/manager/save */
export async function tripSave(
  body: API.Trip,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/trip/manager/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新行程 POST /trip/manager/update */
export async function tripUpdate(
  body: API.Trip,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/trip/manager/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
