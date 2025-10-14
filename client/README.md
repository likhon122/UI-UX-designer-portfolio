# UI/UX Designer Portfolio - Frontend

This is the frontend application for the UI/UX Designer Portfolio marketplace, built with Next.js, TypeScript, Tailwind CSS, Redux, and shadcn/ui.

## Features

- 🎨 **Modern UI**: Beautiful, responsive design using Tailwind CSS and shadcn/ui components
- 🔐 **Authentication**: Secure login and signup with JWT tokens
- 🛍️ **Design Marketplace**: Browse, search, and purchase premium UI/UX designs
- 💳 **Pricing Plans**: Multiple subscription tiers with detailed features
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Dynamic URLs**: Centralized URL configuration for easy API endpoint management
- 🔄 **State Management**: Redux Toolkit for efficient global state management
- 🎯 **Type-Safe**: Full TypeScript support for better development experience

## Dynamic URL Configuration

The application uses a centralized URL configuration system. Change the API URL once in `.env.local` and it updates everywhere:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

All API endpoints are dynamically constructed from this base URL in `lib/config.ts`.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (see root README.md)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
client/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── designs/           # Design listing and detail pages
│   ├── pricing/           # Pricing plans page
│   ├── dashboard/         # User dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── design/           # Design-specific components
│   └── providers/        # Context providers
├── lib/                   # Utility functions and configurations
│   ├── api/              # API client functions
│   ├── config.ts         # Dynamic URL configuration
│   └── utils/            # Helper functions
├── store/                 # Redux store
│   ├── slices/           # Redux slices
│   └── hooks.ts          # Redux hooks
└── types/                 # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Form Validation**: React Hook Form + Zod

## API Integration

The frontend communicates with the backend API running on port 3000. All API routes are defined in `lib/config.ts`:

- Authentication endpoints
- Design CRUD operations
- Pricing plan management
- Purchase workflows
- User profile management

## Authentication Flow

1. User signs up → Receives verification email
2. User verifies email → Account activated
3. User logs in → Receives JWT access token
4. Token stored in localStorage
5. Token automatically included in all API requests
6. Auto-refresh on token expiration

## License

This project is part of the UI/UX Designer Portfolio application.
