# UI/UX Designer Portfolio - Setup Guide

A full-stack application for a UI/UX designer portfolio and marketplace, built with modern technologies.

## Architecture

- **Backend**: Node.js + Express + TypeScript + MongoDB
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS + Redux Toolkit + shadcn/ui

## Features

✨ **For Customers:**
- Browse premium UI/UX designs
- Purchase designs with different pricing plans
- User authentication and profile management
- Leave reviews and ratings
- Track purchase history

🎨 **For Admins:**
- Manage designs (Create, Read, Update, Delete)
- User and customer management
- Sales analytics and revenue tracking
- Manage pricing plans and categories
- Review moderation

## Prerequisites

- **Node.js** 18+ installed
- **MongoDB** installed and running
- **Yarn** or **npm** package manager

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/likhon122/UI-UX-designer-portfolio.git
cd UI-UX-designer-portfolio
```

### 2. Backend Setup

```bash
# Install backend dependencies
yarn install

# Create .env file
cat > .env << EOF
PORT=3000
MONGODB_URI=mongodb://localhost:27017/designerPortfolio
JWT_SECRET=your_super_secret_jwt_key_change_this
SUPER_ADMIN_PASSWORD=SuperAdmin@123
SUPER_ADMIN_EMAIL=admin@example.com
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
NODE_ENV=development
MAIL_EMAIL=your_email@gmail.com
MAIL_PASSWORD=your_app_password
CLIENT_URL=http://localhost:3000
EOF

# Build and start backend
yarn build
yarn dev
```

Backend will run on http://localhost:3000

### 3. Frontend Setup

```bash
# Navigate to client directory
cd client

# Install frontend dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
# Change this URL to update all API endpoints
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF

# Start frontend development server
npm run dev
```

Frontend will run on http://localhost:3000

## Dynamic URL Configuration

The application uses a centralized URL configuration system. To change the API endpoint:

1. Update `NEXT_PUBLIC_API_URL` in `client/.env.local`
2. All API calls will automatically use the new URL
3. No code changes required!

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Backend server port | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/designerPortfolio |
| JWT_SECRET | Secret key for JWT tokens | your_jwt_secret |
| SUPER_ADMIN_EMAIL | Super admin email | - |
| SUPER_ADMIN_PASSWORD | Super admin password | SuperAdmin@123 |
| ACCESS_TOKEN_EXPIRES_IN | Access token expiration | 15m |
| REFRESH_TOKEN_EXPIRES_IN | Refresh token expiration | 7d |
| NODE_ENV | Environment mode | development |
| MAIL_EMAIL | Email for notifications | - |
| MAIL_PASSWORD | Email password | - |
| CLIENT_URL | Frontend URL | http://localhost:4200 |

### Frontend (client/.env.local)

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API base URL | http://localhost:3000 |

## Project Structure

```
.
├── src/                    # Backend source code
│   ├── app/               # Express app configuration
│   │   ├── config/        # Configuration files
│   │   ├── modules/       # Feature modules
│   │   │   ├── auth/      # Authentication
│   │   │   ├── design/    # Design management
│   │   │   ├── user/      # User management
│   │   │   └── ...        # Other modules
│   │   ├── middlewares/   # Express middlewares
│   │   ├── routes/        # Route definitions
│   │   └── utils/         # Utility functions
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
│
├── client/                # Frontend application
│   ├── app/              # Next.js pages
│   │   ├── auth/         # Authentication pages
│   │   ├── designs/      # Design pages
│   │   ├── pricing/      # Pricing page
│   │   ├── dashboard/    # Dashboard pages
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── layout/      # Layout components
│   │   └── design/      # Design components
│   ├── lib/             # Libraries and utilities
│   │   ├── api/         # API client functions
│   │   └── config.ts    # Dynamic URL config
│   ├── store/           # Redux store
│   └── types/           # TypeScript types
│
└── API-DOCUMENTATION.txt # Complete API documentation
```

## Available Scripts

### Backend

```bash
yarn dev          # Start development server with hot reload
yarn build        # Build TypeScript to JavaScript
yarn start        # Start production server
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint errors
yarn format       # Format code with Prettier
```

### Frontend

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Main Routes:
- `/auth/*` - Authentication endpoints
- `/designs/*` - Design CRUD operations
- `/pricing-plans/*` - Pricing plan management
- `/purchase/*` - Purchase operations
- `/reviews/*` - Review management
- `/users/*` - User management
- `/admins/*` - Admin management
- `/categories/*` - Category management

For complete API documentation, see [API-DOCUMENTATION.txt](./API-DOCUMENTATION.txt)

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Email**: Nodemailer
- **Security**: bcryptjs, http-status

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Form Validation**: React Hook Form + Zod

## Development Workflow

1. **Start MongoDB**: Ensure MongoDB is running
2. **Start Backend**: `yarn dev` in root directory
3. **Start Frontend**: `npm run dev` in client directory
4. **Access App**: Open http://localhost:3000

## Production Deployment

### Backend

```bash
# Build
yarn build

# Set NODE_ENV=production in .env

# Start
yarn start
```

### Frontend

```bash
cd client

# Build
npm run build

# Start
npm start
```

## Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod --dbpath /path/to/db`
- Check MONGODB_URI in .env

### Port Already in Use
- Change PORT in backend .env
- Update NEXT_PUBLIC_API_URL in frontend .env.local

### CORS Errors
- Verify CLIENT_URL in backend .env matches frontend URL
- Check cors configuration in src/app.ts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## License

This project is part of the UI/UX Designer Portfolio application.

## Support

For issues and questions:
- Create an issue on GitHub
- Check API documentation
- Review existing issues

---

**Last Updated**: October 2025
