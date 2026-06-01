import React from 'react';
import { X, Plus } from 'lucide-react';
import EditableField from '../components/EditableField';

const TemplateCreative = ({ 
    resumeData, setResumeData, updatePersonalInfo, updateExperience, 
    addExperienceAchievement, updateEducation, docSettings, previewMode
}) => {
    return (
        <div className={`w-[794px] min-h-[1123px] shrink-0 bg-white shadow-[0_8px_40px_rgba(20,18,16,0.12)] transition-all relative group ${docSettings.font} print:shadow-none print:m-0 flex flex-col ${previewMode ? 'pointer-events-none' : ''}`}>
            
            {/* HEADER - Solid Background */}
            <div className="px-16 py-12 text-white print:text-black shrink-0 relative group/section" style={{backgroundColor: docSettings.color !== '#141210' ? docSettings.color : '#2B5BA8'}}>
                <EditableField 
                    value={resumeData.personalInfo?.fullName || ''} 
                    onChange={(val) => updatePersonalInfo('fullName', val)} 
                    className="text-[48px] leading-tight w-full font-black tracking-tight"
                    placeholder="Your Name" readOnly={previewMode}
                />
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] mt-4 opacity-90 print:opacity-100">
                    <EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="Location" className="w-auto inline-block min-w-[100px]" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="Email" className="w-auto inline-block min-w-[150px]" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="Phone" className="w-auto inline-block min-w-[120px]" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.linkedin || ''} onChange={(val) => updatePersonalInfo('linkedin', val)} placeholder="LinkedIn" className="w-auto inline-block min-w-[150px]" readOnly={previewMode} />
                </div>
            </div>

            <div className={`flex-1 flex ${docSettings.margin === 'narrow' ? 'p-10' : docSettings.margin === 'wide' ? 'p-20' : 'p-16'} pt-12 gap-12`}>
                <div className="w-[30%] shrink-0">
                    {/* SKILLS */}
                    <div className="mb-10 group/section">
                        <h2 className="text-[18px] font-bold text-ink mb-6 pb-2 border-b-2" style={{borderColor: docSettings.color !== '#141210' ? docSettings.color : '#2B5BA8'}}>Expertise</h2>
                        <div className="text-[14px] text-ink/70 leading-loose">
                            <EditableField value={resumeData.skills?.technical?.join('\\n') || ''} onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split('\\n')}}))} multiline className="w-full font-medium" placeholder="Skills" readOnly={previewMode} />
                        </div>
                    </div>

                    {/* EDUCATION */}
                    <div className="group/section">
                        <h2 className="text-[18px] font-bold text-ink mb-6 pb-2 border-b-2" style={{borderColor: docSettings.color !== '#141210' ? docSettings.color : '#2B5BA8'}}>Education</h2>
                        {resumeData.education?.map((edu, eduIndex) => (
                            <div key={edu._id || eduIndex} className="mb-6 group/edu relative">
                                <button className="absolute -left-8 top-0 p-1 text-status-error opacity-0 group-hover/edu:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                    onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter((_, i) => i !== eduIndex)}))}><X className="w-3 h-3" /></button>
                                <EditableField value={edu.degree} onChange={(v) => updateEducation(eduIndex, 'degree', v)} className="font-bold text-ink text-[14px] block mb-1" readOnly={previewMode} />
                                <EditableField value={edu.institution} onChange={(v) => updateEducation(eduIndex, 'institution', v)} className="text-[13px] text-ink/70 block mb-2" readOnly={previewMode} />
                                <div className="text-[12px] font-bold" style={{color: docSettings.color !== '#141210' ? docSettings.color : '#2B5BA8'}}>
                                    <EditableField value={edu.startDate} onChange={(v) => updateEducation(eduIndex, 'startDate', v)} className="w-10 text-right inline-block" readOnly={previewMode} /> – <EditableField value={edu.endDate} onChange={(v) => updateEducation(eduIndex, 'endDate', v)} className="w-10 inline-block" readOnly={previewMode} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-[70%]">
                    {/* EXPERIENCE */}
                    <div className="group/section">
                        <h2 className="text-[24px] font-bold text-ink mb-8 pb-2 border-b-2" style={{borderColor: docSettings.color !== '#141210' ? docSettings.color : '#2B5BA8'}}>Experience</h2>
                        
                        {resumeData.experience?.map((exp, expIndex) => (
                            <div key={exp._id || expIndex} className="mb-8 group/exp relative">
                                <button className="absolute -left-8 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                    onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}><X className="w-4 h-4" /></button>
                                
                                <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} className="font-bold text-[18px] text-ink block w-full mb-1" readOnly={previewMode} />
                                
                                <div className="flex justify-between items-center mb-3">
                                    <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="text-[15px] font-medium" style={{color: docSettings.color !== '#141210' ? docSettings.color : '#2B5BA8'}} readOnly={previewMode} />
                                    <div className="text-[13px] text-ink/50 font-bold bg-surface-2 px-3 py-1 rounded-full">
                                        <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="text-right w-12" readOnly={previewMode} /> - <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="text-left w-14" readOnly={previewMode} />
                                    </div>
                                </div>
                                
                                <ul className={`mt-3 ${docSettings.spacing === 'compact' ? 'space-y-1' : docSettings.spacing === 'loose' ? 'space-y-3' : 'space-y-2'} text-[14px] text-ink/70`}>
                                    {exp.achievements?.map((ach, achIndex) => (
                                        <li key={achIndex} className="flex items-start gap-3 group/ach relative">
                                            <span className="text-[18px] leading-none" style={{color: docSettings.color !== '#141210' ? docSettings.color : '#2B5BA8'}}>•</span> 
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
        </div>
    );
};

export default TemplateCreative;
