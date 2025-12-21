const ProfessionalTemplate = ({ resume }) => {
    return (
        <div className="w-full h-full bg-white p-10 font-serif text-gray-900">
            {/* Header */}
            <div className="border-b-4 border-gray-800 pb-6 mb-8">
                <h1 className="text-5xl font-bold text-gray-900 mb-2">
                    {resume.personalInfo?.name || 'YOUR NAME'}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{resume.metadata?.targetRole || 'Professional Title'}</p>
                <div className="flex gap-6 text-sm text-gray-700">
                    {resume.personalInfo?.email && <span>✉ {resume.personalInfo.email}</span>}
                    {resume.personalInfo?.phone && <span>☎ {resume.personalInfo.phone}</span>}
                    {resume.personalInfo?.location && <span>📍 {resume.personalInfo.location}</span>}
                </div>
            </div>

            {/* Professional Summary */}
            {resume.personalInfo?.summary && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                        Professional Summary
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-700 text-justify">
                        {resume.personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Professional Experience */}
            {resume.experience && resume.experience.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
                        Professional Experience
                    </h2>
                    <div className="space-y-6">
                        {resume.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                    <span className="text-sm text-gray-600 font-medium">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <p className="text-base text-gray-700 font-semibold mb-2">{exp.company}</p>
                                <p className="text-sm text-gray-700 leading-relaxed text-justify">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
                        Education
                    </h2>
                    <div className="space-y-4">
                        {resume.education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                                    <span className="text-sm text-gray-600 font-medium">
                                        {edu.startDate} - {edu.endDate}
                                    </span>
                                </div>
                                <p className="text-base text-gray-700 font-semibold">{edu.institution}</p>
                                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
                        Core Competencies
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                        {resume.skills.map((skill, index) => (
                            <div key={index} className="text-sm text-gray-700 font-medium">
                                • {skill}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
                        Professional Certifications
                    </h2>
                    <div className="space-y-3">
                        {resume.certifications.map((cert, index) => (
                            <div key={index}>
                                <h3 className="text-base font-bold text-gray-900">{cert.name}</h3>
                                <p className="text-sm text-gray-700">{cert.issuer} • {cert.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfessionalTemplate;
