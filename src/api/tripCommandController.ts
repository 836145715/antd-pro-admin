// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 删除下发智能锁命令 GET /trip/command/del */
export async function tripCommandDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tripCommandDelParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/trip/command/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询下发智能锁命令 GET /trip/command/get */
export async function tripCommandGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tripCommandGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RTripCommand>("/trip/command/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看所有下发智能锁命令 GET /trip/command/list */
export async function tripCommandList(options?: { [key: string]: any }) {
  return request<API.RListTripCommand>("/trip/command/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询下发智能锁命令 POST /trip/command/page */
export async function tripCommandPage(
  body: API.TripCommandQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoTripCommand>("/trip/command/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增下发智能锁命令 POST /trip/command/save */
export async function tripCommandSave(
  body: API.TripCommand,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/trip/command/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新下发智能锁命令 POST /trip/command/update */
export async function tripCommandUpdate(
  body: API.TripCommand,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/trip/command/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
