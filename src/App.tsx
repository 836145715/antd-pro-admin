import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { buildMenuTree, type MenuConfig } from "@/routes";
import { Spin } from "antd";
import BasicLayout from "./layout/BasicLayout";
import { noLayoutRoutes } from "@/routes/staticRoutes";

function App() {
  const [router, setRouter] = useState<any>(null);
  useEffect(() => {
    buildMenuTree().then((res) => {
      console.log(res);
      const menuRoutes: MenuConfig = {
        path: "/",
        element: <BasicLayout />,
        children: res,
      };

      const allRoutes = [menuRoutes, ...noLayoutRoutes];
      // console.log("所有路由", JSON.stringify(allRoutes));
      setRouter(createBrowserRouter(allRoutes));
    });
  }, []);

  if (!router) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 这里放一个加载转圈圈 */}
        <Spin size="large" tip="系统资源加载中..." fullscreen />
      </div>
    );
  }
  return <RouterProvider router={router} />;
}

export default App;
