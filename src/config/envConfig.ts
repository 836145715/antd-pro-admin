/**
 * 环境配置文件
 */

// 获取环境变量
export const getEnvConfig = () => {
  return {
    appTitle: import.meta.env.VITE_APP_TITLE ,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    showRequestLog: import.meta.env.VITE_SHOW_REQUEST_LOG === 'true',
    showResponseLog: import.meta.env.VITE_SHOW_RESPONSE_LOG === 'true',
    // 是否为开发环境
    isDev: import.meta.env.DEV,

    // 是否为生产环境
    isProd: import.meta.env.PROD,
  };
};

// 导出配置对象
export const envConfig = getEnvConfig();
