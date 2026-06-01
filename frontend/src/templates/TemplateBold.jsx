import React from 'react';
import { X, Plus } from 'lucide-react';
import EditableField from '../components/EditableField';

const TemplateBold = ({ 
    resumeData, setResumeData, updatePersonalInfo, updateExperience, 
    addExperienceAchievement, updateEducation, docSettings, previewMode
}) => {
    return (
        <div className={`w-[794px] min-h-[1123px] shrink-0 bg-[#F4F4F5] shadow-[0_8px_40px_rgba(20,18,16,0.12)] ${docSettings.margin === 'narrow' ? 'p-10' : docSettings.margin === 'wide' ? 'p-20' : 'p-16'} transition-all relative group ${docSettings.font} print:shadow-none print:m-0 print:bg-white ${previewMode ? 'pointer-events-none' : ''}`}>
            
            {/* HEADER */}
            <div className="mb-12 group/section">
                <EditableField 
                    value={resumeData.personalInfo?.fullName || ''} 
                    onChange={(val) => updatePersonalInfo('fullName', val)} 
                    className="text-[64px] text-ink leading-[0.9] w-full font-black uppercase tracking-tighter"
                    placeholder="YOUR NAME" readOnly={previewMode}
                />
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-[14px] font-bold text-ink mt-6 uppercase tracking-widest border-y-[3px] border-ink py-3">
                    <EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="EMAIL" className="w-auto inline-block min-w-[150px]" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="PHONE" className="w-auto inline-block min-w-[120px]" readOnly={previewMode} />
                    <EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="LOCATION" className="w-auto inline-block min-w-[100px]" readOnly={previewMode} />
                </div>
            </div>
            
            {/* EXPERIENCE */}
            <div className="mb-12 group/section">
                <h2 className="text-[28px] font-black text-ink uppercase tracking-tighter mb-8 flex items-center gap-4">
                    Experience
                    <div className="h-[3px] flex-1 bg-ink" />
                </h2>
                
                {resumeData.experience?.map((exp, expIndex) => (
                    <div key={exp._id || expIndex} className="mb-8 group/exp relative">
                        <button className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                            onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}><X className="w-4 h-4" /></button>
                        
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} className="font-black text-[20px] uppercase text-ink block" readOnly={previewMode} />
                                <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="text-[16px] font-bold" style={{color: 'var(--doc-color)'}} readOnly={previewMode} />
                            </div>
                            <div className="text-[14px] text-ink font-bold bg-white px-3 py-1 border-[2px] border-ink rounded-lg shadow-[4px_4px_0_0_#141210] print:shadow-none">
                                <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="text-right w-12" readOnly={previewMode} /> - <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="text-left w-14" readOnly={previewMode} />
                            </div>
                        </div>
                        <ul className={`mt-3 ${docSettings.spacing === 'compact' ? 'space-y-2' : docSettings.spacing === 'loose' ? 'space-y-4' : 'space-y-3'} text-[15px] font-medium text-ink/80`}>
                            {exp.achievements?.map((ach, achIndex) => (
                                <li key={achIndex} className="flex items-start gap-3 group/ach relative">
                                    <span className="text-[12px] mt-1 text-ink">▶</span> 
                                    <EditableField value={ach} onChange={(v) => updateExperience(expIndex, 'achievements', exp.achievements.map((a, i) => i === achIndex ? v : a))} multiline className="flex-1" readOnly={previewMode} />
                                    <button className="absolute -left-5 top-1 p-0.5 text-status-error opacity-0 group-hover/ach:opacity-100 transition-opacity print:hidden pointer-events-auto"
                                        onClick={() => setResumeData(prev => {
                                            const nExp = [...prev.experience];
                                            nExp[expIndex].achievements = nExp[expIndex].achievements.filter((_, i) => i !== achIndex);
                                            return {...prev, experience: nExp};
                                        })}><X className="w-3 h-3" /></button>
                                </li>
                            ))}
                            <li className="opacity-0 group-hover/exp:opacity-100 mt-1 print:hidden pointer-events-auto">
                                <button onClick={() => addExperienceAchievement(expIndex)} className="text-[11px] font-bold uppercase tracking-widest text-ink/50 hover:text-ink flex items-center gap-1"><Plus className="w-3 h-3" /> Add item</button>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>

            <div className="flex gap-12">
                {/* EDUCATION */}
                <div className="flex-1 group/section">
                    <h2 className="text-[20px] font-black text-ink uppercase tracking-tighter mb-6 flex items-center gap-4">
                        Edu <div className="h-[3px] flex-1 bg-ink" />
                    </h2>
                    {resumeData.education?.map((edu, eduIndex) => (
                        <div key={edu._id || eduIndex} className="mb-4 group/edu relative">
                            <button className="absolute -left-10 top-0 p-1 text-status-error opacity-0 group-hover/edu:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                                onClick={() => setResumeData(prev => ({...prev, education: prev.education.filter((_, i) => i !== eduIndex)}))}><X className="w-4 h-4" /></button>
                            <EditableField value={edu.degree} onChange={(v) => updateEducation(eduIndex, 'degree', v)} className="font-black text-[16px] text-ink block uppercase" readOnly={previewMode} />
                            <EditableField value={edu.institution} onChange={(v) => updateEducation(eduIndex, 'institution', v)} className="font-bold text-[14px]" style={{color: 'var(--doc-color)'}} readOnly={previewMode} />
                            <div className="text-[12px] font-bold text-ink/50 mt-1">
                                <EditableField value={edu.startDate} onChange={(v) => updateEducation(eduIndex, 'startDate', v)} className="text-right w-12" readOnly={previewMode} /> - <EditableField value={edu.endDate} onChange={(v) => updateEducation(eduIndex, 'endDate', v)} className="text-left w-12" readOnly={previewMode} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* SKILLS */}
                <div className="flex-1 group/section">
                    <h2 className="text-[20px] font-black text-ink uppercase tracking-tighter mb-6 flex items-center gap-4">
                        Skills <div className="h-[3px] flex-1 bg-ink" />
                    </h2>
                    <div className="text-[15px] font-bold text-ink/80 leading-loose">
                        <EditableField value={resumeData.skills?.technical?.join(', ') || ''} onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split(', ')}}))} multiline className="w-full" placeholder="Comma separated skills" readOnly={previewMode} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TemplateBold;
