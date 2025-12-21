import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, LogOut, Save, Check, FileText, Briefcase, Clock, TrendingUp, Activity } from 'lucide-react';
import { resumeService, jobService } from '../services/api';

const ProfilePage = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.profile?.phone || '',
        location: user?.profile?.location || '',
        website: user?.profile?.website || '',
        linkedin: user?.profile?.linkedin || '',
        github: user?.profile?.github || '',
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [stats, setStats] = useState({
        resumes: 0,
        applications: 0,
        activeResumes: 0,
        recentResumes: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const resumeData = await resumeService.getResumeStats();

                let jobTotal = 0;
                try {
                    const jobData = await jobService.getJobStats();
                    jobTotal = jobData.total || 0;
                } catch (jobError) {
                    console.log('Job stats not available');
                }

                setStats({
                    resumes: resumeData.total || 0,
                    applications: jobTotal,
                    activeResumes: resumeData.active || 0,
                    recentResumes: resumeData.recent || []
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        fetchStats();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setTimeout(() => {
            updateUser(formData);
            setSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="h-screen bg-[#0a0a0a] p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
                    <p className="text-base text-gray-400">Manage your personal information</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Left Sidebar */}
                    <div className="space-y-6">
                        {/* Avatar Card */}
                        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6">
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="text-xl font-bold text-white mb-1">{user?.name}</h2>
                                <p className="text-sm text-gray-400 mb-4">{user?.email}</p>
                                <div className="flex gap-2 justify-center">
                                    <div className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20 font-medium">
                                        Active
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Stats Card */}
                        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6">
                            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Your Stats
                            </h3>
                            <div className="space-y-4">
                                {/* Total Resumes */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm text-gray-400">Total Resumes</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{stats.resumes}</span>
                                </div>

                                {/* Active/Inactive Breakdown */}
                                <div className="p-3 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-500">Active</span>
                                        <span className="text-xs font-semibold text-green-400">{stats.activeResumes}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500">Inactive</span>
                                        <span className="text-xs font-semibold text-gray-600">{stats.resumes - stats.activeResumes}</span>
                                    </div>
                                    {/* Progress Bar */}
                                    <div className="mt-2 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                                            style={{ width: `${stats.resumes > 0 ? (stats.activeResumes / stats.resumes) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Applications */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-purple-400" />
                                        <span className="text-sm text-gray-400">Applications</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{stats.applications}</span>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-[#1a1a1a]">
                                    <span className="text-sm text-gray-400">Member Since</span>
                                    <span className="text-sm font-semibold text-white">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Resumes Widget */}
                        {stats.recentResumes && stats.recentResumes.length > 0 && (
                            <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6">
                                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Recent Resumes
                                </h3>
                                <div className="space-y-3">
                                    {stats.recentResumes.map((resume) => (
                                        <Link
                                            key={resume._id}
                                            to={`/resumes/${resume._id}`}
                                            className="block p-3 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] hover:border-white/20 transition-all group"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                                                        {resume.title || 'Untitled Resume'}
                                                    </h4>
                                                    {resume.metadata?.targetRole && (
                                                        <p className="text-xs text-gray-500 mt-1 truncate">
                                                            {resume.metadata.targetRole}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-600 flex-shrink-0">
                                                    {new Date(resume.lastModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full px-6 py-3 bg-[#111111] border border-[#1a1a1a] text-gray-400 rounded-xl hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-3 group font-medium"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Main Form */}
                    <div className="col-span-2">
                        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-8">
                            <h3 className="text-2xl font-bold mb-8 text-white">Personal Information</h3>

                            <div className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none transition-all placeholder-gray-500"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none transition-all placeholder-gray-500"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none transition-all placeholder-gray-500"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none transition-all placeholder-gray-500"
                                        placeholder="San Francisco, CA"
                                    />
                                </div>

                                {/* Website */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                                    <input
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none transition-all placeholder-gray-500"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>

                                {/* LinkedIn */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                                    <input
                                        type="url"
                                        value={formData.linkedin}
                                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none transition-all placeholder-gray-500"
                                        placeholder="linkedin.com/in/johndoe"
                                    />
                                </div>

                                {/* GitHub */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                                    <input
                                        type="url"
                                        value={formData.github}
                                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#0a0a0a] text-white border border-[#1a1a1a] rounded-lg focus:border-white/30 focus:outline-none transition-all placeholder-gray-500"
                                        placeholder="github.com/johndoe"
                                    />
                                </div>

                                {/* Save Button */}
                                <div className="pt-4">
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="w-full px-6 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {saving ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : saved ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Saved!
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
