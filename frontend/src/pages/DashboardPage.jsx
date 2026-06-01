import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, MoreVertical, Edit2, Copy, Download, Trash2 } from 'lucide-react';
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
                setResumes(response.data.data.slice(0, 4));
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
        { label: 'Resumes created', value: resumes.length, trend: '+12%' },
        { label: 'Average ATS score', value: '78', trend: '+5%' },
        { label: 'Applications tracked', value: '14', trend: '+20%' },
        { label: 'Interviews scheduled', value: '3', trend: '-1', negative: true },
    ];

    const mockApplications = [
        { id: 1, company: 'Stripe', role: 'Frontend Engineer', status: 'Interview', date: '2 days ago' },
        { id: 2, company: 'Vercel', role: 'Software Engineer', status: 'Applied', date: '4 days ago' },
        { id: 3, company: 'Google', role: 'Senior UX Designer', status: 'Offer', date: '1 week ago' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Offer': return 'bg-status-success';
            case 'Interview': return 'bg-status-warning';
            case 'Applied': return 'bg-status-info';
            case 'Rejected': return 'bg-ink/40';
            default: return 'bg-ink/20';
        }
    };

    return (
        <div className="max-w-6xl mx-auto animate-[fadeInScale_300ms_ease-out]">
            {/* Greeting */}
            <div className="mb-10">
                <h1 className="font-serif text-[28px] text-ink mb-1">
                    {getTimeBasedGreeting()}, {user?.name?.split(' ')[0] || 'there'}.
                </h1>
                <p className="text-[13px] text-ink/60 font-sans tracking-wide">
                    {getFormattedDate()}
                </p>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-ink/5 rounded-xl p-6 shadow-sm">
                        <div className="font-serif text-[32px] text-accent leading-none mb-2">{stat.value}</div>
                        <div className="text-[12px] text-ink/60 font-sans font-medium uppercase tracking-wider mb-1">{stat.label}</div>
                        <div className={`text-[11px] font-sans font-medium ${stat.negative ? 'text-status-error' : 'text-status-success'}`}>
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Resumes */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[16px] font-sans font-semibold text-ink">Recent resumes</h2>
                    <Link to="/workspace" className="text-[14px] text-ink/60 hover:text-ink font-medium transition-colors">
                        View all →
                    </Link>
                </div>
                
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar">
                    {/* New Resume Card */}
                    <button 
                        onClick={() => navigate('/resumes/new')}
                        className="snap-start shrink-0 w-[200px] h-[280px] bg-white border border-dashed border-accent/30 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-solid hover:bg-accent/5 hover:border-accent transition-all group"
                    >
                        <Plus className="w-7 h-7 text-accent" />
                        <span className="text-[14px] text-ink/60 font-sans group-hover:text-ink transition-colors">New resume</span>
                    </button>

                    {/* Existing Resumes */}
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="shrink-0 w-[200px] h-[280px] skeleton rounded-xl" />
                        ))
                    ) : (
                        resumes.map(resume => (
                            <div key={resume._id} className="snap-start shrink-0 w-[200px] bg-white border border-ink/5 rounded-xl flex flex-col overflow-hidden hover:-translate-y-[3px] hover:shadow-card transition-all group relative">
                                {/* Thumbnail Placeholder */}
                                <div className="h-[180px] bg-surface-2 p-4 flex flex-col gap-2 relative">
                                    <div className="w-1/2 h-3 bg-ink/10 rounded-sm mb-2" />
                                    <div className="w-full h-1 bg-ink/5 rounded-sm" />
                                    <div className="w-5/6 h-1 bg-ink/5 rounded-sm" />
                                    <div className="w-full h-1 bg-ink/5 rounded-sm" />
                                    
                                    <div className="w-1/3 h-2 bg-ink/10 rounded-sm mt-4 mb-1" />
                                    <div className="w-full h-1 bg-ink/5 rounded-sm" />
                                    <div className="w-4/5 h-1 bg-ink/5 rounded-sm" />
                                    
                                    {/* Hover Menu */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-ink/60 hover:text-ink shadow-sm">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                {/* Footer Info */}
                                <div className="p-4 bg-white border-t border-ink/5 flex-1 flex flex-col justify-end">
                                    <h3 className="text-[14px] font-medium text-ink font-sans truncate mb-1">{resume.title || 'Untitled Resume'}</h3>
                                    <div className="flex items-center justify-between text-[12px] text-ink/40 font-sans">
                                        <span>Just now</span>
                                        <span>{resume.template || 'Modern'}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Application Tracker Preview */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[16px] font-sans font-semibold text-ink">Applications</h2>
                    <Link to="/applications" className="text-[14px] text-ink/60 hover:text-ink font-medium transition-colors">
                        View all →
                    </Link>
                </div>
                
                <div className="bg-white border border-ink/5 rounded-xl overflow-hidden shadow-sm">
                    {mockApplications.map((app, i) => (
                        <div key={app.id} className={`flex items-center p-4 hover:bg-surface-2 transition-colors ${i !== mockApplications.length - 1 ? 'border-b border-ink/5' : ''}`}>
                            <div className="flex-1">
                                <div className="text-[14px] font-medium text-ink font-sans">{app.company}</div>
                                <div className="text-[13px] text-ink/60 font-sans mt-0.5">{app.role}</div>
                            </div>
                            <div className="w-32 flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(app.status)}`} />
                                <span className="text-[12px] text-ink/80 font-sans">{app.status}</span>
                            </div>
                            <div className="w-24 text-right text-[12px] text-ink/40 font-sans">
                                {app.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
