// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 新增设备 POST /device/manager/add */
export async function deviceAdd(
  body: API.LockDevice,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/device/manager/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除设备 GET /device/manager/del */
export async function deviceDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deviceDelParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/device/manager/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询设备 GET /device/manager/get */
export async function deviceGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deviceGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RLockDevice>("/device/manager/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据IMEI查询设备 GET /device/manager/getByImei */
export async function deviceGetByImei(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deviceGetByImeiParams,
  options?: { [key: string]: any }
) {
  return request<API.RLockDevice>("/device/manager/getByImei", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询设备位置 GET /device/manager/getLocation */
export async function deviceGetLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deviceGetLocationParams,
  options?: { [key: string]: any }
) {
  return request<API.RLockDevice>("/device/manager/getLocation", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看所有设备 GET /device/manager/list */
export async function deviceList(options?: { [key: string]: any }) {
  return request<API.RListLockDevice>("/device/manager/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询设备 POST /device/manager/page */
export async function devicePage(
  body: API.LockDeviceQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoLockDevice>("/device/manager/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新设备 POST /device/manager/update */
export async function deviceUpdate(
  body: API.LockDevice,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/device/manager/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新设备状态 POST /device/manager/updateStatus */
export async function deviceUpdateStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deviceUpdateStatusParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/device/manager/updateStatus", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
