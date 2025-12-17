import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/mainController";
import styles from "./index.module.css";
import { saveUserInfo } from "@/hooks/useUserInfo";
const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: API.LoginReqDto) => {
    try {
      const response = await login(values);
      if (response.success && response.data) {
        message.success("登录成功");

        // 保存登录信息到 localStorage
        saveUserInfo(response.data);
        // 跳转到首页
        navigate("/");
      } else {
        message.error(response.message || "登录失败");
      }
    } catch (error) {
      message.error("登录请求失败，请稍后重试");
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          title="后台管理-登录"
          submitter={{
            searchConfig: {
              submitText: "登录",
            },
            resetButtonProps: {
              style: {
                display: "none",
              },
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginReqDto);
            return true;
          }}
        >
          <ProFormText
            initialValue={"admin"}
            name="username"
            label="账号"
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: "请输入用户名！",
              },
            ]}
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
          />

          <ProFormText.Password
            initialValue={"123456"}
            name="password"
            label="密码"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
          />

          <div
            style={{
              marginBottom: 24,
              textAlign: "right",
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                message.info("功能开发中");
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
      <footer className={styles.footer}>
        <div>Copyright © {new Date().getFullYear()} 后台管理系统</div>
      </footer>
    </div>
  );
};

export default LoginPage;
