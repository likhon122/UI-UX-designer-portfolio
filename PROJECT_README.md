# UI/UX Designer Portfolio - Full Stack Application

A complete full-stack application for UI/UX designers to showcase and sell their design work. Built with Node.js/Express backend and React frontend.

## 🌟 Project Overview

This is a professional portfolio and marketplace platform where:
- UI/UX designers can showcase their work
- Customers can browse, purchase, and review designs
- Admins can manage the platform
- Multiple pricing tiers for different design packages

## 🏗️ Architecture

The project consists of two main parts:

### Backend (Node.js + Express + MongoDB)
- RESTful API with comprehensive endpoints
- JWT-based authentication with refresh tokens
- Role-based access control (Customer, Admin, SuperAdmin)
- Email verification system
- Complete CRUD operations for all resources

### Frontend (React + TypeScript + Tailwind)
- Modern, responsive UI built with React 18
- Full TypeScript support for type safety
- Redux Toolkit for state management
- Dynamic API configuration
- Dark/Light theme support
- Protected routes with role-based access

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running instance)
- npm or yarn

### Backend Setup

1. Install backend dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/designerPortfolio
JWT_SECRET=your_jwt_secret_key
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=YourSecurePassword123
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
NODE_ENV=development
MAIL_EMAIL=your-email@gmail.com
MAIL_PASSWORD=your-app-password
CLIENT_URL=http://localhost:5173
```

3. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install frontend dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
VITE_API_BASE_URL=http://localhost:3000
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
UI-UX-designer-portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── store/         # Redux store and slices
│   │   ├── config/        # Configuration files (API URLs)
│   │   ├── contexts/      # React contexts
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── .env               # Frontend environment variables
│   └── package.json
├── src/                   # Backend Node.js application
│   ├── app/
│   │   ├── config/       # Configuration files
│   │   ├── modules/      # Feature modules
│   │   │   ├── auth/     # Authentication
│   │   │   ├── user/     # User management
│   │   │   ├── admin/    # Admin management
│   │   │   ├── category/ # Category management
│   │   │   ├── desing/   # Design management
│   │   │   ├── pricingPlan/ # Pricing plans
│   │   │   ├── purchase/ # Purchase management
│   │   │   └── review/   # Review system
│   │   ├── middlewares/  # Express middlewares
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   ├── app.ts            # Express app configuration
│   └── server.ts         # Server entry point
├── .env                  # Backend environment variables
├── package.json          # Backend dependencies
└── README.md            # API documentation
```

## 🔑 Key Features

### Authentication & Authorization
- User registration with email verification
- Secure login with JWT tokens
- Refresh token mechanism
- Password reset functionality
- Role-based access control

### Design Management
- Browse design gallery with search and filters
- View detailed design information
- Create, update, and delete designs (Admin only)
- Categorize designs
- Set complexity levels (Basic, Intermediate, Advanced)

### Purchase System
- Multiple pricing plans (Basic, Standard, Premium)
- Purchase designs with selected pricing plans
- View purchase history
- Payment status tracking
- Revenue reporting (Admin only)

### Review System
- Customers can rate and review designs
- View all reviews for a design
- Admin moderation of reviews

### Admin Dashboard
- Manage designs, categories, and pricing plans
- View all purchases and revenue
- Manage users and admins
- Change admin positions (SuperAdmin only)

## 🔧 Dynamic API Configuration

The frontend uses a centralized API configuration system that makes it incredibly easy to change the backend URL:

### To Change API URL:

**Option 1: Environment Variable (Recommended)**
1. Edit `client/.env`
2. Change `VITE_API_BASE_URL=http://your-new-url`
3. Restart the dev server

**Option 2: Configuration File**
1. Edit `client/src/config/api.config.ts`
2. Modify the `BASE_URL` property
3. The change will automatically apply to all API calls

**Why this works:**
- All API calls go through a single Axios instance
- The instance reads from the centralized config
- No hardcoded URLs throughout the codebase
- Change once, update everywhere

## 🎨 UI/UX Features

### Theme Support
- Light and Dark mode
- Toggle using the navbar button
- Preference saved in localStorage
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interfaces
- Optimized images

### User Experience
- Loading states for all async operations
- Error handling with user-friendly messages
- Form validation
- Toast notifications (ready to implement)
- Smooth page transitions

## 📚 API Documentation

Complete API documentation is available in `README.md` with details on:
- All available endpoints
- Request/response formats
- Authentication requirements
- Error responses
- Pagination

Base URL: `http://localhost:3000/api/v1`

### Main Endpoints:
- `/auth/*` - Authentication endpoints
- `/users/*` - User management
- `/admins/*` - Admin management
- `/categories/*` - Category management
- `/designs/*` - Design management
- `/pricing-plans/*` - Pricing plan management
- `/purchase/*` - Purchase management
- `/reviews/*` - Review management

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- HTTP-only cookies for refresh tokens
- Token expiration and refresh mechanism
- Role-based access control
- Input validation with Zod
- SQL injection prevention (MongoDB)
- XSS protection

## 🧪 Testing

```bash
# Backend tests (when available)
npm test

# Frontend tests (when available)
cd client && npm test
```

## 📦 Production Deployment

### Backend
```bash
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
# Serve the dist folder with your preferred static file server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/designerPortfolio
JWT_SECRET=your_jwt_secret
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=SecurePassword123
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
NODE_ENV=development
MAIL_EMAIL=your-email@gmail.com
MAIL_PASSWORD=your-app-password
CLIENT_URL=http://localhost:5173
```

### Frontend (client/.env)
```env
VITE_API_BASE_URL=http://localhost:3000
```

## 🎯 User Roles

1. **Customer**
   - Browse and search designs
   - Purchase designs
   - Write reviews
   - View purchase history

2. **Admin**
   - All customer permissions
   - Create/edit/delete designs
   - Manage categories
   - View all purchases
   - Manage pricing plans

3. **SuperAdmin**
   - All admin permissions
   - Create/manage other admins
   - Change admin positions
   - Access to all system functions

## 📸 Screenshots

### Light Mode - Homepage
![Homepage Light](https://github.com/user-attachments/assets/73acd65a-c3b8-4e64-a58d-33c7b32fed2e)

### Dark Mode - Homepage
![Homepage Dark](https://github.com/user-attachments/assets/f3446cd6-1a9a-464c-945a-744e1f076d66)

### Login Page
![Login Page](https://github.com/user-attachments/assets/4d399c91-b7f7-4b33-8fdd-c58a5a1da871)

### Signup Page
![Signup Page](https://github.com/user-attachments/assets/e96088be-fe2f-4ca7-9ff0-eba7ce78d99a)

### Design Gallery
![Design Gallery](https://github.com/user-attachments/assets/f67bdc11-8ddc-4e7e-bb8a-3b5d6d8517b2)

## 🚧 Future Enhancements

- Payment gateway integration
- Real-time notifications
- Advanced search and filtering
- User profile customization
- Design preview with zoom
- Wishlist functionality
- Social media sharing
- Analytics dashboard
- Email templates
- File upload for design assets

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

UI/UX Designer Portfolio Team

## 🙏 Acknowledgments

- Express.js for the robust backend framework
- React for the powerful frontend library
- Tailwind CSS for the beautiful styling
- MongoDB for flexible data storage
- Redux Toolkit for state management
