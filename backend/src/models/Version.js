import mongoose from 'mongoose';

const versionSchema = new mongoose.Schema({
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
        index: true
    },
    versionNumber: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    snapshot: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    changes: {
        type: String,
        default: ''
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index for efficient querying
versionSchema.index({ resumeId: 1, versionNumber: -1 });

export default mongoose.model('Version', versionSchema);
