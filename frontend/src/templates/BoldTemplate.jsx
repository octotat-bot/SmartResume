const BoldTemplate = ({ resume }) => {
    return (
        <div className="w-full h-full bg-white font-sans text-gray-900">
            {/* Bold Header with Dark Background */}
            <div className="bg-gray-900 text-white p-6 -mx-8 -mt-8">
                <h1 className="text-3xl font-black uppercase tracking-wider mb-2">
                    {resume.personalInfo?.name || 'YOUR NAME'}
                </h1>
                <p className="text-lg font-bold text-gray-300 mb-3">
                    {resume.metadata?.targetRole || 'PROFESSIONAL TITLE'}
                </p>
                <div className="flex gap-4 text-sm">
                    {resume.personalInfo?.email && (
                        <span className="font-semibold">{resume.personalInfo.email}</span>
                    )}
                    {resume.personalInfo?.phone && (
                        <span className="font-semibold">{resume.personalInfo.phone}</span>
                    )}
                </div>
            </div>

            <div className="mt-6">
                {/* Summary */}
                {resume.personalInfo?.summary && (
                    <div className="mb-6">
                        <h2 className="text-xl font-black uppercase text-gray-900 mb-3 pb-2 border-b-4 border-gray-900">
                            Profile
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-700 font-medium">
                            {resume.personalInfo.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {resume.experience && resume.experience.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-black uppercase text-gray-900 mb-3 pb-2 border-b-4 border-gray-900">
                            Experience
                        </h2>
                        <div className="space-y-4">
                            {resume.experience.map((exp, index) => (
                                <div key={index} className="border-l-4 border-gray-400 pl-4">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-black text-gray-900">{exp.position}</h3>
                                        <span className="text-xs font-bold text-gray-600">
                                            {exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-base font-bold text-gray-700 mb-2">{exp.company}</p>
                                    <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resume.education && resume.education.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-black uppercase text-gray-900 mb-3 pb-2 border-b-4 border-gray-900">
                            Education
                        </h2>
                        <div className="space-y-3">
                            {resume.education.map((edu, index) => (
                                <div key={index} className="border-l-4 border-gray-400 pl-4">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-base font-black text-gray-900">{edu.degree}</h3>
                                        <span className="text-xs font-bold text-gray-600">
                                            {edu.startDate} - {edu.endDate}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-700">{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-black uppercase text-gray-900 mb-3 pb-2 border-b-4 border-gray-900">
                            Skills
                        </h2>
                        <div className="grid grid-cols-3 gap-2">
                            {resume.skills.map((skill, index) => (
                                <div key={index} className="bg-gray-900 text-white px-3 py-2 text-center font-bold text-sm">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {resume.projects && resume.projects.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-black uppercase text-gray-900 mb-3 pb-2 border-b-4 border-gray-900">
                            Projects
                        </h2>
                        <div className="space-y-3">
                            {resume.projects.map((project, index) => (
                                <div key={index} className="border-l-4 border-gray-400 pl-4">
                                    <h3 className="text-base font-black text-gray-900">{project.name}</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed mb-2">{project.description}</p>
                                    {(project.codeUrl || project.hostedUrl || project.link) && (
                                        <div className="flex gap-3 text-xs font-bold">
                                            {project.codeUrl && (
                                                <a href={project.codeUrl} className="text-blue-600 hover:underline">
                                                    CODE →
                                                </a>
                                            )}
                                            {project.hostedUrl && (
                                                <a href={project.hostedUrl} className="text-green-600 hover:underline">
                                                    LIVE →
                                                </a>
                                            )}
                                            {!project.codeUrl && !project.hostedUrl && project.link && (
                                                <a href={project.link} className="text-blue-600 hover:underline">
                                                    LINK →
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
    );
};

export default BoldTemplate;
