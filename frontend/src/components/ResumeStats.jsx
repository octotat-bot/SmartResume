import { X, FileText, List, Briefcase, GraduationCap, Code, Clock, BarChart3 } from 'lucide-react';

const ResumeStats = ({ resume, onClose }) => {
    // Calculate word count
    const calculateWordCount = (text) => {
        if (!text) return 0;
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const getTotalWords = () => {
        let total = 0;

        // Summary
        if (resume.personalInfo?.summary) {
            total += calculateWordCount(resume.personalInfo.summary);
        }

        // Experience descriptions
        resume.experience?.forEach(exp => {
            if (exp.description) total += calculateWordCount(exp.description);
        });

        // Project descriptions
        resume.projects?.forEach(proj => {
            if (proj.description) total += calculateWordCount(proj.description);
        });

        // Education
        resume.education?.forEach(edu => {
            if (edu.description) total += calculateWordCount(edu.description);
        });

        return total;
    };

    const stats = {
        totalWords: getTotalWords(),
        sections: {
            experience: resume.experience?.length || 0,
            education: resume.education?.length || 0,
            projects: resume.projects?.length || 0,
            skills: resume.skills?.technical?.length || 0,
            certifications: resume.certifications?.length || 0,
            coCurricular: resume.coCurricular?.length || 0
        },
        readingTime: Math.ceil(getTotalWords() / 200), // Average reading speed
        completeness: 0
    };

    // Calculate completeness percentage
    const calculateCompleteness = () => {
        let score = 0;
        const maxScore = 100;

        // Personal info (20 points)
        if (resume.personalInfo?.fullName) score += 5;
        if (resume.personalInfo?.email) score += 5;
        if (resume.personalInfo?.phone) score += 5;
        if (resume.personalInfo?.summary) score += 5;

        // Experience (25 points)
        if (stats.sections.experience > 0) score += 15;
        if (stats.sections.experience >= 2) score += 10;

        // Education (15 points)
        if (stats.sections.education > 0) score += 15;

        // Skills (15 points)
        if (stats.sections.skills > 0) score += 10;
        if (stats.sections.skills >= 5) score += 5;

        // Projects (15 points)
        if (stats.sections.projects > 0) score += 10;
        if (stats.sections.projects >= 2) score += 5;

        // Additional sections (10 points)
        if (stats.sections.certifications > 0) score += 5;
        if (stats.sections.coCurricular > 0) score += 5;

        return Math.min(score, maxScore);
    };

    stats.completeness = calculateCompleteness();

    const statCards = [
        {
            icon: FileText,
            label: 'Total Words',
            value: stats.totalWords,
            color: 'blue',
            description: 'Across all sections'
        },
        {
            icon: Clock,
            label: 'Reading Time',
            value: `${stats.readingTime} min`,
            color: 'green',
            description: 'Average reading speed'
        },
        {
            icon: BarChart3,
            label: 'Completeness',
            value: `${stats.completeness}%`,
            color: stats.completeness >= 80 ? 'green' : stats.completeness >= 50 ? 'yellow' : 'red',
            description: 'Profile completion'
        }
    ];

    const sectionStats = [
        { icon: Briefcase, label: 'Experience', count: stats.sections.experience, color: 'purple' },
        { icon: GraduationCap, label: 'Education', count: stats.sections.education, color: 'blue' },
        { icon: Code, label: 'Projects', count: stats.sections.projects, color: 'green' },
        { icon: List, label: 'Skills', count: stats.sections.skills, color: 'orange' },
        { icon: FileText, label: 'Certifications', count: stats.sections.certifications, color: 'pink' },
        { icon: List, label: 'Activities', count: stats.sections.coCurricular, color: 'indigo' }
    ];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Resume Statistics</h2>
                        <p className="text-blue-100 text-sm mt-1">Detailed analysis of your resume</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {statCards.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-lg bg-${stat.color}-500/20`}>
                                        <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">{stat.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Completeness Bar */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white">Profile Completeness</h3>
                            <span className="text-2xl font-bold text-white">{stats.completeness}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${stats.completeness >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                        stats.completeness >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                            'bg-gradient-to-r from-red-500 to-pink-500'
                                    }`}
                                style={{ width: `${stats.completeness}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            {stats.completeness >= 80 ? '✨ Excellent! Your resume is well-detailed.' :
                                stats.completeness >= 50 ? '👍 Good progress! Add more details to improve.' :
                                    '📝 Keep going! Add more sections to strengthen your resume.'}
                        </p>
                    </div>

                    {/* Section Breakdown */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Section Breakdown</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {sectionStats.map((section, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                                >
                                    <div className={`p-2 rounded-lg bg-${section.color}-500/20`}>
                                        <section.icon className={`w-4 h-4 text-${section.color}-400`} />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white">{section.count}</div>
                                        <div className="text-xs text-gray-400">{section.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    {stats.completeness < 100 && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-blue-400 mb-3">💡 Recommendations</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                {stats.sections.experience === 0 && (
                                    <li>• Add your work experience to showcase your professional background</li>
                                )}
                                {stats.sections.skills < 5 && (
                                    <li>• List more skills to highlight your expertise (aim for 5-10 skills)</li>
                                )}
                                {stats.sections.projects === 0 && (
                                    <li>• Include projects to demonstrate practical experience</li>
                                )}
                                {!resume.personalInfo?.summary && (
                                    <li>• Write a professional summary to introduce yourself</li>
                                )}
                                {stats.totalWords < 200 && (
                                    <li>• Add more details to your descriptions (aim for 200-400 words total)</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeStats;
