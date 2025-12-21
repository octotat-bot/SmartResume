const CreativeTemplate = ({ resume }) => {
    return (
        <div className="w-full h-full bg-white font-sans text-gray-900">
            {/* Colorful Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">
                    {resume.personalInfo?.name || 'Your Name'}
                </h1>
                <p className="text-lg opacity-90">{resume.metadata?.targetRole || 'Professional'}</p>
                <div className="flex gap-4 mt-4 text-sm">
                    {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
                    {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
                </div>
            </div>

            <div className="p-8">
                {/* Summary */}
                {resume.personalInfo?.summary && (
                    <div className="mb-8 p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
                        <p className="text-sm leading-relaxed text-gray-700">
                            {resume.personalInfo.summary}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Experience */}
                        {resume.experience && resume.experience.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-purple-600 mb-4 pb-2 border-b-2 border-purple-200">
                                    Experience
                                </h2>
                                <div className="space-y-4">
                                    {resume.experience.map((exp, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                            <p className="text-sm text-purple-600 font-medium">{exp.company}</p>
                                            <p className="text-xs text-gray-500 mb-2">
                                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                            </p>
                                            <p className="text-sm text-gray-700">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {resume.projects && resume.projects.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-purple-600 mb-4 pb-2 border-b-2 border-purple-200">
                                    Projects
                                </h2>
                                <div className="space-y-4">
                                    {resume.projects.map((project, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-gray-900">{project.name}</h3>
                                            <p className="text-sm text-gray-700">{project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Education */}
                        {resume.education && resume.education.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-pink-600 mb-4 pb-2 border-b-2 border-pink-200">
                                    Education
                                </h2>
                                <div className="space-y-4">
                                    {resume.education.map((edu, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                            <p className="text-sm text-pink-600 font-medium">{edu.institution}</p>
                                            <p className="text-xs text-gray-500">
                                                {edu.startDate} - {edu.endDate}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {resume.skills && resume.skills.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-pink-600 mb-4 pb-2 border-b-2 border-pink-200">
                                    Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {resume.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm rounded-full font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Certifications */}
                        {resume.certifications && resume.certifications.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-pink-600 mb-4 pb-2 border-b-2 border-pink-200">
                                    Certifications
                                </h2>
                                <div className="space-y-2">
                                    {resume.certifications.map((cert, index) => (
                                        <div key={index}>
                                            <h3 className="font-medium text-gray-900">{cert.name}</h3>
                                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
