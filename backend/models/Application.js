const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: false
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    jobUrl: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['wishlist', 'applied', 'interview', 'offer', 'rejected', 'accepted', 'withdrawn'],
        default: 'applied'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    salary: {
        min: Number,
        max: Number,
        currency: {
            type: String,
            default: 'USD'
        }
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date
    },
    interviewDate: {
        type: Date
    },
    followUpDate: {
        type: Date
    },
    contactPerson: {
        name: String,
        email: String,
        phone: String,
        title: String
    },
    notes: {
        type: String
    },
    tags: [{
        type: String,
        trim: true
    }],
    activities: [{
        type: {
            type: String,
            enum: ['applied', 'interview_scheduled', 'interview_completed', 'follow_up', 'offer_received', 'rejected', 'note_added', 'status_changed'],
            required: true
        },
        description: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Index for faster queries
applicationSchema.index({ userId: 1, status: 1 });
applicationSchema.index({ userId: 1, applicationDate: -1 });

module.exports = mongoose.model('Application', applicationSchema);
