import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    BarChart3,
    User,
    LogOut,
    ChevronRight,
    Target
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Resumes', href: '/workspace', icon: FileText },
        { name: 'Job Tracker', href: '/applications', icon: Target },
        { name: 'Analytics', href: '/analytics', icon: BarChart3 },
        { name: 'Profile', href: '/profile', icon: User },
    ];

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <div className="w-64 h-screen bg-surface-1 border-r border-ink/5 flex flex-col fixed left-0 top-0">
            {/* Logo */}
            <div className="p-6 border-b border-ink/5 flex-shrink-0">
                <Link to="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FileText className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-xl font-bold text-ink">SmartResume</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-hidden">
                <div className="space-y-1">
                    {navigation.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                                    group flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                                    ${active
                                        ? 'bg-white/10 text-ink border border-ink/10'
                                        : 'text-ink/60 hover:text-ink hover:bg-surface-2 border border-transparent'
                                    }
                                `}
                            >
                                <item.icon className={`w-5 h-5 ${active ? 'text-ink' : 'text-ink/40 group-hover:text-ink'} transition-colors`} />
                                <span className="font-medium text-sm flex-1">{item.name}</span>
                                {active && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-ink/5 flex-shrink-0">
                {/* User Info */}
                <div className="mb-3 p-3 bg-surface-2 border border-ink/5 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-ink" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-ink truncate">
                                {user?.name || 'User'}
                            </div>
                            <div className="text-xs text-ink/40 truncate">
                                {user?.email || ''}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-ink/60 hover:text-ink hover:bg-surface-2 rounded-lg transition-all border border-transparent hover:border-ink/5"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
