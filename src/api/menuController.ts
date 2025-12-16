// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

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
