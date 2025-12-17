import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { envConfig } from '@/config/envConfig';

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: envConfig.apiBaseUrl, // 使用环境配置中的 API 地址
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 如果开启日志，打印请求信息
    if (envConfig.showRequestLog) {
      console.log('🚀 请求信息:', {
        url: config.url,
        method: config.method?.toUpperCase(),
        baseURL: config.baseURL,
        data: config.data,
        params: config.params,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ 请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data } = response;

    if(envConfig.showRequestLog) {
      console.log('🚀 响应信息:', {
        url: response.config.url,
        status: response.status,
        data,
      });
    }

    // 根据后端约定的状态码处理
    
    if(data.code == 403 || data.code == 401) {
      // 未授权，跳转到登录页
      message.error('未授权，请重新登录').then(() => {
        localStorage.removeItem('zmwl-token');
        window.location.href = '/login';
      });
      return Promise.reject(new Error('未授权，请重新登录'));
    }
    
    
    if (!data.success) {
      // 处理业务错误
      message.error(data.message || '请求失败');
      return Promise.reject(new Error(data.message || '请求失败'));
    }

    return data;
  },
  (error) => {
    // 对响应错误做点什么
    console.error('Response Error:', error);

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 未授权，跳转到登录页
          message.error('未授权，请重新登录');
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          message.error('拒绝访问');
          break;
        case 404:
          message.error('请求地址不存在');
          break;
        case 500:
          message.error('服务器内部错误');
          break;
        default:
          message.error((data as { message?: string })?.message || `请求失败: ${status}`);
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      message.error('网络错误，请检查您的网络连接');
    } else {
      // 其他错误
      message.error('请求配置错误');
    }

    return Promise.reject(error);
  }
);


/**
 * 1. 定义我们要覆盖的方法
 * 把返回类型 Promise<UnResponse> 改成 Promise<T>
 */
interface CustomMethods {
  // 支持 instance.get<User>('/url') 直接拿到 User
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>
  request: <T = any>(config: AxiosRequestConfig) => Promise<T>
  // 支持直接调用 instance<User>(...)
  <T = any>(config: AxiosRequestConfig): Promise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
}

type CustomInstance = Omit<AxiosInstance, keyof CustomMethods> & CustomMethods;

export default request as unknown as CustomInstance;