const CompactTemplate = ({ resume }) => {
    return (
        <div className="w-full h-full bg-white p-6 font-sans text-gray-900 text-xs">
            {/* Compact Header */}
            <div className="border-b-2 border-gray-900 pb-2 mb-3">
                <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
                    {resume.personalInfo?.name || 'Your Name'}
                </h1>
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
                    {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
                    {resume.personalInfo?.phone && <span>•</span>}
                    {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
                    {resume.personalInfo?.location && <span>•</span>}
                    {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-3 gap-4">
                {/* Left Column - 1/3 */}
                <div className="space-y-3">
                    {/* Skills */}
                    {resume.skills && resume.skills.length > 0 && (
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300">
                                Skills
                            </h2>
                            <div className="space-y-0.5">
                                {resume.skills.map((skill, index) => (
                                    <div key={index} className="text-xs text-gray-700">• {skill}</div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {resume.education && resume.education.length > 0 && (
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300">
                                Education
                            </h2>
                            <div className="space-y-2">
                                {resume.education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="font-bold text-gray-900">{edu.degree}</div>
                                        <div className="text-gray-700">{edu.institution}</div>
                                        <div className="text-gray-500">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {resume.certifications && resume.certifications.length > 0 && (
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300">
                                Certifications
                            </h2>
                            <div className="space-y-1">
                                {resume.certifications.map((cert, index) => (
                                    <div key={index}>
                                        <div className="font-bold text-gray-900">{cert.name}</div>
                                        <div className="text-gray-600">{cert.issuer}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - 2/3 */}
                <div className="col-span-2 space-y-3">
                    {/* Summary */}
                    {resume.personalInfo?.summary && (
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300">
                                Summary
                            </h2>
                            <p className="text-xs leading-relaxed text-gray-700">
                                {resume.personalInfo.summary}
                            </p>
                        </div>
                    )}

                    {/* Experience */}
                    {resume.experience && resume.experience.length > 0 && (
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300">
                                Experience
                            </h2>
                            <div className="space-y-2">
                                {resume.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                            <span className="text-gray-500">
                                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-gray-700 font-semibold">{exp.company}</div>
                                        <p className="text-gray-700 leading-tight mt-0.5">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {resume.projects && resume.projects.length > 0 && (
                        <div>
                            <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300">
                                Projects
                            </h2>
                            <div className="space-y-2">
                                {resume.projects.map((project, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-900">{project.name}</h3>
                                        <p className="text-gray-700 leading-tight mb-1">{project.description}</p>
                                        {(project.codeUrl || project.hostedUrl || project.link) && (
                                            <div className="flex gap-2 text-xs">
                                                {project.codeUrl && (
                                                    <a href={project.codeUrl} className="text-blue-600 hover:underline">
                                                        Code
                                                    </a>
                                                )}
                                                {project.hostedUrl && (
                                                    <a href={project.hostedUrl} className="text-green-600 hover:underline">
                                                        Demo
                                                    </a>
                                                )}
                                                {!project.codeUrl && !project.hostedUrl && project.link && (
                                                    <a href={project.link} className="text-blue-600 hover:underline">
                                                        Link
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompactTemplate;
