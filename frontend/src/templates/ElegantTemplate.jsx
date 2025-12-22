const ElegantTemplate = ({ resume }) => {
    return (
        <div className="w-full h-full bg-white p-10 font-serif text-gray-800">
            {/* Elegant Header with Line */}
            <div className="text-center mb-8 pb-6 border-b border-gray-300">
                <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-wide">
                    {resume.personalInfo?.name || 'Your Name'}
                </h1>
                <p className="text-sm text-gray-600 italic mb-3">
                    {resume.metadata?.targetRole || 'Professional'}
                </p>
                <div className="flex justify-center gap-4 text-xs text-gray-600">
                    {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
                    {resume.personalInfo?.phone && <span>|</span>}
                    {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
                </div>
            </div>

            {/* Summary */}
            {resume.personalInfo?.summary && (
                <div className="mb-6 text-center">
                    <p className="text-sm leading-relaxed text-gray-700 italic max-w-3xl mx-auto">
                        "{resume.personalInfo.summary}"
                    </p>
                </div>
            )}

            {/* Experience */}
            {resume.experience && resume.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-light text-gray-900 mb-4 text-center border-b border-gray-200 pb-2">
                        Professional Experience
                    </h2>
                    <div className="space-y-5">
                        {resume.experience.map((exp, index) => (
                            <div key={index} className="pl-4 border-l-2 border-gray-200">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                                    <span className="text-xs text-gray-500 italic">
                                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 font-medium mb-2">{exp.company}</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-light text-gray-900 mb-4 text-center border-b border-gray-200 pb-2">
                        Education
                    </h2>
                    <div className="space-y-4">
                        {resume.education.map((edu, index) => (
                            <div key={index} className="text-center">
                                <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                                <p className="text-sm text-gray-700">{edu.institution}</p>
                                <p className="text-xs text-gray-500 italic mt-1">
                                    {edu.startDate} – {edu.endDate}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-light text-gray-900 mb-4 text-center border-b border-gray-200 pb-2">
                        Skills & Expertise
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {resume.skills.map((skill, index) => (
                            <span key={index} className="text-sm text-gray-700 italic">
                                {skill}{index < resume.skills.length - 1 && ' •'}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-light text-gray-900 mb-4 text-center border-b border-gray-200 pb-2">
                        Notable Projects
                    </h2>
                    <div className="space-y-4">
                        {resume.projects.map((project, index) => (
                            <div key={index} className="text-center">
                                <h3 className="text-base font-semibold text-gray-900">{project.name}</h3>
                                <p className="text-sm text-gray-700 leading-relaxed mt-1 mb-2">{project.description}</p>
                                {(project.codeUrl || project.hostedUrl || project.link) && (
                                    <div className="flex gap-4 justify-center text-xs italic">
                                        {project.codeUrl && (
                                            <a href={project.codeUrl} className="text-blue-600 hover:underline">
                                                View Code
                                            </a>
                                        )}
                                        {project.hostedUrl && (
                                            <a href={project.hostedUrl} className="text-green-600 hover:underline">
                                                Live Demo
                                            </a>
                                        )}
                                        {!project.codeUrl && !project.hostedUrl && project.link && (
                                            <a href={project.link} className="text-blue-600 hover:underline">
                                                View Project
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

export default ElegantTemplate;
