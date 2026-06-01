import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, MoreVertical, Briefcase, FileText, BarChart3, Calendar, ArrowUpRight } from 'lucide-react';
import api from '../utils/api';

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await api.get('/api/resumes');
                setResumes(response.data.data.slice(0, 3)); // Only need 3 for the new layout
            } catch (error) {
                console.error('Error fetching resumes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, []);

    const getTimeBasedGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const getFormattedDate = () => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    const stats = [
        { label: 'Resumes', value: resumes.length, trend: '+12%', icon: FileText },
        { label: 'Avg ATS', value: '78', trend: '+5%', icon: BarChart3 },
        { label: 'Applied', value: '14', trend: '+20%', icon: Briefcase },
        { label: 'Interviews', value: '3', trend: '-1', negative: true, icon: Calendar },
    ];

    const mockApplications = [
        { id: 1, company: 'Stripe', role: 'Frontend Engineer', status: 'Interview', date: '2 days ago' },
        { id: 2, company: 'Vercel', role: 'Software Engineer', status: 'Applied', date: '4 days ago' },
        { id: 3, company: 'Google', role: 'Senior UX Designer', status: 'Offer', date: '1 week ago' },
        { id: 4, company: 'Meta', role: 'Product Designer', status: 'Rejected', date: '2 weeks ago' },
    ];

    const getStatusIndicator = (status) => {
        switch (status) {
            case 'Offer': return 'bg-status-success';
            case 'Interview': return 'bg-status-warning';
            case 'Applied': return 'bg-status-info';
            case 'Rejected': return 'bg-ink/40';
            default: return 'bg-ink/20';
        }
    };

    return (
        <div className="max-w-7xl mx-auto animate-[fadeInScale_300ms_ease-out] font-sans pb-10">
            {/* Header */}
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="font-serif text-[32px] md:text-[40px] leading-tight text-ink tracking-tight mb-1">
                        {getTimeBasedGreeting()}, {user?.name?.split(' ')[0] || 'there'}.
                    </h1>
                    <p className="text-[14px] text-ink/50 tracking-wide uppercase font-medium">
                        {getFormattedDate()}
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ink text-canvas flex items-center justify-center font-serif text-[18px]">
                        {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Activity Chart (col-span-8) */}
                <div className="lg:col-span-8 bg-white border border-ink/5 rounded-2xl p-6 shadow-sm flex flex-col min-h-[320px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-[16px] font-semibold text-ink">ATS Score Progression</h2>
                            <p className="text-[13px] text-ink/50 mt-1">Average score across all resumes over last 30 days</p>
                        </div>
                        <div className="px-3 py-1 bg-status-success/10 text-status-success rounded-full text-[12px] font-semibold flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +15%
                        </div>
                    </div>
                    <div className="flex-1 relative w-full flex items-end justify-between px-2 pb-2">
                        {/* Minimalist SVG Area Chart */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Grid lines */}
                            <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" className="text-ink/5" strokeWidth="0.5" strokeDasharray="2,2"/>
                            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" className="text-ink/5" strokeWidth="0.5" strokeDasharray="2,2"/>
                            <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" className="text-ink/5" strokeWidth="0.5" strokeDasharray="2,2"/>
                            
                            {/* Area fill */}
                            <path d="M0 80 Q 20 70, 40 40 T 80 30 T 100 10 L 100 100 L 0 100 Z" fill="url(#gradient)" className="opacity-40" />
                            {/* Line stroke */}
                            <path d="M0 80 Q 20 70, 40 40 T 80 30 T 100 10" fill="none" stroke="currentColor" className="text-ink" strokeWidth="1.5" />
                            
                            {/* Gradient definition */}
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="currentColor" className="text-ink" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="currentColor" className="text-ink" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* X-axis labels */}
                        {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((label, i) => (
                            <div key={i} className="relative z-10 text-[11px] text-ink/40 font-medium">{label}</div>
                        ))}
                    </div>
                </div>

                {/* 2. Quick Stats (col-span-4) */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white border border-ink/5 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center group-hover:bg-ink group-hover:text-canvas transition-colors">
                                    <stat.icon className="w-4 h-4" />
                                </div>
                                <div className={`text-[11px] font-semibold ${stat.negative ? 'text-status-error' : 'text-status-success'}`}>
                                    {stat.trend}
                                </div>
                            </div>
                            <div>
                                <div className="font-serif text-[32px] text-ink leading-none mb-1">{stat.value}</div>
                                <div className="text-[12px] text-ink/50 font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. Recent Resumes (col-span-6) */}
                <div className="lg:col-span-6 bg-white border border-ink/5 rounded-2xl p-6 shadow-sm flex flex-col min-h-[360px]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[16px] font-semibold text-ink">Recent Resumes</h2>
                        <Link to="/workspace" className="text-[13px] text-ink/50 hover:text-ink transition-colors font-medium">View all →</Link>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 flex-1">
                        {/* New Resume CTA - High Contrast */}
                        <button 
                            onClick={() => navigate('/resumes/new')}
                            className="bg-ink text-canvas rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-ink/90 hover:scale-[1.02] transition-all shadow-md group"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plus className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-[14px] font-medium tracking-wide">Create New</span>
                        </button>

                        {/* Recent Resume Card */}
                        {loading ? (
                            <div className="skeleton rounded-xl" />
                        ) : resumes[0] ? (
                            <div className="border border-ink/10 rounded-xl p-5 flex flex-col justify-between hover:border-ink/30 transition-colors group relative cursor-pointer" onClick={() => navigate(`/resumes/${resumes[0]._id}`)}>
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:bg-surface-2 rounded-md"><MoreVertical className="w-4 h-4 text-ink/60" /></button>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center mb-4">
                                    <FileText className="w-5 h-5 text-ink/60" />
                                </div>
                                <div>
                                    <h3 className="text-[15px] font-semibold text-ink truncate mb-1">{resumes[0].title || 'Untitled Resume'}</h3>
                                    <p className="text-[12px] text-ink/50 font-medium">Updated just now</p>
                                </div>
                            </div>
                        ) : (
                            <div className="border border-ink/5 bg-surface-1/50 rounded-xl flex items-center justify-center">
                                <span className="text-[13px] text-ink/40">No resumes yet</span>
                            </div>
                        )}
                        
                        {/* Next two slots could be filled if more resumes exist, else hidden in 2x2 grid. Let's just show up to 2 for this row if we use a tight grid, or show a list. Let's stick to the 2 items above for an ultra clean look, or 2x2. */}
                        {resumes.slice(1, 3).map((resume, idx) => (
                             <div key={idx} className="border border-ink/10 rounded-xl p-5 flex flex-col justify-between hover:border-ink/30 transition-colors group relative cursor-pointer" onClick={() => navigate(`/resumes/${resume._id}`)}>
                             <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="p-1 hover:bg-surface-2 rounded-md"><MoreVertical className="w-4 h-4 text-ink/60" /></button>
                             </div>
                             <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center mb-4">
                                 <FileText className="w-5 h-5 text-ink/60" />
                             </div>
                             <div>
                                 <h3 className="text-[15px] font-semibold text-ink truncate mb-1">{resume.title || 'Untitled Resume'}</h3>
                                 <p className="text-[12px] text-ink/50 font-medium">{resume.template || 'Modern'}</p>
                             </div>
                         </div>
                        ))}
                    </div>
                </div>

                {/* 4. Applications Tracker (col-span-6) */}
                <div className="lg:col-span-6 bg-white border border-ink/5 rounded-2xl p-6 shadow-sm flex flex-col min-h-[360px]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[16px] font-semibold text-ink">Active Applications</h2>
                        <Link to="/applications" className="text-[13px] text-ink/50 hover:text-ink transition-colors font-medium">View all →</Link>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-3">
                        {mockApplications.map((app) => (
                            <div key={app.id} className="flex items-center p-4 border border-ink/5 rounded-xl hover:bg-surface-1 transition-colors cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center mr-4 border border-ink/10">
                                    <span className="font-serif text-[16px] font-semibold text-ink">{app.company[0]}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[14px] font-semibold text-ink">{app.company}</h3>
                                    <p className="text-[13px] text-ink/60 mt-0.5">{app.role}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-2 mb-1">
                                        <div className={`w-2 h-2 rounded-full ${getStatusIndicator(app.status)}`} />
                                        <span className="text-[12px] font-medium text-ink/80">{app.status}</span>
                                    </div>
                                    <p className="text-[11px] text-ink/40 font-medium">{app.date}</p>
                                </div>
                                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-4 h-4 text-ink/40" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
