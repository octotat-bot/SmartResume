import React from 'react';
import { X, Plus } from 'lucide-react';
import EditableField from '../components/EditableField';

const TemplateClassic = ({ 
    resumeData, setResumeData, updatePersonalInfo, updateExperience, 
    addExperienceAchievement, updateEducation, docSettings, previewMode
}) => {
    return (
        <div className={`w-[794px] min-h-[1123px] shrink-0 bg-white shadow-[0_8px_40px_rgba(20,18,16,0.12)] ${docSettings.margin === 'narrow' ? 'p-10' : docSettings.margin === 'wide' ? 'p-20' : 'p-16'} transition-all relative group font-serif print:shadow-none print:m-0 ${previewMode ? 'pointer-events-none' : ''}`}>
            
            {/* HEADER - Personal Info */}
            <div className="mb-6 border border-transparent hover:border-ink/10 p-4 -m-4 rounded transition-colors group/section border-b-2" style={{borderBottomColor: 'var(--doc-color)'}}>
                <EditableField 
                    value={resumeData.personalInfo?.fullName || ''} 
                    onChange={(val) => updatePersonalInfo('fullName', val)} 
                    className="text-[48px] text-ink leading-none text-center w-full uppercase tracking-widest font-bold"
                    placeholder="Your Name" readOnly={previewMode}
                />
                <div className="flex flex-wrap items-center justify-center gap-2 text-[13px] text-ink/80 mt-4 tracking-wider uppercase font-sans">
                    <EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="Location" className="text-center w-auto inline-block min-w-[100px]" readOnly={previewMode} /> | 
                    <EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="Email" className="text-center w-auto inline-block min-w-[150px]" readOnly={previewMode} /> | 
                    <EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="Phone" className="text-center w-auto inline-block min-w-[120px]" readOnly={previewMode} /> | 
                    <EditableField value={resumeData.personalInfo?.linkedin || ''} onChange={(val) => updatePersonalInfo('linkedin', val)} placeholder="LinkedIn" className="text-center w-auto inline-block min-w-[150px]" readOnly={previewMode} />
                </div>
            </div>
            
            {/* EXPERIENCE */}
            <div className="mb-6 border border-transparent hover:border-ink/10 p-4 -m-4 rounded transition-colors group/section">
                <h2 className="text-[18px] font-bold text-ink uppercase tracking-widest mb-4 text-center">Professional Experience</h2>
                
                {resumeData.experience?.map((exp, expIndex) => (
                    <div key={exp._id || expIndex} className="mb-6 group/exp relative">
                        <button 
                            className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                            onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="flex justify-between items-baseline mb-1 border-b border-ink/10 pb-1">
                            <h3 className="font-bold text-ink text-[16px] flex items-center gap-1 flex-1">
                                <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} className="font-bold uppercase tracking-wider text-[14px]" readOnly={previewMode} />
                                <span className="font-normal text-ink/40 mx-2">|</span>
                                <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="italic text-ink/80" readOnly={previewMode} />
                            </h3>
                            <div className="flex items-center gap-1 text-[13px] text-ink/80 shrink-0 w-32 justify-end italic">
                                <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="text-right w-12" readOnly={previewMode} /> - 
                                <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="text-left w-14" readOnly={previewMode} />
                            </div>
                        </div>
                        <ul className={`mt-3 ${docSettings.spacing === 'compact' ? 'space-y-0.5' : docSettings.spacing === 'loose' ? 'space-y-2.5' : 'space-y-1.5'} text-[14px] text-ink/90 font-sans`}>
                            {exp.achievements?.map((ach, achIndex) => (
                                <li key={achIndex} className="flex items-start gap-2 group/ach relative">
                                    <span className="text-[14px] leading-none mt-1 opacity-60">•</span> 
                                    <EditableField 
                                        value={ach} 
                                        onChange={(v) => updateExperience(expIndex, 'achievements', exp.achievements.map((a, i) => i === achIndex ? v : a))} 
                                        multiline 
                                        className="flex-1"
                                        readOnly={previewMode}
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
                <h2 className="text-[18px] font-bold text-ink uppercase tracking-widest mb-4 text-center">Education</h2>
                {resumeData.education?.map((edu, eduIndex) => (
                    <div key={edu._id || eduIndex} className="mb-4 group/edu relative">
                        <button 
                            className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/edu:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                            onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter((_, i) => i !== eduIndex)}))}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="flex justify-between items-baseline mb-1 border-b border-ink/10 pb-1">
                            <h3 className="font-bold text-ink text-[16px] flex-1 flex items-center">
                                <EditableField value={edu.degree} onChange={(v) => updateEducation(eduIndex, 'degree', v)} className="font-bold uppercase tracking-wider text-[14px]" readOnly={previewMode} />
                                <span className="font-normal text-ink/40 mx-2">|</span>
                                <EditableField value={edu.institution} onChange={(v) => updateEducation(eduIndex, 'institution', v)} className="italic text-ink/80" readOnly={previewMode} />
                            </h3>
                            <div className="flex items-center gap-1 text-[13px] text-ink/80 shrink-0 w-32 justify-end italic">
                                <EditableField value={edu.startDate} onChange={(v) => updateEducation(eduIndex, 'startDate', v)} className="text-right w-12" readOnly={previewMode} /> - 
                                <EditableField value={edu.endDate} onChange={(v) => updateEducation(eduIndex, 'endDate', v)} className="text-left w-14" readOnly={previewMode} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-[14px] text-ink/80 font-sans mt-2">
                            <EditableField value={edu.gpa} onChange={(v) => updateEducation(eduIndex, 'gpa', v)} placeholder="GPA / Details" className="w-full" readOnly={previewMode} />
                        </div>
                    </div>
                ))}
            </div>

            {/* SKILLS */}
            <div className="mb-6 border border-transparent hover:border-ink/10 p-4 -m-4 rounded transition-colors group/section">
                <h2 className="text-[18px] font-bold text-ink uppercase tracking-widest mb-4 text-center">Skills & Expertise</h2>
                <p className="text-[14px] text-ink/90 leading-relaxed flex items-start gap-2 font-sans">
                    <span className="font-bold text-ink shrink-0 uppercase tracking-wide text-[12px] mt-0.5">Technical:</span> 
                    <EditableField 
                        value={resumeData.skills?.technical?.join(', ') || ''} 
                        onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split(', ')}}))} 
                        multiline 
                        className="flex-1" 
                        placeholder="Comma separated skills"
                        readOnly={previewMode}
                    />
                </p>
            </div>
        </div>
    );
};

export default TemplateClassic;
