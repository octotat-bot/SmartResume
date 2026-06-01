import React from 'react';
import { X, Plus } from 'lucide-react';
import EditableField from '../components/EditableField';

const TemplateTimeline = ({ 
    resumeData, setResumeData, updatePersonalInfo, updateExperience, 
    addExperienceAchievement, updateEducation, docSettings, previewMode
}) => {
    return (
        <div className={`w-[794px] min-h-[1123px] shrink-0 bg-white shadow-[0_8px_40px_rgba(20,18,16,0.12)] ${docSettings.margin === 'narrow' ? 'p-10' : docSettings.margin === 'wide' ? 'p-20' : 'p-16'} transition-all relative group ${docSettings.font} print:shadow-none print:m-0 ${previewMode ? 'pointer-events-none' : ''}`}>
            
            {/* HEADER */}
            <div className="mb-12 border-b-2 border-ink/10 pb-8 group/section">
                <EditableField 
                    value={resumeData.personalInfo?.fullName || ''} 
                    onChange={(val) => updatePersonalInfo('fullName', val)} 
                    className="text-[44px] text-ink leading-tight font-bold tracking-tight mb-2"
                    placeholder="Your Name" readOnly={previewMode}
                />
                <div className="flex flex-wrap gap-4 text-[13px] text-ink/70">
                    <EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="Location" readOnly={previewMode} /> • 
                    <EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="Email" readOnly={previewMode} /> • 
                    <EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="Phone" readOnly={previewMode} /> • 
                    <EditableField value={resumeData.personalInfo?.linkedin || ''} onChange={(val) => updatePersonalInfo('linkedin', val)} placeholder="LinkedIn" readOnly={previewMode} />
                </div>
            </div>
            
            {/* EXPERIENCE (Timeline) */}
            <div className="mb-10 group/section relative">
                <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider mb-6" style={{color: 'var(--doc-color)'}}>Work Experience</h2>
                
                {/* The Timeline Line */}
                <div className="absolute left-[130px] top-[50px] bottom-0 w-[2px] bg-ink/10 print:bg-black/10" />

                {resumeData.experience?.map((exp, expIndex) => (
                    <div key={exp._id || expIndex} className="mb-8 group/exp relative flex items-start gap-8">
                        <button className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                            onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}><X className="w-4 h-4" /></button>
                        
                        {/* Timeline Date (Left) */}
                        <div className="w-[100px] shrink-0 text-right pt-1 relative">
                            <div className="text-[12px] font-bold text-ink/60">
                                <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="w-full text-right" readOnly={previewMode} />
                                <div className="text-center my-0.5">|</div>
                                <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="w-full text-right" readOnly={previewMode} />
                            </div>
                            {/* The Timeline Dot */}
                            <div className="absolute right-[-37px] top-[6px] w-4 h-4 rounded-full border-4 border-white bg-white z-10 shadow-sm" style={{borderColor: docSettings.color !== '#141210' ? docSettings.color : '#000'}} />
                        </div>

                        {/* Content (Right) */}
                        <div className="flex-1 pb-4">
                            <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} className="font-bold text-[16px] text-ink block mb-0.5" readOnly={previewMode} />
                            <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="text-[14px] text-ink/70 font-medium italic mb-2" readOnly={previewMode} />
                            
                            <ul className={`mt-2 ${docSettings.spacing === 'compact' ? 'space-y-1' : docSettings.spacing === 'loose' ? 'space-y-3' : 'space-y-1.5'} text-[13px] text-ink/80`}>
                                {exp.achievements?.map((ach, achIndex) => (
                                    <li key={achIndex} className="flex items-start gap-2 group/ach relative">
                                        <span className="text-[14px] mt-0.5 opacity-40">•</span> 
                                        <EditableField value={ach} onChange={(v) => updateExperience(expIndex, 'achievements', exp.achievements.map((a, i) => i === achIndex ? v : a))} multiline className="flex-1" readOnly={previewMode} />
                                        <button className="absolute -left-5 top-1 p-0.5 text-status-error opacity-0 group-hover/ach:opacity-100 transition-opacity print:hidden pointer-events-auto"
                                            onClick={() => setResumeData(prev => {
                                                const nExp = [...prev.experience];
                                                nExp[expIndex].achievements = nExp[expIndex].achievements.filter((_, i) => i !== achIndex);
                                                return {...prev, experience: nExp};
                                            })}><X className="w-3 h-3" /></button>
                                    </li>
                                ))}
                                <li className="opacity-0 group-hover/exp:opacity-100 transition-opacity mt-1 print:hidden pointer-events-auto">
                                    <button onClick={() => addExperienceAchievement(expIndex)} className="text-[11px] text-ink/40 hover:text-ink flex items-center gap-1"><Plus className="w-3 h-3" /> Add bullet</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* EDUCATION (Timeline) */}
            <div className="mb-10 group/section relative">
                <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider mb-6" style={{color: 'var(--doc-color)'}}>Education</h2>
                
                <div className="absolute left-[130px] top-[50px] bottom-0 w-[2px] bg-ink/10 print:bg-black/10" />

                {resumeData.education?.map((edu, eduIndex) => (
                    <div key={edu._id || eduIndex} className="mb-6 group/edu relative flex items-start gap-8">
                        <button className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/edu:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                            onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter((_, i) => i !== eduIndex)}))}><X className="w-4 h-4" /></button>
                        
                        <div className="w-[100px] shrink-0 text-right pt-1 relative">
                            <div className="text-[12px] font-bold text-ink/60">
                                <EditableField value={edu.startDate} onChange={(v) => updateEducation(eduIndex, 'startDate', v)} className="w-full text-right" readOnly={previewMode} />
                                <div className="text-center my-0.5">|</div>
                                <EditableField value={edu.endDate} onChange={(v) => updateEducation(eduIndex, 'endDate', v)} className="w-full text-right" readOnly={previewMode} />
                            </div>
                            <div className="absolute right-[-37px] top-[6px] w-4 h-4 rounded-full border-4 border-white bg-white z-10 shadow-sm" style={{borderColor: docSettings.color !== '#141210' ? docSettings.color : '#000'}} />
                        </div>

                        <div className="flex-1 pb-4">
                            <EditableField value={edu.degree} onChange={(v) => updateEducation(eduIndex, 'degree', v)} className="font-bold text-[15px] text-ink block mb-0.5" readOnly={previewMode} />
                            <EditableField value={edu.institution} onChange={(v) => updateEducation(eduIndex, 'institution', v)} className="text-[13px] text-ink/70 mb-1 block" readOnly={previewMode} />
                            <EditableField value={edu.gpa} onChange={(v) => updateEducation(eduIndex, 'gpa', v)} placeholder="GPA / Details" className="w-full text-[12px] text-ink/60 italic" readOnly={previewMode} />
                        </div>
                    </div>
                ))}
            </div>

            {/* SKILLS */}
            <div className="group/section relative flex items-start gap-8">
                <h2 className="w-[100px] shrink-0 text-right text-[14px] font-bold text-ink uppercase tracking-wider" style={{color: 'var(--doc-color)'}}>Skills</h2>
                <div className="flex-1 text-[13px] text-ink/80 leading-relaxed">
                    <EditableField value={resumeData.skills?.technical?.join(', ') || ''} onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split(', ')}}))} multiline className="w-full" placeholder="Comma separated skills" readOnly={previewMode} />
                </div>
            </div>
            
        </div>
    );
};

export default TemplateTimeline;
