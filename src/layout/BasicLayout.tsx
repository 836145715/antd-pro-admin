import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { menuRoutes } from "@/routes";

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
        route={menuRoutes}
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
