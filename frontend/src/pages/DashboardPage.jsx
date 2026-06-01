import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeService, jobService } from '../services/api';
import { FileText, Briefcase, Plus, TrendingUp, ArrowRight, BarChart3, Target } from 'lucide-react';

const DashboardPage = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ total: 0, active: 0, recent: [] });
    const [jobStats, setJobStats] = useState({ total: 0, byStatus: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            // Load resume stats
            const resumeData = await resumeService.getResumeStats();
            setStats(resumeData);

            // Try to load job stats, but don't fail if endpoint doesn't exist
            try {
                const jobData = await jobService.getJobStats();
                setJobStats(jobData);
            } catch {
                // Set default empty job stats
                setJobStats({ total: 0, byStatus: {} });
            }
        } catch (error) {
            console.error('Failed to load dashboard:', error);
            // Set default values on error
            setStats({ total: 0, active: 0, recent: [] });
            setJobStats({ total: 0, byStatus: {} });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen bg-surface-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-ink/60">Loading your workspace...</p>
                </div>
            </div>
        );
    }

    const totalApplications = jobStats.total || 0;
    const successRate = totalApplications > 0
        ? Math.round(((jobStats.byStatus?.Offer || 0) / totalApplications) * 100)
        : 0;

    const firstName = user?.name?.split(' ')[0] || 'there';

    return (
        <div className="h-screen bg-surface-1 p-6 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="mb-6 flex-shrink-0">
                <h1 className="text-4xl font-bold text-ink mb-2">
                    Welcome back, {firstName}
                </h1>
                <p className="text-base text-ink/60">
                    Here's what's happening with your job search today
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6 flex-shrink-0">
                <div className="bg-surface-2 border border-ink/5 rounded-xl p-4 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-ink" />
                        </div>
                    </div>
                    <div className="text-3xl font-serif font-semibold text-ink mb-1">{stats.total}</div>
                    <div className="text-sm text-ink/60">Resumes</div>
                </div>

                <div className="bg-surface-2 border border-ink/5 rounded-xl p-4 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-ink" />
                        </div>
                    </div>
                    <div className="text-3xl font-serif font-semibold text-ink mb-1">{totalApplications}</div>
                    <div className="text-sm text-ink/60">Applications</div>
                </div>

                <div className="bg-surface-2 border border-ink/5 rounded-xl p-4 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-ink" />
                        </div>
                    </div>
                    <div className="text-3xl font-serif font-semibold text-ink mb-1">{successRate}%</div>
                    <div className="text-sm text-ink/60">Success Rate</div>
                </div>

                <div className="bg-surface-2 border border-ink/5 rounded-xl p-4 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-ink" />
                        </div>
                    </div>
                    <div className="text-3xl font-serif font-semibold text-ink mb-1">{jobStats.byStatus?.Interview || 0}</div>
                    <div className="text-sm text-ink/60">Interviews</div>
                </div>
            </div>

            {/* Main Content - Flex 1 to fill remaining space */}
            <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
                {/* Recent Resumes */}
                <div className="col-span-2 bg-surface-2 border border-ink/5 rounded-xl p-6 flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                        <div>
                            <h2 className="text-xl font-bold text-ink">Recent Resumes</h2>
                            <p className="text-sm text-ink/60">Your latest versions</p>
                        </div>
                        <Link
                            to="/workspace"
                            className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            New
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto min-h-0">
                        {stats.recent && stats.recent.length > 0 ? (
                            <div className="space-y-2">
                                {stats.recent.slice(0, 4).map((resume) => (
                                    <Link
                                        key={resume._id}
                                        to={`/workspace/${resume._id}`}
                                        className="group block p-4 bg-surface-1 border border-ink/5 rounded-lg hover:border-white/20 transition-all"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-4 h-4 text-ink" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base font-semibold text-ink truncate">
                                                        {resume.title || 'Untitled Resume'}
                                                    </h3>
                                                    <p className="text-sm text-ink/40">
                                                        {new Date(resume.updatedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-ink transition-colors flex-shrink-0" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                                    <FileText className="w-6 h-6 text-gray-600" />
                                </div>
                                <h3 className="text-base font-semibold text-ink mb-1">No resumes yet</h3>
                                <p className="text-sm text-ink/60 mb-4">Create your first resume</p>
                                <Link
                                    to="/workspace"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Resume
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4 flex flex-col overflow-hidden">
                    {/* Quick Actions */}
                    <div className="bg-surface-2 border border-ink/5 rounded-xl p-5 flex-shrink-0">
                        <h3 className="text-base font-bold text-ink mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <Link
                                to="/resumes/new"
                                className="flex items-center gap-3 p-3 bg-surface-1 border border-ink/5 rounded-lg hover:border-white/20 transition-all group"
                            >
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-ink" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-ink">New Resume</div>
                                </div>
                                <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-ink transition-colors" />
                            </Link>

                            <Link
                                to="/applications"
                                className="flex items-center gap-3 p-3 bg-surface-1 border border-ink/5 rounded-lg hover:border-white/20 transition-all group"
                            >
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                    <Briefcase className="w-4 h-4 text-ink" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-ink">Track Job</div>
                                </div>
                                <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-ink transition-colors" />
                            </Link>

                            <Link
                                to="/analytics"
                                className="flex items-center gap-3 p-3 bg-surface-1 border border-ink/5 rounded-lg hover:border-white/20 transition-all group"
                            >
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-4 h-4 text-ink" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-semibold text-ink">Analytics</div>
                                </div>
                                <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-ink transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Application Pipeline */}
                    <div className="bg-surface-2 border border-ink/5 rounded-xl p-5 flex-1 min-h-0 overflow-hidden">
                        <h3 className="text-base font-bold text-ink mb-4">Pipeline</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-ink/60">Applied</span>
                                    <span className="text-ink font-medium">{jobStats.byStatus?.Applied || 0}</span>
                                </div>
                                <div className="h-1.5 bg-surface-1 rounded-full overflow-hidden">
                                    <div className="h-full bg-white/20 rounded-full" style={{ width: `${(jobStats.byStatus?.Applied || 0) / Math.max(totalApplications, 1) * 100}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-ink/60">Interview</span>
                                    <span className="text-ink font-medium">{jobStats.byStatus?.Interview || 0}</span>
                                </div>
                                <div className="h-1.5 bg-surface-1 rounded-full overflow-hidden">
                                    <div className="h-full bg-white/40 rounded-full" style={{ width: `${(jobStats.byStatus?.Interview || 0) / Math.max(totalApplications, 1) * 100}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-ink/60">Offer</span>
                                    <span className="text-ink font-medium">{jobStats.byStatus?.Offer || 0}</span>
                                </div>
                                <div className="h-1.5 bg-surface-1 rounded-full overflow-hidden">
                                    <div className="h-full bg-white rounded-full" style={{ width: `${(jobStats.byStatus?.Offer || 0) / Math.max(totalApplications, 1) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
