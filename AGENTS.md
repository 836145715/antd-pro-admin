# AGENTS 指南（zmwl-admin-new）

本文件用于约束 AI Agent 与协作开发者在本仓库中的工作方式，目标是**改动可控、风格一致、可快速回归验证**。

## 1. 项目概览

- 技术栈：`React 18` + `TypeScript` + `Vite` + `React Router` + `Ant Design` + `@ant-design/pro-components` + `UnoCSS`
- 包管理：仓库同时存在 `pnpm-lock.yaml` 与 `package-lock.json`，默认优先使用 `npm`（如团队已统一 `pnpm`，按团队标准执行）
- Node：建议 `>=18`

## 2. 常用命令

在仓库根目录执行：

- 安装依赖：`npm install`
- 本地开发：`npm run dev`
- 生产构建：`npm run build`
- 代码检查：`npm run lint`
- 预览构建产物：`npm run preview`
- 重新生成接口与页面骨架：`npm run gen`

## 3. 目录约定（高频）

- `src/pages`：页面组件，动态菜单页面路径需遵循 `src/pages/<menu.path>/Index.tsx`
- `src/routes`：路由组装与静态路由
- `src/layout`：布局组件（如 `BasicLayout`）
- `src/api`：OpenAPI 生成的接口与类型
- `src/utils/request.ts`：统一请求实例、鉴权与错误处理
- `src/config/envConfig.ts`：环境变量读取与转换

## 4. 路由与菜单机制（必须理解）

- 系统主路由由后端菜单动态生成（`buildMenuTree`）。
- 页面组件通过 `import.meta.glob('../pages/**/*.tsx')` 动态加载。
- 新增后台菜单页面时，必须保证：
  - 菜单 `path` 与页面文件路径一致；
  - 页面入口文件命名为 `Index.tsx`；
  - 对应目录位于 `src/pages` 下。
- 无布局页面（如登录页）放在 `src/routes/staticRoutes.tsx`。

## 5. 接口生成约定

- 通过 `openapi.config.js` + `npm run gen` 生成接口代码。
- `serversPath` 指向 `./src`，生成文件会写入 `src/api`。
- 不手改生成文件；若需调整优先改生成配置后重跑。
- `int64` 在生成时被映射为 `string`/`string[]`，使用时避免再按 number 处理。

## 6. 环境变量约定

主要变量：

- `VITE_APP_TITLE`
- `VITE_API_BASE_URL`
- `VITE_API_HOST`
- `VITE_SHOW_REQUEST_LOG`
- `VITE_SHOW_RESPONSE_LOG`

开发代理依赖 `VITE_API_BASE_URL` 与 `VITE_API_HOST`；修改任一值时要同步验证请求是否仍可正确转发。

## 7. 代码风格与实现约束

- 使用 TypeScript，新增代码优先补全类型，不要滥用 `any`。
- 复用已有别名：`@`、`@api`、`@utils`、`@pages` 等（见 `vite.config.ts`）。
- 统一走 `src/utils/request.ts` 发请求，不在页面里重复封装 axios。
- 遵循现有 ESLint 配置；提交前至少执行一次 `npm run lint`。
- 保持改动最小化：优先“就地修复”，避免无关重构。
- 不引入与需求无关的新依赖；确需引入时在 PR/提交说明中写明原因。

## 8. Agent 工作流程（建议）

1. 先定位影响范围（页面、路由、接口、配置）。
2. 优先阅读已存在实现，再做最小改动。
3. 修改后至少执行：
   - `npm run lint`
   - 必要时 `npm run build`（涉及类型、路由、打包配置时必须跑）
4. 输出变更说明时，需包含：
   - 改了哪些文件；
   - 为什么这样改；
   - 如何验证。

## 9. 禁止事项

- 不要提交密钥、Token、账号密码等敏感信息。
- 不要随意修改 `.env*` 默认值（除非任务明确要求）。
- 不要手工改写 OpenAPI 自动生成产物后不更新生成源。
- 不要在未确认影响的情况下重命名页面目录（会破坏动态路由映射）。

## 10. 快速检查清单（提交前）

- [ ] 页面路径与菜单路径一致（动态路由场景）
- [ ] API 调用使用统一 request 实例
- [ ] lint 通过
- [ ] 关键流程手测通过（登录、菜单加载、目标功能）
- [ ] 无无关文件改动

