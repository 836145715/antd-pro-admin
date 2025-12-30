// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 根据ID删除字典明细 GET /datadict/item/manage/del */
export async function dictItemDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictItemDelParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/datadict/item/manage/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询字典明细 GET /datadict/item/manage/find */
export async function dictItemGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictItemGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RDatadictItem>("/datadict/item/manage/find", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据字典ID查询明细列表 GET /datadict/item/manage/listByDictId */
export async function dictItemListByDictId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictItemListByDictIdParams,
  options?: { [key: string]: any }
) {
  return request<API.RListDatadictItem>("/datadict/item/manage/listByDictId", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询字典明细 POST /datadict/item/manage/page */
export async function dictItemPage(
  body: API.DatadictItemQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoDatadictItem>("/datadict/item/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增字典明细 POST /datadict/item/manage/save */
export async function dictItemSave(
  body: API.DatadictItem,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/datadict/item/manage/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新字典明细 POST /datadict/item/manage/update */
export async function dictItemUpdate(
  body: API.DatadictItem,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/datadict/item/manage/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
