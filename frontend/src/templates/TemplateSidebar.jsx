import React from 'react';
import { X, Plus } from 'lucide-react';
import EditableField from '../components/EditableField';

const TemplateSidebar = ({ 
    resumeData, setResumeData, updatePersonalInfo, updateExperience, 
    addExperienceAchievement, updateEducation, docSettings, previewMode
}) => {
    return (
        <div className={`w-[794px] min-h-[1123px] shrink-0 bg-white shadow-[0_8px_40px_rgba(20,18,16,0.12)] transition-all relative group ${docSettings.font} print:shadow-none print:m-0 flex ${previewMode ? 'pointer-events-none' : ''}`}>
            
            {/* COLORED SIDEBAR */}
            <div className="w-[260px] shrink-0 p-10 pr-8 text-white print:text-black flex flex-col" style={{backgroundColor: docSettings.color !== '#141210' ? docSettings.color : '#334155'}}>
                
                {/* AVATAR CIRCLE (Placeholder) */}
                <div className="w-24 h-24 rounded-full bg-white/20 print:bg-black/10 mx-auto mb-6 flex items-center justify-center font-bold text-[32px]">
                    {resumeData.personalInfo?.fullName?.charAt(0) || 'A'}
                </div>

                <div className="text-center mb-10 group/section">
                    <EditableField 
                        value={resumeData.personalInfo?.fullName || ''} 
                        onChange={(val) => updatePersonalInfo('fullName', val)} 
                        className="text-[26px] leading-tight w-full font-bold mb-2 block"
                        placeholder="Your Name" readOnly={previewMode} multiline
                    />
                </div>

                <div className="mb-10 group/section space-y-4 text-[13px] opacity-90 print:opacity-100">
                    <h2 className="text-[12px] font-bold uppercase tracking-widest border-b border-white/20 print:border-black/20 pb-1 mb-3">Contact</h2>
                    <EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="Phone" className="block w-full" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="Email" className="block w-full break-all" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="Location" className="block w-full" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.linkedin || ''} onChange={(val) => updatePersonalInfo('linkedin', val)} placeholder="LinkedIn" className="block w-full" readOnly={previewMode} />
                </div>

                <div className="group/section">
                    <h2 className="text-[12px] font-bold uppercase tracking-widest border-b border-white/20 print:border-black/20 pb-1 mb-4">Skills</h2>
                    <div className="text-[13px] opacity-90 print:opacity-100 leading-relaxed">
                        <EditableField value={resumeData.skills?.technical?.join('\\n') || ''} onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split('\\n')}}))} multiline className="w-full" placeholder="Line separated skills" readOnly={previewMode} />
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className={`flex-1 ${docSettings.margin === 'narrow' ? 'p-10' : docSettings.margin === 'wide' ? 'p-16' : 'p-12'}`}>
                
                {/* EXPERIENCE */}
                <div className="mb-10 group/section">
                    <h2 className="text-[18px] font-bold text-ink uppercase tracking-widest mb-6 border-b-2 pb-2" style={{borderColor: docSettings.color !== '#141210' ? docSettings.color : '#334155', color: docSettings.color !== '#141210' ? docSettings.color : undefined}}>Experience</h2>
                    
                    {resumeData.experience?.map((exp, expIndex) => (
                        <div key={exp._id || expIndex} className="mb-8 group/exp relative">
                            <button className="absolute -left-8 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}><X className="w-4 h-4" /></button>
                            
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-ink text-[16px] flex-1">
                                    <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} className="block w-full" readOnly={previewMode} />
                                </h3>
                                <div className="text-[12px] text-ink/60 font-medium shrink-0 ml-4">
                                    <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="text-right w-10" readOnly={previewMode} /> - <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="text-left w-12" readOnly={previewMode} />
                                </div>
                            </div>
                            <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="text-[14px] text-ink/60 font-medium italic mb-2 block" readOnly={previewMode} />
                            
                            <ul className={`mt-3 ${docSettings.spacing === 'compact' ? 'space-y-1' : docSettings.spacing === 'loose' ? 'space-y-3' : 'space-y-2'} text-[13.5px] text-ink/80`}>
                                {exp.achievements?.map((ach, achIndex) => (
                                    <li key={achIndex} className="flex items-start gap-2 group/ach relative">
                                        <span className="text-[14px] mt-0.5 opacity-60" style={{color: docSettings.color !== '#141210' ? docSettings.color : '#334155'}}>•</span> 
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

                {/* EDUCATION */}
                <div className="group/section">
                    <h2 className="text-[18px] font-bold text-ink uppercase tracking-widest mb-6 border-b-2 pb-2" style={{borderColor: docSettings.color !== '#141210' ? docSettings.color : '#334155', color: docSettings.color !== '#141210' ? docSettings.color : undefined}}>Education</h2>
                    {resumeData.education?.map((edu, eduIndex) => (
                        <div key={edu._id || eduIndex} className="mb-4 group/edu relative">
                            <button className="absolute -left-8 top-0 p-1 text-status-error opacity-0 group-hover/edu:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter((_, i) => i !== eduIndex)}))}><X className="w-3 h-3" /></button>
                            <div className="flex justify-between items-baseline mb-1">
                                <EditableField value={edu.degree} onChange={(v) => updateEducation(eduIndex, 'degree', v)} className="font-bold text-ink text-[15px] flex-1" readOnly={previewMode} />
                                <div className="text-[12px] text-ink/60 font-medium shrink-0 ml-4">
                                    <EditableField value={edu.startDate} onChange={(v) => updateEducation(eduIndex, 'startDate', v)} className="w-10 text-right inline-block" readOnly={previewMode} /> - <EditableField value={edu.endDate} onChange={(v) => updateEducation(eduIndex, 'endDate', v)} className="w-12 inline-block" readOnly={previewMode} />
                                </div>
                            </div>
                            <EditableField value={edu.institution} onChange={(v) => updateEducation(eduIndex, 'institution', v)} className="text-[14px] text-ink/60 italic block mb-1" readOnly={previewMode} />
                            <EditableField value={edu.gpa} onChange={(v) => updateEducation(eduIndex, 'gpa', v)} placeholder="GPA / Details" className="w-full text-[13px] text-ink/80" readOnly={previewMode} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TemplateSidebar;
