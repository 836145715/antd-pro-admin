import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from "@ant-design/icons";
import type { MenuDataItem } from "@ant-design/pro-components";
import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layout/BasicLayout";
import Welcome from "../pages/Welcome";
import Admin from "../pages/Admin";
import AdminSubPage1 from "../pages/Admin/SubPage1";
import ListTableList from "../pages/ListTableList";
import ListSubSubPage1 from "../pages/List/SubPage/SubSubPage1";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/404";
import Form from "../pages/Form";

export type MenuConfig = MenuDataItem & RouteObject;

const menuRoutes: MenuConfig = {
  path: "/",
  element: <BasicLayout />,
  children: [
    {
      index: true,
      element: <Welcome />,
    },
    {
      path: "/welcome",
      name: "欢迎",
      icon: <SmileFilled />,
      element: <Welcome />,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <SmileFilled />,
      element: <Dashboard />,
    },
    {
      path: "/admin",
      name: "管理页",
      icon: <CrownFilled />,
      access: "canAdmin",
      children: [
        {
          index: true,
          element: <Admin />,
        },
        {
          path: "/admin/sub-page1",
          name: "一级页面",
          icon: "https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg",
          element: <AdminSubPage1 />,
        },
        {
          path: "/admin/sub-page2",
          name: "二级页面",
          icon: <CrownFilled />,
          element: <AdminSubPage1 />,
        },
        {
          path: "/admin/sub-page3",
          name: "三级页面",
          icon: <CrownFilled />,
          element: <AdminSubPage1 />,
        },
      ],
    },
    {
      name: "列表页",
      icon: <TabletFilled />,
      path: "/list",
      children: [
        {
          path: "/list/sub-page",
          name: "列表页面",
          icon: <CrownFilled />,
          children: [
            {
              path: "/list/sub-page/sub-sub-page1",
              name: "一一级列表页面",
              icon: <CrownFilled />,
              element: <ListTableList />,
            },
            {
              path: "/list/sub-page/sub-sub-page2",
              name: "一二级列表页面",
              icon: <CrownFilled />,
              element: <ListSubSubPage1 />,
            },
            {
              path: "/list/sub-page/sub-sub-page3",
              name: "一三级列表页面",
              icon: <CrownFilled />,
              element: <ListSubSubPage1 />,
            },
          ],
        },
        {
          path: "/list/sub-page2",
          name: "二级列表页面",
          icon: <CrownFilled />,
          element: <ListSubSubPage1 />,
        },
        {
          path: "/list/sub-page3",
          name: "三级列表页面",
          icon: <CrownFilled />,
          element: <ListSubSubPage1 />,
        },
      ],
    },
    {
      path: "/form",
      name: "表单页",
      icon: <CrownFilled />,
      element: <Form />,
    },
    {
      path: "https://ant.design",
      name: "Ant Design 官网外链",
      icon: <ChromeFilled />,
      element: <NotFound />,
    },
  ],
};
const router = createBrowserRouter([menuRoutes]);
export { router, menuRoutes };
