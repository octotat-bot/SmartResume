import React from 'react';

const StandardTemplate = ({ resume }) => {
    return (
        <div className="text-sm font-serif h-full">
            <div className="mb-6 border-b-2 border-gray-800 pb-4">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">{resume.personalInfo?.fullName || 'Your Name'}</h1>
                <div className="text-xs text-gray-900 leading-relaxed">
                    {resume.personalInfo?.phone && <div className="mb-1"><span className="font-bold">Phone:</span> {resume.personalInfo.phone}</div>}
                    {resume.personalInfo?.email && <div className="mb-1"><span className="font-bold">Email:</span> {resume.personalInfo.email}</div>}
                    {resume.personalInfo?.location && <div className="mb-1"><span className="font-bold">Location:</span> {resume.personalInfo.location}</div>}

                    <div className="flex flex-wrap gap-x-1 mt-2 text-blue-700 font-medium">
                        {[
                            { key: 'linkedin', label: 'LinkedIn' },
                            { key: 'github', label: 'Github' },
                            { key: 'leetcode', label: 'Leetcode' },
                            { key: 'portfolio', label: 'Personal Portfolio' },
                            { key: 'hackerearth', label: 'HackerEarth' },
                            { key: 'hackerrank', label: 'HackerRank' },
                            { key: 'codeforces', label: 'CodeForces' },
                            { key: 'codechef', label: 'CodeChef' }
                        ].filter(item => resume.personalInfo?.[item.key]).map((item, index, array) => (
                            <span key={item.key} className="flex items-center">
                                <a href={resume.personalInfo[item.key]} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {item.label}
                                </a>
                                {index < array.length - 1 && <span className="text-black mx-1">•</span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {resume.personalInfo?.summary && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold mb-2 uppercase border-b border-gray-400 pb-1 text-gray-900">Summary</h2>
                    <p className="text-xs leading-relaxed text-gray-800">{resume.personalInfo.summary}</p>
                </div>
            )}

            {resume.education?.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold mb-3 uppercase border-b border-gray-400 pb-1 text-gray-900">Education</h2>
                    {resume.education.map((edu, i) => (
                        <div key={i} className="mb-3">
                            <div className="font-bold text-xs text-gray-900">{edu.degree} in {edu.field}</div>
                            <div className="text-xs text-gray-700">{edu.institution}</div>
                            {edu.gpa && <div className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</div>}
                        </div>
                    ))}
                </div>
            )}

            {resume.experience?.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold mb-3 uppercase border-b border-gray-400 pb-1 text-gray-900">Experience</h2>
                    {resume.experience.map((exp, i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-bold text-xs text-gray-900">{exp.position}</div>
                                    <div className="text-xs text-gray-700">{exp.company}</div>
                                </div>
                            </div>
                            {exp.description && <p className="text-xs mt-2 leading-relaxed text-gray-800">{exp.description}</p>}
                        </div>
                    ))}
                </div>
            )}

            {resume.certifications?.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold mb-3 uppercase border-b border-gray-400 pb-1 text-gray-900">Certificates</h2>
                    {resume.certifications.map((cert, i) => (
                        <div key={i} className="mb-2">
                            <div className="font-bold text-xs text-gray-900">{cert.name}</div>
                            <div className="text-xs text-gray-700">{cert.issuer}</div>
                        </div>
                    ))}
                </div>
            )}

            {resume.projects?.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold mb-3 uppercase border-b border-gray-400 pb-1 text-gray-900">Projects</h2>
                    {resume.projects.map((proj, i) => (
                        <div key={i} className="mb-3">
                            <div className="font-bold text-xs text-gray-900">{proj.name}</div>
                            {proj.description && <p className="text-xs mt-1 leading-relaxed text-gray-800">{proj.description}</p>}
                            {(proj.codeUrl || proj.hostedUrl || proj.link) && (
                                <div className="flex gap-3 text-xs mt-1">
                                    {proj.codeUrl && (
                                        <a href={proj.codeUrl} className="text-blue-600 hover:underline">
                                            Code →
                                        </a>
                                    )}
                                    {proj.hostedUrl && (
                                        <a href={proj.hostedUrl} className="text-green-600 hover:underline">
                                            Live Demo →
                                        </a>
                                    )}
                                    {!proj.codeUrl && !proj.hostedUrl && proj.link && (
                                        <a href={proj.link} className="text-blue-600 hover:underline">
                                            Link →
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {resume.skills?.technical?.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold mb-3 uppercase border-b border-gray-400 pb-1 text-gray-900">Skills</h2>
                    <div className="text-xs text-gray-800">{resume.skills.technical.join(' • ')}</div>
                </div>
            )}

            {resume.coCurricular?.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-sm font-bold mb-3 uppercase border-b border-gray-400 pb-1 text-gray-900">Co-curricular & POR</h2>
                    {resume.coCurricular.map((item, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between items-baseline mb-1">
                                <div className="font-bold text-xs text-gray-900">{item.role} <span className="font-normal text-gray-700">| {item.activity}</span></div>
                                <div className="text-xs text-gray-600 font-medium">{item.date}</div>
                            </div>
                            {item.description && <p className="text-xs leading-relaxed text-gray-800">{item.description}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StandardTemplate;
