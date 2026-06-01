import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, Loader2, BarChart } from 'lucide-react';
import { resumeService } from '../services/api';
import ResumeAnalyzer from '../components/ResumeAnalyzer';

const AnalyzerPage = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedResume, setSelectedResume] = useState(null);

    useEffect(() => {
        loadResumes();
    }, []);

    const loadResumes = async () => {
        try {
            const data = await resumeService.getResumes();
            setResumes(data.resumes || []);
        } catch (error) {
            console.error('Failed to load resumes', error);
            setResumes([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-[fadeIn_300ms_ease-out]">
            <header className="mb-8 flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                            <BarChart className="w-5 h-5 text-accent" />
                        </div>
                        <h1 className="text-[32px] font-serif font-medium text-ink leading-none">ATS Checker</h1>
                    </div>
                    <p className="text-ink/60 font-sans text-[14px]">Select a resume to evaluate its ATS compatibility and content quality.</p>
                </div>
            </header>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
            ) : resumes.length === 0 ? (
                <div className="bg-surface-1 border border-ink/5 rounded-2xl p-12 text-center">
                    <FileText className="w-12 h-12 text-ink/20 mx-auto mb-4" />
                    <h3 className="text-[16px] font-serif font-medium text-ink mb-2">No resumes found</h3>
                    <p className="text-[14px] text-ink/60 font-sans">Create a resume first to analyze it.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map(resume => (
                        <div key={resume._id} className="bg-white border border-ink/5 rounded-2xl p-6 hover:shadow-card transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-ink/60 group-hover:text-ink transition-colors" />
                                </div>
                            </div>
                            <h3 className="text-[16px] font-semibold text-ink mb-1 truncate">{resume.title || 'Untitled'}</h3>
                            <p className="text-[13px] text-ink/60 mb-6 truncate">{resume.targetRole || 'No target role specified'}</p>
                            
                            <button 
                                onClick={() => setSelectedResume(resume)}
                                className="w-full flex items-center justify-center gap-2 bg-ink text-white py-2.5 rounded-xl font-medium text-[13px] hover:bg-ink/90 transition-colors"
                            >
                                <Sparkles className="w-4 h-4 text-accent" />
                                Analyze Compatibility
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedResume && (
                <ResumeAnalyzer 
                    resume={selectedResume} 
                    onClose={() => setSelectedResume(null)} 
                />
            )}
        </div>
    );
};

export default AnalyzerPage;
