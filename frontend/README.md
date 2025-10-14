# UI/UX Designer Portfolio - Frontend

A modern, professional frontend application for a UI/UX designer portfolio and selling platform built with Next.js, TypeScript, Tailwind CSS, Redux Toolkit, and ShadCN UI.

## Features

- 🎨 **Professional Design**: Clean and modern UI with dark/light theme support
- 🔐 **Authentication**: Complete auth system (Login, Signup, Forgot Password)
- 🛍️ **E-commerce**: Browse and purchase UI/UX designs
- 📦 **Design Gallery**: View detailed design information with previews
- 💰 **Pricing Plans**: Multiple pricing tiers for flexibility
- 👥 **Role-based Access**: Customer, Admin, and SuperAdmin roles
- 📊 **Admin Dashboard**: Comprehensive admin panel for management
- 🌓 **Dark Mode**: Built-in theme toggler for light and dark modes
- 📱 **Responsive**: Fully responsive design for all devices
- 🔄 **State Management**: Redux Toolkit for efficient state management
- 🌐 **Dynamic API**: Configurable API URL that updates globally

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI (custom built)
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running (see backend README)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure API URL - Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Dynamic API Configuration

The API URL is configured in one place (`.env.local`) and used throughout the app automatically. Simply update `NEXT_PUBLIC_API_URL` to change the backend API URL.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## User Roles & Access

- **Customer**: Browse designs, make purchases, view purchase history
- **Admin**: Manage designs, categories, pricing plans, view revenue
- **SuperAdmin**: Full system access including admin management

## Key Pages

- `/` - Home page
- `/designs` - Browse all designs
- `/designs/[id]` - Design details
- `/pricing` - Pricing plans
- `/auth/login` - Login page
- `/auth/signup` - Sign up page
- `/profile` - User profile
- `/customer/purchases` - Customer purchases
- `/admin/dashboard` - Admin dashboard

## API Integration

All backend API endpoints are fully integrated including:
- Authentication (Login, Signup, Logout, Password Management)
- Design Management (CRUD operations)
- Category Management
- Pricing Plan Management
- Purchase Management
- User Profile Management
- Admin Operations

## Deployment

Build for production:
```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js hosting platform.

## License

Part of the UI/UX Designer Portfolio application.
