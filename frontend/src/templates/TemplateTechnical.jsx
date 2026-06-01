import React from 'react';
import { X, Plus } from 'lucide-react';
import EditableField from '../components/EditableField';

const TemplateTechnical = ({ 
    resumeData, setResumeData, updatePersonalInfo, updateExperience, 
    addExperienceAchievement, docSettings, previewMode
}) => {
    return (
        <div className={`w-[794px] min-h-[1123px] shrink-0 bg-[#0A0E17] text-[#8A9EB3] shadow-[0_8px_40px_rgba(20,18,16,0.12)] ${docSettings.margin === 'narrow' ? 'p-10' : docSettings.margin === 'wide' ? 'p-20' : 'p-16'} transition-all relative group font-mono print:shadow-none print:m-0 print:bg-white print:text-black ${previewMode ? 'pointer-events-none' : ''}`}>
            
            {/* HEADER - Personal Info */}
            <div className="mb-10 group/section border-b border-[#2C3B59] print:border-black/20 pb-8">
                <div className="text-[14px] text-accent mb-2">{`// developer_profile.js`}</div>
                <EditableField 
                    value={resumeData.personalInfo?.fullName || ''} 
                    onChange={(val) => updatePersonalInfo('fullName', val)} 
                    className="text-[36px] text-white print:text-black leading-tight w-full font-bold"
                    placeholder="Your Name" readOnly={previewMode}
                />
                <div className="flex flex-col gap-1 text-[13px] mt-4">
                    <div className="flex items-center"><span className="text-accent w-24">const</span> <span className="text-white print:text-black w-24">email</span> = "<EditableField value={resumeData.personalInfo?.email || ''} onChange={(val) => updatePersonalInfo('email', val)} placeholder="Email" className="inline-block" readOnly={previewMode} />";</div>
                    <div className="flex items-center"><span className="text-accent w-24">const</span> <span className="text-white print:text-black w-24">phone</span> = "<EditableField value={resumeData.personalInfo?.phone || ''} onChange={(val) => updatePersonalInfo('phone', val)} placeholder="Phone" className="inline-block" readOnly={previewMode} />";</div>
                    <div className="flex items-center"><span className="text-accent w-24">const</span> <span className="text-white print:text-black w-24">location</span> = "<EditableField value={resumeData.personalInfo?.location || ''} onChange={(val) => updatePersonalInfo('location', val)} placeholder="Location" className="inline-block" readOnly={previewMode} />";</div>
                </div>
            </div>
            
            {/* EXPERIENCE */}
            <div className="mb-10 group/section">
                <div className="text-[14px] text-accent mb-6">{`/** @section Experience */`}</div>
                
                {resumeData.experience?.map((exp, expIndex) => (
                    <div key={exp._id || expIndex} className="mb-8 group/exp relative pl-4 border-l border-[#2C3B59] print:border-black/20">
                        <button className="absolute -left-5 top-0 p-1 text-status-error opacity-0 group-hover/exp:opacity-100 transition-opacity rounded hover:bg-status-error/10 print:hidden pointer-events-auto"
                            onClick={() => setResumeData(prev => ({...prev, experience: prev.experience.filter((_, i) => i !== expIndex)}))}><X className="w-4 h-4" /></button>
                        
                        <div className="flex justify-between items-baseline mb-3">
                            <h3 className="font-bold text-white print:text-black text-[15px] flex items-center gap-2 flex-1">
                                <span className="text-accent">{`>`}</span>
                                <EditableField value={exp.position} onChange={(v) => updateExperience(expIndex, 'position', v)} className="font-bold" readOnly={previewMode} />
                                <span className="text-[#4A5D7E] print:text-black/40">@</span>
                                <EditableField value={exp.company} onChange={(v) => updateExperience(expIndex, 'company', v)} className="text-[#8A9EB3] print:text-black/70" readOnly={previewMode} />
                            </h3>
                            <div className="text-[12px] text-[#4A5D7E] print:text-black/40 bg-[#121A2F] print:bg-transparent px-2 py-1 rounded">
                                <EditableField value={exp.startDate} onChange={(v) => updateExperience(expIndex, 'startDate', v)} className="text-right w-12" readOnly={previewMode} /> - <EditableField value={exp.endDate} onChange={(v) => updateExperience(expIndex, 'endDate', v)} className="text-left w-14" readOnly={previewMode} />
                            </div>
                        </div>
                        <ul className={`text-[13px] ${docSettings.spacing === 'compact' ? 'space-y-1' : docSettings.spacing === 'loose' ? 'space-y-3' : 'space-y-2'}`}>
                            {exp.achievements?.map((ach, achIndex) => (
                                <li key={achIndex} className="flex items-start gap-2 group/ach relative">
                                    <span className="text-accent mt-0.5 opacity-70">-</span> 
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
                                <button onClick={() => addExperienceAchievement(expIndex)} className="text-[11px] text-accent hover:text-white flex items-center gap-1"><Plus className="w-3 h-3" /> Add element</button>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>

            {/* SKILLS */}
            <div className="mb-6 group/section">
                <div className="text-[14px] text-accent mb-4">{`/** @section Skills */`}</div>
                <div className="pl-4 border-l border-[#2C3B59] print:border-black/20 text-[13px]">
                    <div className="flex items-start">
                        <span className="text-white print:text-black w-24 shrink-0">technical:</span> 
                        <EditableField value={resumeData.skills?.technical?.join(', ') || ''} onChange={(v) => setResumeData(prev => ({...prev, skills: {...prev.skills, technical: v.split(', ')}}))} multiline className="flex-1 text-[#8A9EB3] print:text-black/70" placeholder="[array, of, skills]" readOnly={previewMode} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateTechnical;
