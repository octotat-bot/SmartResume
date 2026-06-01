import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layout, GripVertical, Plus, Sparkles, Check, X, Download, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import { resumeService } from '../services/api';
import EditableField from '../components/EditableField';

const defaultResume = {
    title: 'Untitled Resume',
    personalInfo: {
        fullName: 'Your Name',
        email: 'email@example.com',
        phone: '(555) 555-5555',
        location: 'City, State',
        linkedin: 'linkedin.com/in/username'
    },
    experience: [
        {
            _id: 'temp-1',
            position: 'Job Title',
            company: 'Company Name',
            startDate: 'YYYY',
            endDate: 'Present',
            achievements: ['Add your achievements here']
        }
    ],
    education: [
        {
            _id: 'temp-1',
            degree: 'Degree',
            institution: 'University Name',
            startDate: 'YYYY',
            endDate: 'YYYY',
            gpa: 'GPA'
        }
    ],
    skills: {
        technical: ['Skill 1', 'Skill 2', 'Skill 3']
    }
};

const ResumeWorkspace = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Core State
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Debounce timer ref
    const saveTimeoutRef = useRef(null);
    const initialLoadDone = useRef(false);

    // UI State
    const [rightPanelOpen, setRightPanelOpen] = useState(true);
    const [leftPanelOpen, setLeftPanelOpen] = useState(true);
    const [previewMode, setPreviewMode] = useState(false);
    const [docSettings, setDocSettings] = useState({ font: 'inter', color: '#141210', margin: 'normal', spacing: 'normal' });

    // 1. Fetch data on mount
    useEffect(() => {
        const fetchResume = async () => {
            if (id && id !== 'new') {
                try {
                    const data = await resumeService.getResumeById(id);
                    setResumeData(data.data);
                } catch (error) {
                    console.error('Error fetching resume:', error);
                    // fallback to default if error
                    setResumeData(JSON.parse(JSON.stringify(defaultResume)));
                }
            } else {
                setResumeData(JSON.parse(JSON.stringify(defaultResume)));
            }
            setLoading(false);
            initialLoadDone.current = true;
        };
        fetchResume();
    }, [id]);

    // 2. Auto-save hook
    useEffect(() => {
        if (!initialLoadDone.current || !resumeData) return;

        // Clear previous timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // Set new timeout for auto-save (2 seconds after last keystroke)
        saveTimeoutRef.current = setTimeout(async () => {
            setSaving(true);
            try {
                // Remove temp IDs before sending to backend if it's a new item
                const payload = { ...resumeData };
                payload.experience = payload.experience.map(e => e._id?.startsWith('temp') ? { ...e, _id: undefined } : e);
                payload.education = payload.education.map(e => e._id?.startsWith('temp') ? { ...e, _id: undefined } : e);

                if (id && id !== 'new') {
                    // Update existing
                    await resumeService.updateResume(id, payload);
                } else {
                    // Create new and update URL
                    const created = await resumeService.createResume(payload);
                    navigate(`/resumes/${created.data._id}`, { replace: true });
                }
            } catch (error) {
                console.error("Auto-save failed:", error);
            } finally {
                setSaving(false);
            }
        }, 2000);

        return () => clearTimeout(saveTimeoutRef.current);
    }, [resumeData, id, navigate]);

    // Handlers for state updates
    const updatePersonalInfo = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const updateExperience = (index, field, value) => {
        setResumeData(prev => {
            const exp = [...prev.experience];
            exp[index] = { ...exp[index], [field]: value };
            return { ...prev, experience: exp };
        });
    };

    const updateExperienceAchievement = (expIndex, achIndex, value) => {
        setResumeData(prev => {
            const exp = [...prev.experience];
            const achievements = [...exp[expIndex].achievements];
            achievements[achIndex] = value;
            exp[expIndex] = { ...exp[expIndex], achievements };
            return { ...prev, experience: exp };
        });
    };

    const addExperienceAchievement = (expIndex) => {
        setResumeData(prev => {
            const exp = [...prev.experience];
            exp[expIndex].achievements.push('New achievement');
            return { ...prev, experience: exp };
        });
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { _id: `temp-${Date.now()}`, position: 'Role', company: 'Company', startDate: 'YYYY', endDate: 'YYYY', achievements: [''] }]
        }));
    };

    const updateEducation = (index, field, value) => {
        setResumeData(prev => {
            const edu = [...prev.education];
            edu[index] = { ...edu[index], [field]: value };
            return { ...prev, education: edu };
        });
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { _id: `temp-${Date.now()}`, degree: 'Degree', institution: 'Institution', startDate: 'YYYY', endDate: 'YYYY' }]
        }));
    };

    if (loading || !resumeData) {
        return <div className="h-screen flex items-center justify-center bg-surface-1 font-sans"><Loader2 className="w-8 h-8 text-ink/40 animate-spin" /></div>;
    }

    return (
        <div className="h-screen flex flex-col font-sans bg-surface-1 overflow-hidden animate-[fadeInScale_300ms_ease-out] print:bg-white print:h-auto" style={{ '--doc-color': docSettings.color }}>
            {/* TOP BAR */}
            <header className="h-[52px] bg-white border-b border-ink/5 px-4 flex items-center justify-between shrink-0 z-10 print:hidden">
                <div className="flex flex-1 items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="text-[13px] text-ink/60 hover:text-ink flex items-center gap-1.5 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Dashboard
                    </button>
                </div>
                
                <div className="flex-1 flex justify-center">
                    <input 
                        type="text" 
                        value={resumeData.title}
                        onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
                        className="font-serif text-[16px] text-ink text-center bg-transparent border-b border-transparent hover:border-ink/20 focus:border-accent focus:outline-none px-2 py-1 transition-colors w-64"
                        placeholder="Resume Title"
                    />
                </div>
                
                <div className="flex flex-1 items-center justify-end gap-4">
                    <div className="flex items-center gap-2 text-[12px] text-ink/40">
                        {saving ? (
                            <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
                        ) : (
                            <><Check className="w-3 h-3" /> Saved</>
                        )}
                    </div>
                    <button 
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`btn-ghost text-[13px] h-[32px] px-3 font-medium ${previewMode ? 'bg-ink/5 text-ink' : ''}`}
                    >
                        {previewMode ? 'Exit Preview' : 'Preview'}
                    </button>
                    <button 
                        onClick={() => window.print()}
                        className="btn-primary text-[13px] h-[32px] px-4 rounded-lg flex items-center gap-2 font-medium"
                    >
                        <Download className="w-4 h-4" /> PDF
                    </button>
                    <div className="w-px h-4 bg-ink/10 mx-2" />
                    <button 
                        onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                        className={`p-2 rounded-lg transition-colors ${leftPanelOpen ? 'text-ink bg-surface-2' : 'text-ink/60 hover:bg-surface-2'}`}
                        title="Toggle Layout Panel"
                    >
                        <Layout className="w-4 h-4" />
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden print:overflow-visible">
                {/* LEFT PANEL */}
                {leftPanelOpen && !previewMode && (
                <aside className="w-[240px] bg-white border-r border-ink/5 flex flex-col shrink-0 z-10 print:hidden animate-[slideInLeft_300ms_ease-out]">
                    <div className="p-4 flex-1 overflow-y-auto hide-scrollbar">
                        <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-ink/40 mb-4">Sections</h3>
                        <div className="space-y-1 mb-4">
                            {['Contact', 'Experience', 'Education', 'Skills'].map(sec => (
                                <div key={sec} className="group flex items-center gap-2 p-2 hover:bg-surface-2 rounded-lg cursor-pointer">
                                    <GripVertical className="w-3.5 h-3.5 text-ink/20 group-hover:text-ink/40 transition-colors" />
                                    <span className="text-[14px] text-ink flex-1">{sec}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={addExperience} className="text-[13px] text-ink/60 hover:text-ink font-medium flex items-center gap-1.5 p-2 transition-colors">
                                <Plus className="w-4 h-4" /> Add Experience
                            </button>
                            <button onClick={addEducation} className="text-[13px] text-ink/60 hover:text-ink font-medium flex items-center gap-1.5 p-2 transition-colors">
                                <Plus className="w-4 h-4" /> Add Education
                            </button>
                        </div>

                        <div className="mt-8 border-t border-ink/5 pt-6">
                            <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-ink/40 mb-4">Document Style</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-[12px] font-medium text-ink/80 block mb-2">Font</label>
                                    <select 
                                        className="w-full h-[36px] text-[13px] border border-ink/10 rounded-lg px-2 bg-white appearance-none cursor-pointer"
                                        value={docSettings.font}
                                        onChange={(e) => setDocSettings({...docSettings, font: e.target.value})}
                                    >
                                        <option value="font-serif">Classic (Playfair)</option>
                                        <option value="font-sans">Modern (Inter)</option>
                                        <option value="font-mono">Technical (Mono)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[12px] font-medium text-ink/80 block mb-2">Color accent</label>
                                    <div className="flex gap-2">
                                        {['#141210', '#2B5BA8', '#2D6A4F', '#92622A', '#6B2B85'].map(color => (
                                            <button 
                                                key={color} 
                                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${docSettings.color === color ? 'ring-2 ring-offset-1 ring-ink/50' : ''}`} 
                                                style={{backgroundColor: color}}
                                                onClick={() => setDocSettings({...docSettings, color})}
                                            >
                                                {docSettings.color === color && <Check className="w-3 h-3 text-white" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[12px] font-medium text-ink/80 block mb-2">Page margins</label>
                                    <input 
                                        type="range" 
                                        className="w-full cursor-pointer" 
                                        min="0" max="2" 
                                        value={docSettings.margin === 'narrow' ? 0 : docSettings.margin === 'normal' ? 1 : 2}
                                        onChange={(e) => setDocSettings({...docSettings, margin: e.target.value === '0' ? 'narrow' : e.target.value === '1' ? 'normal' : 'wide'})}
                                    />
                                    <div className="flex justify-between text-[11px] text-ink/40 mt-1">
                                        <span>Narrow</span><span>Normal</span><span>Wide</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[12px] font-medium text-ink/80 block mb-2">Line spacing</label>
                                    <input 
                                        type="range" 
                                        className="w-full cursor-pointer" 
                                        min="0" max="2" 
                                        value={docSettings.spacing === 'compact' ? 0 : docSettings.spacing === 'normal' ? 1 : 2}
                                        onChange={(e) => setDocSettings({...docSettings, spacing: e.target.value === '0' ? 'compact' : e.target.value === '1' ? 'normal' : 'loose'})}
                                    />
                                    <div className="flex justify-between text-[11px] text-ink/40 mt-1">
                                        <span>Compact</span><span>Normal</span><span>Loose</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                )}

                {/* CENTER CANVAS */}
                <main className="flex-1 bg-[#ECEAE4] overflow-y-auto flex justify-center py-12 px-8 relative hide-scrollbar print:bg-white print:p-0 print:overflow-visible">
                    <div className={`w-[794px] min-h-[1123px] shrink-0 bg-white shadow-[0_8px_40px_rgba(20,18,16,0.12)] rounded-[2px] ${docSettings.margin === 'narrow' ? 'p-10' : docSettings.margin === 'wide' ? 'p-20' : 'p-16'} transition-all relative group ${docSettings.font} print:shadow-none print:m-0 ${previewMode ? 'pointer-events-none' : ''}`}>
                        
                        {/* HEADER - Personal Info */}
                        <div className="mb-8 border border-transparent hover:border-ink/10 p-4 -m-4 rounded transition-colors group/section">
                            <EditableField 
                                value={resumeData.personalInfo?.fullName || ''} 
                                onChange={(val) => updatePersonalInfo('fullName', val)} 
                                className={`text-[42px] text-ink leading-tight text-center w-full ${docSettings.font}`}
                                placeholder="Your Name"
                            />
                            <div className="flex flex-wrap items-center justify-center gap-2 text-[14px] text-ink/80 mt-2 tracking-wide">
                                <EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="Location" className="text-center w-auto inline-block min-w-[100px]" /> • 
                                <EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="Email" className="text-center w-auto inline-block min-w-[150px]" /> • 
                                <EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="Phone" className="text-center w-auto inline-block min-w-[120px]" /> • 
                                <EditableField value={resumeData.personalInfo?.linkedin || ''} onChange={(val) => updatePersonalInfo('linkedin', val)} placeholder="LinkedIn" className="text-center w-auto inline-block min-w-[150px]" />
                            </div>
                        </div>
                        
                        {/* EXPERIENCE */}
                        <div className="mb-6 border border-transparent hover:border-ink/10 p-4 -m-4 rounded transition-colors group/section">
                            <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider border-b border-ink/8 pb-2 mb-4" style={{color: 'var(--doc-color)'}}>Experience</h2>
                            
                            {resumeData.experience.map((exp, expIndex) => (
                                <div key={exp._id || expIndex} className="mb-6 group/exp relative">
                                    <button 
                                        className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                        onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-ink text-[15px] flex items-center gap-1 flex-1">
                                            <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} className="font-semibold text-[15px]" />
                                            <span className="font-normal text-ink/60 mx-1">at</span>
                                            <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="text-ink/60" />
                                        </h3>
                                        <div className="flex items-center gap-1 text-[13px] text-ink/60 shrink-0 w-32 justify-end">
                                            <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="text-right w-12" /> - 
                                            <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="text-left w-14" />
                                        </div>
                                    </div>
                                    <ul className={`mt-2 ${docSettings.spacing === 'compact' ? 'space-y-0.5' : docSettings.spacing === 'loose' ? 'space-y-2.5' : 'space-y-1.5'} text-[14px] text-ink/80`}>
                                        {exp.achievements?.map((ach, achIndex) => (
                                            <li key={achIndex} className="flex items-start gap-2 group/ach relative">
                                                <span className="text-[8px] mt-1.5 opacity-60" style={{color: 'var(--doc-color)'}}>▪</span> 
                                                <EditableField 
                                                    value={ach} 
                                                    onChange={(v) => updateExperienceAchievement(expIndex, achIndex, v)} 
                                                    multiline 
                                                    className="flex-1"
                                                />
                                                <button 
                                                    className="absolute -left-5 top-1 p-0.5 text-status-error opacity-0 group-hover/ach:opacity-100 transition-opacity print:hidden pointer-events-auto"
                                                    onClick={() => setResumeData(prev => {
                                                        const nExp = [...prev.experience];
                                                        nExp[expIndex].achievements = nExp[expIndex].achievements.filter((_, i) => i !== achIndex);
                                                        return {...prev, experience: nExp};
                                                    })}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </li>
                                        ))}
                                        <li className="opacity-0 group-hover/exp:opacity-100 transition-opacity mt-1 print:hidden pointer-events-auto">
                                            <button onClick={() => addExperienceAchievement(expIndex)} className="text-[11px] text-ink/40 hover:text-ink flex items-center gap-1">
                                                <Plus className="w-3 h-3" /> Add bullet
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* EDUCATION */}
                        <div className="mb-6 border border-transparent hover:border-ink/10 p-4 -m-4 rounded transition-colors group/section">
                            <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider border-b border-ink/8 pb-2 mb-4" style={{color: 'var(--doc-color)'}}>Education</h2>
                            {resumeData.education.map((edu, eduIndex) => (
                                <div key={edu._id || eduIndex} className="mb-4 group/edu relative">
                                    <button 
                                        className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/edu:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                        onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter((_, i) => i !== eduIndex)}))}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-ink text-[15px] flex-1 flex items-center">
                                            <EditableField value={edu.degree} onChange={(v) => updateEducation(eduIndex, 'degree', v)} className="font-semibold text-[15px]" />
                                            <span className="font-normal text-ink/60 mx-1">at</span>
                                            <EditableField value={edu.institution} onChange={(v) => updateEducation(eduIndex, 'institution', v)} className="text-ink/60" />
                                        </h3>
                                        <div className="flex items-center gap-1 text-[13px] text-ink/60 shrink-0 w-32 justify-end">
                                            <EditableField value={edu.startDate} onChange={(v) => updateEducation(eduIndex, 'startDate', v)} className="text-right w-12" /> - 
                                            <EditableField value={edu.endDate} onChange={(v) => updateEducation(eduIndex, 'endDate', v)} className="text-left w-14" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-[14px] text-ink/80">
                                        <EditableField value={edu.gpa} onChange={(v) => updateEducation(eduIndex, 'gpa', v)} placeholder="GPA / Details" className="w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* SKILLS */}
                        <div className="mb-6 border border-transparent hover:border-ink/10 p-4 -m-4 rounded transition-colors group/section">
                            <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider border-b border-ink/8 pb-2 mb-4" style={{color: 'var(--doc-color)'}}>Skills</h2>
                            <p className="text-[14px] text-ink/80 leading-relaxed flex items-start gap-2">
                                <span className="font-semibold text-ink shrink-0">Technical:</span> 
                                <EditableField 
                                    value={resumeData.skills?.technical?.join(', ') || ''} 
                                    onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split(', ')}}))} 
                                    multiline 
                                    className="flex-1" 
                                    placeholder="Comma separated skills"
                                />
                            </p>
                        </div>
                    </div>
                </main>

                {/* RIGHT PANEL (AI/ATS) */}
                {rightPanelOpen && !previewMode && (
                    <aside className="w-[300px] bg-white border-l border-ink/5 flex flex-col shrink-0 z-10 animate-[slideInRight_300ms_ease-out] print:hidden">
                        <div className="p-6 border-b border-ink/5 bg-surface-1/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[14px] font-semibold text-ink">ATS Live Score</h3>
                                <button onClick={() => setRightPanelOpen(false)} className="text-ink/40 hover:text-ink transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="font-serif text-[42px] text-status-success leading-none tracking-tight">82</span>
                                <span className="text-[13px] text-ink/40 font-medium uppercase tracking-wider">/ 100</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-status-success rounded-full" style={{width: '82%', backgroundColor: docSettings.color !== '#141210' ? docSettings.color : undefined}} />
                            </div>
                            <div className="text-[12px] text-ink/60">Based on your current content</div>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
                            <h3 className="text-[14px] font-semibold text-ink mb-5 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-accent" /> AI Suggestions
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-white border border-ink/5 border-l-[3px] border-l-accent rounded-xl p-4 shadow-sm">
                                    <div className="inline-block px-2 py-1 bg-surface-2 rounded text-[10px] font-semibold uppercase tracking-wider text-ink/60 mb-3">
                                        Bullet enhancement
                                    </div>
                                    <p className="text-[13px] text-ink mb-4 leading-relaxed">
                                        Instead of "Improved performance", try: <span className="font-medium bg-accent/5 px-1 py-0.5 rounded text-accent">"Decreased bundle size by 40%, improving TTI by 1.2s"</span>
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button className="bg-accent text-white h-[28px] px-3 text-[12px] rounded-lg font-medium hover:brightness-95 transition-all">Apply</button>
                                        <button className="bg-surface-2 text-ink/60 hover:text-ink h-[28px] px-3 text-[12px] rounded-lg font-medium transition-all">Dismiss</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Floating AI Button */}
                {!rightPanelOpen && !previewMode && (
                    <button 
                        onClick={() => setRightPanelOpen(true)}
                        className="absolute right-6 top-20 w-12 h-12 bg-white rounded-full shadow-lg border border-ink/5 flex items-center justify-center text-accent hover:scale-105 transition-transform z-20 group print:hidden"
                    >
                        <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ResumeWorkspace;
