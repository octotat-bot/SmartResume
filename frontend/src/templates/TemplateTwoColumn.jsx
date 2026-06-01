import React from 'react';
import { X, Plus } from 'lucide-react';
import EditableField from '../components/EditableField';

const TemplateTwoColumn = ({ 
    resumeData, setResumeData, updatePersonalInfo, updateExperience, 
    addExperienceAchievement, updateEducation, docSettings, previewMode
}) => {
    return (
        <div className={`w-[794px] min-h-[1123px] shrink-0 bg-white shadow-[0_8px_40px_rgba(20,18,16,0.12)] transition-all relative group ${docSettings.font} print:shadow-none print:m-0 flex ${previewMode ? 'pointer-events-none' : ''}`}>
            
            {/* LEFT COLUMN */}
            <div className="w-[280px] shrink-0 p-10 pr-6 border-r border-ink/5" style={{backgroundColor: `${docSettings.color}0A`}}>
                <div className="mb-10">
                    <EditableField 
                        value={resumeData.personalInfo?.fullName || ''} 
                        onChange={(val) => updatePersonalInfo('fullName', val)} 
                        className="text-[32px] text-ink leading-none w-full font-bold mb-4"
                        placeholder="Your Name" readOnly={previewMode} multiline
                    />
                    <div className="flex flex-col gap-3 text-[13px] text-ink/70">
                        <EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="Email" readOnly={previewMode} />
                        <EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="Phone" readOnly={previewMode} />
                        <EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="Location" readOnly={previewMode} />
                        <EditableField value={resumeData.personalInfo?.linkedin || ''} onChange={(val) => updatePersonalInfo('linkedin', val)} placeholder="LinkedIn" readOnly={previewMode} />
                    </div>
                </div>

                <div className="mb-8 group/section">
                    <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider mb-4 border-b border-ink/10 pb-1" style={{color: 'var(--doc-color)'}}>Education</h2>
                    {resumeData.education?.map((edu, eduIndex) => (
                        <div key={edu._id || eduIndex} className="mb-4 group/edu relative text-[13px]">
                            <button className="absolute -left-8 top-0 p-1 text-status-error opacity-0 group-hover/edu:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter((_, i) => i !== eduIndex)}))}><X className="w-3 h-3" /></button>
                            <EditableField value={edu.degree} onChange={(v) => updateEducation(eduIndex, 'degree', v)} className="font-semibold text-ink block w-full mb-0.5" readOnly={previewMode} />
                            <EditableField value={edu.institution} onChange={(v) => updateEducation(eduIndex, 'institution', v)} className="block w-full text-ink/70" readOnly={previewMode} />
                            <div className="text-ink/50 text-[11px] mt-1">
                                <EditableField value={edu.startDate} onChange={(v) => updateEducation(eduIndex, 'startDate', v)} className="w-10 inline-block text-right" readOnly={previewMode} /> - <EditableField value={edu.endDate} onChange={(v) => updateEducation(eduIndex, 'endDate', v)} className="w-10 inline-block" readOnly={previewMode} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="group/section">
                    <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider mb-4 border-b border-ink/10 pb-1" style={{color: 'var(--doc-color)'}}>Skills</h2>
                    <div className="text-[13px] text-ink/70 leading-relaxed">
                        <EditableField value={resumeData.skills?.technical?.join('\\n') || ''} onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split('\\n')}}))} multiline className="w-full" placeholder="Line separated skills" readOnly={previewMode} />
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 p-10 pl-8">
                <div className="mb-6 group/section">
                    <h2 className="text-[16px] font-bold text-ink uppercase tracking-widest mb-6 border-b border-ink/10 pb-2" style={{color: 'var(--doc-color)'}}>Experience</h2>
                    
                    {resumeData.experience?.map((exp, expIndex) => (
                        <div key={exp._id || expIndex} className="mb-8 group/exp relative">
                            <button className="absolute -left-8 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}><X className="w-4 h-4" /></button>
                            
                            <div className="flex justify-between items-baseline mb-2">
                                <div>
                                    <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} className="font-bold text-[15px] block w-full text-ink" readOnly={previewMode} />
                                    <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="text-[14px] text-ink/70" readOnly={previewMode} />
                                </div>
                                <div className="text-[12px] text-ink/50 bg-surface-2 px-2 py-1 rounded">
                                    <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="text-right w-10" readOnly={previewMode} /> - <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="text-left w-10" readOnly={previewMode} />
                                </div>
                            </div>
                            
                            <ul className={`mt-3 ${docSettings.spacing === 'compact' ? 'space-y-1' : docSettings.spacing === 'loose' ? 'space-y-3' : 'space-y-1.5'} text-[13.5px] text-ink/80`}>
                                {exp.achievements?.map((ach, achIndex) => (
                                    <li key={achIndex} className="flex items-start gap-2 group/ach relative">
                                        <span className="text-[14px] mt-0.5 opacity-40" style={{color: 'var(--doc-color)'}}>•</span> 
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateTwoColumn;
