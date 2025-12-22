import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import versionRoutes from './routes/versionRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import aiRoutes from './routes/aiRoutes.js';



const app = express();

// Middleware - CORS Configuration
const allowedOrigins = [
    'https://smartresume-rouge.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
];

// Add custom frontend URL if provided
if (process.env.FRONTEND_URL) {
    const customOrigin = process.env.FRONTEND_URL.trim().replace(/\/+$/, '');
    if (!allowedOrigins.includes(customOrigin)) {
        allowedOrigins.push(customOrigin);
    }
}

console.log('Configured CORS Origins:', allowedOrigins);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Allow all Vercel preview deployments for smartresume
        if (origin.match(/^https:\/\/smartresume-[a-z0-9]+-octotat-bots?-projects\.vercel\.app$/)) {
            return callback(null, true);
        }

        // Reject other origins
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/versions', versionRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/ai', aiRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'SmartResume API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            resumes: '/api/resumes',
            applications: '/api/applications',
            ai: '/api/ai'
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SmartResume API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

export default app;
