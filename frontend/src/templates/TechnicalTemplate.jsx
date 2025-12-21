const TechnicalTemplate = ({ resume }) => {
    return (
        <div className="w-full h-full font-mono text-gray-900">
            {/* Header - Terminal Style */}
            <div className="bg-gray-900 text-green-400 p-4 -mx-8 -mt-8">
                <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <span className="ml-2 text-gray-500">resume.sh</span>
                </div>
                <div className="text-xs">
                    <span className="text-blue-400">$</span> cat resume.txt
                </div>
                <h1 className="text-xl font-bold mt-3">
                    {resume.personalInfo?.name || 'Your Name'}
                </h1>
                <p className="text-green-300 text-sm">{resume.metadata?.targetRole || 'Software Engineer'}</p>
                <div className="mt-2 text-xs space-y-0.5">
                    {resume.personalInfo?.email && (
                        <div><span className="text-gray-500">email:</span> {resume.personalInfo.email}</div>
                    )}
                    {resume.personalInfo?.phone && (
                        <div><span className="text-gray-500">phone:</span> {resume.personalInfo.phone}</div>
                    )}
                </div>
            </div>

            <div className="mt-4">
                {/* Summary */}
                {resume.personalInfo?.summary && (
                    <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <div className="text-xs text-gray-500 mb-1 font-bold">ABOUT</div>
                        <p className="text-xs leading-relaxed text-gray-700">
                            {resume.personalInfo.summary}
                        </p>
                    </div>
                )}

                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-blue-600 mb-2">SKILLS</h2>
                        <div className="bg-gray-50 p-3 rounded border border-gray-300">
                            <div className="flex flex-wrap gap-2">
                                {resume.skills.map((skill, index) => (
                                    <span key={index} className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Experience */}
                {resume.experience && resume.experience.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-purple-600 mb-2">EXPERIENCE</h2>
                        <div className="space-y-3">
                            {resume.experience.map((exp, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded border border-gray-300">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-sm">{exp.position}</h3>
                                        <span className="text-xs text-gray-500">
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-xs text-blue-600 font-semibold mb-1">{exp.company}</p>
                                    <p className="text-xs text-gray-700">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {resume.projects && resume.projects.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-green-600 mb-2">PROJECTS</h2>
                        <div className="space-y-3">
                            {resume.projects.map((project, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded border border-gray-300">
                                    <h3 className="font-bold text-gray-900 mb-1 text-sm">{project.name}</h3>
                                    <p className="text-xs text-gray-700">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resume.education && resume.education.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-red-600 mb-2">EDUCATION</h2>
                        <div className="space-y-2">
                            {resume.education.map((edu, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded border border-gray-300">
                                    <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                                    <p className="text-xs text-gray-700">{edu.institution}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {edu.startDate} - {edu.endDate}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TechnicalTemplate;
