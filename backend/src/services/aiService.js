import { GoogleGenerativeAI } from '@google/generative-ai';

class AIService {
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            console.warn('⚠️  GEMINI_API_KEY not found. AI features will be disabled.');
            this.genAI = null;
            this.model = null;
        } else {
            this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
        }
    }

    /**
     * Check if AI service is available
     */
    isAvailable() {
        return this.model !== null;
    }

    /**
     * Generate AI response with error handling
     */
    async generateContent(prompt) {
        if (!this.isAvailable()) {
            throw new Error('AI service is not available. Please configure GEMINI_API_KEY.');
        }

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('AI Generation Error:', error);
            throw new Error('Failed to generate AI response. Please try again.');
        }
    }

    /**
     * Enhance a bullet point for resume
     */
    async enhanceBulletPoint(bulletPoint, context = {}) {
        const { role, company, industry } = context;

        const prompt = `You are an expert resume writer. Enhance the following bullet point to make it more impactful and ATS-friendly.

Original bullet point: "${bulletPoint}"
${role ? `Role: ${role}` : ''}
${company ? `Company: ${company}` : ''}
${industry ? `Industry: ${industry}` : ''}

Requirements:
1. Start with a strong action verb
2. Include quantifiable metrics if possible (use realistic estimates if not provided)
3. Highlight impact and results
4. Keep it concise (1-2 lines)
5. Make it ATS-friendly with relevant keywords
6. Return ONLY the enhanced bullet point, no explanations

Enhanced bullet point:`;

        const enhanced = await this.generateContent(prompt);
        return enhanced.trim();
    }

    /**
     * Generate professional summary
     */
    async generateSummary(resumeData) {
        const { personalInfo, experience, skills, metadata } = resumeData;

        const prompt = `Generate a compelling professional summary for a resume.

Name: ${personalInfo?.fullName || 'Professional'}
Target Role: ${metadata?.targetRole || 'Not specified'}
Experience Level: ${metadata?.experienceLevel || 'Not specified'}
Years of Experience: ${experience?.length || 0}
Key Skills: ${skills?.technical?.slice(0, 5).join(', ') || 'Not specified'}

Recent Experience:
${experience?.slice(0, 2).map(exp => `- ${exp.position} at ${exp.company}`).join('\n') || 'No experience listed'}

Requirements:
1. 3-4 sentences maximum
2. Highlight key strengths and expertise
3. Mention years of experience if applicable
4. Include target role alignment
5. Professional and confident tone
6. Return ONLY the summary, no explanations

Professional Summary:`;

        const summary = await this.generateContent(prompt);
        return summary.trim();
    }

    /**
     * Analyze resume for ATS compatibility
     */
    async analyzeATS(resumeData, jobDescription = '') {
        const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze this resume for ATS compatibility.

Resume Data:
- Skills: ${resumeData.skills?.technical?.join(', ') || 'None'}
- Experience: ${resumeData.experience?.length || 0} positions
- Education: ${resumeData.education?.length || 0} entries
- Projects: ${resumeData.projects?.length || 0} projects

${jobDescription ? `Job Description:\n${jobDescription}\n` : ''}

Provide analysis in the following JSON format:
{
  "score": <number 0-100>,
  "strengths": [<array of 3-5 strengths>],
  "weaknesses": [<array of 3-5 areas to improve>],
  "missingKeywords": [<array of important keywords missing>],
  "suggestions": [<array of 3-5 actionable suggestions>]
}

Return ONLY valid JSON, no explanations.`;

        const response = await this.generateContent(prompt);

        try {
            // Extract JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Invalid JSON response');
        } catch (error) {
            // Fallback response
            return {
                score: 75,
                strengths: ['Well-structured resume', 'Clear experience section'],
                weaknesses: ['Could add more quantifiable achievements'],
                missingKeywords: [],
                suggestions: ['Add metrics to achievements', 'Include relevant certifications']
            };
        }
    }

    /**
     * Generate cover letter
     */
    async generateCoverLetter(resumeData, jobData) {
        const { personalInfo, experience, skills } = resumeData;
        const { company, position, jobDescription } = jobData;

        const prompt = `Generate a professional cover letter.

Applicant Information:
- Name: ${personalInfo?.fullName || 'Applicant'}
- Current/Recent Role: ${experience?.[0]?.position || 'Professional'}
- Key Skills: ${skills?.technical?.slice(0, 5).join(', ') || 'Various skills'}

Job Information:
- Company: ${company}
- Position: ${position}
${jobDescription ? `- Job Description: ${jobDescription.substring(0, 500)}` : ''}

Requirements:
1. Professional business letter format
2. 3-4 paragraphs
3. Highlight relevant experience and skills
4. Show enthusiasm for the role
5. Include a call to action
6. Personalized to the company and role
7. Return the complete cover letter

Cover Letter:`;

        const coverLetter = await this.generateContent(prompt);
        return coverLetter.trim();
    }

    /**
     * Parse job posting from URL or text
     */
    async parseJobPosting(jobText) {
        const prompt = `Extract structured information from this job posting.

Job Posting:
${jobText.substring(0, 2000)}

Extract and return ONLY valid JSON in this format:
{
  "company": "<company name>",
  "position": "<job title>",
  "location": "<location or 'Remote'>",
  "salary": {
    "min": <number or null>,
    "max": <number or null>,
    "currency": "<currency code or null>"
  },
  "requiredSkills": [<array of key skills>],
  "experienceLevel": "<entry/mid/senior>",
  "jobType": "<full-time/part-time/contract/internship>",
  "description": "<brief summary in 1-2 sentences>"
}

Return ONLY valid JSON, no explanations.`;

        const response = await this.generateContent(prompt);

        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Invalid JSON response');
        } catch (error) {
            return null;
        }
    }

    /**
     * Generate interview preparation questions
     */
    async generateInterviewPrep(resumeData, jobData) {
        const { experience, skills, projects } = resumeData;
        const { company, position, jobDescription } = jobData;

        const prompt = `Generate interview preparation material for this job application.

Candidate Background:
- Recent Experience: ${experience?.[0]?.position || 'N/A'} at ${experience?.[0]?.company || 'N/A'}
- Key Skills: ${skills?.technical?.slice(0, 5).join(', ') || 'N/A'}
- Notable Projects: ${projects?.[0]?.name || 'N/A'}

Job Details:
- Company: ${company}
- Position: ${position}
${jobDescription ? `- Description: ${jobDescription.substring(0, 500)}` : ''}

Generate a JSON response with:
{
  "technicalQuestions": [<array of 5 likely technical questions>],
  "behavioralQuestions": [<array of 5 behavioral questions>],
  "companySpecific": [<array of 3 company-specific questions>],
  "suggestedAnswers": {
    "<question>": "<suggested talking points>"
  },
  "preparationTips": [<array of 5 preparation tips>]
}

Return ONLY valid JSON, no explanations.`;

        const response = await this.generateContent(prompt);

        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Invalid JSON response');
        } catch (error) {
            // Fallback response
            return {
                technicalQuestions: [
                    'Tell me about your experience with the technologies mentioned in your resume',
                    'Describe a challenging technical problem you solved',
                    'How do you stay updated with new technologies?'
                ],
                behavioralQuestions: [
                    'Tell me about a time you worked in a team',
                    'Describe a situation where you had to meet a tight deadline',
                    'How do you handle constructive criticism?'
                ],
                companySpecific: [
                    `Why do you want to work at ${company}?`,
                    `What do you know about ${company}'s products/services?`
                ],
                suggestedAnswers: {},
                preparationTips: [
                    'Research the company culture and values',
                    'Prepare specific examples using the STAR method',
                    'Review your resume and be ready to discuss each point'
                ]
            };
        }
    }

    /**
     * AI Chat - Conversational assistant
     */
    async chat(message, context = {}) {
        const { resumeData, conversationHistory } = context;

        let contextInfo = '';
        if (resumeData) {
            contextInfo = `
User's Resume Context:
- Name: ${resumeData.personalInfo?.fullName || 'User'}
- Target Role: ${resumeData.metadata?.targetRole || 'Not specified'}
- Experience: ${resumeData.experience?.length || 0} positions
- Skills: ${resumeData.skills?.technical?.slice(0, 5).join(', ') || 'Not specified'}
`;
        }

        const prompt = `You are a helpful AI career assistant for SmartResume. Help users with resume writing, job applications, and career advice.

${contextInfo}

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n` : ''}

