# 📁 Frontend 项目结构

## 🎯 **完整目录树**

```
frontend/
├── 📁 app/                          # Next.js App Router 主目录
│   ├── 📁 analyze/                  # 技能分析页面
│   │   └── page.tsx                  # 分析页面组件
│   ├── 📁 api/                       # API 路由
│   │   └── 📁 auth/                  # 认证 API
│   │       └── 📁 [...nextauth]/     # NextAuth 动态路由
│   │           └── route.ts          # NextAuth 配置
│   ├── 📁 careers/                   # 职业推荐页面
│   │   └── page.tsx                  # 职业页面组件
│   ├── 📁 dashboard/                 # 仪表板页面
│   │   └── page.tsx                  # Dashboard 组件
│   ├── 📁 learning-path/             # 学习路径页面
│   │   └── page.tsx                  # 学习路径组件
│   ├── 📁 login/                     # 登录页面
│   │   └── page.tsx                  # 登录组件
│   ├── 📁 profile/                   # 个人资料页面
│   │   └── page.tsx                  # 个人资料组件
│   ├── 📄 page.tsx                   # 首页（自动重定向）
│   ├── 📄 layout.tsx                 # 根布局组件
│   ├── 📄 providers.tsx              # SessionProvider 包装器
│   ├── 📄 globals.css                # 全局样式（含渐变工具类）
│   └── 📄 favicon.ico                # 网站图标
│
├── 📁 components/                     # 可复用组件
│   └── Sidebar.tsx                   # 侧边栏导航组件
│
├── 📁 utils/                         # 工具函数
│   └── api.ts                        # Axios API 客户端配置
│
├── 📁 public/                        # 静态资源
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── 📄 package.json                   # 项目依赖配置
├── 📄 package-lock.json              # 依赖锁定文件
├── 📄 tsconfig.json                  # TypeScript 配置
├── 📄 next.config.ts                 # Next.js 配置
├── 📄 postcss.config.mjs             # PostCSS 配置（Tailwind）
├── 📄 eslint.config.mjs              # ESLint 配置
├── 📄 middleware.ts                  # Next.js 中间件（路由保护）
├── 📄 vercel.json                    # Vercel 部署配置
├── 📄 .vercelignore                  # Vercel 忽略文件
├── 📄 .gitignore                     # Git 忽略规则
├── 📄 next-env.d.ts                  # Next.js 类型定义
├── 📄 start.sh                       # 启动脚本
└── 📄 README.md                      # 项目说明
```

---

## 📊 **文件统计**

| 类型 | 数量 | 说明 |
|------|------|------|
| **页面组件** | 7 | 7 个主要页面 |
| **API 路由** | 1 | NextAuth 认证 |
| **组件** | 1 | Sidebar 侧边栏 |
| **工具** | 1 | API 客户端 |
| **配置文件** | 8 | Next.js, TypeScript, Vercel 等 |
| **静态资源** | 5 | SVG 图标 |
| **总计** | **23 个核心文件** | 不包括 node_modules |

---

## 🎨 **页面路由结构**

### **路由映射**

| 路径 | 文件 | 功能 |
|------|------|------|
| `/` | `app/page.tsx` | 首页（自动重定向到登录或 Dashboard） |
| `/login` | `app/login/page.tsx` | Google OAuth 登录页 |
| `/dashboard` | `app/dashboard/page.tsx` | 主仪表板（Career Blueprint Ready） |
| `/analyze` | `app/analyze/page.tsx` | 技能分析页面 |
| `/careers` | `app/careers/page.tsx` | 职业推荐页面（Roles You're Fit） |
| `/learning-path` | `app/learning-path/page.tsx` | 学习路径页面 |
| `/profile` | `app/profile/page.tsx` | 个人资料页面 |
| `/api/auth/[...nextauth]` | `app/api/auth/[...nextauth]/route.ts` | NextAuth API |

---

## 🧩 **核心组件说明**

### **1. 布局组件**

#### `app/layout.tsx`
- **作用**: Next.js 根布局
- **功能**: 
  - 包装所有页面
  - 引入全局样式
  - 使用 `Providers` 组件提供 Session

#### `app/providers.tsx`
- **作用**: SessionProvider 包装器
- **功能**: 
  - 客户端组件（"use client"）
  - 提供 NextAuth Session 上下文

### **2. 页面组件**

#### `app/page.tsx` (首页)
- **功能**: 
  - 检查登录状态
  - 未登录 → 重定向到 `/login`
  - 已登录 → 重定向到 `/dashboard`

#### `app/login/page.tsx`
- **功能**: 
  - Google OAuth 登录按钮
- **设计**: 简洁的登录界面

