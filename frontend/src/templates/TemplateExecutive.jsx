import React from 'react';
import { X, Plus } from 'lucide-react';
import EditableField from '../components/EditableField';

const TemplateExecutive = ({ 
    resumeData, setResumeData, updatePersonalInfo, updateExperience, 
    addExperienceAchievement, updateEducation, docSettings, previewMode
}) => {
    return (
        <div className={`w-[794px] min-h-[1123px] shrink-0 bg-white shadow-[0_8px_40px_rgba(20,18,16,0.12)] ${docSettings.margin === 'narrow' ? 'p-10' : docSettings.margin === 'wide' ? 'p-20' : 'p-16'} transition-all relative group ${docSettings.font} print:shadow-none print:m-0 ${previewMode ? 'pointer-events-none' : ''}`}>
            
            {/* BORDER WRAPPER */}
            <div className="border-[3px] border-ink p-8 h-full">
                
                {/* HEADER */}
                <div className="mb-10 text-center group/section border-b-2 border-ink pb-8">
                    <EditableField 
                        value={resumeData.personalInfo?.fullName || ''} 
                        onChange={(val) => updatePersonalInfo('fullName', val)} 
                        className="text-[40px] text-ink leading-tight w-full font-black uppercase tracking-tight"
                        placeholder="Your Name" readOnly={previewMode}
                    />
                    <div className="flex justify-center gap-6 text-[11px] text-ink/80 mt-4 uppercase tracking-widest font-bold">
                        <EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="Location" readOnly={previewMode} />
                        <EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="Email" readOnly={previewMode} />
                        <EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="Phone" readOnly={previewMode} />
                    </div>
                </div>
                
                {/* EXPERIENCE */}
                <div className="mb-10 group/section">
                    <h2 className="text-[16px] font-black text-white bg-ink uppercase tracking-widest py-2 px-4 mb-6 inline-block w-full">Executive Experience</h2>
                    
                    {resumeData.experience?.map((exp, expIndex) => (
                        <div key={exp._id || expIndex} className="mb-8 group/exp relative">
                            <button className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}><X className="w-4 h-4" /></button>
                            
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="font-bold text-ink text-[16px]">
                                    <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="font-black text-[18px] block mb-1" readOnly={previewMode} />
                                    <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} className="italic font-normal" readOnly={previewMode} />
                                </h3>
                                <div className="text-[13px] text-ink font-bold shrink-0">
                                    <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="text-right w-12" readOnly={previewMode} /> – <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="text-left w-14" readOnly={previewMode} />
                                </div>
                            </div>
                            <ul className={`mt-3 ${docSettings.spacing === 'compact' ? 'space-y-1' : docSettings.spacing === 'loose' ? 'space-y-3' : 'space-y-1.5'} text-[13px] text-ink/90`}>
                                {exp.achievements?.map((ach, achIndex) => (
                                    <li key={achIndex} className="flex items-start gap-3 group/ach relative pl-2">
                                        <span className="text-[10px] mt-1.5" style={{color: 'var(--doc-color)'}}>■</span> 
                                        <EditableField value={ach} onChange={(v) => updateExperience(expIndex, 'achievements', exp.achievements.map((a, i) => i === achIndex ? v : a))} multiline className="flex-1" readOnly={previewMode} />
                                        <button className="absolute -left-5 top-1 p-0.5 text-status-error opacity-0 group-hover/ach:opacity-100 print:hidden pointer-events-auto"
                                            onClick={() => setResumeData(prev => {
                                                const nExp = [...prev.experience];
                                                nExp[expIndex].achievements = nExp[expIndex].achievements.filter((_, i) => i !== achIndex);
                                                return {...prev, experience: nExp};
                                            })}><X className="w-3 h-3" /></button>
                                    </li>
                                ))}
                                <li className="opacity-0 group-hover/exp:opacity-100 mt-1 print:hidden pointer-events-auto pl-2">
                                    <button onClick={() => addExperienceAchievement(expIndex)} className="text-[11px] text-ink/40 hover:text-ink flex items-center gap-1"><Plus className="w-3 h-3" /> Add directive</button>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>

                {/* EDUCATION & SKILLS */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="group/section">
                        <h2 className="text-[16px] font-black text-white bg-ink uppercase tracking-widest py-2 px-4 mb-6 inline-block w-full">Education</h2>
                        {resumeData.education?.map((edu, eduIndex) => (
                            <div key={edu._id || eduIndex} className="mb-4 group/edu relative">
                                <button className="absolute -left-6 top-0 p-1 text-status-error opacity-0 group-hover/edu:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                    onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter((_, i) => i !== eduIndex)}))}><X className="w-3 h-3" /></button>
                                <EditableField value={edu.degree} onChange={(v) => updateEducation(eduIndex, 'degree', v)} className="font-bold text-ink block mb-0.5" readOnly={previewMode} />
                                <EditableField value={edu.institution} onChange={(v) => updateEducation(eduIndex, 'institution', v)} className="italic text-[13px] block mb-1 text-ink/80" readOnly={previewMode} />
                                <div className="text-[12px] font-bold text-ink/60">
                                    <EditableField value={edu.startDate} onChange={(v) => updateEducation(eduIndex, 'startDate', v)} className="w-10 text-right inline-block" readOnly={previewMode} /> – <EditableField value={edu.endDate} onChange={(v) => updateEducation(eduIndex, 'endDate', v)} className="w-10 inline-block" readOnly={previewMode} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="group/section">
                        <h2 className="text-[16px] font-black text-white bg-ink uppercase tracking-widest py-2 px-4 mb-6 inline-block w-full">Core Competencies</h2>
                        <div className="text-[13px] text-ink/90 leading-relaxed font-bold border-l-2 pl-4" style={{borderColor: 'var(--doc-color)'}}>
                            <EditableField value={resumeData.skills?.technical?.join(' \\n ') || ''} onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split('\\n')}}))} multiline className="w-full" placeholder="Key skills" readOnly={previewMode} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TemplateExecutive;
