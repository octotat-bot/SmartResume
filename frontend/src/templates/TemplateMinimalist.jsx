import React from 'react';
import { X, Plus } from 'lucide-react';
import EditableField from '../components/EditableField';

const TemplateMinimalist = ({ 
    resumeData, setResumeData, updatePersonalInfo, updateExperience, 
    addExperienceAchievement, updateEducation, docSettings, previewMode
}) => {
    return (
        <div className={`w-[794px] min-h-[1123px] shrink-0 bg-white shadow-[0_8px_40px_rgba(20,18,16,0.12)] ${docSettings.margin === 'narrow' ? 'p-10' : docSettings.margin === 'wide' ? 'p-20' : 'p-16'} transition-all relative group ${docSettings.font} print:shadow-none print:m-0 ${previewMode ? 'pointer-events-none' : ''}`}>
            
            <div className="mb-12 group/section">
                <EditableField 
                    value={resumeData.personalInfo?.fullName || ''} 
                    onChange={(val) => updatePersonalInfo('fullName', val)} 
                    className="text-[32px] text-ink leading-tight w-full font-light tracking-wide"
                    placeholder="Your Name" readOnly={previewMode}
                />
                <div className="flex flex-wrap gap-4 text-[12px] text-ink/60 mt-1">
                    <EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="Email" className="w-auto inline-block min-w-[150px]" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="Phone" className="w-auto inline-block min-w-[120px]" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="Location" className="w-auto inline-block min-w-[100px]" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.linkedin || ''} onChange={(val) => updatePersonalInfo('linkedin', val)} placeholder="LinkedIn" className="w-auto inline-block min-w-[150px]" readOnly={previewMode} />
                </div>
            </div>
            
            <div className="grid grid-cols-[120px_1fr] gap-8 mb-8 group/section relative">
                <h2 className="text-[12px] uppercase tracking-widest text-ink/40 pt-1" style={{color: 'var(--doc-color)'}}>Experience</h2>
                <div>
                    {resumeData.experience?.map((exp, expIndex) => (
                        <div key={exp._id || expIndex} className="mb-8 group/exp relative">
                            <button 
                                className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}
                            ><X className="w-4 h-4" /></button>
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="font-medium text-ink text-[14px]">
                                    <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} readOnly={previewMode} />
                                    <span className="text-ink/40 mx-2">/</span>
                                    <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="text-ink/60" readOnly={previewMode} />
                                </h3>
                                <div className="text-[12px] text-ink/40">
                                    <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="text-right w-10" readOnly={previewMode} /> - <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="text-left w-12" readOnly={previewMode} />
                                </div>
                            </div>
                            <ul className={`text-[13px] text-ink/70 leading-relaxed ${docSettings.spacing === 'compact' ? 'space-y-1' : docSettings.spacing === 'loose' ? 'space-y-3' : 'space-y-2'}`}>
                                {exp.achievements?.map((ach, achIndex) => (
                                    <li key={achIndex} className="flex items-start gap-3 group/ach relative">
                                        <EditableField value={ach} onChange={(v) => updateExperience(expIndex, 'achievements', exp.achievements.map((a, i) => i === achIndex ? v : a))} multiline className="flex-1" readOnly={previewMode} />
                                        <button className="absolute -left-5 top-1 p-0.5 text-status-error opacity-0 group-hover/ach:opacity-100 print:hidden pointer-events-auto"
                                            onClick={() => setResumeData(prev => {
                                                const nExp = [...prev.experience];
                                                nExp[expIndex].achievements = nExp[expIndex].achievements.filter((_, i) => i !== achIndex);
                                                return {...prev, experience: nExp};
                                            })}><X className="w-3 h-3" /></button>
                                    </li>
                                ))}
                                <li className="opacity-0 group-hover/exp:opacity-100 mt-1 print:hidden pointer-events-auto">
                                    <button onClick={() => addExperienceAchievement(expIndex)} className="text-[11px] text-ink/40 hover:text-ink flex items-center gap-1"><Plus className="w-3 h-3" /> Add bullet</button>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-8 mb-8 group/section relative">
                <h2 className="text-[12px] uppercase tracking-widest text-ink/40 pt-1" style={{color: 'var(--doc-color)'}}>Education</h2>
                <div>
                    {resumeData.education?.map((edu, eduIndex) => (
                        <div key={edu._id || eduIndex} className="mb-4 group/edu relative">
                            <button className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/edu:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter((_, i) => i !== eduIndex)}))}><X className="w-4 h-4" /></button>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-medium text-ink text-[14px]">
                                    <EditableField value={edu.degree} onChange={(v) => updateEducation(eduIndex, 'degree', v)} readOnly={previewMode} />
                                    <span className="text-ink/40 mx-2">/</span>
                                    <EditableField value={edu.institution} onChange={(v) => updateEducation(eduIndex, 'institution', v)} className="text-ink/60" readOnly={previewMode} />
                                </h3>
                                <div className="text-[12px] text-ink/40">
                                    <EditableField value={edu.startDate} onChange={(v) => updateEducation(eduIndex, 'startDate', v)} className="text-right w-10" readOnly={previewMode} /> - <EditableField value={edu.endDate} onChange={(v) => updateEducation(eduIndex, 'endDate', v)} className="text-left w-12" readOnly={previewMode} />
                                </div>
                            </div>
                            <EditableField value={edu.gpa} onChange={(v) => updateEducation(eduIndex, 'gpa', v)} placeholder="GPA / Details" className="w-full text-[13px] text-ink/70" readOnly={previewMode} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] gap-8 group/section relative">
                <h2 className="text-[12px] uppercase tracking-widest text-ink/40 pt-1" style={{color: 'var(--doc-color)'}}>Skills</h2>
                <div className="text-[13px] text-ink/70 leading-relaxed">
                    <EditableField value={resumeData.skills?.technical?.join(', ') || ''} onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split(', ')}}))} multiline className="w-full" placeholder="Comma separated skills" readOnly={previewMode} />
                </div>
            </div>
        </div>
    );
};

export default TemplateMinimalist;
