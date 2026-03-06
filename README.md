# 文迹 - 非遗文化体验旅行平台

探索中国非物质文化遗产，发现独特的文化旅行体验。

## 技术栈

- **Next.js 14** (App Router) - React 全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化样式
- **Google Gemini AI** - 智能旅行助手
- **Vercel** - 部署平台

## 功能页面

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页(探索) | `/` | 文化节日、旅程推荐、文化景点 |
| 行程规划 | `/plan` | 标签选择快速生成行程 |
| AI 聊天 | `/chat` | Gemini AI 旅行助手 |
| 行程结果 | `/itinerary` | 智能推荐旅行计划 |
| 消息 | `/messages` | 与博主和商家的聊天 |
| 我的旅行 | `/trips` | 旅行记录和社区内容 |
| 旅行详情 | `/trips/[id]` | 用户旅行计划详情 |
| 文化产品 | `/products` | 非遗产品展示和购买 |
| 活动详情 | `/activity/[id]` | 文化体验活动预定 |

## 本地运行

```bash
npm install
npm run dev
```

在浏览器打开 http://localhost:3000

## 环境变量

创建 `.env.local` 文件：

```
GOOGLE_GEMINI_API_KEY=你的Gemini API Key
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 导入该仓库
3. 在 Vercel 环境变量中添加 `GOOGLE_GEMINI_API_KEY`
4. 部署完成
