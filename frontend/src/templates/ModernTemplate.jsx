import React from 'react';

const ModernTemplate = ({ resume }) => {
    return (
        <div className="h-full font-sans text-gray-800">
            {/* Header */}
            <div className="flex justify-between items-end border-b-4 border-black pb-6 mb-8">
                <div>
                    <h1 className="text-5xl font-black text-black tracking-tighter uppercase mb-2">
                        {resume.personalInfo?.fullName || 'YOUR NAME'}
                    </h1>
                    <p className="text-xl font-medium tracking-wide text-gray-600">
                        {resume.metadata?.targetRole || 'Professional Role'}
                    </p>
                </div>
                <div className="text-right text-sm space-y-1">
                    {resume.personalInfo?.email && <div>{resume.personalInfo.email}</div>}
                    {resume.personalInfo?.phone && <div>{resume.personalInfo.phone}</div>}
                    {resume.personalInfo?.location && <div>{resume.personalInfo.location}</div>}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Column */}
                <div className="col-span-8 space-y-8">
                    {/* Summary */}
                    {resume.personalInfo?.summary && (
                        <section>
                            <h3 className="text-lg font-black uppercase tracking-widest mb-3 border-l-4 border-black pl-3">Profile</h3>
                            <p className="text-sm leading-relaxed text-gray-600">{resume.personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {resume.experience?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-black uppercase tracking-widest mb-4 border-l-4 border-black pl-3">Experience</h3>
                            <div className="space-y-6">
                                {resume.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-base">{exp.position}</h4>
                                            <span className="text-sm font-medium text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</div>
                                        {exp.description && <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {resume.projects?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-black uppercase tracking-widest mb-4 border-l-4 border-black pl-3">Projects</h3>
                            <div className="space-y-4">
                                {resume.projects.map((proj, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold mb-1">{proj.name}</h4>
                                        {proj.description && <p className="text-sm leading-relaxed text-gray-600 mb-2">{proj.description}</p>}
                                        {(proj.codeUrl || proj.hostedUrl || proj.link) && (
                                            <div className="flex gap-3 text-xs">
                                                {proj.codeUrl && (
                                                    <a href={proj.codeUrl} className="text-blue-600 hover:underline font-medium">
                                                        Code ↗
                                                    </a>
                                                )}
                                                {proj.hostedUrl && (
                                                    <a href={proj.hostedUrl} className="text-green-600 hover:underline font-medium">
                                                        Live Demo ↗
                                                    </a>
                                                )}
                                                {!proj.codeUrl && !proj.hostedUrl && proj.link && (
                                                    <a href={proj.link} className="text-blue-600 hover:underline font-medium">
                                                        Link ↗
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Co-curricular */}
                    {resume.coCurricular?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-black uppercase tracking-widest mb-4 border-l-4 border-black pl-3">Leadership & Activities</h3>
                            <div className="space-y-4">
                                {resume.coCurricular.map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold">{item.role}</h4>
                                            <span className="text-sm font-medium text-gray-500">{item.date}</span>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-700 mb-1">{item.activity}</div>
                                        {item.description && <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Co-curricular */}
                    {resume.coCurricular?.length > 0 && (
                        <section>
                            <h3 className="text-lg font-black uppercase tracking-widest mb-4 border-l-4 border-black pl-3">Leadership & Activities</h3>
                            <div className="space-y-4">
                                {resume.coCurricular.map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold">{item.role}</h4>
                                            <span className="text-sm font-medium text-gray-500">{item.date}</span>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-700 mb-1">{item.activity}</div>
                                        {item.description && <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="col-span-4 space-y-8">
                    {/* Socials */}
                    <section>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-3 text-gray-400">Connect</h3>
                        <div className="space-y-2 text-sm">
                            {[
                                { key: 'linkedin', label: 'LinkedIn' },
                                { key: 'github', label: 'Github' },
                                { key: 'portfolio', label: 'Portfolio' }
                            ].filter(item => resume.personalInfo?.[item.key]).map(item => (
                                <div key={item.key}>
                                    <a href={resume.personalInfo[item.key]} className="block truncate hover:text-blue-600 transition-colors">
                                        {item.label} ↗
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    {resume.skills?.technical?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-black uppercase tracking-widest mb-3 text-gray-400">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {resume.skills.technical.map((skill, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 text-xs font-bold rounded">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {resume.education?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-black uppercase tracking-widest mb-3 text-gray-400">Education</h3>
                            <div className="space-y-4">
                                {resume.education.map((edu, i) => (
                                    <div key={i}>
                                        <div className="font-bold text-sm">{edu.institution}</div>
                                        <div className="text-xs text-gray-600 mt-1">{edu.degree}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