#### `app/dashboard/page.tsx`
- **功能**: 
  - 显示 "Your Career Blueprint Is Ready"
  - 三个摘要卡片（Skill Graph, Skill Gaps, Learning Journey）
  - "See Your Career Paths" CTA 按钮
- **设计**: 侧边栏 + 主内容区

#### `app/analyze/page.tsx`
- **功能**: 
  - 欢迎信息卡片
  - 文本输入框（带上传图标）
  - 渐变发送按钮
  - 结果显示（技能、职业、差距、学习路径）
- **设计**: 侧边栏 + 输入区 + 结果区

#### `app/careers/page.tsx`
- **功能**: 
  - "Roles You're Fit" 标题
  - 水平滚动的职业卡片
  - Fit Score 显示
  - Required/Missing Skills
  - Ramp-Up 时间和级别
- **设计**: 侧边栏 + 职业卡片网格

#### `app/learning-path/page.tsx`
- **功能**: 
  - 学习路径时间线
  - 技能状态（completed/in-progress/locked）
  - 进度百分比
  - 课程推荐
- **设计**: 侧边栏 + 时间线 + 课程侧边栏

#### `app/profile/page.tsx`
- **功能**: 
  - 用户信息显示
  - 技能管理（添加/删除）
  - 技能级别设置
  - 活动历史
- **设计**: 侧边栏 + 个人资料卡片

### **3. 共享组件**

#### `components/Sidebar.tsx`
- **功能**: 
  - 左侧导航栏
  - Logo 显示
  - 导航链接（Dashboard, Profile, Skill Trees, Career Paths, Job Matches）
  - 设置和登出按钮
- **设计**: 固定侧边栏，紫色高亮当前页面

### **4. 工具函数**

#### `utils/api.ts`
- **功能**: 
  - Axios 实例配置
  - 使用 `NEXT_PUBLIC_BACKEND_API` 环境变量
  - 统一 API 请求配置

---

## ⚙️ **配置文件说明**

### **Next.js 配置**

#### `next.config.ts`
- Next.js 项目配置
- 框架设置

#### `tsconfig.json`
- TypeScript 编译配置
- 路径别名设置

#### `postcss.config.mjs`
- PostCSS 配置
- Tailwind CSS 集成

### **部署配置**

#### `vercel.json`
- Vercel 部署配置
- 构建命令设置

#### `.vercelignore`
- Vercel 忽略文件
- 排除开发文件

### **其他配置**

#### `middleware.ts`
- Next.js 中间件
- 路由保护（需要登录的页面）

#### `eslint.config.mjs`
- ESLint 代码检查配置

---

## 🎨 **样式系统**

### **全局样式** (`app/globals.css`)

#### **渐变工具类**
```css
.gradient-purple-pink    /* 紫色到粉色渐变背景 */
.gradient-text          /* 渐变文字 */
.gradient-border        /* 渐变边框 */
```

#### **颜色变量**
```css
--gradient-purple: #8B5CF6
--gradient-pink: #EC4899
```

---

## 📦 **依赖包**

### **生产依赖**
- `next`: 16.0.3 - Next.js 框架
- `react`: 19.2.0 - React 库
- `react-dom`: 19.2.0 - React DOM
- `next-auth`: 4.24.13 - 认证库
- `axios`: 1.13.2 - HTTP 客户端

### **开发依赖**
- `typescript`: 5 - TypeScript
- `tailwindcss`: 4 - Tailwind CSS
- `eslint`: 9 - 代码检查
- `@types/*` - TypeScript 类型定义

---

## 🔗 **关键连接点**

### **1. 认证流程**
```
用户点击登录 
  → app/login/page.tsx 
  → NextAuth (app/api/auth/[...nextauth]/route.ts)
  → Google OAuth
  → 重定向到 /dashboard
```

### **2. API 调用流程**
```
页面组件 
  → utils/api.ts (Axios 实例)
  → NEXT_PUBLIC_BACKEND_API 环境变量
  → 后端 Railway API
```

### **3. 路由保护**
```
middleware.ts 
  → 检查 /dashboard, /analyze, /careers 等
  → 未登录 → 重定向到 /login
```

---

## ✅ **部署就绪检查**

- ✅ 所有页面组件完整
- ✅ API 路由配置正确
- ✅ 环境变量使用正确
- ✅ Vercel 配置完整
- ✅ 样式系统完整
- ✅ 组件结构清晰

---

## 📝 **总结**

**Frontend 结构特点**：
1. **Next.js App Router** - 使用最新的路由系统
2. **TypeScript** - 类型安全
3. **Tailwind CSS** - 实用优先的样式
4. **NextAuth** - Google OAuth 认证
5. **组件化设计** - 可复用的 Sidebar 组件
6. **环境变量配置** - 支持生产环境配置

**所有文件已准备好部署！** 🚀

