import React, { lazy } from 'react';

// 1. 核心：扫描 /src/pages 下所有的 .jsx / .tsx 文件
// eager: false (默认) 表示懒加载，只有真正用到时才请求网络
const modules = import.meta.glob('../pages/**/*.tsx');

/**
 * 根据后端返回的 component 路径加载组件
 * @param {string} componentPath 后端返回的字符串，例: "System/User"
 */
export const loadComponent = (componentPath: string) => {
  // 2. 拼接文件真实路径
  // 假设你的规范是：后端返回 "System/User"，对应文件 "../pages/System/User/index.jsx"
  // 或者对应 "../pages/System/User.jsx"
  
  // 这里演示匹配 index.jsx 的情况
  const realPath = `../pages/${componentPath}/Index.tsx`;
  
  // 也可以做一种容错匹配（既找 .jsx 也找 /index.jsx）
  // const realPath2 = `../pages/${componentPath}.jsx`;

  // 3. 从 modules 映射表中找到对应的加载函数
  const importFn = modules[realPath];

  if (!importFn) {
    console.error(`组件文件未找到: ${realPath}。请检查文件是否存在或路径拼写错误。`);
    // 返回一个 404 占位组件，防止页面崩溃
    return lazy(() => import('../pages/404')); 
  }

  // 4. 使用 React.lazy 转换为组件
  return lazy(() => importFn() as Promise<{ default: React.ComponentType<any> }>);
};