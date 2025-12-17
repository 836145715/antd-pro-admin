// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 分配用户角色 POST /user/manage/assignRoles */
export async function assignRoles(
  body: API.AssignUserRoleReqDto,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/user/manage/assignRoles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID删除用户 GET /user/manage/del */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/user/manage/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID查询用户 GET /user/manage/find */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserParams,
  options?: { [key: string]: any }
) {
  return request<API.RUser>("/user/manage/find", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户角色列表 GET /user/manage/getUserRoles */
export async function getUserRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserRolesParams,
  options?: { [key: string]: any }
) {
  return request<API.RListInteger>("/user/manage/getUserRoles", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 强制注销登录 POST /user/manage/logout */
export async function logout(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.logoutParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/user/manage/logout", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询用户菜单 GET /user/manage/menu */
export async function getMenu(options?: { [key: string]: any }) {
  return request<API.RListMenu>("/user/manage/menu", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询用户 POST /user/manage/page */
export async function pageUser(
  body: API.UserQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoUser>("/user/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置用户密码 GET /user/manage/resetPwd */
export async function resetPwd(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetPwdParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/user/manage/resetPwd", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增用户 POST /user/manage/save */
export async function saveUser(
  body: API.User,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/user/manage/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户 POST /user/manage/update */
export async function updateUser(
  body: API.User,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/user/manage/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
