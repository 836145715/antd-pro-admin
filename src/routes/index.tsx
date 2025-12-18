import { loadComponent } from "@/utils/componentLoader";
import { menuGetList } from "@/api/menuController";
import type { MenuDataItem } from "@ant-design/pro-components";
import { type RouteObject } from "react-router-dom";
import { Suspense } from "react";
import Welcome from "@/pages/Welcome";
import { loadUserInfo } from "@/hooks/useUserInfo";

export type MenuConfig = MenuDataItem &
  RouteObject & {
    id?: string;
    parentid?: string;
    children?: MenuConfig[];
    type?: number; //0:目录 1:菜单 2:按钮
    permission?: string; //权限
  };

const removeId = (item: MenuConfig[]) => {
  item.forEach((item) => {
    delete item.id;
    if (item.children) {
      removeId(item.children);
    }
  });
};

//过滤没有权限的菜单
const filterNoPerMenu = (list: API.Menu[]) => {
  const userInfo = loadUserInfo();
  return list.filter((item) => {
    if (item.per) {
      return userInfo.perms?.includes(item.per);
    }
    return true;
  });
};

const buildMenuTree = async () => {
  const res = await menuGetList();
  if (!res.data) return [];
  let list = res.data.filter((item) => item.type !== 2);
  list = filterNoPerMenu(list);

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

  //遍历去除所有id数据 因为createBrowserRouter会报错
  removeId(roots);
  console.log("roots", roots);

  roots.push({
    index: true,
    element: <Welcome />,
  });

  return [...roots];
};

export { buildMenuTree };
