# Stata 论文脚本生成器

这是一个同时支持 Web 页面和 Windows EXE 桌面版的 Stata 论文脚本生成器工程骨架。项目基于 React、Vite、TypeScript 和 Electron，核心目标是让用户通过结构化表单配置研究方法、变量和输出需求，然后生成一份可继续编辑的 Stata 脚本初稿。

## 当前能力

- 首版研究方法收敛为：描述统计、基准回归、面板回归、DID、IV
- 支持 `ini` 配置导入
- 支持导出当前表单配置为 `ini`
- 支持内置 Stata 模板和用户自定义模板的保存、删除
- 支持恢复最近一次配置
- 支持 Web 页面和 Windows EXE 桌面壳
- 首版默认中文界面与中文提示

## 目录说明

- `src/shared`：Web 与桌面版共用的配置模型、校验、导入导出、模板管理和脚本生成逻辑
- `src/web`：Web 页面入口和前端组件
- `src/desktop`：桌面前端入口
- `electron`：Electron 主进程、预加载脚本与 IPC
- `spec/stata-paper-script-generator`：当前需求规格与实施计划
- `docs`：补充说明文档
- `fixtures`：示例配置与样例数据

## 环境要求

- Node.js 18 及以上
- npm 9 及以上
- Windows 环境下可额外打包 EXE

## 安装依赖

```bash
npm install
```

## 开发与运行

启动 Web 开发环境：

```bash
npm run dev:web
```

启动桌面版开发环境：

```bash
npm run dev:desktop
```

桌面版开发命令会先构建 Web 和 Electron 入口，再启动本地 Electron 应用。

## 构建

构建 Web 与 Electron 运行产物：

```bash
npm run build
```

仅构建 Web：

```bash
npm run build:web
```

仅构建 Electron 主进程：

```bash
npm run build:electron
```

打包 Windows EXE：

```bash
npm run build:desktop
```

桌面打包产物默认输出到 `release/` 目录，不在 `dist/` 目录里。

常见产物位置：

- `release/*.exe`：安装包
- `release/win-unpacked/`：解包后的可执行目录
- `release/win-unpacked/Stata Script Generator.exe`：可直接运行的桌面程序

如果你运行了 `npm run build`，那只会生成 Web 和 Electron 的构建文件，不会生成安装包；安装包必须执行 `npm run build:desktop`。

当前配置已关闭 Windows 可执行文件编辑与签名步骤，用于减少首次打包时对外网下载 `winCodeSign` 的依赖。如果你后续需要正式签名发布，再恢复相关配置即可。

## ini 配置格式

首版 `ini` 文件采用版本化结构，主要分为以下区段：

- `[meta]`
- `[research]`
- `[variables]`
- `[output]`
- `[template]`
- `[advanced]`

详细字段定义请查看：

- [docs/import-guide.md](docs/import-guide.md)
- [fixtures/sample-config.ini](fixtures/sample-config.ini)

## 相关文档

- [spec/stata-paper-script-generator/spec.md](spec/stata-paper-script-generator/spec.md)
- [spec/stata-paper-script-generator/plan.md](spec/stata-paper-script-generator/plan.md)
- [docs/current-outstanding.md](docs/current-outstanding.md)

## 当前已知事项

- Windows EXE 打包链路仍建议在实际 Windows 环境做一次完整验证
- 当前内置模板为 `stata18-modern` 和 `stata17-classic`
- 如需扩充更多 Stata 版本模板，可继续在模板注册表中追加
