# 🎓 Classmate Frontend

A modern Next.js frontend for the Classmate career guidance platform.

## 🚀 Quick Start

### **1. Install Dependencies**
```bash
npm install
```

### **2. Configure Environment Variables**

Create `.env.local` and add:

```env
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
NEXT_PUBLIC_BACKEND_API=https://classmate-super-engine1111v2-production.up.railway.app
```

### **3. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📚 **Documentation**

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions.

---

## 🛠 **Tech Stack**

- **Framework**: Next.js 14 (App Router)
- **Authentication**: NextAuth.js + Google OAuth
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Language**: TypeScript

---

## 📂 **Project Structure**

```
frontend/
├── app/                    # Next.js App Router
│   ├── api/auth/          # NextAuth API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   └── page.tsx           # Home page
├── utils/                 # Utilities
│   └── api.ts            # Backend API client
├── middleware.ts         # Route protection
└── .env.local           # Environment variables
```

---

## 🔗 **Backend API**

Connected to: `https://classmate-super-engine1111v2-production.up.railway.app`

---

## 📝 **License**

MIT
