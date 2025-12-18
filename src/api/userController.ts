// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 分配用户角色 POST /user/manage/assignRoles */
export async function userAssignRoles(
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
export async function userDel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userDelParams,
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
export async function userGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetParams,
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
export async function userGetRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetRolesParams,
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
export async function userLogout(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userLogoutParams,
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
export async function userGetMenu(options?: { [key: string]: any }) {
  return request<API.RListMenu>("/user/manage/menu", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询用户 POST /user/manage/page */
export async function userPage(
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
export async function userResetPwd(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userResetPwdParams,
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
export async function userSave(
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
export async function userUpdate(
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
