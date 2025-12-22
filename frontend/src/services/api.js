import api from '../utils/api';

export const resumeService = {
    // CREATE
    createResume: async (resumeData) => {
        const { data } = await api.post('/resumes', resumeData);
        return data;
    },

    // READ
    getResumes: async (params = {}) => {
        const { data } = await api.get('/resumes', { params });
        return data;
    },

    getResumeById: async (id) => {
        const { data } = await api.get(`/resumes/${id}`);
        return data;
    },

    getResumeStats: async () => {
        const { data } = await api.get('/resumes/stats');
        return data;
    },

    // DUPLICATE
    duplicateResume: async (id) => {
        const { data } = await api.post(`/resumes/${id}/duplicate`);
        return data;
    },

    // UPDATE
    updateResume: async (id, resumeData) => {
        const { data } = await api.put(`/resumes/${id}`, resumeData);
        return data;
    },

    // DELETE
    deleteResume: async (id) => {
        const { data } = await api.delete(`/resumes/${id}`);
        return data;
    }
};

export const versionService = {
    createVersion: async (resumeId, versionData) => {
        const { data } = await api.post(`/versions/resume/${resumeId}`, versionData);
        return data;
    },

    getVersions: async (resumeId, params = {}) => {
        const { data } = await api.get(`/versions/resume/${resumeId}`, { params });
        return data;
    },

    getVersionById: async (id) => {
        const { data } = await api.get(`/versions/${id}`);
        return data;
    },

    restoreVersion: async (id) => {
        const { data } = await api.put(`/versions/${id}/restore`);
        return data;
    },

    deleteVersion: async (id) => {
        const { data } = await api.delete(`/versions/${id}`);
        return data;
    }
};

export const templateService = {
    getTemplates: async (params = {}) => {
        const { data } = await api.get('/templates', { params });
        return data;
    },

    getTemplateById: async (id) => {
        const { data } = await api.get(`/templates/${id}`);
        return data;
    },

    getCategories: async () => {
        const { data } = await api.get('/templates/categories');
        return data;
    },

    createTemplate: async (templateData) => {
        const { data } = await api.post('/templates', templateData);
        return data;
    },

    updateTemplate: async (id, templateData) => {
        const { data } = await api.put(`/templates/${id}`, templateData);
        return data;
    },

    deleteTemplate: async (id) => {
        const { data } = await api.delete(`/templates/${id}`);
        return data;
    }
};

export const jobService = {
    createJob: async (jobData) => {
        const { data } = await api.post('/jobs', jobData);
        return data;
    },

    getJobs: async (params = {}) => {
        const { data } = await api.get('/jobs', { params });
        return data;
    },

    getJobById: async (id) => {
        const { data } = await api.get(`/jobs/${id}`);
        return data;
    },

    updateJob: async (id, jobData) => {
        const { data } = await api.put(`/jobs/${id}`, jobData);
        return data;
    },

    deleteJob: async (id) => {
        const { data } = await api.delete(`/jobs/${id}`);
        return data;
    },

    getJobStats: async () => {
        const { data } = await api.get('/jobs/stats');
        return data;
    }
};

export const aiService = {
    // Check AI service status
    getStatus: async () => {
        const { data } = await api.get('/ai/status');
        return data;
    },

    // Enhance a bullet point
    enhanceBulletPoint: async (bulletPoint, context = {}) => {
        const { data } = await api.post('/ai/enhance-bullet', { bulletPoint, context });
        return data;
    },

    // Generate professional summary
    generateSummary: async (resumeId) => {
        const { data } = await api.post('/ai/generate-summary', { resumeId });
        return data;
    },

    // Analyze resume for ATS compatibility
    analyzeATS: async (resumeId, jobDescription = '') => {
        const { data } = await api.post('/ai/analyze-ats', { resumeId, jobDescription });
        return data;
    },

    // Generate cover letter
    generateCoverLetter: async (resumeId, applicationId = null, jobData = null, jobDescription = '') => {
        const { data } = await api.post('/ai/generate-cover-letter', {
            resumeId,
            applicationId,
            jobData,
            jobDescription
        });
        return data;
    },

    // Parse job posting from text or URL
    parseJobPosting: async (jobText = '', url = '') => {
        const { data } = await api.post('/ai/parse-job', { jobText, url });
        return data;
    },

    // Generate interview preparation
    generateInterviewPrep: async (resumeId, applicationId) => {
        const { data } = await api.post('/ai/interview-prep', { resumeId, applicationId });
        return data;
    },

    // AI chat assistant
    chat: async (message, resumeId = null, conversationHistory = '') => {
        const { data } = await api.post('/ai/chat', { message, resumeId, conversationHistory });
        return data;
    },

    // Suggest skills based on job description
    suggestSkills: async (jobDescription, resumeId = null) => {
        const { data } = await api.post('/ai/suggest-skills', { jobDescription, resumeId });
        return data;
    },

    // Optimize resume for specific role
    optimizeResume: async (resumeId, targetRole, jobDescription = '') => {
        const { data } = await api.post('/ai/optimize-resume', { resumeId, targetRole, jobDescription });
        return data;
    }
};

export const applicationService = {
    getAll: async (params = {}) => {
        const { data } = await api.get('/applications', { params });
        return data;
    },

    getStats: async () => {
        const { data } = await api.get('/applications/stats');
        return data;
    },

    getById: async (id) => {
        const { data } = await api.get(`/applications/${id}`);
        return data;
    },

    create: async (applicationData) => {
        const { data } = await api.post('/applications', applicationData);
        return data;
    },

    update: async (id, applicationData) => {
        const { data } = await api.put(`/applications/${id}`, applicationData);
        return data;
    },

    addActivity: async (id, activity) => {
        const { data } = await api.post(`/applications/${id}/activity`, activity);
        return data;
    },

    delete: async (id) => {
        const { data } = await api.delete(`/applications/${id}`);
        return data;
    }
};
