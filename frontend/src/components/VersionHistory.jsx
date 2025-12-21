import { useState, useEffect } from 'react';
import { versionService } from '../services/api';
import { Clock, RotateCcw, Trash2, X, AlertCircle, Check } from 'lucide-react';

const VersionHistory = ({ resumeId, onClose, onRestore }) => {
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [restoring, setRestoring] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadVersions();
    }, [resumeId]);

    const loadVersions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await versionService.getVersions(resumeId);
            setVersions(data.versions || []);
        } catch (err) {
            console.error('Failed to load versions:', err);
            setError('Failed to load version history');
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (versionId) => {
        if (!confirm('Are you sure you want to restore this version? Your current changes will be saved as a new version.')) {
            return;
        }

        setRestoring(versionId);
        try {
            await versionService.restoreVersion(versionId);
            onRestore?.();
            onClose();
        } catch (err) {
            console.error('Failed to restore version:', err);
            alert('Failed to restore version: ' + (err.response?.data?.message || err.message));
        } finally {
            setRestoring(null);
        }
    };

    const handleDelete = async (versionId) => {
        if (!confirm('Are you sure you want to delete this version?')) {
            return;
        }

        try {
            await versionService.deleteVersion(versionId);
            loadVersions();
        } catch (err) {
            console.error('Failed to delete version:', err);
            alert('Failed to delete version');
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Version History</h2>
                        <p className="text-sm text-gray-400 mt-1">Restore or manage previous versions</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading && (
                        <div className="text-center py-12 text-gray-400">
                            Loading versions...
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && versions.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            No version history available
                        </div>
                    )}

                    {!loading && !error && versions.length > 0 && (
                        <div className="space-y-3">
                            {versions.map((version, index) => (
                                <div
                                    key={version._id}
                                    className="p-4 bg-[#111111] border border-[#1a1a1a] rounded-lg hover:border-white/10 transition-colors group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded border border-blue-500/20">
                                                    v{version.versionNumber}
                                                </span>
                                                {index === 0 && (
                                                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded border border-green-500/20 flex items-center gap-1">
                                                        <Check className="w-3 h-3" />
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-semibold text-white mb-1">
                                                {version.title}
                                            </h3>
                                            {version.changes && (
                                                <p className="text-sm text-gray-400 mb-2">
                                                    {version.changes}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                {formatDate(version.createdAt)}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {index !== 0 && (
                                                <button
                                                    onClick={() => handleRestore(version._id)}
                                                    disabled={restoring === version._id}
                                                    className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-medium"
                                                    title="Restore this version"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                    {restoring === version._id ? 'Restoring...' : 'Restore'}
                                                </button>
                                            )}
                                            {index !== 0 && (
                                                <button
                                                    onClick={() => handleDelete(version._id)}
                                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                                    title="Delete this version"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#1a1a1a] bg-[#0a0a0a]">
                    <p className="text-xs text-gray-500 text-center">
                        Versions are automatically created when you make significant changes
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VersionHistory;
