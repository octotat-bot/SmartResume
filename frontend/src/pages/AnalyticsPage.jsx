import { useState, useEffect } from 'react';
import { resumeService, jobService } from '../services/api';
import { TrendingUp, Briefcase, FileText, Target, Calendar, Award, BarChart3 } from 'lucide-react';

const AnalyticsPage = () => {
    const [stats, setStats] = useState({
        totalResumes: 0,
        totalApplications: 0,
        successRate: 0,
        interviews: 0,
        offers: 0,
        byStatus: {},
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const resumeData = await resumeService.getResumeStats();

            let jobData = { total: 0, byStatus: {} };
            try {
                jobData = await jobService.getJobStats();
            } catch {
                // Job stats not available
            }

            const totalApps = jobData.total || 0;
            const offers = jobData.byStatus?.Offer || 0;
            const successRate = totalApps > 0 ? Math.round((offers / totalApps) * 100) : 0;

            setStats({
                totalResumes: resumeData.total || 0,
                totalApplications: totalApps,
                successRate,
                interviews: jobData.byStatus?.Interview || 0,
                offers,
                byStatus: jobData.byStatus || {},
                recentActivity: resumeData.recent || []
            });
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen bg-surface-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-ink/60">Loading analytics...</p>
                </div>
            </div>
        );
    }

    const statusData = [
        { label: 'Applied', value: stats.byStatus?.Applied || 0, color: 'bg-white/20' },
        { label: 'Interview', value: stats.byStatus?.Interview || 0, color: 'bg-white/40' },
        { label: 'Offer', value: stats.byStatus?.Offer || 0, color: 'bg-white' },
        { label: 'Rejected', value: stats.byStatus?.Rejected || 0, color: 'bg-white/10' },
    ];

    const maxValue = Math.max(...statusData.map(s => s.value), 1);

    return (
        <div className="h-screen bg-surface-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-ink mb-2">Analytics</h1>
                    <p className="text-base text-ink/60">Track your job search progress and insights</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="bg-surface-2 border border-ink/5 rounded-xl p-6 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-ink" />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-ink mb-1">{stats.totalResumes}</div>
                        <div className="text-sm text-ink/60">Total Resumes</div>
                    </div>

                    <div className="bg-surface-2 border border-ink/5 rounded-xl p-6 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-ink" />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-ink mb-1">{stats.totalApplications}</div>
                        <div className="text-sm text-ink/60">Applications</div>
                    </div>

                    <div className="bg-surface-2 border border-ink/5 rounded-xl p-6 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                <Target className="w-6 h-6 text-ink" />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-ink mb-1">{stats.interviews}</div>
                        <div className="text-sm text-ink/60">Interviews</div>
                    </div>

                    <div className="bg-surface-2 border border-ink/5 rounded-xl p-6 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                <Award className="w-6 h-6 text-ink" />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-ink mb-1">{stats.successRate}%</div>
                        <div className="text-sm text-ink/60">Success Rate</div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    {/* Application Status Chart */}
                    <div className="bg-surface-2 border border-ink/5 rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-ink" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-ink">Application Status</h2>
                                <p className="text-sm text-ink/60">Breakdown by stage</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {statusData.map((status, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-ink/80">{status.label}</span>
                                        <span className="text-lg font-bold text-ink">{status.value}</span>
                                    </div>
                                    <div className="h-3 bg-surface-1 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${status.color} rounded-full transition-all duration-500`}
                                            style={{ width: `${(status.value / maxValue) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Success Metrics */}
                    <div className="bg-surface-2 border border-ink/5 rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-ink" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-ink">Success Metrics</h2>
                                <p className="text-sm text-ink/60">Your performance</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-5 bg-surface-1 border border-ink/5 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-ink/60">Interview Rate</span>
                                    <span className="text-2xl font-serif font-semibold text-ink">
                                        {stats.totalApplications > 0
                                            ? Math.round((stats.interviews / stats.totalApplications) * 100)
                                            : 0}%
                                    </span>
                                </div>
                                <p className="text-xs text-ink/40">Interviews per application</p>
                            </div>

                            <div className="p-5 bg-surface-1 border border-ink/5 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-ink/60">Offer Rate</span>
                                    <span className="text-2xl font-serif font-semibold text-ink">{stats.successRate}%</span>
                                </div>
                                <p className="text-xs text-ink/40">Offers received</p>
                            </div>

                            <div className="p-5 bg-surface-1 border border-ink/5 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-ink/60">Active Applications</span>
                                    <span className="text-2xl font-serif font-semibold text-ink">
                                        {(stats.byStatus?.Applied || 0) + (stats.byStatus?.Interview || 0)}
                                    </span>
                                </div>
                                <p className="text-xs text-ink/40">In progress</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-surface-2 border border-ink/5 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-ink" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-ink">Recent Activity</h2>
                            <p className="text-sm text-ink/60">Latest resume updates</p>
                        </div>
                    </div>

                    {stats.recentActivity.length > 0 ? (
                        <div className="space-y-3">
                            {stats.recentActivity.slice(0, 5).map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-surface-1 border border-ink/5 rounded-lg">
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-5 h-5 text-ink" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-ink truncate">
                                            {item.title || 'Untitled Resume'}
                                        </h3>
                                        <p className="text-sm text-ink/60">
                                            Updated {new Date(item.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-sm text-ink/60">No recent activity</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
