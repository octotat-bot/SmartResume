import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Menu, 
    X, 
    LayoutDashboard, 
    FileText, 
    LayoutGrid, 
    BarChart3, 
    Briefcase, 
    Sparkles, 
    Settings 
} from 'lucide-react';

const RadialNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const location = useLocation();
    const navRef = useRef(null);

    const navItems = [
        { name: 'Settings', href: '/profile', icon: Settings },
        { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles },
        { name: 'Applications', href: '/applications', icon: Briefcase },
        { name: 'ATS Checker', href: '/analyzer', icon: BarChart3 },
        { name: 'Templates', href: '/templates', icon: LayoutGrid },
        { name: 'My Resumes', href: '/workspace', icon: FileText },
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ];

    // Close nav when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close nav on route change
    useEffect(() => {
        // eslint-disable-next-line
        setIsOpen(false);
    }, [location.pathname]);

    const RADIUS = 150; // pixels

    return (
        <div 
            ref={navRef}
            className="fixed bottom-8 left-8 z-50 pointer-events-auto"
        >
            {/* Overlay background when open (optional, for focus) */}
            <div 
                className={`fixed inset-0 bg-surface-1/50 backdrop-blur-[2px] transition-opacity duration-500 pointer-events-none ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
            />

            {/* Nav Items */}
            {navItems.map((item, index) => {
                // Calculate angle for a 90 degree arc (from 0 to 90 degrees)
                // Angle 0 is straight RIGHT, Angle 90 is straight UP.
                // We have navItems.length items, so divide 90 by (navItems.length - 1)
                const angleDeg = (90 / (navItems.length - 1)) * index;
                const angleRad = (angleDeg * Math.PI) / 180;
                
                // Bottom left corner means: X goes right (positive), Y goes up (negative in CSS)
                const x = isOpen ? RADIUS * Math.cos(angleRad) : 0;
                const y = isOpen ? -RADIUS * Math.sin(angleRad) : 0;

                const isActive = location.pathname.startsWith(item.href);

                return (
                    <div 
                        key={item.name}
                        className="absolute bottom-0 left-0"
                        style={{
                            transform: `translate(${x}px, ${y}px)`,
                            transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpen ? index * 0.04 : (navItems.length - index) * 0.03}s`,
                            opacity: isOpen ? 1 : 0,
                            pointerEvents: isOpen ? 'auto' : 'none',
                            zIndex: hoveredIndex === index ? 50 : 10,
                        }}
                    >
                        <Link
                            to={item.href}
                            className={`group relative flex items-center justify-center w-12 h-12 rounded-full border shadow-sm transition-colors duration-200
                                ${isActive 
                                    ? 'bg-ink text-canvas border-ink hover:bg-ink/90' 
                                    : 'bg-white text-ink/70 border-ink/10 hover:border-ink/30 hover:text-ink'
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <item.icon className="w-5 h-5" />
                            
                            {/* Tooltip */}
                            <div 
                                className={`absolute whitespace-nowrap px-3 py-1.5 rounded-lg bg-ink text-canvas text-[12px] font-medium transition-all duration-200 shadow-md pointer-events-none
                                    ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                                style={{
                                    // Position tooltip based on quadrant
                                    // Items pointing mostly up (angle > 45) get tooltip below/right
                                    // Items pointing mostly right (angle <= 45) get tooltip above
                                    ...(angleDeg > 45 
                                        ? { left: '100%', marginLeft: '12px', top: '50%', transform: `translateY(-50%) ${hoveredIndex === index ? '' : 'translateX(-5px)'}` }
                                        : { bottom: '100%', marginBottom: '12px', left: '50%', transform: `translateX(-50%) ${hoveredIndex === index ? '' : 'translateY(5px)'}` }
                                    )
                                }}
                            >
                                {item.name}
                            </div>
                        </Link>
                    </div>
                );
            })}

            {/* Main Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95
                    ${isOpen ? 'bg-accent text-white' : 'bg-ink text-canvas hover:bg-ink/90'}`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 animate-[spin_0.3s_ease-out]" />
                ) : (
                    <Menu className="w-6 h-6 animate-[pulse_2s_infinite]" />
                )}
            </button>
        </div>
    );
};

export default RadialNav;
