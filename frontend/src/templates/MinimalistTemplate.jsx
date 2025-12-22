const MinimalistTemplate = ({ resume }) => {
    return (
        <div className="w-full h-full bg-white p-12 font-sans text-gray-900">
            {/* Header - Minimal with lots of space */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-light tracking-wide mb-3 text-gray-900">
                    {resume.personalInfo?.name || 'Your Name'}
                </h1>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    {resume.personalInfo?.email && (
                        <span>{resume.personalInfo.email}</span>
                    )}
                    {resume.personalInfo?.phone && (
                        <>
                            <span className="text-gray-400">•</span>
                            <span>{resume.personalInfo.phone}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Summary - if exists */}
            {resume.personalInfo?.summary && (
                <div className="mb-10">
                    <p className="text-sm leading-relaxed text-gray-700 text-center max-w-2xl mx-auto">
                        {resume.personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {resume.experience && resume.experience.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6 text-center">Experience</h2>
                    <div className="space-y-8">
                        {resume.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-gray-200 pl-6">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-base font-medium text-gray-900">{exp.position}</h3>
                                    <span className="text-xs text-gray-500">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6 text-center">Education</h2>
                    <div className="space-y-6">
                        {resume.education.map((edu, index) => (
                            <div key={index} className="text-center">
                                <h3 className="text-base font-medium text-gray-900">{edu.degree}</h3>
                                <p className="text-sm text-gray-600">{edu.institution}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {edu.startDate} - {edu.endDate}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6 text-center">Skills</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {resume.skills.map((skill, index) => (
                            <span key={index} className="text-sm text-gray-700 px-3 py-1 border border-gray-300 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6 text-center">Projects</h2>
                    <div className="space-y-6">
                        {resume.projects.map((project, index) => (
                            <div key={index} className="text-center">
                                <h3 className="text-base font-medium text-gray-900">{project.name}</h3>
                                <p className="text-sm text-gray-700 leading-relaxed mt-2">{project.description}</p>
                                {(project.codeUrl || project.hostedUrl || project.link) && (
                                    <div className="flex gap-4 justify-center text-xs mt-2">
                                        {project.codeUrl && (
                                            <a href={project.codeUrl} className="text-blue-600 hover:underline">
                                                Code
                                            </a>
                                        )}
                                        {project.hostedUrl && (
                                            <a href={project.hostedUrl} className="text-green-600 hover:underline">
                                                Live Demo
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
    );
};

export default MinimalistTemplate;
