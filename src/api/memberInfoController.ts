// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 将会员绑定到指定运营商 POST /member/manage/bindDistributor */
export async function bindDistributor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.bindDistributorParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/member/manage/bindDistributor", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询会员详情 GET /member/manage/get */
export async function memberGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.memberGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RMemberInfo>("/member/manage/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询会员列表 POST /member/manage/page */
export async function memberPage(
  body: API.MemberInfoQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoMemberInfo>("/member/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改会员状态（拉黑/解除） POST /member/manage/toBlack */
export async function toBlack(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.toBlackParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/member/manage/toBlack", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设置会员为运维人员或取消 POST /member/manage/toOperations */
export async function toOperations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.toOperationsParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/member/manage/toOperations", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 清除会员绑定的运营商 POST /member/manage/unbindDistributor */
export async function unbindDistributor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unbindDistributorParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/member/manage/unbindDistributor", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
