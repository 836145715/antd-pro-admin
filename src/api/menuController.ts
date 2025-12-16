// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 根据ID删除菜单 GET /menu/manage/del */
export async function deleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenuParams,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/menu/manage/del", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询所有菜单 GET /menu/manage/menuList */
export async function getMenuList(options?: { [key: string]: any }) {
  return request<API.RListMenu>("/menu/manage/menuList", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查询需要创建的菜单 GET /menu/manage/pages */
export async function getPages(options?: { [key: string]: any }) {
  return request<API.RListMenu>("/menu/manage/pages", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查询菜单树 GET /menu/manage/tree */
export async function getTree(options?: { [key: string]: any }) {
  return request<API.RListMenu>("/menu/manage/tree", {
    method: "GET",
    ...(options || {}),
  });
}

/** 更新菜单 POST /menu/manage/update */
export async function updateMenu(
  body: API.Menu,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/menu/manage/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
