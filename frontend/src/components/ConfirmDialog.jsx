import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', cancelText = 'Cancel', type = 'danger' }) => {
    const [isRendered, setIsRendered] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line
            setIsRendered(true);
            // eslint-disable-next-line
            setIsAnimatingOut(false);
        } else if (isRendered) {
            // eslint-disable-next-line
            setIsAnimatingOut(true);
            const timer = setTimeout(() => {
                // eslint-disable-next-line
                setIsRendered(false);
                // eslint-disable-next-line
                setIsAnimatingOut(false);
            }, 140);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isRendered]);

    if (!isRendered) return null;

    const primaryButtonClass = type === 'danger'
        ? 'bg-status-error text-white hover:brightness-95'
        : 'btn-primary';

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-180 ease-out bg-ink/40 ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}`}
        >
            <div 
                className={`bg-surface-1 border border-ink/5 rounded-2xl w-full max-w-[480px] transition-transform duration-180 ease-out p-6 ${isAnimatingOut ? 'scale-95' : 'scale-100'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[17px] font-semibold text-ink font-sans tracking-tight">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-ink/40 hover:text-ink/60 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="mb-8">
                    <p className="text-ink/80 text-[15px] leading-relaxed font-sans">{message}</p>
                </div>

                {/* Footer - Primary action left of cancel */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`h-[40px] px-6 rounded-lg font-medium text-[14px] font-sans transition-colors ${primaryButtonClass}`}
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        className="text-[14px] font-medium text-ink/60 hover:text-ink transition-colors font-sans"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
