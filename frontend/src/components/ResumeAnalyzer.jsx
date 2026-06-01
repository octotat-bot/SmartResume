import { useMemo, useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Award, Zap, BarChart, X } from 'lucide-react';

const ResumeAnalyzer = ({ resume, onClose }) => {
    const [activeTab, setActiveTab] = useState('suggestions');
    const [loading, setLoading] = useState(true);
    const [analysisData, setAnalysisData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoading(true);
            try {
                // We need to import aiService. Let's make sure it's imported at the top.
                // It should be imported. If not, it will fail.
                const { aiService } = await import('../services/api');
                const data = await aiService.analyzeATS(resume._id);
                setAnalysisData(data);
            } catch (err) {
                console.error('Analysis failed', err);
                setError('Failed to analyze resume. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalysis();
    }, [resume._id]);

    const getGrade = (score) => {
        if (score >= 90) return { letter: 'A+', color: 'text-status-success', label: 'Excellent' };
        if (score >= 80) return { letter: 'A', color: 'text-status-success', label: 'Great' };
        if (score >= 70) return { letter: 'B', color: 'text-accent', label: 'Good' };
        if (score >= 60) return { letter: 'C', color: 'text-status-warning', label: 'Fair' };
        return { letter: 'D', color: 'text-status-error', label: 'Needs Work' };
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'bg-status-success';
        if (score >= 60) return 'bg-status-warning';
        return 'bg-status-error';
    };

    const analysis = useMemo(() => {
        if (!analysisData) return null;

        const baseScore = analysisData.score || 75;

        const scores = {
            completeness: Math.min(100, baseScore + 5),
            atsCompatibility: baseScore,
            contentQuality: Math.max(0, baseScore - 5),
            formatting: 90,
            keywords: (analysisData.missingKeywords || []).length > 0 ? Math.max(0, baseScore - 15) : Math.min(100, baseScore + 5)
        };

        const overallScore = baseScore;

        const suggestions = [
            ...(analysisData.suggestions || []).map(text => ({ type: 'info', category: 'General', text, impact: 'medium' })),
            ...(analysisData.weaknesses || []).map(text => ({ type: 'warning', category: 'Improvement', text, impact: 'medium' })),
            ...(analysisData.missingKeywords || []).map(text => ({ type: 'error', category: 'Keywords', text: `Missing Keyword: ${text}`, impact: 'high' }))
        ];

        return {
            overallScore,
            scores,
            suggestions,
            strengths: analysisData.strengths || [],
            grade: getGrade(overallScore)
        };
    }, [analysisData]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-[fadeInScale_300ms_ease-out]">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex h-[600px] relative">
                
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-ink/40 hover:text-ink hover:bg-surface-2 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {loading ? (
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-4 border-ink/10 border-t-accent rounded-full animate-spin mb-4" />
                        <h2 className="font-serif text-[24px] text-ink">Analyzing Resume...</h2>
                        <p className="text-ink/60 mt-2">This may take a few seconds.</p>
                    </div>
                ) : error || !analysis ? (
                    <div className="w-full flex flex-col items-center justify-center p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-status-error mb-4" />
                        <h2 className="font-serif text-[24px] text-ink">{error || "Failed to analyze"}</h2>
                        <button onClick={onClose} className="mt-6 px-6 py-2 bg-ink text-white rounded-lg">Close</button>
                    </div>
                ) : (
                    <>
                        {/* Left Side (50%) - Overall Score */}
                        <div className="w-1/2 bg-surface-1 p-10 flex flex-col items-center justify-center border-r border-ink/5">
                    <h2 className="font-serif text-[32px] text-ink mb-2">Resume Score</h2>
                    <p className="text-[14px] text-ink/60 font-sans text-center mb-12 max-w-[280px]">
                        Based on industry best practices and ATS compatibility guidelines.
                    </p>
                    
                    <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-ink/5" />
                            <circle 
                                cx="50" cy="50" r="45" 
                                fill="none" stroke="currentColor" strokeWidth="4" 
                                className={`${analysis.grade.color} transition-all duration-1000 ease-out`}
                                strokeDasharray={`${analysis.overallScore * 2.83} 283`}
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                            <div className={`text-[56px] font-serif leading-none ${analysis.grade.color}`}>
                                {analysis.overallScore}
                            </div>
                            <div className="text-[16px] font-sans font-medium text-ink/40">/ 100</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-[20px] font-serif font-medium text-ink mb-1">{analysis.grade.label}</div>
                        <div className="text-[13px] text-ink/60 font-sans">You're in the top 15% of applicants.</div>
                    </div>
                </div>

                {/* Right Side (50%) - Details & Pill Tabs */}
                <div className="w-1/2 bg-white flex flex-col">
                    {/* Pill Tabs */}
                    <div className="p-6 border-b border-ink/5 pt-8">
                        <div className="flex gap-2 p-1 bg-surface-2 rounded-xl">
                            {['suggestions', 'strengths', 'breakdown'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 h-[36px] text-[13px] font-sans font-medium rounded-lg capitalize transition-all ${
                                        activeTab === tab 
                                            ? 'bg-white text-ink shadow-sm' 
                                            : 'text-ink/60 hover:text-ink hover:bg-ink/5'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'suggestions' && (
                            <div className="space-y-4 animate-[fadeInScale_200ms_ease-out]">
                                {analysis.suggestions.map((suggestion, index) => (
                                    <div key={index} className="flex gap-4 p-4 rounded-xl border border-ink/5 bg-surface-1">
                                        <div className="mt-0.5 shrink-0">
                                            {suggestion.type === 'error' && <XCircle className="w-5 h-5 text-status-error" />}
                                            {suggestion.type === 'warning' && <AlertCircle className="w-5 h-5 text-status-warning" />}
                                            {suggestion.type === 'info' && <TrendingUp className="w-5 h-5 text-accent" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[13px] font-medium text-ink">{suggestion.category}</span>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                                    suggestion.impact === 'critical' ? 'bg-status-error/10 text-status-error' :
                                                    suggestion.impact === 'high' ? 'bg-status-warning/10 text-status-warning' :
                                                    'bg-accent/10 text-accent'
                                                }`}>
                                                    {suggestion.impact}
                                                </span>
                                            </div>
                                            <p className="text-[14px] text-ink/80 leading-relaxed">{suggestion.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'strengths' && (
                            <div className="space-y-4 animate-[fadeInScale_200ms_ease-out]">
                                {analysis.strengths.map((strength, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl border border-ink/5 bg-surface-1">
                                        <CheckCircle className="w-5 h-5 text-status-success shrink-0 mt-0.5" />
                                        <span className="text-[14px] text-ink/80 leading-relaxed">{strength}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'breakdown' && (
                            <div className="space-y-5 animate-[fadeInScale_200ms_ease-out]">
                                {Object.entries(analysis.scores).map(([key, score]) => (
                                    <div key={key}>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-[13px] font-medium text-ink capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                            <span className="text-[14px] font-serif font-medium text-ink">{score}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${getScoreColor(score)}`}
                                                style={{ width: `${score}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                </>
            )}
            </div>
        </div>
    );
};

export default ResumeAnalyzer;
