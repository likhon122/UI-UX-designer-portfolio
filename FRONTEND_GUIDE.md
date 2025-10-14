# Frontend Integration Guide

## Overview

This project now has a fully functional **Next.js frontend** integrated with the existing Express.js backend API. The frontend provides a professional UI/UX designer portfolio and e-commerce platform.

## 🎯 What Has Been Built

### Core Features Implemented

1. **Authentication System**
   - Login page (`/auth/login`)
   - Sign up page with email verification (`/auth/signup`)
   - User session management with JWT tokens
   - Automatic token refresh
   - Role-based access control

2. **Design Gallery**
   - Browse designs with pagination (`/designs`)
   - View detailed design information (`/designs/[id]`)
   - Design categories and tags
   - Complexity levels
   - Designer information

3. **E-Commerce Features**
   - Pricing plans display (`/pricing`)
   - Purchase flow integration
   - Customer purchase history (`/customer/purchases`)
   - Payment status tracking

4. **User Management**
   - User profile page (`/profile`)
   - Role-based navigation (Customer, Admin, SuperAdmin)
   - Profile information display

5. **Admin Dashboard**
   - Revenue statistics (`/admin/dashboard`)
   - Quick links to management pages
   - Admin-only access control

6. **UI/UX Features**
   - Dark/Light theme toggle
   - Responsive design (mobile, tablet, desktop)
   - Loading states and animations
   - Error handling with user-friendly messages
   - Professional design with Tailwind CSS

## 📁 Project Structure

```
UI-UX-designer-portfolio/
├── frontend/                    # Next.js Frontend Application
│   ├── app/                     # Next.js App Router
│   │   ├── auth/                # Authentication pages
│   │   ├── designs/             # Design gallery
│   │   ├── pricing/             # Pricing plans
│   │   ├── customer/            # Customer dashboard
│   │   ├── admin/               # Admin dashboard
│   │   ├── profile/             # User profile
│   │   └── layout.tsx           # Root layout
│   ├── components/              # Reusable components
│   │   ├── layout/              # Header, Footer, Theme toggle
│   │   └── ui/                  # UI components (Button, Card, etc.)
│   ├── store/                   # Redux Toolkit store
│   │   └── slices/              # Auth, Design, Category, Purchase, etc.
│   ├── lib/                     # Utilities
│   │   ├── api-client.ts        # Axios API client
│   │   ├── config.ts            # API endpoints & URLs
│   │   └── utils.ts             # Helper functions
│   └── .env.local               # Environment variables
│
└── src/                         # Express.js Backend API
    └── app/                     # Backend modules
        ├── modules/             # API modules
        └── routes/              # API routes
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running on port 3000 (or configured port)

### Step 1: Start the Backend

From the project root:

```bash
# Install backend dependencies (if not already done)
npm install  # or yarn install

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3000/api/v1`

### Step 2: Configure Frontend API URL

Navigate to the frontend directory and create `.env.local`:

```bash
cd frontend
```

Create `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

**Important**: This is the ONLY place you need to set the backend API URL. All API calls throughout the application will automatically use this URL.

### Step 3: Install Frontend Dependencies

```bash
npm install
```

### Step 4: Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:3000` (different from backend, Next.js usually picks next available port like 3001 if 3000 is taken)

### Step 5: Open in Browser

Visit `http://localhost:3000` (or the port shown in terminal)

## 🔧 Configuration

### Dynamic API URL

The entire application uses a centralized API configuration. To change the backend URL:

1. Edit `frontend/.env.local`
2. Update `NEXT_PUBLIC_API_URL`
3. Restart the development server

The change will propagate to all API calls automatically.

### Configuration Files

- **`frontend/.env.local`**: Environment variables (API URL)
- **`frontend/lib/config.ts`**: API endpoints mapping
- **`frontend/lib/api-client.ts`**: Axios client with interceptors

## 📱 User Roles & Access

### Customer Role
- Browse and purchase designs
- View purchase history
- Manage profile
- Create reviews (future feature)

