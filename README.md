# SmartResume

An AI-powered resume builder with intelligent features to help you create professional, ATS-optimized resumes.

## ✨ Features

### Core Features
- 📝 **Resume Editor** - Intuitive editor with live preview
- 🎨 **Multiple Templates** - Choose from professional, modern, creative, and classic designs
- 📄 **PDF Export** - Download your resume as a high-quality PDF
- 💾 **Auto-Save** - Never lose your work with automatic saving
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

### Advanced Features
- 🔄 **Version History** - Track changes and restore previous versions
- 🎯 **Job Tracker** - Manage your job applications and interviews
- 📊 **Analytics** - Track resume views and application success
- 🔗 **Shareable Links** - Share your resume with a unique URL
- 🎨 **Custom Themes** - Personalize colors and fonts


### AI-Powered Features ✨
- 💬 **AI Chat Assistant** - Conversational AI for resume and career advice
- ✍️ **Bullet Point Enhancement** - Transform basic points into impactful achievements
- 📝 **Professional Summary Generator** - AI-generated compelling summaries
- 🎯 **ATS Optimization** - Analyze and optimize for Applicant Tracking Systems
- 📄 **Cover Letter Generation** - Personalized cover letters for each job
- 🎤 **Interview Preparation** - AI-generated questions and preparation tips
- 💡 **Skill Suggestions** - Get relevant skill recommendations
- 🔍 **Job Posting Parser** - Auto-fill applications from job descriptions
- 🎨 **Resume Optimizer** - Tailor your resume for specific roles


## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Google Generative AI** - AI features

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/octotat-bot/SmartResume.git
cd SmartResume
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

**Important Notes:**
- **Port 5001**: We use port 5001 instead of 5000 because macOS uses port 5000 for AirPlay Receiver
- **MongoDB URI**: Use MongoDB Atlas or local MongoDB instance
- **JWT Secret**: Use a strong, random string for production
- **Gemini API Key**: Optional, required only for AI features

```bash
# Seed the database with templates (optional)
npm run seed:templates

# Start the backend server
npm start
```

The backend will run on `http://localhost:5001`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
echo "VITE_API_URL=http://localhost:5001/api" > .env

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
SmartResume/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── server.js       # Entry point
│   ├── .env.example        # Environment variables template
│   ├── package.json
│   └── seed.js            # Database seeding script
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔧 Available Scripts

### Backend

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed:templates  # Seed database with templates
```

### Frontend

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Resumes
- `GET /api/resumes` - Get all resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get resume by ID
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `GET /api/resumes/stats` - Get resume statistics

### Jobs
- `GET /api/jobs` - Get all job applications
- `POST /api/jobs` - Create new job application
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job application
- `DELETE /api/jobs/:id` - Delete job application
- `GET /api/jobs/stats` - Get job statistics

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID
- `GET /api/templates/categories` - Get template categories

### AI Features
- `POST /api/ai/enhance-bullet` - Enhance bullet point
- `POST /api/ai/generate-summary` - Generate professional summary
- `POST /api/ai/suggest-skills` - Suggest skills based on job description
- `POST /api/ai/analyze-ats` - Analyze ATS compatibility
- `POST /api/ai/optimize-role` - Optimize resume for specific role
- `POST /api/ai/parse-linkedin` - Parse LinkedIn profile data

## 🐛 Troubleshooting

### Port 5000 Already in Use (macOS)

**Problem:** macOS uses port 5000 for AirPlay Receiver by default.

**Solution:** We've configured the backend to use port 5001 instead. If you still encounter issues:

1. Check if port 5001 is available:
   ```bash
   lsof -i :5001
   ```

2. Kill any process using the port:
   ```bash
   kill -9 <PID>
   ```

3. Alternatively, disable AirPlay Receiver in macOS:
   - System Preferences → Sharing → Uncheck "AirPlay Receiver"

### MongoDB Connection Issues

**Problem:** Cannot connect to MongoDB.

**Solutions:**
- Ensure MongoDB is running (if using local installation)
- Check your `MONGODB_URI` in `.env` file
- Verify network connectivity (if using MongoDB Atlas)
- Check firewall settings

### Frontend Can't Connect to Backend

**Problem:** API requests failing with network errors.

**Solutions:**
1. Verify backend is running on port 5001
2. Check the API URL in `frontend/src/utils/api.js`
3. Ensure CORS is properly configured in backend
4. Clear browser cache and localStorage

### Authentication Issues

**Problem:** Login fails or token errors.

**Solutions:**
1. Ensure `JWT_SECRET` is set in backend `.env`
2. Clear browser localStorage
3. Check if user exists in database
4. Verify password is correctly hashed

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable HTTPS in production
- Implement rate limiting for API endpoints
- Sanitize user inputs
- Keep dependencies updated

## 🚀 Deployment

### Backend Deployment (Vercel/Heroku/Railway)

1. Set environment variables in your hosting platform
2. Ensure MongoDB is accessible from your hosting platform
3. Update CORS settings to allow your frontend domain

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Set `VITE_API_URL` environment variable to your backend URL

3. Deploy the `dist` folder

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5001                           # Server port
MONGODB_URI=                        # MongoDB connection string
JWT_SECRET=                         # JWT secret key
GEMINI_API_KEY=                     # Google Gemini API key (optional)
NODE_ENV=development                # Environment (development/production)
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001/api  # Backend API URL
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern resume builders
- AI powered by Google Generative AI

## 📧 Support

For support, email support@smartresume.com or open an issue in the repository.

---

**Built with ❤️ using React, Node.js, and AI**