User message: ${message}

Provide helpful, actionable advice. Be concise but thorough. If the user asks about their resume, reference the context provided.

Response:`;

        const response = await this.generateContent(prompt);
        return response.trim();
    }

    /**
     * Suggest skills based on job description
     */
    async suggestSkills(jobDescription, currentSkills = []) {
        const prompt = `Based on this job description, suggest relevant skills to add to a resume.

Job Description:
${jobDescription.substring(0, 1000)}

Current Skills:
${currentSkills.join(', ') || 'None'}

Return a JSON array of 5-10 recommended skills that are:
1. Relevant to the job
2. Not already in the current skills list
3. Industry-standard and ATS-friendly

Format: ["skill1", "skill2", "skill3", ...]

Return ONLY the JSON array, no explanations.`;

        const response = await this.generateContent(prompt);

        try {
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Invalid JSON response');
        } catch (error) {
            return [];
        }
    }

    /**
     * Optimize resume for specific role
     */
    async optimizeForRole(resumeData, targetRole, jobDescription = '') {
        const prompt = `Provide optimization suggestions for tailoring this resume to a specific role.

Target Role: ${targetRole}
${jobDescription ? `Job Description: ${jobDescription.substring(0, 500)}` : ''}

Current Resume:
- Summary: ${resumeData.personalInfo?.summary || 'None'}
- Experience: ${resumeData.experience?.length || 0} positions
- Skills: ${resumeData.skills?.technical?.join(', ') || 'None'}

Provide suggestions in JSON format:
{
  "summaryRewrite": "<optimized professional summary>",
  "skillsToAdd": [<array of skills to add>],
  "skillsToHighlight": [<array of existing skills to emphasize>],
  "experienceHighlights": [<array of which experiences to emphasize>],
  "overallTips": [<array of 3-5 specific tips>]
}

Return ONLY valid JSON, no explanations.`;

        const response = await this.generateContent(prompt);

        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            throw new Error('Invalid JSON response');
        } catch (error) {
            return {
                summaryRewrite: '',
                skillsToAdd: [],
                skillsToHighlight: [],
                experienceHighlights: [],
                overallTips: ['Tailor your resume to match the job description']
            };
        }
    }
}

export default new AIService();
