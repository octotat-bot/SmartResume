import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, FileEdit, RefreshCw, Upload, CheckCircle, FileText, X } from 'lucide-react';

const OnboardingPage = () => {
    const [step, setStep] = useState(1);
    const [situation, setSituation] = useState(null);
    const [fields, setFields] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showButton, setShowButton] = useState(false);
    
    const navigate = useNavigate();

    // Step 4 auto-show button
    useEffect(() => {
        if (step === 4) {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Handle Keyboard Nav
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && step < 4) {
                // simple validation
                if (step === 1 && !situation) return;
                if (step === 2 && fields.length === 0) return;
                setStep(s => s + 1);
            }
            if (e.key === 'Escape' && step > 1 && step < 4) {
                setStep(s => s - 1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [step, situation, fields]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const situations = [
        { id: 'hunting', title: 'Actively job hunting', desc: 'Looking for a new role right now', icon: Search },
        { id: 'exploring', title: 'Exploring options', desc: 'Open to the right opportunities', icon: Compass },
        { id: 'updating', title: 'Updating my resume', desc: 'Just keeping things current', icon: FileEdit },
        { id: 'career_change', title: 'Career change', desc: 'Pivoting to a new industry', icon: RefreshCw },
    ];

    const fieldOptions = [
        'Engineering', 'Design', 'Marketing', 'Finance', 'Product', 
        'Data', 'Sales', 'Legal', 'Healthcare', 'Other'
    ];

    const toggleField = (field) => {
        setFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
    };

    return (
        <div className="min-h-screen bg-surface-1 flex flex-col items-center py-12 px-6">
            
            {/* Progress Indicator */}
            {step < 4 && (
                <div className="w-full max-w-2xl flex flex-col items-center mb-16">
                    <div className="flex items-center gap-3 h-[8px]">
                        {[1, 2, 3, 4].map(i => (
                            <div 
                                key={i}
                                className={`rounded-full transition-all duration-300 ${
                                    i === step 
                                        ? 'w-2 h-2 bg-accent' 
                                        : 'w-1.5 h-1.5 bg-transparent border border-ink/20'
                                }`}
                            />
                        ))}
                    </div>
                    <div className="text-[12px] text-ink/40 font-sans tracking-wide uppercase mt-4">
                        Step {step} of 4
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="w-full max-w-2xl flex-1 flex flex-col justify-center">
                
                {step === 1 && (
                    <div className="animate-[fadeInScale_300ms_ease-out]">
                        <h1 className="font-serif text-[36px] text-ink leading-tight mb-2">Let's tailor your<br/>experience.</h1>
                        <p className="text-[15px] text-ink/60 font-sans mb-10">We'll use this to personalize your resume suggestions.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {situations.map(sit => {
                                const isSelected = situation === sit.id;
                                return (
                                    <button
                                        key={sit.id}
                                        onClick={() => setSituation(sit.id)}
                                        className={`h-[160px] p-6 flex flex-col items-start justify-between rounded-xl border text-left transition-all duration-200 ${
                                            isSelected 
                                                ? 'border-accent bg-accent/5' 
                                                : 'bg-white border-ink/5 hover:border-ink/15 hover:shadow-sm'
                                        }`}
                                    >
                                        <sit.icon className={`w-7 h-7 ${isSelected ? 'text-accent' : 'text-ink/40'}`} />
                                        <div>
                                            <div className="font-sans font-medium text-[15px] text-ink">{sit.title}</div>
                                            <div className="font-sans text-[13px] text-ink/60 mt-0.5">{sit.desc}</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-[fadeInScale_300ms_ease-out]">
                        <h1 className="font-serif text-[36px] text-ink leading-tight mb-2">What's your field?</h1>
                        <p className="text-[15px] text-ink/60 font-sans mb-10">Select all that apply.</p>

                        <div className="flex flex-wrap gap-3">
                            {fieldOptions.map(field => {
                                const isSelected = fields.includes(field);
                                return (
                                    <button
                                        key={field}
                                        onClick={() => toggleField(field)}
                                        className={`h-[32px] px-4 rounded-full font-sans text-[14px] transition-all duration-200 border ${
                                            isSelected
                                                ? 'bg-accent text-white border-accent'
                                                : 'bg-white text-ink border-ink/10 hover:border-ink/30'
                                        }`}
                                    >
                                        {field}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-[fadeInScale_300ms_ease-out]">
                        <h1 className="font-serif text-[36px] text-ink leading-tight mb-10">Got a resume already?</h1>

                        {!uploadedFile ? (
                            <label className="w-full h-[200px] border border-dashed border-accent/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-accent/5 transition-colors group">
                                <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileUpload} />
                                <Upload className="w-8 h-8 text-ink/40 mb-3 group-hover:text-accent transition-colors" />
                                <div className="text-[15px] text-ink/60 font-sans text-center">
                                    Drop your PDF or DOCX here<br />
                                    <span className="text-accent">or browse files</span>
                                </div>
                            </label>
                        ) : (
                            <div className="w-full p-6 border border-ink/10 rounded-xl bg-surface-1 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-status-success/10 rounded-lg flex items-center justify-center text-status-success">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-sans font-medium text-[15px] text-ink">{uploadedFile.name}</div>
                                        <div className="font-sans text-[13px] text-ink/40">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setUploadedFile(null)}
                                    className="text-[13px] text-ink/60 hover:text-status-error transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                        
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={() => setStep(4)}
                                className="text-[14px] text-ink/60 hover:text-ink transition-colors"
                            >
                                Skip for now →
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="flex-1 flex items-center justify-center animate-[fadeInScale_300ms_ease-out]">
                        <div className="text-center relative max-w-sm w-full">
                            {/* Decorative background number */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] font-serif text-[120px] text-accent/10 select-none pointer-events-none">
                                1
                            </div>
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <CheckCircle className="w-10 h-10 text-accent mb-6" />
                                <h1 className="font-serif text-[32px] text-ink mb-3">Your workspace is ready.</h1>
                                <p className="text-[15px] text-ink/60 font-sans mb-10">We've set up your dashboard. Let's build something great.</p>
                                
                                <div className={`w-full transition-all duration-500 transform ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                    <button 
                                        onClick={() => navigate('/dashboard')}
                                        className="w-full h-[48px] bg-accent text-white rounded-xl font-sans font-medium text-[15px] hover:brightness-95 transition-all"
                                    >
                                        Go to dashboard →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            {step < 4 && (
                <div className="w-full max-w-2xl flex justify-between items-center mt-12 pt-6">
                    <div>
                        {step > 1 && (
                            <button 
                                onClick={() => setStep(s => s - 1)}
                                className="text-[14px] text-ink/60 hover:text-ink transition-colors font-medium"
                            >
                                ← Back
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            if (step === 1 && !situation) return;
                            if (step === 2 && fields.length === 0) return;
                            setStep(s => s + 1);
                        }}
                        disabled={(step === 1 && !situation) || (step === 2 && fields.length === 0)}
                        className="h-[44px] px-6 bg-accent text-white rounded-xl font-sans font-medium text-[14px] hover:brightness-95 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        Continue →
                    </button>
                </div>
            )}
        </div>
    );
};

export default OnboardingPage;
