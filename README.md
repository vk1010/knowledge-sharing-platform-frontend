# Knowledge Sharing Platform - Frontend

A modern React-based frontend for the Knowledge Sharing Platform that enables users to create, edit, and share technical articles with AI-powered assistance.

## 🏗️ Approach

### Architecture Overview
- **Framework**: React 18 with Vite for fast development and building
- **Routing**: React Router DOM for client-side navigation
- **State Management**: React hooks (useState, useEffect) for local component state
- **HTTP Client**: Axios with interceptors for API communication
- **Rich Text Editor**: ReactQuill for article content creation
- **Notifications**: React Toastify for user feedback
- **Authentication**: JWT token-based authentication with localStorage

### Folder Structure
```
src/
├── api/                    # API service layer
│   ├── aiApi.js           # AI assistance endpoints
│   ├── articleApi.js      # Article CRUD operations
│   ├── authApi.js         # Authentication endpoints
│   └── axiosInstance.js   # Configured axios instance
├── articles/              # Article management components
│   ├── ArticleForm.jsx    # Create/edit article form
│   └── MyArticles.jsx     # User's articles list
├── auth/                  # Authentication components
│   ├── Login.jsx          # Login form
│   ├── Signup.jsx         # Registration form
│   └── ProtectedRoute.jsx # Route protection wrapper
├── components/            # Reusable UI components
│   └── Navbar.jsx         # Navigation header
├── pages/                 # Main page components
│   ├── Home.jsx           # Articles listing page
│   └── ArticleDetail.jsx  # Individual article view
├── utils/                 # Utility functions
│   └── jwtUtils.js        # JWT token handling
└── routes/                # Route configurations
```

### Key Design Decisions
1. **Component-Based Architecture**: Modular components for reusability and maintainability
2. **API Layer Separation**: Dedicated API modules for clean separation of concerns
3. **Protected Routes**: Authentication wrapper for secure pages
4. **Axios Interceptors**: Automatic token attachment and error handling
5. **Rich Text Editor**: ReactQuill for enhanced content creation experience
6. **Responsive Design**: CSS-based responsive layout for mobile compatibility

## 🤖 AI Usage

### AI Tools Used
- **ChatGPT**: Primary AI assistant for code generation and problem-solving
- **GitHub Copilot**: Code completion and suggestions during development

### Where AI Helped

#### Code Generation
- Generated initial React component boilerplate for ArticleForm, Login, and Signup components
- Created API service functions with proper error handling patterns
- Generated CSS styling for responsive layouts and component styling

#### Refactoring
- Optimized axios interceptor logic for token management and error handling
- Improved component structure and prop passing patterns
- Enhanced form validation and user experience flows

#### API Design
- Designed consistent API service layer with proper error handling
- Created reusable axios instance with authentication interceptors
- Structured API response handling patterns

#### UI Ideas
- Suggested modern UI patterns for article cards and navigation
- Recommended toast notification placement and styling
- Proposed AI assistance button integration in the article editor

### Manual Review and Corrections
- **Security**: Manually reviewed and enhanced JWT token storage and validation
- **Error Handling**: Added comprehensive error boundaries and user feedback
- **Performance**: Optimized component re-renders and API call patterns
- **Accessibility**: Added proper ARIA labels and keyboard navigation support
- **Code Quality**: Refactored AI-generated code for better readability and maintainability

## 🚀 Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Backend server running on port 8080

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### Frontend Setup

1. **Clone and navigate to frontend directory**
```bash
git clone <repository-url>
cd knowledge-sharing-platform-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

### Available Scripts
- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

### Dependencies
- **React 18.2.0** - Core framework
- **React Router DOM 6.20.0** - Client-side routing
- **Axios 1.6.0** - HTTP client
- **ReactQuill 2.0.0** - Rich text editor
- **React Toastify 11.0.5** - Notifications
- **Vite 4.4.5** - Build tool and dev server

### Features
- 📝 Create and edit articles with rich text editor
- 🤖 AI-powered content assistance (improve, summarize, suggest tags/titles)
- 🔐 JWT-based authentication
- 📱 Responsive design
- 🏷️ Category and tag management
- 🔍 Article search and filtering
- 👤 User profile and article management

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+