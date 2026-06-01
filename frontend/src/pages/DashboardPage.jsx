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
                setResumes(response.data.data.slice(0, 3)); 
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

    const getBadgeStyle = (status) => {
        switch (status) {
            case 'Offer': return 'bg-badge-green-bg text-badge-green-text';
            case 'Interview': return 'bg-badge-amber-bg text-badge-amber-text';
            case 'Applied': return 'bg-badge-blue-bg text-badge-blue-text';
            case 'Rejected': return 'bg-badge-red-bg text-badge-red-text';
            default: return 'bg-badge-gray-bg text-badge-gray-text';
        }
    };

    return (
        <div className="max-w-7xl mx-auto animate-[fadeInScale_300ms_ease-out] font-sans pb-10">
            {/* Header */}
            <div className="mb-10 flex items-end justify-between border-b border-ink/20 pb-6">
                <div>
                    <h1 className="font-serif text-[32px] md:text-[44px] leading-tight text-ink tracking-tight mb-1">
                        {getTimeBasedGreeting()}, <span className="text-accent italic">{user?.name?.split(' ')[0] || 'there'}</span>.
                    </h1>
                    <p className="text-[13px] text-ink/50 tracking-widest uppercase font-semibold font-mono">
                        {getFormattedDate()}
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border border-ink/20 flex items-center justify-center font-serif text-[20px] text-accent bg-surface-2">
                        {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                </div>
            </div>

            {/* Architectural Grid (Lines Layout) */}
            <div className="border border-ink/20 bg-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm">
                
                {/* 1. Activity Chart (col-span-8) */}
                <div className="lg:col-span-8 lg:border-r border-b lg:border-b-0 border-ink/20 p-8 flex flex-col min-h-[340px] bg-canvas relative group">
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div>
                            <h2 className="text-[18px] font-serif font-bold text-ink uppercase tracking-wide">ATS Performance</h2>
                            <p className="text-[12px] text-ink/50 font-mono mt-1">LAST 30 DAYS PROGRESSION</p>
                        </div>
                        <div className="px-3 py-1 bg-badge-green-bg text-badge-green-text rounded-full text-[12px] font-semibold flex items-center gap-1 border border-badge-green-text/20">
                            <ArrowUpRight className="w-3 h-3" /> +15%
                        </div>
                    </div>
                    <div className="flex-1 relative w-full flex items-end justify-between px-2 pb-2">
                        {/* Custom Accent SVG Chart */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Architectural Grid lines behind chart */}
                            <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" className="text-ink/10" strokeWidth="0.5"/>
                            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" className="text-ink/10" strokeWidth="0.5"/>
                            <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" className="text-ink/10" strokeWidth="0.5"/>
                            
                            {/* Area fill - Accent Color */}
                            <path d="M0 80 Q 20 70, 40 40 T 80 30 T 100 10 L 100 100 L 0 100 Z" fill="url(#chartGradient)" className="opacity-60" />
                            {/* Line stroke - Accent Color */}
                            <path d="M0 80 Q 20 70, 40 40 T 80 30 T 100 10" fill="none" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
                            
                            {/* Points */}
                            <circle cx="0" cy="80" r="1.5" fill="currentColor" className="text-accent" />
                            <circle cx="40" cy="40" r="1.5" fill="currentColor" className="text-accent" />
                            <circle cx="80" cy="30" r="1.5" fill="currentColor" className="text-accent" />
                            <circle cx="100" cy="10" r="1.5" fill="currentColor" className="text-accent" />

                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#B07D62" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#B07D62" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* X-axis labels */}
                        {['WK 01', 'WK 02', 'WK 03', 'WK 04'].map((label, i) => (
                            <div key={i} className="relative z-10 text-[10px] text-ink/40 font-mono tracking-widest">{label}</div>
                        ))}
                    </div>
                </div>

                {/* 2. Quick Stats (col-span-4) */}
                <div className="lg:col-span-4 grid grid-cols-2 grid-rows-2">
                    {stats.map((stat, i) => (
                        <div key={i} className={`p-6 flex flex-col justify-between hover:bg-surface-2/50 transition-colors cursor-default
                            ${i % 2 === 0 ? 'border-r border-ink/20' : ''}
                            ${i < 2 ? 'border-b border-ink/20' : ''}
                        `}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-accent/80">
                                    <stat.icon className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <div className={`text-[11px] font-semibold ${stat.negative ? 'text-status-error' : 'text-status-success'}`}>
                                    {stat.trend}
                                </div>
                            </div>
                            <div>
                                <div className="font-serif text-[38px] text-accent leading-none mb-2">{stat.value}</div>
                                <div className="text-[10px] text-ink/50 font-mono tracking-widest uppercase">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lower Half Border Separator */}
                <div className="hidden lg:block lg:col-span-12 border-t border-ink/20" />

                {/* 3. Recent Resumes (col-span-6) */}
                <div className="lg:col-span-6 lg:border-r border-b lg:border-b-0 border-ink/20 flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-ink/20 bg-surface-2">
                        <h2 className="text-[14px] font-mono font-bold text-ink uppercase tracking-widest">Recent Resumes</h2>
                        <Link to="/workspace" className="text-[12px] text-ink/50 hover:text-ink transition-colors font-semibold uppercase tracking-wider">View all</Link>
                    </div>
                    
                    <div className="grid grid-cols-2 flex-1">
                        {/* New Resume CTA - Solid Accent Block */}
                        <button 
                            onClick={() => navigate('/resumes/new')}
                            className="bg-accent text-white p-6 flex flex-col items-center justify-center gap-4 hover:bg-accent/90 transition-colors border-r border-ink/20 group"
                        >
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-90 transition-all duration-300">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-[13px] font-mono tracking-widest uppercase font-semibold">Create New</span>
                        </button>

                        {/* Recent Resume Card */}
                        <div className="flex flex-col p-6 bg-canvas group cursor-pointer hover:bg-surface-2 transition-colors relative" onClick={() => resumes[0] && navigate(`/resumes/${resumes[0]._id}`)}>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-5 h-5 text-ink/40" />
                            </div>
                            <div className="flex-1">
                                <FileText className="w-6 h-6 text-accent mb-4" />
                                {loading ? (
                                    <div className="skeleton w-2/3 h-5 mb-2" />
                                ) : (
                                    <h3 className="text-[16px] font-serif font-bold text-ink mb-1 pr-6 leading-tight">
                                        {resumes[0]?.title || 'Untitled Draft'}
                                    </h3>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t border-ink/10">
                                <p className="text-[10px] text-ink/40 font-mono uppercase tracking-widest">
                                    {resumes[0]?.template || 'Modern Template'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Applications Tracker (col-span-6) */}
                <div className="lg:col-span-6 bg-canvas flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-ink/20 bg-surface-2">
                        <h2 className="text-[14px] font-mono font-bold text-ink uppercase tracking-widest">Applications</h2>
                        <Link to="/applications" className="text-[12px] text-ink/50 hover:text-ink transition-colors font-semibold uppercase tracking-wider">View all</Link>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                        {mockApplications.slice(0, 3).map((app, i) => (
                            <div key={app.id} className={`flex items-center p-5 hover:bg-white transition-colors cursor-pointer group
                                ${i !== 2 ? 'border-b border-ink/10' : ''}
                            `}>
                                <div className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center mr-4 border border-ink/20">
                                    <span className="font-serif text-[18px] font-bold text-accent">{app.company[0]}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-bold text-ink font-sans">{app.company}</h3>
                                    <p className="text-[12px] text-ink/50 font-mono tracking-wide mt-0.5">{app.role}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end mb-1">
                                        <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm ${getBadgeStyle(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-ink/40 font-mono mt-1">{app.date}</p>
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
