# UI/UX Designer Portfolio - Frontend

A modern, responsive React application for a UI/UX designer portfolio and design marketplace.

## 🚀 Features

- **Authentication System**: Complete user authentication with login, signup, and email verification
- **Dynamic API Configuration**: Centralized API base URL that can be changed in one place
- **Theme Toggle**: Switch between light and dark modes
- **Protected Routes**: Role-based access control (customer, admin, superAdmin)
- **Design Gallery**: Browse and search through design collections
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state management
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

## 📦 Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the API base URL in `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

## 🔧 Dynamic API Configuration

The application uses a centralized API configuration that makes it easy to change the backend URL across the entire application.

### How to Change the API URL

**Option 1: Environment Variable (Recommended)**

Edit the `.env` file in the client directory:
```env
VITE_API_BASE_URL=http://your-api-url.com
```

**Option 2: Configuration File**

Edit `src/config/api.config.ts`:
```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  // ... other config
};
```

**Why This Works:**
- All API calls use the centralized `apiClient` from `src/services/api.ts`
- The `apiClient` reads from `API_CONFIG.API_URL`
- Changing the base URL in one place updates it everywhere
- No need to search and replace URLs throughout the codebase

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔐 Authentication Flow

1. **Signup**: User registers with email, password, and optional details
2. **Email Verification**: User receives verification email
3. **Register User**: User clicks verification link to complete registration
4. **Login**: User logs in with credentials
5. **Token Management**: Access token stored in localStorage, refresh token in HTTP-only cookie
6. **Auto Refresh**: Axios interceptor automatically refreshes expired tokens

## 🎨 Theme System

The application supports light and dark themes:

- Toggle theme using the moon/sun icon in the navbar
- Theme preference is saved in localStorage
- Smooth transitions between themes
- Consistent color palette using CSS custom properties

## 🛡️ Protected Routes

The application implements role-based access control:

- **Public Routes**: Home, Designs, Login, Signup
- **Customer Routes**: My Purchases, Profile
- **Admin Routes**: Admin Dashboard, Manage Designs, Manage Categories
- **Super Admin Routes**: All admin routes + manage admins

If a user tries to access a protected route without authentication, they're redirected to the login page.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 📝 Environment Variables

Create a `.env` file with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```

## 📄 License

This project is part of the UI/UX Designer Portfolio application.
