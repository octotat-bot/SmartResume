import { useState, useEffect, useCallback } from 'react';
import { applicationService } from '../services/api';
import { Plus, Search, BarChart3, List, Briefcase, TrendingUp, Clock, Target, X, Edit2, Trash2, ExternalLink } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

const ApplicationTracker = () => {
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('kanban'); // 'kanban', 'list', 'stats'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingApp, setEditingApp] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, company: '' });

    const statuses = [
        { value: 'saved', label: 'Saved', color: 'bg-slate-500', icon: '💾' },
        { value: 'wishlist', label: 'Wishlist', color: 'bg-gray-500', icon: '📋' },
        { value: 'applied', label: 'Applied', color: 'bg-blue-500', icon: '📤' },
        { value: 'interview', label: 'Interview', color: 'bg-purple-500', icon: '🎯' },
        { value: 'offer', label: 'Offer', color: 'bg-green-500', icon: '🎉' },
        { value: 'rejected', label: 'Rejected', color: 'bg-red-500', icon: '❌' },
        { value: 'accepted', label: 'Accepted', color: 'bg-emerald-500', icon: '✅' },
        { value: 'withdrawn', label: 'Withdrawn', color: 'bg-orange-500', icon: '🔙' }
    ];

    const loadApplications = useCallback(async () => {
        try {
            const params = {};
            if (filterStatus) params.status = filterStatus;
            if (filterPriority) params.priority = filterPriority;
            if (searchTerm) params.search = searchTerm;

            const data = await applicationService.getAll(params);
            setApplications(data);
        } catch (error) {
            console.error('Error loading applications:', error);
        } finally {
            setLoading(false);
        }
    }, [filterStatus, filterPriority, searchTerm]);

    const loadStats = async () => {
        try {
            const data = await applicationService.getStats();
            setStats(data);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    useEffect(() => {
        loadApplications();
        loadStats();
    }, [loadApplications]);

    const handleDelete = async () => {
        try {
            await applicationService.delete(deleteDialog.id);
            loadApplications();
            loadStats();
            setDeleteDialog({ isOpen: false, id: null, company: '' });
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await applicationService.update(id, { status: newStatus });
            loadApplications();
            loadStats();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const getStatusInfo = (status) => {
        return statuses.find(s => s.value === status) || statuses[0];
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-400 bg-red-500/10';
            case 'medium': return 'text-yellow-400 bg-yellow-500/10';
            case 'low': return 'text-green-400 bg-green-500/10';
            default: return 'text-ink/60 bg-gray-500/10';
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-canvas flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-ink/60">Loading applications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-canvas text-ink p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-serif font-semibold mb-2">Job Tracker</h1>
                        <p className="text-ink/60">Track your job search from discovery to offer</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingApp(null);
                            setShowForm(true);
                        }}
                        className="px-6 py-3 btn-primary rounded-lg font-semibold flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Application
                    </button>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-surface-1 border border-ink/5 shadow-sm rounded-xl p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-ink/60 text-sm">Total Applications</span>
                                <Briefcase className="w-5 h-5 text-accent" />
                            </div>
                            <div className="text-3xl font-serif font-semibold">{stats.total}</div>
                        </div>
                        <div className="bg-surface-1 border border-ink/5 shadow-sm rounded-xl p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-ink/60 text-sm">Active</span>
                                <Clock className="w-5 h-5 text-purple-500" />
                            </div>
                            <div className="text-3xl font-serif font-semibold">{stats.activeApplications}</div>
                        </div>
                        <div className="bg-surface-1 border border-ink/5 shadow-sm rounded-xl p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-ink/60 text-sm">Offers</span>
                                <Target className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="text-3xl font-serif font-semibold">{stats.statusCounts.offer + stats.statusCounts.accepted}</div>
                        </div>
                        <div className="bg-surface-1 border border-ink/5 shadow-sm rounded-xl p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-ink/60 text-sm">Success Rate</span>
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="text-3xl font-serif font-semibold">{stats.successRate}%</div>
                        </div>
                    </div>
                )}

                {/* Filters and View Toggle */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink/60" />
                        <input
                            type="text"
                            placeholder="Search company or position..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-surface-1 border border-ink/5 shadow-sm rounded-lg text-ink placeholder-ink/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 bg-surface-1 border border-ink/5 shadow-sm rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map(status => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                    </select>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="px-4 py-2 bg-surface-1 border border-ink/5 shadow-sm rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                    >
                        <option value="">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('kanban')}
                            className={`p-2 rounded-lg transition-colors ${view === 'kanban' ? 'bg-accent text-white' : 'bg-surface-1 border border-ink/5 shadow-sm hover:bg-surface-3'}`}
                            title="Kanban View"
                        >
                            <BarChart3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-accent text-white' : 'bg-surface-1 border border-ink/5 shadow-sm hover:bg-surface-3'}`}
                            title="List View"
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Kanban Board */}
                {view === 'kanban' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 overflow-x-auto">
                        {statuses.map(status => {
                            const statusApps = applications.filter(app => app.status === status.value);
                            return (
                                <div key={status.value} className="bg-surface-2 rounded-xl p-4 border border-ink/5 min-w-[180px]">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2 min-w-0 flex-1">
                                            <span className="text-2xl flex-shrink-0">{status.icon}</span>
                                            <h3 className="font-semibold text-sm truncate">{status.label}</h3>
                                        </div>
                                        <span className="text-sm text-ink/60 flex-shrink-0 ml-2">{statusApps.length}</span>
                                    </div>
                                    <div className="space-y-3">
                                        {statusApps.map(app => (
                                            <div
                                                key={app._id}
                                                className="bg-surface-1 border border-ink/10 rounded-lg p-4 hover:border-accent shadow-sm hover:shadow-md transition-colors cursor-pointer group"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-semibold text-sm line-clamp-1">{app.company}</h4>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => {
                                                                setEditingApp(app);
                                                                setShowForm(true);
                                                            }}
                                                            className="p-1 hover:bg-accent/10 rounded"
                                                        >
                                                            <Edit2 className="w-3 h-3 text-accent" />
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteDialog({ isOpen: true, id: app._id, company: app.company })}
                                                            className="p-1 hover:bg-red-500/20 rounded"
                                                        >
                                                            <Trash2 className="w-3 h-3 text-red-400" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-ink/60 mb-2 line-clamp-1">{app.position}</p>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className={`px-2 py-0.5 rounded-full ${getPriorityColor(app.priority)}`}>
                                                        {app.priority}
                                                    </span>
                                                    <span className="text-ink/40">{formatDate(app.applicationDate)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* List View */}
                {view === 'list' && (
                    <div className="bg-surface-1 border border-ink/5 shadow-sm rounded-xl overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[#111] border-b border-ink/10">
                                <tr>
                                    <th className="text-left p-4 text-sm font-semibold text-ink/60">Company</th>
                                    <th className="text-left p-4 text-sm font-semibold text-ink/60">Position</th>
                                    <th className="text-left p-4 text-sm font-semibold text-ink/60">Status</th>
                                    <th className="text-left p-4 text-sm font-semibold text-ink/60">Priority</th>
                                    <th className="text-left p-4 text-sm font-semibold text-ink/60">Applied</th>
                                    <th className="text-right p-4 text-sm font-semibold text-ink/60">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map(app => {
                                    const statusInfo = getStatusInfo(app.status);
                                    return (
                                        <tr key={app._id} className="border-b border-ink/10 hover:bg-surface-3 transition-colors">
                                            <td className="p-4">
                                                <div className="font-semibold">{app.company}</div>
                                                {app.location && <div className="text-xs text-ink/60">{app.location}</div>}
                                            </td>
                                            <td className="p-4 text-sm">{app.position}</td>
                                            <td className="p-4">
                                                <select
                                                    value={app.status}
                                                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color} text-ink border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                >
                                                    {statuses.map(s => (
                                                        <option key={s.value} value={s.value}>{s.label}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(app.priority)}`}>
                                                    {app.priority}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-ink/60">{formatDate(app.applicationDate)}</td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    {app.jobUrl && (
                                                        <a
                                                            href={app.jobUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                                                        >
                                                            <ExternalLink className="w-4 h-4 text-accent" />
                                                        </a>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            setEditingApp(app);
                                                            setShowForm(true);
                                                        }}
                                                        className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-accent" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteDialog({ isOpen: true, id: app._id, company: app.company })}
                                                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {applications.length === 0 && (
                            <div className="text-center py-12">
                                <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-ink/60">No applications found</p>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="mt-4 px-6 py-2 btn-primary rounded-lg font-semibold transition-colors"
                                >
                                    Add Your First Application
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Application Form Modal - Will be created separately */}
            {showForm && (
                <ApplicationFormModal
                    application={editingApp}
                    onClose={() => {
                        setShowForm(false);
                        setEditingApp(null);
                    }}
                    onSave={() => {
                        loadApplications();
                        loadStats();
                        setShowForm(false);
                        setEditingApp(null);
                    }}
                />
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                title="Delete Application"
                message={`Are you sure you want to delete the application for ${deleteDialog.company}? This action cannot be undone.`}
                onConfirm={handleDelete}
                onClose={() => setDeleteDialog({ isOpen: false, id: null, company: '' })}
                confirmText="Delete"
                type="danger"
            />
        </div>
    );
};

// Placeholder for Application Form Modal - will create next
const ApplicationFormModal = ({ application, onClose, onSave }) => {
    const [formData, setFormData] = useState(() => {
        if (application) {
            return {
                ...application,
                applicationDate: application.applicationDate
                    ? new Date(application.applicationDate).toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0]
            };
        }
        return {
            company: '',
            position: '',
            location: '',
            jobUrl: '',
            status: 'saved',
            priority: 'medium',
            applicationDate: new Date().toISOString().split('T')[0],
            notes: ''
        };
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            console.log('Submitting application:', formData);
            if (application) {
                const result = await applicationService.update(application._id, formData);
                console.log('Update result:', result);
            } else {
                const result = await applicationService.create(formData);
                console.log('Create result:', result);
            }
            onSave();
        } catch (error) {
            console.error('Error saving application:', error);
            console.error('Error details:', error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || error.message || 'Failed to save application. Please try again.'}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-canvas/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
            <div className="bg-[#0a0a0a] rounded-2xl border border-ink/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-ink/10 flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10">
                    <h2 className="text-2xl font-bold">{application ? 'Edit Application' : 'Add Application'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-surface-3 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-ink/80 mb-2">
                                Company <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-2 bg-surface-2 border border-ink/10 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ink/80 mb-2">
                                Position <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                className="w-full px-4 py-2 bg-surface-2 border border-ink/10 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-ink/80 mb-2">Location</label>
                            <input
                                type="text"
                                value={formData.location || ''}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-4 py-2 bg-surface-2 border border-ink/10 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ink/80 mb-2">Job URL</label>
                            <input
                                type="text"
                                placeholder="https://example.com/job"
                                value={formData.jobUrl || ''}
                                onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                                className="w-full px-4 py-2 bg-surface-2 border border-ink/10 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-ink/80 mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2 bg-surface-2 border border-ink/10 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                            >
                                <option value="saved">Saved</option>
                                <option value="wishlist">Wishlist</option>
                                <option value="applied">Applied</option>
                                <option value="interview">Interview</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                                <option value="accepted">Accepted</option>
                                <option value="withdrawn">Withdrawn</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ink/80 mb-2">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                className="w-full px-4 py-2 bg-surface-2 border border-ink/10 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ink/80 mb-2">Application Date</label>
                            <input
                                type="date"
                                value={formData.applicationDate}
                                onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                                className="w-full px-4 py-2 bg-surface-2 border border-ink/10 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-ink/80 mb-2">Notes</label>
                        <textarea
                            value={formData.notes || ''}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 bg-surface-2 border border-ink/10 rounded-lg text-ink focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none"
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-surface-2 border border-ink/10 rounded-lg font-semibold hover:bg-surface-3 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 px-6 py-3 btn-primary rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : application ? 'Update' : 'Add Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationTracker;
