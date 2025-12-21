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



const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://smartresume-rouge.vercel.app',
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

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'SmartResume API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            resumes: '/api/resumes',
            applications: '/api/applications'
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
