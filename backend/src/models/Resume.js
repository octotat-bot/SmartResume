import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template'
    },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        website: String,
        linkedin: String,
        github: String,
        portfolio: String,
        leetcode: String,
        hackerrank: String,
        codeforces: String,
        codechef: String,
        hackerearth: String,
        summary: String
    },
    experience: [{
        company: String,
        position: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String,
        achievements: [String]
    }],
    education: [{
        institution: String,
        degree: String,
        field: String,
        location: String,
        startDate: String,
        endDate: String,
        gpa: String,
        achievements: [String]
    }],
    skills: {
        technical: [String],
        soft: [String],
        languages: [String],
        tools: [String]
    },
    projects: [{
        name: String,
        description: String,
        technologies: [String],
        link: String,
        startDate: String,
        endDate: String,
        highlights: [String]
    }],
    certifications: [{
        name: String,
        issuer: String,
        date: String,
        credentialId: String,
        link: String,
        description: String
    }],
    coCurricular: [{
        activity: String,
        role: String,
        date: String,
        description: String
    }],
    customSections: [{
        title: String,
        content: String,
        items: [String]
    }],
    metadata: {
        targetRole: String,
        industry: String,
        experienceLevel: String,
        layout: { type: String, default: 'standard' }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for search
resumeSchema.index({ title: 'text', 'personalInfo.fullName': 'text', 'metadata.targetRole': 'text' });

export default mongoose.model('Resume', resumeSchema);
