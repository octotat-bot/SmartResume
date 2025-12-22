const TimelineTemplate = ({ resume }) => {
    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-50 to-gray-100 p-8 font-sans text-gray-900">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {resume.personalInfo?.name || 'Your Name'}
                </h1>
                <p className="text-base text-blue-600 font-semibold mb-3">
                    {resume.metadata?.targetRole || 'Professional Title'}
                </p>
                <div className="flex justify-center gap-3 text-xs text-gray-600">
                    {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
                    {resume.personalInfo?.phone && <span>•</span>}
                    {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
                </div>
            </div>

            {/* Summary */}
            {resume.personalInfo?.summary && (
                <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
                    <p className="text-sm leading-relaxed text-gray-700">
                        {resume.personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience Timeline */}
            {resume.experience && resume.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Experience
                    </h2>
                    <div className="relative pl-6 border-l-2 border-blue-200">
                        {resume.experience.map((exp, index) => (
                            <div key={index} className="mb-6 relative">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[27px] top-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow"></div>

                                {/* Content Card */}
                                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                                        <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-sm text-blue-600 font-semibold mb-2">{exp.company}</p>
                                    <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education Timeline */}
            {resume.education && resume.education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Education
                    </h2>
                    <div className="relative pl-6 border-l-2 border-green-200">
                        {resume.education.map((edu, index) => (
                            <div key={index} className="mb-4 relative">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[27px] top-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow"></div>

                                {/* Content Card */}
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                                    <p className="text-sm text-green-600 font-semibold">{edu.institution}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {edu.startDate} - {edu.endDate}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Projects
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                        {resume.projects.map((project, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
                                <h3 className="text-sm font-bold text-gray-900 mb-1">{project.name}</h3>
                                <p className="text-xs text-gray-700 leading-relaxed mb-2">{project.description}</p>
                                {(project.codeUrl || project.hostedUrl || project.link) && (
                                    <div className="flex gap-3 text-xs">
                                        {project.codeUrl && (
                                            <a href={project.codeUrl} className="text-purple-600 hover:underline font-medium">
                                                Code ↗
                                            </a>
                                        )}
                                        {project.hostedUrl && (
                                            <a href={project.hostedUrl} className="text-green-600 hover:underline font-medium">
                                                Live Demo ↗
                                            </a>
                                        )}
                                        {!project.codeUrl && !project.hostedUrl && project.link && (
                                            <a href={project.link} className="text-purple-600 hover:underline font-medium">
                                                Link ↗
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Certifications
                    </h2>
                    <div className="space-y-2">
                        {resume.certifications.map((cert, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                                <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                                <p className="text-xs text-gray-600">{cert.issuer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimelineTemplate;
