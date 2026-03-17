# Local Agent Skills Guide

本项目在仓库根目录下提供了本地技能目录 `.agents/skills`。
当 agent 在此工作区内执行任务时，应优先复用这些本地 skill，而不是重复发明流程。

## 技能目录

- `.agents/skills/spec`
- `.agents/skills/plan`
- `.agents/skills/implement`
- `.agents/skills/test`
- `.agents/skills/review`

## 使用原则

1. 先判断用户目标属于哪个阶段，再选择对应 skill。
2. 一次任务只使用最小必要 skill；如果任务跨阶段，按 `spec -> plan -> implement -> test -> review` 顺序推进。
3. 使用 skill 前先读取对应 `SKILL.md`，严格遵循其中的边界和输出要求。
4. 如果用户明确指定了 skill 名称或命令，如 `/spec`、`/plan`、`/implement`、`/test`、`/review`，必须优先使用对应 skill。
5. 如果缺少前置产物，先补前置，不要跳阶段。

## 触发规则

### `spec`

适用场景：
- 用户要写需求、补需求、澄清边界、整理功能说明
- 用户要“写 spec”“需求分析”“需求规格说明”

执行要求：
- 先澄清不明确的范围
- 产出 `spec.md`
- 不写实现代码

### `plan`

适用场景：
- 用户要写实施计划、技术方案、任务拆解
- 用户要“写 plan”“拆解任务”“技术方案设计”

执行要求：
- 必须基于已确认的 `spec.md`
- 产出 `plan.md`
- 不直接开始编码

### `implement`

适用场景：
- 用户要实现功能、修复 bug、按 plan 落地代码
- 用户要“实现”“开发”“fix”“写代码”

执行要求：
- 必须先读取相关 `spec.md` 和 `plan.md`
- 只实现当前范围内内容
- 完成后更新对应计划状态

### `test`

适用场景：
- 用户要补测试、跑测试、写单元测试、做集成验证

执行要求：
- 只修改测试相关文件
- 不修改业务代码
- 产出 `test.md` 或等价测试结果说明

### `review`

适用场景：
- 用户要代码审查、风险检查、质量检查、回归检查

执行要求：
- 重点输出问题、风险、缺失项
- 按严重级别组织结果
- 不直接改业务代码，修复应交回 `implement`

## 推荐工作流

### 新功能

`spec -> plan -> implement -> test -> review`

### 已有需求继续开发

已有 `spec.md` 和 `plan.md` 时：
`implement -> test -> review`

### 仅排查质量问题

`review`

### 仅补测试

`test`

## 本仓库约定

- 本地 skills 位于 `.agents/skills`
- 每个 skill 的入口文件是对应目录下的 `SKILL.md`
- 当前已安装 skills 以 `skills-lock.json` 为准

## 执行提示

当 agent 接到请求时，可按以下规则快速决策：

- 需求不清：先用 `spec`
- 需求清楚但还没拆任务：用 `plan`
- 已有 plan，需要落地：用 `implement`
- 需要验证：用 `test`
- 需要审查：用 `review`

如果一个请求同时覆盖多个阶段，先告知将采用的 skill 顺序，再逐步执行。
