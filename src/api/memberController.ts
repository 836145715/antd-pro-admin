// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 此处后端没有提供注释 GET /member/list */
export async function listMember(options?: { [key: string]: any }) {
  return request<API.RListMemberInfo>("/member/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /member/page */
export async function pageMember(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageMemberParams,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoMemberInfo>("/member/page", {
    method: "GET",
    params: {
      // pageNum has a default value: 1
      pageNum: "1",
      // pageSize has a default value: 10
      pageSize: "10",
      ...params,
    },
    ...(options || {}),
  });
}
