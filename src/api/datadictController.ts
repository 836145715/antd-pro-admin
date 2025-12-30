// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 根据分类查询字典及明细 GET /datadict/manage/byCategory */
export async function dictGetByCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictGetByCategoryParams,
  options?: { [key: string]: any }
) {
  return request<API.RDatadict>("/datadict/manage/byCategory", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID删除字典 GET /datadict/manage/del */
export async function dictDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictDelParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/datadict/manage/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询字典 GET /datadict/manage/find */
export async function dictGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RDatadict>("/datadict/manage/find", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询字典及明细 GET /datadict/manage/getWithItems */
export async function dictGetWithItems(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictGetWithItemsParams,
  options?: { [key: string]: any }
) {
  return request<API.RDatadict>("/datadict/manage/getWithItems", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询字典 POST /datadict/manage/page */
export async function dictPage(
  body: API.DatadictQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoDatadict>("/datadict/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增字典 POST /datadict/manage/save */
export async function dictSave(
  body: API.Datadict,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/datadict/manage/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新字典 POST /datadict/manage/update */
export async function dictUpdate(
  body: API.Datadict,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/datadict/manage/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
