// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 添加角色 POST /role/manage/add */
export async function roleAdd(
  body: API.Role,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/role/manage/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色授权 POST /role/manage/authorize */
export async function roleAuthorize(
  body: API.AuthorizeRoleReqDto,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/role/manage/authorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID删除角色 GET /role/manage/del */
export async function roleDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleDelParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/role/manage/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取角色菜单权限 GET /role/manage/getRoleMenus */
export async function roleGetMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleGetMenusParams,
  options?: { [key: string]: any }
) {
  return request<API.RListString>("/role/manage/getRoleMenus", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询所有角色 GET /role/manage/roleList */
export async function roleList(options?: { [key: string]: any }) {
  return request<API.RListRole>("/role/manage/roleList", {
    method: "GET",
    ...(options || {}),
  });
}

/** 更新角色 POST /role/manage/update */
export async function roleUpdate(
  body: API.Role,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/role/manage/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
