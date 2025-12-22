import { useState } from 'react';
import { FileText, MessageSquare, Loader2, Copy, Check, Download } from 'lucide-react';
import { aiService } from '../services/api';

const JobAIAssistant = ({ application, resumeId }) => {
    const [activeTab, setActiveTab] = useState('coverLetter');
    const [loading, setLoading] = useState(false);
    const [coverLetter, setCoverLetter] = useState(null);
    const [interviewPrep, setInterviewPrep] = useState(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateCoverLetter = async () => {
        if (!resumeId || !application) {
            setError('Resume and application data required');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await aiService.generateCoverLetter(
                resumeId,
                application._id,
                null,
                application.notes || ''
            );
            setCoverLetter(response.data.coverLetter);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate cover letter');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateInterviewPrep = async () => {
        if (!resumeId || !application) {
            setError('Resume and application data required');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await aiService.generateInterviewPrep(resumeId, application._id);
            setInterviewPrep(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate interview prep');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadAsText = (content, filename) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    AI Job Assistant
                </h3>
                <p className="text-sm text-purple-100 mt-1">
                    Powered by AI to help you succeed
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('coverLetter')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'coverLetter'
                            ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Cover Letter
                </button>
                <button
                    onClick={() => setActiveTab('interview')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'interview'
                            ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Interview Prep
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Cover Letter Tab */}
                {activeTab === 'coverLetter' && (
                    <div className="space-y-4">
                        {!coverLetter ? (
                            <div className="text-center py-8">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    Generate AI Cover Letter
                                </h4>
                                <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                                    Create a personalized cover letter tailored to this job application using AI.
                                </p>
                                <button
                                    onClick={handleGenerateCoverLetter}
                                    disabled={loading}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-5 h-5" />
                                            Generate Cover Letter
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <div className="prose prose-sm max-w-none">
                                        <pre className="whitespace-pre-wrap font-sans text-gray-800">
                                            {coverLetter}
                                        </pre>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => copyToClipboard(coverLetter)}
                                        className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 text-green-600" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => downloadAsText(
                                            coverLetter,
                                            `cover-letter-${application.company}.txt`
                                        )}
                                        className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                    <button
                                        onClick={() => setCoverLetter(null)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                                    >
                                        Regenerate
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Interview Prep Tab */}
                {activeTab === 'interview' && (
                    <div className="space-y-4">
                        {!interviewPrep ? (
                            <div className="text-center py-8">
                                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    Prepare for Your Interview
                                </h4>
                                <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                                    Get AI-generated interview questions and preparation tips tailored to this role.
                                </p>
                                <button
                                    onClick={handleGenerateInterviewPrep}
                                    disabled={loading}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <MessageSquare className="w-5 h-5" />
                                            Generate Interview Prep
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Technical Questions */}
                                {interviewPrep.technicalQuestions?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                                                Technical
                                            </span>
                                            Questions
                                        </h4>
                                        <ul className="space-y-2">
                                            {interviewPrep.technicalQuestions.map((q, idx) => (
                                                <li key={idx} className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-gray-800">
                                                    {idx + 1}. {q}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Behavioral Questions */}
                                {interviewPrep.behavioralQuestions?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                                                Behavioral
                                            </span>
                                            Questions
                                        </h4>
                                        <ul className="space-y-2">
                                            {interviewPrep.behavioralQuestions.map((q, idx) => (
                                                <li key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-800">
                                                    {idx + 1}. {q}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Company Specific */}
                                {interviewPrep.companySpecific?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                                                Company
                                            </span>
                                            Specific Questions
                                        </h4>
                                        <ul className="space-y-2">
                                            {interviewPrep.companySpecific.map((q, idx) => (
                                                <li key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-gray-800">
                                                    {idx + 1}. {q}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Preparation Tips */}
                                {interviewPrep.preparationTips?.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">💡 Preparation Tips</h4>
                                        <ul className="space-y-2">
                                            {interviewPrep.preparationTips.map((tip, idx) => (
                                                <li key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-gray-800 flex items-start gap-2">
                                                    <span className="text-yellow-600 font-bold">{idx + 1}.</span>
                                                    <span>{tip}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <button
                                    onClick={() => setInterviewPrep(null)}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Regenerate
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobAIAssistant;