### Admin Role
- All customer features
- Access admin dashboard
- View revenue statistics
- Manage designs (future CRUD pages)
- Manage categories (future CRUD pages)
- Manage pricing plans (future CRUD pages)

### SuperAdmin Role
- All admin features
- Manage other admins
- Full system access

## 🎨 Theme System

The application includes a built-in dark/light theme toggle:

- Click the sun/moon icon in the header
- Theme preference is saved automatically
- System preference is detected by default
- All components support both themes

## 📡 API Integration Status

### ✅ Fully Integrated Endpoints

- **Authentication**
  - POST `/auth/login`
  - POST `/auth/sign-up`
  - POST `/auth/register-user`
  - POST `/auth/logout`
  - GET `/auth/access-token` (automatic refresh)

- **Users**
  - GET `/users/me` (profile)

- **Designs**
  - GET `/designs` (list with pagination)
  - GET `/designs/get-single-design/:id`

- **Pricing Plans**
  - GET `/pricing-plans` (list all)

- **Purchases**
  - POST `/purchase` (create purchase)
  - GET `/purchase/get-all-my-purchase`
  - GET `/purchase/get-revenue` (admin)

### 🔨 Endpoints Ready for CRUD Pages (Not Yet Built)

- **Categories** - CRUD operations ready
- **Designs** - Create/Update/Delete ready
- **Pricing Plans** - CRUD operations ready
- **Admin Management** - Ready for implementation
- **Reviews** - Ready for implementation

## 🛠️ Available Scripts

In the `frontend` directory:

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **UI Components**: Custom (ShadCN-inspired)
- **Icons**: Lucide React
- **Theme**: next-themes

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: Zod

## 📝 Future Development

### Pages to Add (Optional)

1. **Admin CRUD Pages**
   - Category management (`/admin/categories`)
   - Design management (`/admin/designs`)
   - Pricing plan management (`/admin/pricing-plans`)
   - User management

2. **Authentication Pages**
   - Forgot password (`/auth/forgot-password`)
   - Reset password (`/auth/reset-password`)

3. **Review System**
   - Review creation
   - Review listing for designs
   - Review moderation

4. **Enhanced Features**
   - Search and filter designs
   - Design favorites/wishlist
   - Email notifications
   - File upload for design files
   - Payment gateway integration

## 🐛 Troubleshooting

### Frontend Cannot Connect to Backend

1. Verify backend is running: `http://localhost:3000/api/v1`
2. Check `frontend/.env.local` has correct `NEXT_PUBLIC_API_URL`
3. Ensure no CORS issues (backend should have CORS enabled)

### Build Errors

1. Clear cache: `rm -rf frontend/.next`
2. Reinstall: `rm -rf frontend/node_modules && cd frontend && npm install`
3. Check Node.js version: `node -v` (should be 18+)

### Theme Not Working

1. Clear browser local storage
2. Check browser console for errors
3. Verify `next-themes` is properly installed

### API Calls Failing

1. Check browser Network tab for failed requests
2. Verify JWT token in localStorage
3. Check backend logs for errors
4. Ensure user is logged in for protected routes

## 📚 Documentation

- **Backend API**: See `README.md` and `API-DOCUMENTATION.txt` in root
- **Frontend**: See `frontend/README.md`
- **Environment Setup**: This file

## 🔐 Security Notes

- Never commit `.env.local` files
- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- Refresh tokens handled via httpOnly cookies
- CORS configured in backend
- Input validation on both frontend and backend

## 📦 Deployment

### Frontend Deployment (Vercel Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Backend Deployment

1. Deploy to your preferred platform (Railway, Render, etc.)
2. Update frontend `NEXT_PUBLIC_API_URL` to production backend URL

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📞 Support

For issues or questions:
- Check troubleshooting section above
- Review backend API documentation
- Check browser console for errors
- Verify backend is running and accessible

---

**Note**: This is a production-ready frontend foundation. Additional features can be built using the existing patterns and architecture.
