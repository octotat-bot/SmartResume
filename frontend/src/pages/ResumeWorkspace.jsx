import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeService } from '../services/api';
import { Plus, Trash2, ArrowLeft, ChevronRight, Layout, User, Briefcase, GraduationCap, Code, Award, FileText, Download, Share2, Palette, Wand2, RefreshCcw, Save, X, Search, Check, Loader, AlertCircle, Undo, Redo, Linkedin, Github, Terminal, Cpu, BarChart, Globe, History, TrendingUp, BarChart3 } from 'lucide-react';
import html2pdf from 'html2pdf.js/dist/html2pdf.js';
import StandardTemplate from '../templates/StandardTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalistTemplate from '../templates/MinimalistTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import TechnicalTemplate from '../templates/TechnicalTemplate';
import CompactTemplate from '../templates/CompactTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import BoldTemplate from '../templates/BoldTemplate';
import TimelineTemplate from '../templates/TimelineTemplate';
import VersionHistory from '../components/VersionHistory';
import ResumeAnalyzer from '../components/ResumeAnalyzer';
import AIFeaturesPanel from '../components/AIFeaturesPanel';
import ResumeStats from '../components/ResumeStats';

const ResumeWorkspace = () => {

    const POPULAR_SKILLS = [
        // Programming Languages
        "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin",
        "PHP", "Ruby", "Scala", "R", "MATLAB", "Dart", "Perl", "Shell Scripting", "Assembly", "Lua",
        "Haskell", "Julia", "Objective-C", "VBA",

        // Web Frontend
        "React", "Angular", "Vue.js", "Next.js", "Nuxt.js", "Svelte", "HTML5", "CSS3", "Sass/SCSS",
        "Tailwind CSS", "Bootstrap", "Material UI", "Chakra UI", "Redux", "MobX", "Recoil", "Webpack",
        "Vite", "Babel", "jQuery", "Web Assembly", "Three.js", "D3.js", "Responsive Design",

        // Web Backend
        "Node.js", "Express.js", "NestJS", "Django", "Flask", "FastAPI", "Spring Boot", "ASP.NET Core",
        "Laravel", "Ruby on Rails", "GraphQL", "REST API", "gRPC", "WebSockets", "Microservices",
        "Serverless", "Socket.io",

        // Database
        "SQL", "MySQL", "PostgreSQL", "MongoDB", "NoSQL", "Redis", "Elasticsearch", "Cassandra",
        "Oracle", "Microsoft SQL Server", "SQLite", "DynamoDB", "Firebase", "Supabase", "MariaDB",
        "Neo4j", "Prisma", "Mongoose", "Sequelize", "TypeORM",

        // DevOps & Cloud
        "AWS", "Amazon Web Services", "Azure", "Google Cloud Platform (GCP)", "Docker", "Kubernetes",
        "Jenkins", "Git", "GitHub", "GitLab", "Bitbucket", "CI/CD", "Terraform", "Ansible", "Puppet",
        "Chef", "Linux", "Nginx", "Apache", "Heroku", "Vercel", "Netlify", "DigitalOcean", "Prometheus",
        "Grafana", "Splunk", "New Relic",

        // Mobile Development
        "React Native", "Flutter", "iOS Development", "Android Development", "Expo", "Ionic",
        "Xamarin", "Mobile App Design",

        // Data Science & AI/ML
        "Machine Learning", "Artificial Intelligence", "Deep Learning", "Data Science", "Data Analysis",
        "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Keras", "OpenCV", "NLP",
        "Computer Vision", "Big Data", "Hadoop", "Spark", "Hive", "Tableau", "Power BI", "Data Visualization",
        "Matplotlib", "Seaborn", "Jupyter Notebooks",

        // Cyber Security
        "Cybersecurity", "Network Security", "Ethical Hacking", "Penetration Testing", "Cryptography",
        "Firewalls", "SIEM", "Wireshark", "Metasploit", "Information Security", "Risk Assessment",
        "Incident Response", "Vulnerability Assessment",

        // Design & Creative
        "UI/UX Design", "Graphic Design", "Web Design", "Figma", "Adobe XD", "Sketch", "Photoshop",
        "Illustrator", "InDesign", "After Effects", "Premiere Pro", "Canva", "Prototyping", "Wireframing",
        "User Research", "Video Editing", "Animation", "3D Modeling", "Blender",

        // Software Engineering & Methodologies
        "Agile", "Scrum", "Kanban", "Software Architecture", "Design Patterns", "TDD", "BDD",
        "Object-Oriented Programming (OOP)", "Functional Programming", "System Design", "UML",
        "Version Control", "Unit Testing", "Integration Testing", "Debugging",

        // Product & Management
        "Product Management", "Project Management", "Business Analysis", "JIRA", "Asana", "Trello",
        "Confluence", "Roadmapping", "Strategic Planning", "Leadership", "Team Management",
        "Stakeholder Management", "Risk Management",

        // Marketing & Content
        "Digital Marketing", "SEO", "SEM", "Content Marketing", "Social Media Marketing", "Email Marketing",
        "Copywriting", "Branding", "Google Analytics", "Google Ads", "Facebook Ads", "Marketing Strategy",
        "Storytelling", "Public Relations",

        // Finance & Business
        "Accounting", "Financial Analysis", "Bookkeeping", "Excel (Advanced)", "Financial Modeling",
        "Business Strategy", "Market Research", "Sales", "Customer Service", "CRM", "Salesforce",
        "Operations Management", "Supply Chain Management", "Human Resources",

        // Soft Skills
        "Communication", "Teamwork", "Problem Solving", "Critical Thinking", "Time Management",
        "Adaptability", "Creativity", "Emotional Intelligence", "Public Speaking", "Negotiation",
        "Conflict Resolution", "Decision Making", "Mentoring", "Presentation Skills", "Active Listening",
        "Work Ethic", "Attention to Detail", "Collaboration"
    ];
    const { id } = useParams();
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);
    const [activeSection, setActiveSection] = useState('personal');
    const [saving, setSaving] = useState(false);
    const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const [showVersionHistory, setShowVersionHistory] = useState(false);
    const [zoom, setZoom] = useState(1); // 1 = 100%, 0.5 = 50%, 1.5 = 150%
    const [showAnalyzer, setShowAnalyzer] = useState(false);
    const [showAIPanel, setShowAIPanel] = useState(false);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        if (id && id !== 'new') {
            loadResume();
        } else {
            initializeNewResume();
        }
    }, [id]);

    // Auto-save
    useEffect(() => {
        if (!resume || id === 'new') return;
        const timer = setTimeout(() => handleAutoSave(), 3000);
        return () => clearTimeout(timer);
    }, [resume]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                handleUndo();
            }
            if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
                e.preventDefault();
                handleRedo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [resume, undoStack, redoStack]);

    const loadResume = async () => {
        try {
            const data = await resumeService.getResumeById(id);
            setResume(data);
        } catch (error) {
            console.error('Failed to load resume:', error);
            alert('Failed to load resume');
        }
    };

    const initializeNewResume = () => {
        setResume({
            title: 'Untitled Resume',
            personalInfo: {
                fullName: '', email: '', phone: '', location: '',
                linkedin: '', github: '', portfolio: '', summary: ''
            },
            experience: [],
            education: [],
            skills: { technical: [], soft: [], languages: [], tools: [] },
            projects: [],
            certifications: []
        });
    };

    const handleSave = async () => {
        if (!resume) return;
        setSaving(true);
        setAutoSaveStatus('saving');
        try {
            const isNewResume = id === 'new' || window.location.pathname.includes('/resumes/new');
            if (isNewResume) {
                const created = await resumeService.createResume(resume);
                if (created && created._id) {
                    navigate(`/resumes/${created._id}`, { replace: true });
                    setAutoSaveStatus('saved');
                }
            } else {
                await resumeService.updateResume(id, resume);
                setAutoSaveStatus('saved');
            }
        } catch (error) {
            console.error('Save failed:', error);
            setAutoSaveStatus('error');
            alert(`Failed to save resume: ${error.response?.data?.message || error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleAutoSave = async () => {
        if (id === 'new' || !id || !resume) return;
        setAutoSaveStatus('saving');
        try {
            await resumeService.updateResume(id, resume);
            setAutoSaveStatus('saved');
        } catch (error) {
            console.error('Auto-save failed:', error);
            setAutoSaveStatus('error');
        }
    };

    const handleDownload = () => {
        const printWindow = window.open('', '_blank');
        const resumeElement = document.getElementById('resume-preview');
        if (resumeElement && printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${resume.title || 'Resume'}</title>
                    <style>
                        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                        @media print { body { margin: 0; padding: 0; } }
                    </style>
                </head>
                <body>${resumeElement.innerHTML}</body>
                </html>
            `);
            printWindow.document.close();
            setTimeout(() => printWindow.print(), 250);
        }
    };

    const handleUndo = () => {
        if (undoStack.length === 0) return;
        const previous = undoStack[undoStack.length - 1];
        setRedoStack([...redoStack, JSON.parse(JSON.stringify(resume))]);
        setResume(previous);
        setUndoStack(undoStack.slice(0, -1));
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return;
        const next = redoStack[redoStack.length - 1];
        setUndoStack([...undoStack, JSON.parse(JSON.stringify(resume))]);
        setResume(next);
        setRedoStack(redoStack.slice(0, -1));
    };

    const saveToUndoStack = () => {
        setUndoStack([...undoStack, JSON.parse(JSON.stringify(resume))]);
        setRedoStack([]);
    };

    const addItem = (section) => {
        saveToUndoStack();
        const templates = {
            experience: { company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' },
            education: { institution: '', degree: '', field: '', location: '', startDate: '', endDate: '', gpa: '' },
            projects: { name: '', description: '', technologies: [], link: '', highlights: [] },
            certifications: { name: '', issuer: '', date: '', credentialId: '', link: '' },
            coCurricular: { activity: '', role: '', date: '', description: '' }
        };
        setResume({ ...resume, [section]: [...(resume[section] || []), templates[section]] });
    };

    const removeItem = (section, index) => {
        saveToUndoStack();
        const newItems = [...resume[section]];
        newItems.splice(index, 1);
        setResume({ ...resume, [section]: newItems });
    };

    const updateItem = (section, index, field, value) => {
        const newItems = [...resume[section]];
        newItems[index] = { ...newItems[index], [field]: value };
        setResume({ ...resume, [section]: newItems });
    };

    if (!resume) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-gray-400">Loading workspace...</div>
            </div>
        );
    }

    const sections = [
        { id: 'personal', label: 'General' },
        { id: 'social', label: 'Social Links' },
        { id: 'education', label: 'Education' },
        { id: 'experience', label: 'Experience' },
        { id: 'certifications', label: 'Certificates' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'coCurricular', label: 'Co-curricular & POR' },
        { id: 'templates', label: 'Templates', icon: Layout }
    ];

    const statusIcons = {
        saved: <Check className="w-3 h-3 text-white" />,
        saving: <Loader className="w-3 h-3 animate-spin text-white" />,
        error: <AlertCircle className="w-3 h-3 text-red-400" />
    };

    const statusText = {
        saved: 'Saved',
        saving: 'Saving...',
        error: 'Error'
    };

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
            {/* Top Toolbar - Modern Design */}
            <div className="h-20 bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl border-b border-white/10 px-8 flex items-center justify-between flex-shrink-0 shadow-2xl">
                {/* Left Section */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/resumes')}
                        className="group p-2.5 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl transition-all duration-300 hover:scale-110"
                        title="Back to Resumes"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                    </button>

                    <div className="flex flex-col">
                        <input
                            type="text"
                            value={resume.title}
                            onChange={(e) => setResume({ ...resume, title: e.target.value })}
                            className="text-xl font-bold bg-transparent border-none focus:outline-none text-white w-80 placeholder-gray-500"
                            placeholder="Untitled Resume"
                        />
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full ${autoSaveStatus === 'saved' ? 'bg-emerald-500/20 text-emerald-400' :
                                autoSaveStatus === 'saving' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-red-500/20 text-red-400'
                                }`}>
                                {statusIcons[autoSaveStatus]}
                                <span>{statusText[autoSaveStatus]}</span>
                            </div>
                            {autoSaveStatus === 'saved' && (
                                <span className="text-xs text-gray-500">Last saved {new Date().toLocaleTimeString()}</span>
                            )}
                        </div>
                    </div>
                </div>


                {/* Center Section - Tools */}
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                    <button
                        onClick={handleUndo}
                        disabled={undoStack.length === 0}
                        className="group p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:hover:bg-transparent hover:scale-110 active:scale-95"
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo className="w-4 h-4 text-gray-300 group-hover:text-white transition-all group-hover:-rotate-12" />
                    </button>
                    <button
                        onClick={handleRedo}
                        disabled={redoStack.length === 0}
                        className="group p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:hover:bg-transparent hover:scale-110 active:scale-95"
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo className="w-4 h-4 text-gray-300 group-hover:text-white transition-all group-hover:rotate-12" />
                    </button>

                    <div className="w-px h-6 bg-white/10 mx-1"></div>

                    <button
                        onClick={() => setShowVersionHistory(true)}
                        disabled={id === 'new'}
                        className="group p-2.5 hover:bg-blue-500/20 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:hover:bg-transparent hover:scale-110 active:scale-95"
                        title="Version History"
                    >
                        <History className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-all group-hover:rotate-12" />
                    </button>
                    <button
                        onClick={() => setShowAnalyzer(true)}
                        className="group p-2.5 hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-green-500/20"
                        title="Analyze Resume"
                    >
                        <TrendingUp className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-all group-hover:translate-y-[-2px]" />
                    </button>
                    <button
                        onClick={() => setShowAIPanel(true)}
                        className="group p-2.5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 rounded-xl transition-all duration-200 relative hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-purple-500/20"
                        title="AI Assistant"
                    >
                        <Wand2 className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-all group-hover:rotate-12" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    </button>
                    <button
                        onClick={() => setShowStats(true)}
                        className="group p-2.5 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-orange-500/20"
                        title="Resume Statistics"
                    >
                        <BarChart3 className="w-4 h-4 text-orange-400 group-hover:text-orange-300 transition-all group-hover:scale-110" />
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDownload}
                        className="group px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 flex items-center gap-2 hover:scale-105"
                        title="Export PDF"
                    >
                        <Download className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">Export</span>
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar - Sections */}
                <div className="w-52 bg-[#0a0a0a] border-r border-[#1a1a1a] overflow-y-auto flex-shrink-0">
                    <div className="p-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sections</h3>
                        <div className="space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${activeSection === section.id
                                        ? 'bg-white/10 text-white border-l-2 border-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center - Editor */}
                <div className="flex-1 overflow-y-auto bg-[#0a0a0a] p-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Personal Info */}
                        {activeSection === 'personal' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                                        <input
                                            type="text"
                                            value={resume.personalInfo?.fullName || ''}
                                            onChange={(e) => setResume({
                                                ...resume,
                                                personalInfo: { ...resume.personalInfo, fullName: e.target.value }
                                            })}
                                            className="w-full px-4 py-3 bg-[#111111] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none transition-all placeholder-gray-500"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                                        <input
                                            type="email"
                                            value={resume.personalInfo?.email || ''}
                                            onChange={(e) => setResume({
                                                ...resume,
                                                personalInfo: { ...resume.personalInfo, email: e.target.value }
                                            })}
                                            className="w-full px-4 py-3 bg-[#111111] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Phone</label>
                                        <input
                                            type="tel"
                                            value={resume.personalInfo?.phone || ''}
                                            onChange={(e) => setResume({
                                                ...resume,
                                                personalInfo: { ...resume.personalInfo, phone: e.target.value }
                                            })}
                                            className="w-full px-4 py-3 bg-[#111111] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Location</label>
                                        <input
                                            type="text"
                                            value={resume.personalInfo?.location || ''}
                                            onChange={(e) => setResume({
                                                ...resume,
                                                personalInfo: { ...resume.personalInfo, location: e.target.value }
                                            })}
                                            className="w-full px-4 py-3 bg-[#111111] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                            placeholder="San Francisco, CA"
                                        />
                                    </div>

                                    {/* Tags */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2 text-gray-300">
                                            Tags
                                            <span className="text-xs text-gray-500 ml-2">(Organize your resumes)</span>
                                        </label>
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={skillInput}
                                                    onChange={(e) => setSkillInput(e.target.value)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter' && skillInput.trim()) {
                                                            e.preventDefault();
                                                            const newTag = skillInput.trim().toLowerCase();
                                                            if (!resume.tags?.includes(newTag)) {
                                                                setResume({
                                                                    ...resume,
                                                                    tags: [...(resume.tags || []), newTag]
                                                                });
                                                            }
                                                            setSkillInput('');
                                                        }
                                                    }}
                                                    className="flex-1 px-4 py-2 bg-[#111111] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                    placeholder="Add tags (e.g., frontend, react, senior)..."
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (skillInput.trim()) {
                                                            const newTag = skillInput.trim().toLowerCase();
                                                            if (!resume.tags?.includes(newTag)) {
                                                                setResume({
                                                                    ...resume,
                                                                    tags: [...(resume.tags || []), newTag]
                                                                });
                                                            }
                                                            setSkillInput('');
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            {resume.tags && resume.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {resume.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2 border border-blue-500/30"
                                                        >
                                                            {tag}
                                                            <button
                                                                onClick={() => {
                                                                    setResume({
                                                                        ...resume,
                                                                        tags: resume.tags.filter((_, i) => i !== index)
                                                                    });
                                                                }}
                                                                className="hover:text-red-400 transition-colors"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Professional Summary</label>
                                        <textarea
                                            value={resume.personalInfo?.summary || ''}
                                            onChange={(e) => setResume({
                                                ...resume,
                                                personalInfo: { ...resume.personalInfo, summary: e.target.value }
                                            })}
                                            rows={4}
                                            className="w-full px-4 py-3 bg-[#111111] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none resize-none placeholder-gray-500"
                                            placeholder="Brief professional summary..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Social Links */}
                        {activeSection === 'social' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Social Links</h2>
                                <div className="space-y-4">
                                    {/* Social Links Loop */}
                                    {[
                                        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', placeholder: 'https://www.linkedin.com/in/username' },
                                        { id: 'github', icon: Github, label: 'GitHub', placeholder: 'https://github.com/username' },
                                        { id: 'hackerearth', icon: Terminal, label: 'HackerEarth', placeholder: 'https://www.hackerearth.com/@username' },
                                        { id: 'hackerrank', icon: Code, label: 'HackerRank', placeholder: 'https://www.hackerrank.com/username' },
                                        { id: 'codechef', icon: Cpu, label: 'CodeChef', placeholder: 'https://www.codechef.com/users/username' },
                                        { id: 'leetcode', icon: Code, label: 'LeetCode', placeholder: 'https://leetcode.com/u/username' },
                                        { id: 'codeforces', icon: BarChart, label: 'CodeForces', placeholder: 'https://codeforces.com/profile/username' },
                                        { id: 'portfolio', icon: Globe, label: 'Portfolio', placeholder: 'https://personal-portfolio.com' }
                                    ].map((platform) => (
                                        <div key={platform.id} className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={!!resume.personalInfo?.[platform.id]}
                                                onChange={(e) => {
                                                    if (!e.target.checked) {
                                                        const newInfo = { ...resume.personalInfo };
                                                        delete newInfo[platform.id];
                                                        setResume({
                                                            ...resume,
                                                            personalInfo: newInfo
                                                        });
                                                    } else {
                                                        setResume({
                                                            ...resume,
                                                            personalInfo: { ...resume.personalInfo, [platform.id]: 'https://' }
                                                        });
                                                    }
                                                }}
                                                className="w-5 h-5 rounded border-[#1a1a1a] bg-[#0a0a0a] text-blue-500 focus:ring-0 focus:ring-offset-0 checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                                            />
                                            <div className="flex-1 flex items-center bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden focus-within:border-white/30 transition-colors">
                                                <div className="bg-[#111111] px-3 py-3 border-r border-[#1a1a1a] flex items-center gap-2 text-gray-400 min-w-[140px]">
                                                    <platform.icon className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{platform.label}</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={resume.personalInfo?.[platform.id] || ''}
                                                    onChange={(e) => setResume({
                                                        ...resume,
                                                        personalInfo: { ...resume.personalInfo, [platform.id]: e.target.value }
                                                    })}
                                                    placeholder={platform.placeholder}
                                                    className="flex-1 px-4 py-3 bg-transparent text-white focus:outline-none placeholder-gray-600"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Experience */}
                        {activeSection === 'experience' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-white">Experience</h2>
                                    <button
                                        onClick={() => addItem('experience')}
                                        className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Experience
                                    </button>
                                </div>

                                {resume.experience?.map((exp, index) => (
                                    <div key={index} className="p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg relative group overflow-hidden">
                                        <button
                                            onClick={() => removeItem('experience', index)}
                                            className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 transition-opacity border border-red-500/20 z-10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="space-y-4 pr-12">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Experience Type <span className="text-red-400">*</span>
                                                </label>
                                                <select
                                                    value={exp.experienceType || ''}
                                                    onChange={(e) => updateItem('experience', index, 'experienceType', e.target.value)}
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none"
                                                >
                                                    <option value="">Select type of experience</option>
                                                    <option value="Full-time">Full-time</option>
                                                    <option value="Part-time">Part-time</option>
                                                    <option value="Internship">Internship</option>
                                                    <option value="Freelance">Freelance</option>
                                                    <option value="Contract">Contract</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Designation <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.position || ''}
                                                    onChange={(e) => updateItem('experience', index, 'position', e.target.value)}
                                                    placeholder="Enter your role"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <label className="flex items-start gap-2 text-sm text-gray-300 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={exp.isTechnical || false}
                                                    onChange={(e) => updateItem('experience', index, 'isTechnical', e.target.checked)}
                                                    className="w-4 h-4 mt-0.5 rounded border-[#1a1a1a] bg-[#0a0a0a] text-white focus:ring-white/30"
                                                />
                                                This position involve tasks of programming languages, APIs, or frameworks
                                            </label>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Company Name <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.company || ''}
                                                    onChange={(e) => updateItem('experience', index, 'company', e.target.value)}
                                                    placeholder="Enter Company Name"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Domain of Experience
                                                </label>
                                                <select
                                                    value={exp.domain || ''}
                                                    onChange={(e) => updateItem('experience', index, 'domain', e.target.value)}
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none"
                                                >
                                                    <option value="">Select domain of experience</option>
                                                    <option value="Software Development">Software Development</option>
                                                    <option value="Data Science">Data Science</option>
                                                    <option value="Product Management">Product Management</option>
                                                    <option value="Design">Design</option>
                                                    <option value="Marketing">Marketing</option>
                                                    <option value="Sales">Sales</option>
                                                    <option value="Finance">Finance</option>
                                                    <option value="Operations">Operations</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Start Date <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={exp.startDate || ''}
                                                        onChange={(e) => updateItem('experience', index, 'startDate', e.target.value)}
                                                        placeholder="DD/MM/YYYY"
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        End Date <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={exp.endDate || ''}
                                                        onChange={(e) => updateItem('experience', index, 'endDate', e.target.value)}
                                                        placeholder="DD/MM/YYYY"
                                                        disabled={exp.current}
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500 disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={exp.current || false}
                                                    onChange={(e) => updateItem('experience', index, 'current', e.target.checked)}
                                                    className="w-4 h-4 rounded border-[#1a1a1a] bg-[#0a0a0a] text-white focus:ring-white/30"
                                                />
                                                I am currently working here
                                            </label>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Location of work <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.location || ''}
                                                    onChange={(e) => updateItem('experience', index, 'location', e.target.value)}
                                                    placeholder="Enter the city you work in"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Description <span className="text-red-400">*</span>
                                                </label>
                                                <textarea
                                                    value={exp.description || ''}
                                                    onChange={(e) => updateItem('experience', index, 'description', e.target.value)}
                                                    placeholder="Describe your experience using bullet points: roles, impact with data, skills/tools used, optional achievements."
                                                    rows={5}
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none resize-none placeholder-gray-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {resume.experience?.length === 0 && (
                                    <div className="text-center py-12 text-gray-500 bg-[#111111] border border-[#1a1a1a] rounded-lg">
                                        <p>No experience added yet. Click "Add Experience" to get started.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Education */}
                        {activeSection === 'education' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-white">Education</h2>
                                    <button
                                        onClick={() => addItem('education')}
                                        className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Education
                                    </button>
                                </div>

                                {resume.education?.map((edu, index) => (
                                    <div key={index} className="p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg relative group overflow-hidden">
                                        <button
                                            onClick={() => removeItem('education', index)}
                                            className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 transition-opacity border border-red-500/20 z-10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="space-y-4 pr-12">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Education Type <span className="text-red-400">*</span>
                                                </label>
                                                <select
                                                    value={edu.educationType || ''}
                                                    onChange={(e) => updateItem('education', index, 'educationType', e.target.value)}
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none"
                                                >
                                                    <option value="">Select level of education</option>
                                                    <option value="High School">High School</option>
                                                    <option value="Associate">Associate Degree</option>
                                                    <option value="Bachelor">Bachelor's Degree</option>
                                                    <option value="Master">Master's Degree</option>
                                                    <option value="PhD">PhD</option>
                                                    <option value="Diploma">Diploma</option>
                                                    <option value="Certificate">Certificate</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Institute <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.institution || ''}
                                                    onChange={(e) => updateItem('education', index, 'institution', e.target.value)}
                                                    placeholder="Enter your Institute Name"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Degree <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.degree || ''}
                                                    onChange={(e) => updateItem('education', index, 'degree', e.target.value)}
                                                    placeholder="ex. Bachelor of Education"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Field of Study <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.field || ''}
                                                    onChange={(e) => updateItem('education', index, 'field', e.target.value)}
                                                    placeholder="ex. Computer Science"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Start Date <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={edu.startDate || ''}
                                                        onChange={(e) => updateItem('education', index, 'startDate', e.target.value)}
                                                        placeholder="DD/MM/YYYY"
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        End Date <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={edu.endDate || ''}
                                                        onChange={(e) => updateItem('education', index, 'endDate', e.target.value)}
                                                        placeholder="DD/MM/YYYY"
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Grade Type <span className="text-red-400">*</span>
                                                </label>
                                                <select
                                                    value={edu.gradeType || ''}
                                                    onChange={(e) => updateItem('education', index, 'gradeType', e.target.value)}
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none"
                                                >
                                                    <option value="">Select grade type</option>
                                                    <option value="Percentage">Percentage</option>
                                                    <option value="CGPA">CGPA</option>
                                                    <option value="GPA">GPA</option>
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Grade <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={edu.grade || ''}
                                                        onChange={(e) => updateItem('education', index, 'grade', e.target.value)}
                                                        placeholder="Percentage or CGPA"
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Max Grade <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={edu.maxGrade || ''}
                                                        onChange={(e) => updateItem('education', index, 'maxGrade', e.target.value)}
                                                        placeholder="Percentage or CGPA"
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {resume.education?.length === 0 && (
                                    <div className="text-center py-12 text-gray-500 bg-[#111111] border border-[#1a1a1a] rounded-lg">
                                        <p>No education added yet. Click "Add Education" to get started.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Skills */}
                        {activeSection === 'skills' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
                                <div>
                                    <div className="relative mb-6">
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                            <input
                                                type="text"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        if (skillInput.trim()) {
                                                            const newSkills = [...(resume.skills?.technical || [])];
                                                            if (!newSkills.includes(skillInput.trim())) {
                                                                newSkills.push(skillInput.trim());
                                                                setResume({ ...resume, skills: { ...resume.skills, technical: newSkills } });
                                                            }
                                                            setSkillInput('');
                                                        }
                                                    }
                                                }}
                                                placeholder="Search Skills..."
                                                className="w-full pr-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                style={{ paddingLeft: '48px' }}
                                            />
                                        </div>

                                        <div className="mt-4 max-h-60 overflow-y-auto border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-2 space-y-1 custom-scrollbar">
                                            {POPULAR_SKILLS
                                                .filter(skill => skill.toLowerCase().includes(skillInput.toLowerCase()))
                                                .map((skill, index) => {
                                                    const isSelected = resume.skills?.technical?.includes(skill);
                                                    return (
                                                        <label key={index} className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer transition-colors group">
                                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-white border-white' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                                                {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                                                            </div>
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected || false}
                                                                onChange={() => {
                                                                    const currentSkills = resume.skills?.technical || [];
                                                                    let newSkills;
                                                                    if (isSelected) {
                                                                        newSkills = currentSkills.filter(s => s !== skill);
                                                                    } else {
                                                                        newSkills = [...currentSkills, skill];
                                                                    }
                                                                    setResume({ ...resume, skills: { ...resume.skills, technical: newSkills } });
                                                                }}
                                                                className="hidden"
                                                            />
                                                            <span className={isSelected ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}>{skill}</span>
                                                        </label>
                                                    );
                                                })}

                                            {skillInput && !POPULAR_SKILLS.some(s => s.toLowerCase() === skillInput.toLowerCase()) && (
                                                <button
                                                    onClick={() => {
                                                        const newSkills = [...(resume.skills?.technical || [])];
                                                        if (!newSkills.includes(skillInput.trim())) {
                                                            newSkills.push(skillInput.trim());
                                                            setResume({ ...resume, skills: { ...resume.skills, technical: newSkills } });
                                                        }
                                                        setSkillInput('');
                                                    }}
                                                    className="w-full text-left p-2 text-blue-400 hover:bg-[#1a1a1a] rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add "{skillInput}" as custom skill
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {resume.skills?.technical?.map((skill, index) => (
                                            <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-lg text-sm font-semibold shadow-sm group">
                                                {skill}
                                                <button
                                                    onClick={() => {
                                                        const newSkills = resume.skills.technical.filter((_, i) => i !== index);
                                                        setResume({ ...resume, skills: { ...resume.skills, technical: newSkills } });
                                                    }}
                                                    className="text-gray-500 hover:text-red-600 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {(!resume.skills?.technical || resume.skills.technical.length === 0) && (
                                        <p className="text-gray-500 text-sm mt-2">Selected skills will appear here.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {activeSection === 'projects' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-white">Projects</h2>
                                    <button
                                        onClick={() => addItem('projects')}
                                        className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Project
                                    </button>
                                </div>

                                {resume.projects?.map((proj, index) => (
                                    <div key={index} className="p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg relative group overflow-hidden">
                                        <button
                                            onClick={() => removeItem('projects', index)}
                                            className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 transition-opacity border border-red-500/20 z-10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Title <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={proj.name || ''}
                                                    onChange={(e) => updateItem('projects', index, 'name', e.target.value)}
                                                    placeholder="Name of your project"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500 pr-12"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Role <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={proj.role || ''}
                                                    onChange={(e) => updateItem('projects', index, 'role', e.target.value)}
                                                    placeholder="Enter your role"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Code URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={proj.codeUrl || ''}
                                                    onChange={(e) => updateItem('projects', index, 'codeUrl', e.target.value)}
                                                    placeholder="Enter the code URL for the project (e.g., GitHub)"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Hosted URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={proj.hostedUrl || ''}
                                                    onChange={(e) => updateItem('projects', index, 'hostedUrl', e.target.value)}
                                                    placeholder="Enter the hosted URL for the project"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Start Date <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={proj.startDate || ''}
                                                        onChange={(e) => updateItem('projects', index, 'startDate', e.target.value)}
                                                        placeholder="MM/YYYY"
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        End Date <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={proj.endDate || ''}
                                                        onChange={(e) => updateItem('projects', index, 'endDate', e.target.value)}
                                                        placeholder="MM/YYYY"
                                                        disabled={proj.current}
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500 disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={proj.current || false}
                                                    onChange={(e) => updateItem('projects', index, 'current', e.target.checked)}
                                                    className="w-4 h-4 rounded border-[#1a1a1a] bg-[#0a0a0a] text-white focus:ring-white/30"
                                                />
                                                I am currently working on this project
                                            </label>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Description <span className="text-red-400">*</span>
                                                </label>
                                                <textarea
                                                    value={proj.description || ''}
                                                    onChange={(e) => updateItem('projects', index, 'description', e.target.value)}
                                                    placeholder="Describe your projects using bullet points: objectives/scope, findings/insights, skills/tools used, project impact."
                                                    rows={5}
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none resize-none placeholder-gray-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {resume.projects?.length === 0 && (
                                    <div className="text-center py-12 text-gray-500 bg-[#111111] border border-[#1a1a1a] rounded-lg">
                                        <p>No projects added yet. Click "Add Project" to get started.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Certifications */}
                        {activeSection === 'certifications' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-white">Certifications</h2>
                                    <button
                                        onClick={() => addItem('certifications')}
                                        className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Certification
                                    </button>
                                </div>

                                {resume.certifications?.map((cert, index) => (
                                    <div key={index} className="p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg relative group overflow-hidden">
                                        <button
                                            onClick={() => removeItem('certifications', index)}
                                            className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 transition-opacity border border-red-500/20 z-10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="space-y-4 pr-12">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Certificate Title <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.name || ''}
                                                    onChange={(e) => updateItem('certifications', index, 'name', e.target.value)}
                                                    placeholder="Enter certificate title"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Provider Organisation Name <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.issuer || ''}
                                                    onChange={(e) => updateItem('certifications', index, 'issuer', e.target.value)}
                                                    placeholder="Enter Organisation Name"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Start Date <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.date || ''}
                                                    onChange={(e) => updateItem('certifications', index, 'date', e.target.value)}
                                                    placeholder="DD/MM/YYYY"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Certification Link
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.link || ''}
                                                    onChange={(e) => updateItem('certifications', index, 'link', e.target.value)}
                                                    placeholder="Enter Certification Name"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={cert.description || ''}
                                                    onChange={(e) => updateItem('certifications', index, 'description', e.target.value)}
                                                    placeholder="Mention details about the certificate along with the skills required"
                                                    rows={4}
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none resize-none placeholder-gray-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {resume.certifications?.length === 0 && (
                                    <div className="text-center py-12 text-gray-500 bg-[#111111] border border-[#1a1a1a] rounded-lg">
                                        <p>No certifications added yet. Click "Add Certification" to get started.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Co-curricular & POR */}
                        {activeSection === 'coCurricular' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-white">Co-curricular & POR</h2>
                                    <button
                                        onClick={() => addItem('coCurricular')}
                                        className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Item
                                    </button>
                                </div>

                                {resume.coCurricular?.map((item, index) => (
                                    <div key={index} className="p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg relative group overflow-hidden">
                                        <button
                                            onClick={() => removeItem('coCurricular', index)}
                                            className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 transition-opacity border border-red-500/20 z-10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="space-y-4 pr-12">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Activity / Event Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.activity || ''}
                                                    onChange={(e) => updateItem('coCurricular', index, 'activity', e.target.value)}
                                                    placeholder="e.g. Annual Tech Fest"
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Role / Position
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.role || ''}
                                                        onChange={(e) => updateItem('coCurricular', index, 'role', e.target.value)}
                                                        placeholder="e.g. Lead Organizer"
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                                        Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.date || ''}
                                                        onChange={(e) => updateItem('coCurricular', index, 'date', e.target.value)}
                                                        placeholder="e.g. Mar 2023"
                                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none placeholder-gray-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={item.description || ''}
                                                    onChange={(e) => updateItem('coCurricular', index, 'description', e.target.value)}
                                                    placeholder="Describe your role and impact..."
                                                    rows={4}
                                                    className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none resize-none placeholder-gray-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {resume.coCurricular?.length === 0 && (
                                    <div className="text-center py-12 text-gray-500 bg-[#111111] border border-[#1a1a1a] rounded-lg">
                                        <p>No items added yet. Click "Add Item" to get started.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Templates Selection */}
                        {activeSection === 'templates' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Choose Template</h2>

                                {/* Built-in Templates */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Built-in Templates</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Standard */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'standard' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${(resume.metadata?.layout || 'standard') === 'standard' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-white w-full rounded-md shadow-sm overflow-hidden p-3 select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="w-full h-3 bg-gray-900 mb-2" />
                                                <div className="w-2/3 h-1.5 bg-gray-500 mb-4" />
                                                <div className="space-y-2">
                                                    <div className="w-full h-1 bg-gray-200" />
                                                    <div className="w-full h-1 bg-gray-200" />
                                                    <div className="w-full h-1 bg-gray-200" />
                                                    <div className="w-3/4 h-1 bg-gray-200" />
                                                </div>
                                                <div className="mt-4 w-1/3 h-1.5 bg-gray-400 mb-2" />
                                                <div className="space-y-2">
                                                    <div className="w-full h-1 bg-gray-200" />
                                                    <div className="w-5/6 h-1 bg-gray-200" />
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${(resume.metadata?.layout || 'standard') === 'standard' ? 'text-blue-400' : 'text-white'}`}>
                                                    Classic Serif
                                                </span>
                                                <p className="text-xs text-gray-500">Traditional, elegant, and perfect for academic or executive roles.</p>
                                            </div>
                                        </button>

                                        {/* Modern */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'modern' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${resume.metadata?.layout === 'modern' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-white w-full rounded-md shadow-sm overflow-hidden flex select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="w-1/3 bg-gray-100 h-full p-2 border-r border-gray-200">
                                                    <div className="w-full h-2 bg-gray-300 mb-4 rounded" />
                                                    <div className="w-full h-1 bg-gray-300 mb-2 rounded" />
                                                    <div className="w-full h-1 bg-gray-300 mb-2 rounded" />
                                                </div>
                                                <div className="w-2/3 p-3">
                                                    <div className="w-full h-4 bg-black mb-2" />
                                                    <div className="w-3/4 h-2 bg-gray-600 mb-6" />
                                                    <div className="space-y-2">
                                                        <div className="w-1/3 h-2 bg-gray-800 mb-2" />
                                                        <div className="w-full h-1 bg-gray-200" />
                                                        <div className="w-full h-1 bg-gray-200" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${resume.metadata?.layout === 'modern' ? 'text-blue-400' : 'text-white'}`}>
                                                    Modern Bold
                                                </span>
                                                <p className="text-xs text-gray-500">Contemporary two-column design with bold typography.</p>
                                            </div>
                                        </button>

                                        {/* Minimalist */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'minimalist' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${resume.metadata?.layout === 'minimalist' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-white w-full rounded-md shadow-sm overflow-hidden p-4 select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="w-2/3 h-2 bg-gray-900 mb-6 mx-auto" />
                                                <div className="w-1/2 h-1 bg-gray-400 mb-8 mx-auto" />
                                                <div className="space-y-3">
                                                    <div className="w-full h-0.5 bg-gray-200" />
                                                    <div className="w-full h-0.5 bg-gray-200" />
                                                    <div className="w-3/4 h-0.5 bg-gray-200 mx-auto" />
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${resume.metadata?.layout === 'minimalist' ? 'text-blue-400' : 'text-white'}`}>
                                                    Minimalist Clean
                                                </span>
                                                <p className="text-xs text-gray-500">Centered layout with lots of white space and thin lines.</p>
                                            </div>
                                        </button>

                                        {/* Creative */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'creative' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${resume.metadata?.layout === 'creative' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-white w-full rounded-md shadow-sm overflow-hidden p-3 select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="w-full h-3 bg-gradient-to-r from-purple-500 to-pink-500 mb-3 rounded" />
                                                <div className="w-2/3 h-2 bg-gray-900 mb-2" />
                                                <div className="w-1/2 h-1.5 bg-gray-500 mb-4" />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-1">
                                                        <div className="w-full h-1 bg-gray-200" />
                                                        <div className="w-full h-1 bg-gray-200" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="w-full h-1 bg-gray-200" />
                                                        <div className="w-full h-1 bg-gray-200" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${resume.metadata?.layout === 'creative' ? 'text-blue-400' : 'text-white'}`}>
                                                    Creative Portfolio
                                                </span>
                                                <p className="text-xs text-gray-500">Vibrant gradient header with two-column design.</p>
                                            </div>
                                        </button>

                                        {/* Professional */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'professional' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${resume.metadata?.layout === 'professional' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-white w-full rounded-md shadow-sm overflow-hidden p-3 select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="w-full h-4 bg-gray-900 mb-2 border-b-4 border-gray-800" />
                                                <div className="w-2/3 h-1.5 bg-gray-600 mb-4" />
                                                <div className="space-y-2">
                                                    <div className="w-full h-1 bg-gray-200" />
                                                    <div className="w-full h-1 bg-gray-200" />
                                                    <div className="w-3/4 h-1 bg-gray-200" />
                                                </div>
                                                <div className="mt-4 w-1/2 h-1.5 bg-gray-400 mb-2 border-b-2 border-gray-300" />
                                                <div className="space-y-1">
                                                    <div className="w-full h-0.5 bg-gray-200" />
                                                    <div className="w-5/6 h-0.5 bg-gray-200" />
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${resume.metadata?.layout === 'professional' ? 'text-blue-400' : 'text-white'}`}>
                                                    Executive Professional
                                                </span>
                                                <p className="text-xs text-gray-500">Formal serif font with bold headers for senior roles.</p>
                                            </div>
                                        </button>

                                        {/* Technical */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'technical' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${resume.metadata?.layout === 'technical' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-gray-50 w-full rounded-md shadow-sm overflow-hidden select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-gray-900 p-2">
                                                    <div className="flex gap-1 mb-2">
                                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                                    </div>
                                                    <div className="w-2/3 h-2 bg-green-400 mb-1" />
                                                    <div className="w-1/2 h-1 bg-green-300" />
                                                </div>
                                                <div className="p-2 space-y-2">
                                                    <div className="w-full h-1 bg-blue-200" />
                                                    <div className="w-3/4 h-1 bg-gray-300" />
                                                    <div className="w-5/6 h-1 bg-gray-300" />
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${resume.metadata?.layout === 'technical' ? 'text-blue-400' : 'text-white'}`}>
                                                    Tech Developer
                                                </span>
                                                <p className="text-xs text-gray-500">Terminal-style with monospace font for developers.</p>
                                            </div>
                                        </button>

                                        {/* Compact */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'compact' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${resume.metadata?.layout === 'compact' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-white w-full rounded-md shadow-sm overflow-hidden p-2 select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="w-full h-2 bg-gray-900 mb-1 border-b-2 border-gray-900" />
                                                <div className="grid grid-cols-3 gap-1">
                                                    <div className="space-y-1">
                                                        <div className="w-full h-0.5 bg-gray-300" />
                                                        <div className="w-full h-0.5 bg-gray-200" />
                                                        <div className="w-full h-0.5 bg-gray-200" />
                                                    </div>
                                                    <div className="col-span-2 space-y-1">
                                                        <div className="w-full h-0.5 bg-gray-300" />
                                                        <div className="w-full h-0.5 bg-gray-200" />
                                                        <div className="w-3/4 h-0.5 bg-gray-200" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${resume.metadata?.layout === 'compact' ? 'text-blue-400' : 'text-white'}`}>
                                                    Compact Dense
                                                </span>
                                                <p className="text-xs text-gray-500">Space-efficient with small fonts and tight spacing.</p>
                                            </div>
                                        </button>

                                        {/* Elegant */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'elegant' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${resume.metadata?.layout === 'elegant' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-white w-full rounded-md shadow-sm overflow-hidden p-3 select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="w-2/3 h-3 bg-gray-200 mb-2 mx-auto" />
                                                <div className="w-1/2 h-1 bg-gray-300 mb-3 mx-auto" />
                                                <div className="w-full h-px bg-gray-300 mb-3" />
                                                <div className="space-y-2">
                                                    <div className="w-full h-0.5 bg-gray-200 mx-auto" />
                                                    <div className="w-5/6 h-0.5 bg-gray-200 mx-auto" />
                                                    <div className="w-4/5 h-0.5 bg-gray-200 mx-auto" />
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${resume.metadata?.layout === 'elegant' ? 'text-blue-400' : 'text-white'}`}>
                                                    Elegant Refined
                                                </span>
                                                <p className="text-xs text-gray-500">Sophisticated serif with centered, classical layout.</p>
                                            </div>
                                        </button>

                                        {/* Bold */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'bold' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${resume.metadata?.layout === 'bold' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-white w-full rounded-md shadow-sm overflow-hidden select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-gray-900 p-2">
                                                    <div className="w-3/4 h-3 bg-white mb-1" />
                                                    <div className="w-1/2 h-1.5 bg-gray-400" />
                                                </div>
                                                <div className="p-2 space-y-2">
                                                    <div className="w-full h-1 bg-gray-900 border-b-2 border-gray-900" />
                                                    <div className="border-l-4 border-gray-400 pl-2 space-y-1">
                                                        <div className="w-3/4 h-1 bg-gray-800" />
                                                        <div className="w-full h-0.5 bg-gray-300" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${resume.metadata?.layout === 'bold' ? 'text-blue-400' : 'text-white'}`}>
                                                    Bold Impact
                                                </span>
                                                <p className="text-xs text-gray-500">Strong typography with high contrast and thick borders.</p>
                                            </div>
                                        </button>

                                        {/* Timeline */}
                                        <button
                                            onClick={() => setResume({ ...resume, templateId: null, metadata: { ...resume.metadata, layout: 'timeline' } })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-3 group text-left ${resume.metadata?.layout === 'timeline' && !resume.templateId
                                                ? 'bg-white/10 border-blue-500'
                                                : 'bg-[#111] border-[#1a1a1a] hover:border-white/20'
                                                }`}
                                        >
                                            <div className="aspect-[8.5/11] bg-gradient-to-br from-slate-50 to-gray-100 w-full rounded-md shadow-sm overflow-hidden p-3 select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                                                <div className="w-2/3 h-2 bg-gray-900 mb-2 mx-auto" />
                                                <div className="relative pl-3 border-l-2 border-blue-300 mt-3">
                                                    <div className="absolute -left-[5px] top-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <div className="w-full h-3 bg-white rounded mb-2 shadow-sm" />
                                                    <div className="absolute -left-[5px] top-5 w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <div className="w-full h-3 bg-white rounded mb-2 shadow-sm" />
                                                    <div className="absolute -left-[5px] top-10 w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <div className="w-3/4 h-2 bg-white rounded shadow-sm" />
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${resume.metadata?.layout === 'timeline' ? 'text-blue-400' : 'text-white'}`}>
                                                    Timeline Visual
                                                </span>
                                                <p className="text-xs text-gray-500">Vertical timeline with colored dots and cards.</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Right - Live Preview */}
                <div className="w-[600px] bg-[#0a0a0a] p-8 overflow-y-auto border-l border-[#1a1a1a] flex-shrink-0">
                    {/* Zoom Controls */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white">Live Preview</h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                                disabled={zoom <= 0.5}
                                className="p-2 bg-[#1a1a1a] text-white rounded hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Zoom Out"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                                </svg>
                            </button>
                            <span className="text-xs text-gray-400 font-mono min-w-[50px] text-center">
                                {Math.round(zoom * 100)}%
                            </span>
                            <button
                                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                                disabled={zoom >= 2}
                                className="p-2 bg-[#1a1a1a] text-white rounded hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Zoom In"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setZoom(1)}
                                className="px-3 py-2 bg-[#1a1a1a] text-white text-xs rounded hover:bg-[#2a2a2a] transition-colors"
                                title="Reset Zoom"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Preview Container */}
                    <div
                        id="resume-preview"
                        className="bg-white p-8 shadow-2xl transition-transform duration-200"
                        style={{
                            aspectRatio: '8.5/11',
                            transform: `scale(${zoom})`,
                            transformOrigin: 'top center'
                        }}
                    >
                        {/* Dynamic Template Renderer */}
                        {(() => {
                            switch (resume.metadata?.layout) {
                                case 'modern':
                                    return <ModernTemplate resume={resume} />;
                                case 'minimalist':
                                    return <MinimalistTemplate resume={resume} />;
                                case 'creative':
                                    return <CreativeTemplate resume={resume} />;
                                case 'professional':
                                    return <ProfessionalTemplate resume={resume} />;
                                case 'technical':
                                    return <TechnicalTemplate resume={resume} />;
                                case 'compact':
                                    return <CompactTemplate resume={resume} />;
                                case 'elegant':
                                    return <ElegantTemplate resume={resume} />;
                                case 'bold':
                                    return <BoldTemplate resume={resume} />;
                                case 'timeline':
                                    return <TimelineTemplate resume={resume} />;
                                default:
                                    return <StandardTemplate resume={resume} />;
                            }
                        })()}
                    </div>
                </div>
            </div>

            {/* Version History Modal */}
            {showVersionHistory && id && id !== 'new' && (
                <VersionHistory
                    resumeId={id}
                    onClose={() => setShowVersionHistory(false)}
                    onRestore={() => {
                        loadResume();
                        setShowVersionHistory(false);
                    }}
                />
            )}

            {/* Resume Analyzer Modal */}
            {showAnalyzer && resume && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8 overflow-y-auto">
                    <div className="bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] max-w-5xl w-full max-h-[90vh] overflow-y-auto p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Resume Analysis</h2>
                            <button
                                onClick={() => setShowAnalyzer(false)}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                        <ResumeAnalyzer
                            resume={resume}
                            onClose={() => setShowAnalyzer(false)}
                        />
                    </div>
                </div>
            )}

            {/* AI Features Panel Modal */}
            {showAIPanel && resume && id && id !== 'new' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8 overflow-y-auto">
                    <div className="bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">AI Assistant</h2>
                            <button
                                onClick={() => setShowAIPanel(false)}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                        <AIFeaturesPanel
                            resumeId={id}
                            resumeData={resume}
                            onUpdate={(field, value) => {
                                // Handle AI-generated content updates
                                if (field === 'summary') {
                                    setResume({
                                        ...resume,
                                        personalInfo: {
                                            ...resume.personalInfo,
                                            summary: value
                                        }
                                    });
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Resume Statistics Modal */}
            {showStats && resume && (
                <ResumeStats
                    resume={resume}
                    onClose={() => setShowStats(false)}
                />
            )}
        </div>
    );
};

export default ResumeWorkspace;
