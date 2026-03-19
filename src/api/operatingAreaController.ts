// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 删除运营区域 GET /operatingArea/manage/del */
export async function areaDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.areaDelParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/operatingArea/manage/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询运营区域详情 GET /operatingArea/manage/get */
export async function areaGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.areaGetParams,
  options?: { [key: string]: any }
) {
  return request<API.ROperatingArea>("/operatingArea/manage/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询所有运营区域 GET /operatingArea/manage/list */
export async function areaList(options?: { [key: string]: any }) {
  return request<API.RListOperatingArea>("/operatingArea/manage/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询运营区域列表 POST /operatingArea/manage/page */
export async function areaPage(
  body: API.OperatingAreaQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoOperatingArea>("/operatingArea/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增运营区域 POST /operatingArea/manage/save */
export async function areaSave(
  body: API.OperatingArea,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/operatingArea/manage/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新运营区域信息 POST /operatingArea/manage/update */
export async function areaUpdate(
  body: API.OperatingArea,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/operatingArea/manage/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
