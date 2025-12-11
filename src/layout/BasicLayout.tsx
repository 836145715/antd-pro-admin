import {
  ChromeFilled,
  CrownFilled,
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  SmileFilled,
  TabletFilled,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const BasicLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        siderWidth={216}
        route={{
          path: "/",
          routes: [
            {
              path: "/welcome",
              name: "欢迎",
              icon: <SmileFilled />,
            },
            {
              path: "/dashboard",
              name: "Dashboard",
              icon: <SmileFilled />,
            },
            {
              path: "/admin",
              name: "管理页",
              icon: <CrownFilled />,
              access: "canAdmin",
              routes: [
                {
                  path: "/admin/sub-page1",
                  name: "一级页面",
                  icon: "https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg",
                },
                {
                  path: "/admin/sub-page2",
                  name: "二级页面",
                  icon: <CrownFilled />,
                },
                {
                  path: "/admin/sub-page3",
                  name: "三级页面",
                  icon: <CrownFilled />,
                },
              ],
            },
            {
              name: "列表页",
              icon: <TabletFilled />,
              path: "/list",
              routes: [
                {
                  path: "/list/sub-page",
                  name: "列表页面",
                  icon: <CrownFilled />,
                  routes: [
                    {
                      path: "/list/sub-page/sub-sub-page1",
                      name: "一一级列表页面",
                      icon: <CrownFilled />,
                    },
                    {
                      path: "/list/sub-page/sub-sub-page2",
                      name: "一二级列表页面",
                      icon: <CrownFilled />,
                    },
                    {
                      path: "/list/sub-page/sub-sub-page3",
                      name: "一三级列表页面",
                      icon: <CrownFilled />,
                    },
                  ],
                },
                {
                  path: "/list/sub-page2",
                  name: "二级列表页面",
                  icon: <CrownFilled />,
                },
                {
                  path: "/list/sub-page3",
                  name: "三级列表页面",
                  icon: <CrownFilled />,
                },
              ],
            },
            {
              path: "/form",
              name: "表单页",
              icon: <CrownFilled />,
            },
            {
              path: "https://ant.design",
              name: "Ant Design 官网外链",
              icon: <ChromeFilled />,
            },
          ],
        }}
        location={{
          pathname: location.pathname,
        }}
        avatarProps={{
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          title: "七妮妮",
          size: "small",
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <GithubFilled key="GithubFilled" />,
          ];
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
