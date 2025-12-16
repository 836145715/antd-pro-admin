import { loadComponent } from "@/utils/componentLoader";
import { getMenuList } from "@/api/menuController";
import type { MenuDataItem } from "@ant-design/pro-components";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import BasicLayout from "@/layout/BasicLayout";
import { Suspense, type ReactNode } from "react";

export type MenuConfig = MenuDataItem &
  RouteObject & {
    id?: string;
    parentid?: string;
    children?: MenuConfig[];
    type?: number; //0:目录 1:菜单 2:按钮
    permission?: string; //权限
  };

const buildMenuTree = async () => {
  const res = await getMenuList();
  if (!res.data) return [];
  const list = res.data.filter((item) => item.type !== 2);

  const map = new Map<string, MenuConfig>();

  // 先建 map
  list.forEach((item) => {
    if (!item.id) return;
    const paths = item.path?.split("/").filter(Boolean);
    const filePath = paths?.join("/");

    const base: MenuConfig = {
      name: item.name,
      id: item.id,
      parentid: item.parentid,
      type: item.type,
    };

    if (item.type === 1 && filePath) {
      base.path = item.path;
      const Component = loadComponent(filePath!);
      if (Component) {
        base.element = (
          <Suspense fallback={<div>Loading...</div>}>
            <Component />
          </Suspense>
        );
      }
      // 这里如果有 permission 字段，可以挂在 meta 上，或者自定义字段
      base.permission = item.per;
    }

    map.set(item.id, base);
  });

  console.log("map", map);

  // 组装 children
  const roots: MenuConfig[] = [];
  map.forEach((item) => {
    if (item.parentid) {
      const parent = map.get(item.parentid);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(item);
      }
    } else {
      roots.push(item);
    }
  });
  console.log("roots", roots);
  return roots;
};

const loadRemoteRoutes = async () => {
  const res = await getMenuList();
  if (res.data) {
    const menuData = res.data;
    console.log("初始化", menuData);

    //转为menuConfig
    let routes = menuData.map((item) => {
      const paths = item.path?.split("/").filter((path) => path !== "");
      let filePath = paths?.join("/");

      if (item.type === 0) {
        //目录
        return {
          name: item.name,
          id: item.id,
          parentid: item.parentid,
          type: item.type,
        };
      }

      if (item.type === 1) {
        //菜单
        return {
          name: item.name,
          path: item.path,
          element: loadComponent(filePath!),
          permission: item.per,
          id: item.id,
          parentid: item.parentid,
          type: item.type,
        };
      }
    }) as MenuConfig[];

    routes = routes.filter((item) => item !== undefined);

    console.log("routes", routes);

    //填充所有menuData的children
    for (const item of routes) {
      item.children = routes.filter((child) => child.parentid === item.id);
    }
    routes = routes.filter((item) => !item.parentid);
    console.log("routes2", routes);

    const menuRoutes: MenuConfig = {
      path: "/",
      element: <BasicLayout />,
      children: routes,
    };

    return createBrowserRouter([menuRoutes]);
  }
  return [];
};

export { loadRemoteRoutes, buildMenuTree };
