import { useState } from 'react';
import { Sparkles, Wand2, FileText, Target, Lightbulb, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { aiService } from '../services/api';

const AIFeaturesPanel = ({ resumeId, resumeData, onUpdate }) => {
    const [activeFeature, setActiveFeature] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Bullet Point Enhancer
    const [bulletInput, setBulletInput] = useState('');
    const [enhancedBullet, setEnhancedBullet] = useState(null);

    // Summary Generator
    const [generatedSummary, setGeneratedSummary] = useState(null);

    // ATS Analyzer
    const [atsScore, setAtsScore] = useState(null);
    const [jobDescInput, setJobDescInput] = useState('');

    // Skills Suggester
    const [suggestedSkills, setSuggestedSkills] = useState([]);

    const handleEnhanceBullet = async () => {
        if (!bulletInput.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const context = {
                role: resumeData?.experience?.[0]?.position,
                company: resumeData?.experience?.[0]?.company
            };

            const response = await aiService.enhanceBulletPoint(bulletInput, context);
            setEnhancedBullet(response.data.enhanced);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to enhance bullet point');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateSummary = async () => {
        if (!resumeId) {
            setError('Please save your resume first');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await aiService.generateSummary(resumeId);
            setGeneratedSummary(response.data.summary);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate summary');
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyzeATS = async () => {
        if (!resumeId) {
            setError('Please save your resume first');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await aiService.analyzeATS(resumeId, jobDescInput);
            setAtsScore(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to analyze resume');
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestSkills = async () => {
        if (!jobDescInput.trim()) {
            setError('Please enter a job description');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await aiService.suggestSkills(jobDescInput, resumeId);
            setSuggestedSkills(response.data.skills);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to suggest skills');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    const features = [
        {
            id: 'enhance',
            name: 'Enhance Bullet Point',
            icon: Wand2,
            description: 'Transform basic bullet points into impactful achievements',
            color: 'purple'
        },
        {
            id: 'summary',
            name: 'Generate Summary',
            icon: FileText,
            description: 'Create a compelling professional summary',
            color: 'blue'
        },
        {
            id: 'ats',
            name: 'ATS Analysis',
            icon: Target,
            description: 'Check how well your resume passes ATS systems',
            color: 'green'
        },
        {
            id: 'skills',
            name: 'Skill Suggestions',
            icon: Lightbulb,
            description: 'Get relevant skill recommendations',
            color: 'orange'
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
            blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
            green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
            orange: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
        };
        return colors[color] || colors.purple;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">AI Assistant</h2>
                    <p className="text-sm text-gray-600">Powered by Gemini AI</p>
                </div>
            </div>

            {/* Feature Buttons */}
            {!activeFeature && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <button
                                key={feature.id}
                                onClick={() => {
                                    setActiveFeature(feature.id);
                                    setError(null);
                                    setResult(null);
                                }}
                                className={`p-4 border-2 rounded-xl text-left transition-all ${getColorClasses(feature.color)}`}
                            >
                                <Icon className="w-6 h-6 mb-2" />
                                <h3 className="font-semibold mb-1">{feature.name}</h3>
                                <p className="text-xs opacity-80">{feature.description}</p>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Active Feature Content */}
            {activeFeature && (
                <div className="space-y-4">
                    <button
                        onClick={() => {
                            setActiveFeature(null);
                            setError(null);
                            setResult(null);
                            setBulletInput('');
                            setEnhancedBullet(null);
                            setGeneratedSummary(null);
                            setAtsScore(null);
                            setSuggestedSkills([]);
                            setJobDescInput('');
                        }}
                        className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                        ← Back to features
                    </button>

                    {/* Enhance Bullet Point */}
                    {activeFeature === 'enhance' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter your bullet point:
                                </label>
                                <textarea
                                    value={bulletInput}
                                    onChange={(e) => setBulletInput(e.target.value)}
                                    placeholder="e.g., Managed team projects"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    rows="3"
                                />
                            </div>
                            <button
                                onClick={handleEnhanceBullet}
                                disabled={loading || !bulletInput.trim()}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Enhancing...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-4 h-4" />
                                        Enhance
                                    </>
                                )}
                            </button>

                            {enhancedBullet && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-start gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-green-900 mb-2">Enhanced Version:</h4>
                                            <p className="text-gray-800">{enhancedBullet}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(enhancedBullet)}
                                        className="mt-2 text-sm text-green-700 hover:text-green-900"
                                    >
                                        Copy to clipboard
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Generate Summary */}
                    {activeFeature === 'summary' && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Generate a professional summary based on your resume data.
                            </p>
                            <button
                                onClick={handleGenerateSummary}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-4 h-4" />
                                        Generate Summary
                                    </>
                                )}
                            </button>

                            {generatedSummary && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-blue-900 mb-2">Generated Summary:</h4>
                                            <p className="text-gray-800">{generatedSummary}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => copyToClipboard(generatedSummary)}
                                            className="text-sm text-blue-700 hover:text-blue-900"
                                        >
                                            Copy
                                        </button>
                                        {onUpdate && (
                                            <button
                                                onClick={() => onUpdate('summary', generatedSummary)}
                                                className="text-sm text-blue-700 hover:text-blue-900"
                                            >
                                                Use this summary
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ATS Analysis */}
                    {activeFeature === 'ats' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Description (optional):
                                </label>
                                <textarea
                                    value={jobDescInput}
                                    onChange={(e) => setJobDescInput(e.target.value)}
                                    placeholder="Paste the job description here for better analysis..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    rows="4"
                                />
                            </div>
                            <button
                                onClick={handleAnalyzeATS}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Target className="w-4 h-4" />
                                        Analyze Resume
                                    </>
                                )}
                            </button>

                            {atsScore && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-green-900 mb-2">ATS Score</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                                                    style={{ width: `${atsScore.score}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-2xl text-green-700">{atsScore.score}%</span>
                                        </div>
                                    </div>

                                    {atsScore.strengths?.length > 0 && (
                                        <div>
                                            <h5 className="font-semibold text-gray-900 mb-2">✅ Strengths:</h5>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                {atsScore.strengths.map((strength, idx) => (
                                                    <li key={idx}>{strength}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {atsScore.suggestions?.length > 0 && (
                                        <div>
                                            <h5 className="font-semibold text-gray-900 mb-2">💡 Suggestions:</h5>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                {atsScore.suggestions.map((suggestion, idx) => (
                                                    <li key={idx}>{suggestion}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Skill Suggestions */}
                    {activeFeature === 'skills' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Description:
                                </label>
                                <textarea
                                    value={jobDescInput}
                                    onChange={(e) => setJobDescInput(e.target.value)}
                                    placeholder="Paste a job description to get skill suggestions..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    rows="4"
                                />
                            </div>
                            <button
                                onClick={handleSuggestSkills}
                                disabled={loading || !jobDescInput.trim()}
                                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Lightbulb className="w-4 h-4" />
                                        Suggest Skills
                                    </>
                                )}
                            </button>

                            {suggestedSkills.length > 0 && (
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-orange-900 mb-3">Recommended Skills:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedSkills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-white border border-orange-300 text-orange-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AIFeaturesPanel;
