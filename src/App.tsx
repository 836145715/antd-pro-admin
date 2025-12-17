import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { buildMenuTree, type MenuConfig } from "@/routes";
import { Spin } from "antd";
import BasicLayout from "./layout/BasicLayout";
import { noLayoutRoutes } from "@/routes/staticRoutes";
import routeEventEmitter from "@/utils/routeEvents";

function App() {
  const [router, setRouter] = useState<any>(null);

  // 创建路由重建函数
  const rebuildRouter = () => {
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
      console.log("===========注册路由");
    });
  };

  useEffect(() => {
    // 初始构建路由
    rebuildRouter();

    // 监听路由重建事件
    const handleRebuildRoute = () => {
      console.log("收到路由重建请求，重新构建路由");
      rebuildRouter();
    };

    routeEventEmitter.on("rebuildRoute", handleRebuildRoute);

    // 清理函数
    return () => {
      routeEventEmitter.off("rebuildRoute", handleRebuildRoute);
    };
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
