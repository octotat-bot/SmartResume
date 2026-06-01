import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    FileText,
    LayoutGrid,
    BarChart3,
    Briefcase,
    Sparkles,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const { user } = useAuth();

    const topNav = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'My Resumes', href: '/workspace', icon: FileText },
        { name: 'Templates', href: '/templates', icon: LayoutGrid },
        { name: 'ATS Checker', href: '/analyzer', icon: BarChart3 },
        { name: 'Applications', href: '/applications', icon: Briefcase },
        { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles },
    ];

    const bottomNav = [
        { name: 'Settings', href: '/profile', icon: Settings }
    ];

    const mobileNav = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Resumes', href: '/workspace', icon: FileText },
        { name: 'Applications', href: '/applications', icon: Briefcase },
        { name: 'AI', href: '/ai-assistant', icon: Sparkles },
        { name: 'Settings', href: '/profile', icon: Settings },
    ];

    const isActive = (path) => location.pathname.startsWith(path);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div
                className={`hidden md:flex flex-col fixed left-0 top-0 h-screen bg-surface-2 transition-all duration-200 z-50 ${isHovered ? 'w-[220px] shadow-paper' : 'w-[56px]'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Logo */}
                <div className="h-[60px] flex items-center px-4 overflow-hidden shrink-0 mt-4">
                    <div className="w-6 h-6 shrink-0 bg-ink rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-canvas" />
                    </div>
                    {isHovered && (
                        <span className="ml-3 text-ink font-serif font-bold text-lg whitespace-nowrap">SmartResume</span>
                    )}
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
                    {topNav.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center h-10 px-4 transition-colors whitespace-nowrap
                                    ${active
                                        ? 'bg-accent/5 border-l-2 border-accent text-accent'
                                        : 'text-ink/60 hover:bg-ink/5 hover:text-ink border-l-2 border-transparent'
                                    }`}
                                title={!isHovered ? item.name : undefined}
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                {isHovered && (
                                    <span className="ml-3 text-[14px] font-medium">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}

                    <div className="my-2 border-t border-ink/5 mx-4" />

                    {bottomNav.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center h-10 px-4 transition-colors whitespace-nowrap
                                    ${active
                                        ? 'bg-accent/5 border-l-2 border-accent text-accent'
                                        : 'text-ink/60 hover:bg-ink/5 hover:text-ink border-l-2 border-transparent'
                                    }`}
                                title={!isHovered ? item.name : undefined}
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                {isHovered && (
                                    <span className="ml-3 text-[14px] font-medium">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="h-[64px] shrink-0 border-t border-ink/5 flex items-center px-3 overflow-hidden">
                    <div className="w-8 h-8 shrink-0 bg-ink text-surface-2 rounded-full flex items-center justify-center text-[12px] font-medium">
                        {getInitials(user?.name)}
                    </div>
                    {isHovered && (
                        <div className="ml-3 flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-ink truncate">{user?.name || 'User'}</div>
                            <div className="text-[11px] text-ink/60 uppercase tracking-wide">Free Plan</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-[56px] bg-surface-1 border-t border-ink/5 flex items-center justify-around px-2 z-50">
                {mobileNav.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${active ? 'text-accent' : 'text-ink/40'}`}
                        >
                            <item.icon className="w-[20px] h-[20px] mb-1" />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Sidebar;
