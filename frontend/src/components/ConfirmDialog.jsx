import { X, AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', cancelText = 'Cancel', type = 'danger' }) => {
    if (!isOpen) return null;

    const typeStyles = {
        danger: {
            icon: 'bg-red-500/10 text-red-400 border-red-500/20',
            button: 'bg-red-500 hover:bg-red-600 text-white'
        },
        warning: {
            icon: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            button: 'bg-yellow-500 hover:bg-yellow-600 text-white'
        },
        info: {
            icon: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            button: 'bg-blue-500 hover:bg-blue-600 text-white'
        }
    };

    const styles = typeStyles[type] || typeStyles.danger;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl w-full max-w-md shadow-2xl animate-slideUp">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${styles.icon}`}>
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-gray-300 leading-relaxed">{message}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-[#1a1a1a] bg-[#0a0a0a]">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-[#111111] text-white rounded-lg hover:bg-[#161616] transition-colors border border-[#1a1a1a] font-medium"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-6 py-2.5 rounded-lg transition-colors font-semibold ${styles.button}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
