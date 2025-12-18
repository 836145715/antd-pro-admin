import { LogoutOutlined } from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { menuRoutes } from "@/routes";
import { buildMenuTree, type MenuConfig } from "@/routes";
import { useEffect, useState } from "react";
import { clearUserInfo, loadUserInfo } from "@/hooks/useUserInfo";
import { Dropdown } from "antd";
import { logout } from "@/api/mainController";
const BasicLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuTree, setMenuTree] = useState<MenuConfig | undefined>(undefined);
  const userInfo = loadUserInfo();
  useEffect(() => {
    buildMenuTree().then((res) => {
      setMenuTree({
        path: "/",
        children: res,
      });
      console.log("menuTree", res);
    });
  }, []);

  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        title={"后台管理系统"}
        siderWidth={216}
        route={menuTree}
        location={{
          pathname: location.pathname,
        }}
        avatarProps={{
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          title: userInfo.nickName || userInfo.username,
          size: "small",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                      onClick: async () => {
                        await logout();
                        clearUserInfo();
                        navigate("/login");
                      },
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        menuItemRender={(item, dom) => {
          if (item.path && item.path.startsWith("http")) {
            // 外部链接直接打开
            return (
              <a href={item.path} target="_blank" rel="noopener noreferrer">
                {dom}
              </a>
            );
          }

          return (
            <div
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                }
              }}
            >
              {dom}
            </div>
          );
        }}
      >
        <PageContainer>
          <ProCard
            style={{
              minHeight: 800,
            }}
          >
            {/* 使用 Outlet 渲染子路由 */}
            <Outlet />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default BasicLayout;
