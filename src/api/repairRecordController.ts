// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 根据ID查询报修记录详情 GET /repair/manage/get */
export async function repairGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.repairGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RRepairRecord>("/repair/manage/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 标记报修为已解决 POST /repair/manage/handle */
export async function handleRepair(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.handleRepairParams,
  body: string,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/repair/manage/handle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询报修记录列表 POST /repair/manage/page */
export async function repairPage(
  body: API.RepairRecordQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoRepairRecord>("/repair/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
