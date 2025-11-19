#!/bin/bash

# Classmate Frontend 快速启动脚本

echo "🚀 Starting Classmate Frontend..."
echo ""

# 检查 .env.local 是否存在
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    echo ""
    echo "Please create .env.local with:"
    echo "  NEXTAUTH_SECRET=<your-secret>"
    echo "  GOOGLE_CLIENT_ID=<your-client-id>"
    echo "  GOOGLE_CLIENT_SECRET=<your-client-secret>"
    echo ""
    echo "See SETUP_GUIDE.md for details."
    exit 1
fi

# 检查依赖是否安装
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# 启动开发服务器
echo ""
echo "✅ Starting development server..."
echo "   URL: http://localhost:3000"
echo ""
npm run dev
