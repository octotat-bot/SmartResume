import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', action = null) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type, action }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 300); // Wait for exit animation
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map(toast => (
                    <ToastItem 
                        key={toast.id} 
                        toast={toast} 
                        onRemove={() => removeToast(toast.id)} 
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const ToastItem = ({ toast, onRemove }) => {
    const { message, type, action, exiting } = toast;
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    const startTimer = () => {
        timeoutRef.current = setTimeout(() => {
            onRemove();
        }, 4000);
    };

    const stopTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    React.useEffect(() => {
        if (!isHovered) {
            startTimer();
        } else {
            stopTimer();
        }
        return stopTimer;
    }, [isHovered]);

    const typeConfig = {
        success: { icon: CheckCircle, color: 'text-status-success', borderColor: 'border-l-status-success' },
        error: { icon: AlertCircle, color: 'text-status-error', borderColor: 'border-l-status-error' },
        warning: { icon: AlertTriangle, color: 'text-status-warning', borderColor: 'border-l-status-warning' },
        info: { icon: Info, color: 'text-status-info', borderColor: 'border-l-status-info' }
    };

    const config = typeConfig[type] || typeConfig.info;
    const Icon = config.icon;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                pointer-events-auto w-[320px] bg-surface-1 border border-ink/5 rounded-xl border-l-[3px] p-4 flex gap-3 items-start shadow-card
                transition-all duration-300 ease-out
                ${config.borderColor}
                ${exiting ? 'opacity-0 translate-y-[-4px]' : 'animate-[slideInRight_300ms_ease-out]'}
            `}
        >
            <Icon className={`w-4 h-4 shrink-0 mt-[2px] ${config.color}`} />
            <div className="flex-1 flex flex-col gap-1">
                <p className="text-[14px] text-ink font-sans leading-tight">{message}</p>
                {action && (
                    <button 
                        onClick={action.onClick}
                        className="text-[13px] text-ink font-medium hover:underline text-left mt-1"
                    >
                        {action.label}
                    </button>
                )}
            </div>
            <button 
                onClick={onRemove}
                className="text-ink/40 hover:text-ink/60 transition-colors shrink-0 p-1"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
