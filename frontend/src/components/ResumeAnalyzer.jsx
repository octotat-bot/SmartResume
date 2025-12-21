import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Award, FileText, Zap, BarChart } from 'lucide-react';

const ResumeAnalyzer = ({ resume, onClose }) => {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        analyzeResume();
    }, [resume]);

    const analyzeResume = () => {
        setLoading(true);

        const scores = {
            completeness: calculateCompleteness(),
            atsCompatibility: calculateATSScore(),
            contentQuality: calculateContentQuality(),
            formatting: calculateFormattingScore(),
            keywords: calculateKeywordScore()
        };

        const overallScore = Math.round(
            (scores.completeness * 0.25) +
            (scores.atsCompatibility * 0.25) +
            (scores.contentQuality * 0.25) +
            (scores.formatting * 0.15) +
            (scores.keywords * 0.10)
        );

        const suggestions = generateSuggestions(scores);
        const strengths = generateStrengths(scores);

        setAnalysis({
            overallScore,
            scores,
            suggestions,
            strengths,
            grade: getGrade(overallScore)
        });

        setLoading(false);
    };

    const calculateCompleteness = () => {
        let score = 0;
        const maxScore = 100;

        // Personal Info (20 points)
        if (resume.personalInfo?.name) score += 5;
        if (resume.personalInfo?.email) score += 5;
        if (resume.personalInfo?.phone) score += 5;
        if (resume.personalInfo?.summary) score += 5;

        // Experience (30 points)
        if (resume.experience?.length > 0) {
            score += 15;
            if (resume.experience.length >= 2) score += 10;
            if (resume.experience.some(exp => exp.description?.length > 50)) score += 5;
        }

        // Education (20 points)
        if (resume.education?.length > 0) {
            score += 15;
            if (resume.education.some(edu => edu.degree)) score += 5;
        }

        // Skills (15 points)
        if (resume.skills?.length > 0) {
            score += 10;
            if (resume.skills.length >= 5) score += 5;
        }

        // Projects (10 points)
        if (resume.projects?.length > 0) score += 10;

        // Certifications (5 points)
        if (resume.certifications?.length > 0) score += 5;

        return Math.min(score, maxScore);
    };

    const calculateATSScore = () => {
        let score = 100;

        // Check for common ATS issues
        const summary = resume.personalInfo?.summary || '';
        const allText = JSON.stringify(resume).toLowerCase();

        // Deduct for special characters in key fields
        if (resume.personalInfo?.name?.match(/[^a-zA-Z\s]/)) score -= 10;

        // Deduct if no keywords found
        const commonKeywords = ['experience', 'skills', 'education', 'project', 'develop', 'manage', 'lead'];
        const keywordCount = commonKeywords.filter(kw => allText.includes(kw)).length;
        if (keywordCount < 3) score -= 20;

        // Bonus for standard sections
        if (resume.experience?.length > 0) score += 0;
        if (resume.education?.length > 0) score += 0;
        if (resume.skills?.length > 0) score += 0;

        return Math.max(0, Math.min(score, 100));
    };

    const calculateContentQuality = () => {
        let score = 0;

        // Summary quality (25 points)
        const summary = resume.personalInfo?.summary || '';
        if (summary.length > 50) score += 10;
        if (summary.length > 100) score += 10;
        if (summary.match(/\b(experienced|skilled|proficient|expert)\b/i)) score += 5;

        // Experience descriptions (40 points)
        if (resume.experience?.length > 0) {
            const avgDescLength = resume.experience.reduce((sum, exp) =>
                sum + (exp.description?.length || 0), 0) / resume.experience.length;

            if (avgDescLength > 50) score += 15;
            if (avgDescLength > 100) score += 15;

            // Check for action verbs
            const actionVerbs = ['led', 'managed', 'developed', 'created', 'implemented', 'improved', 'increased', 'reduced'];
            const hasActionVerbs = resume.experience.some(exp =>
                actionVerbs.some(verb => exp.description?.toLowerCase().includes(verb))
            );
            if (hasActionVerbs) score += 10;
        }

        // Skills diversity (20 points)
        if (resume.skills?.length >= 5) score += 10;
        if (resume.skills?.length >= 10) score += 10;

        // Projects with descriptions (15 points)
        if (resume.projects?.length > 0) {
            const hasDescriptions = resume.projects.every(proj => proj.description?.length > 30);
            if (hasDescriptions) score += 15;
        }

        return Math.min(score, 100);
    };

    const calculateFormattingScore = () => {
        let score = 100;

        // Check for consistent date formats
        const dates = [];
        resume.experience?.forEach(exp => {
            if (exp.startDate) dates.push(exp.startDate);
            if (exp.endDate) dates.push(exp.endDate);
        });

        // Deduct for inconsistent formatting
        if (dates.length > 0) {
            const formats = new Set(dates.map(d => d.match(/\d{4}/) ? 'year' : 'other'));
            if (formats.size > 1) score -= 15;
        }

        // Check for template selection
        if (!resume.metadata?.layout) score -= 10;

        return Math.max(0, score);
    };

    const calculateKeywordScore = () => {
        let score = 0;
        const allText = JSON.stringify(resume).toLowerCase();

        // Industry keywords
        const techKeywords = ['software', 'development', 'programming', 'code', 'system', 'application'];
        const businessKeywords = ['management', 'strategy', 'analysis', 'leadership', 'team'];
        const softSkills = ['communication', 'collaboration', 'problem-solving', 'analytical'];

        const techCount = techKeywords.filter(kw => allText.includes(kw)).length;
        const businessCount = businessKeywords.filter(kw => allText.includes(kw)).length;
        const softCount = softSkills.filter(kw => allText.includes(kw)).length;

        score += Math.min(techCount * 10, 40);
        score += Math.min(businessCount * 10, 30);
        score += Math.min(softCount * 10, 30);

        return Math.min(score, 100);
    };

    const generateSuggestions = (scores) => {
        const suggestions = [];

        if (scores.completeness < 80) {
            if (!resume.personalInfo?.summary) {
                suggestions.push({
                    type: 'warning',
                    category: 'Completeness',
                    text: 'Add a professional summary to introduce yourself',
                    impact: 'high'
                });
            }
            if (!resume.skills || resume.skills.length < 5) {
                suggestions.push({
                    type: 'warning',
                    category: 'Completeness',
                    text: 'Add at least 5-10 relevant skills',
                    impact: 'high'
                });
            }
            if (!resume.experience || resume.experience.length === 0) {
                suggestions.push({
                    type: 'error',
                    category: 'Completeness',
                    text: 'Add your work experience',
                    impact: 'critical'
                });
            }
        }

        if (scores.contentQuality < 70) {
            suggestions.push({
                type: 'warning',
                category: 'Content',
                text: 'Use action verbs (led, managed, developed, created) in experience descriptions',
                impact: 'high'
            });
            suggestions.push({
                type: 'info',
                category: 'Content',
                text: 'Add quantifiable achievements (e.g., "Increased sales by 25%")',
                impact: 'medium'
            });
        }

        if (scores.atsCompatibility < 80) {
            suggestions.push({
                type: 'warning',
                category: 'ATS',
                text: 'Avoid special characters and graphics for better ATS compatibility',
                impact: 'high'
            });
            suggestions.push({
                type: 'info',
                category: 'ATS',
                text: 'Use standard section headings (Experience, Education, Skills)',
                impact: 'medium'
            });
        }

        if (scores.keywords < 60) {
            suggestions.push({
                type: 'info',
                category: 'Keywords',
                text: 'Include more industry-specific keywords relevant to your target role',
                impact: 'medium'
            });
        }

        return suggestions;
    };

    const generateStrengths = (scores) => {
        const strengths = [];

        if (scores.completeness >= 80) {
            strengths.push('Comprehensive resume with all key sections');
        }
        if (scores.atsCompatibility >= 80) {
            strengths.push('ATS-friendly formatting');
        }
        if (scores.contentQuality >= 80) {
            strengths.push('High-quality content with strong descriptions');
        }
        if (resume.skills?.length >= 10) {
            strengths.push('Diverse skill set');
        }
        if (resume.projects?.length > 0) {
            strengths.push('Includes relevant projects');
        }

        return strengths;
    };

    const getGrade = (score) => {
        if (score >= 90) return { letter: 'A+', color: 'text-green-500', label: 'Excellent' };
        if (score >= 80) return { letter: 'A', color: 'text-green-400', label: 'Great' };
        if (score >= 70) return { letter: 'B', color: 'text-blue-500', label: 'Good' };
        if (score >= 60) return { letter: 'C', color: 'text-yellow-500', label: 'Fair' };
        return { letter: 'D', color: 'text-red-500', label: 'Needs Work' };
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Analyzing your resume...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Resume Score</h2>
                        <p className="text-blue-100">Based on industry best practices and ATS compatibility</p>
                    </div>
                    <div className="text-center">
                        <div className={`text-6xl font-black ${analysis.grade.color}`}>
                            {analysis.grade.letter}
                        </div>
                        <div className="text-4xl font-bold mt-2">{analysis.overallScore}/100</div>
                        <div className="text-sm text-blue-100 mt-1">{analysis.grade.label}</div>
                    </div>
                </div>
            </div>

            {/* Score Breakdown */}
            <div className="bg-[#0a0a0a] rounded-xl p-6 mb-6 border border-[#1a1a1a]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart className="w-5 h-5" />
                    Score Breakdown
                </h3>
                <div className="space-y-4">
                    {Object.entries(analysis.scores).map(([key, score]) => (
                        <div key={key}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-white font-semibold">{score}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all ${getScoreColor(score)}`}
                                    style={{ width: `${score}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Strengths */}
                {analysis.strengths.length > 0 && (
                    <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#1a1a1a]">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-green-500" />
                            Strengths
                        </h3>
                        <ul className="space-y-2">
                            {analysis.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {strength}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Suggestions */}
                <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#1a1a1a]">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Suggestions
                    </h3>
                    <ul className="space-y-3">
                        {analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                                {suggestion.type === 'error' && <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />}
                                {suggestion.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />}
                                {suggestion.type === 'info' && <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />}
                                <div>
                                    <span className="text-gray-300">{suggestion.text}</span>
                                    <span className={`ml-2 text-xs px-2 py-0.5 rounded ${suggestion.impact === 'critical' ? 'bg-red-500/20 text-red-400' :
                                        suggestion.impact === 'high' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {suggestion.impact}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-center">
                <button
                    onClick={onClose}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                    Close Analysis
                </button>
            </div>
        </div>
    );
};

export default ResumeAnalyzer;
