// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 激活电子围栏 GET /electronic/fence/activate */
export async function activate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.activateParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/electronic/fence/activate", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增电子围栏 POST /electronic/fence/add */
export async function add(
  body: API.ElectronicFence,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/electronic/fence/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 检查坐标是否在围栏内 GET /electronic/fence/checkPoint */
export async function checkPointInFence(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkPointInFenceParams,
  options?: { [key: string]: any }
) {
  return request<API.RBoolean>("/electronic/fence/checkPoint", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 停用电子围栏 GET /electronic/fence/deactivate */
export async function deactivate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deactivateParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/electronic/fence/deactivate", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除电子围栏 GET /electronic/fence/del */
export async function deleteUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/electronic/fence/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询电子围栏 GET /electronic/fence/get */
export async function getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdParams,
  options?: { [key: string]: any }
) {
  return request<API.RElectronicFence>("/electronic/fence/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询所有电子围栏 GET /electronic/fence/list */
export async function listAll(options?: { [key: string]: any }) {
  return request<API.RListElectronicFence>("/electronic/fence/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询电子围栏 POST /electronic/fence/page */
export async function pageQuery(
  body: API.ElectronicFenceQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoElectronicFence>("/electronic/fence/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新电子围栏 POST /electronic/fence/update */
export async function update(
  body: API.ElectronicFence,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/electronic/fence/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
