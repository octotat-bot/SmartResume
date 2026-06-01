import React, { useState, useEffect, useCallback } from 'react';
import { applicationService } from '../services/api';
import { Plus, Search, BarChart3, List, Briefcase, TrendingUp, Clock, Target, X, Edit2, Trash2, ExternalLink, Calendar, MapPin, AlignLeft, Grid } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

const ApplicationTracker = () => {
    const [applications, setApplications] = useState([]);
    // eslint-disable-next-line
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('board'); // 'board', 'list'
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingApp, setEditingApp] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, company: '' });

    const statuses = [
        { value: 'wishlist', label: 'Wishlist', dot: 'bg-ink/20' },
        { value: 'applied', label: 'Applied', dot: 'bg-status-info' },
        { value: 'interview', label: 'Interview', dot: 'bg-status-warning' },
        { value: 'offer', label: 'Offer', dot: 'bg-status-success' },
        { value: 'rejected', label: 'Rejected', dot: 'bg-status-error' }
    ];

    const loadApplications = useCallback(async () => {
        try {
            const params = searchTerm ? { search: searchTerm } : {};
            const data = await applicationService.getAll(params);
            setApplications(data);
        } catch (error) {
            console.error('Error loading applications:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        loadApplications();
    }, [loadApplications]);

    const handleDelete = async () => {
        try {
            await applicationService.delete(deleteDialog.id);
            loadApplications();
            setDeleteDialog({ isOpen: false, id: null, company: '' });
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await applicationService.update(id, { status: newStatus });
            loadApplications();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto h-[400px] flex items-center justify-center font-sans text-ink/60">
                Loading tracker...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-12 animate-[fadeInScale_300ms_ease-out]">
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h1 className="font-serif text-[28px] text-ink mb-1">Applications</h1>
                    <p className="text-[13px] text-ink/60 font-sans tracking-wide">Track your job search progress.</p>
                </div>
                <button 
                    onClick={() => { setEditingApp(null); setShowForm(true); }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> New Application
                </button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-8">
                <div className="relative w-[320px]">
                    <Search className="w-4 h-4 text-ink/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text" 
                        placeholder="Search companies, roles..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-[36px] bg-white border border-ink/10 rounded-lg pl-9 pr-4 text-[13px] font-sans focus:outline-none focus:border-accent"
                    />
                </div>

                <div className="flex bg-white border border-ink/10 rounded-lg p-1">
                    <button 
                        onClick={() => setView('board')}
                        className={`flex items-center gap-1.5 px-3 h-[28px] text-[12px] font-medium font-sans rounded-md transition-colors ${view === 'board' ? 'bg-surface-2 text-ink shadow-sm' : 'text-ink/60 hover:text-ink'}`}
                    >
                        <Grid className="w-3.5 h-3.5" /> Board
                    </button>
                    <button 
                        onClick={() => setView('list')}
                        className={`flex items-center gap-1.5 px-3 h-[28px] text-[12px] font-medium font-sans rounded-md transition-colors ${view === 'list' ? 'bg-surface-2 text-ink shadow-sm' : 'text-ink/60 hover:text-ink'}`}
                    >
                        <AlignLeft className="w-3.5 h-3.5" /> List
                    </button>
                </div>
            </div>

            {/* Board View */}
            {view === 'board' && (
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
                    {statuses.map(status => {
                        const columnApps = applications.filter(a => a.status === status.value);
                        return (
                            <div key={status.value} className="w-[300px] shrink-0 snap-start flex flex-col h-[calc(100vh-280px)]">
                                <div className="flex items-center justify-between mb-4 px-1">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${status.dot}`} />
                                        <span className="text-[13px] font-sans font-semibold text-ink">{status.label}</span>
                                    </div>
                                    <span className="text-[12px] text-ink/40 font-medium bg-white px-2 py-0.5 rounded-full border border-ink/5">{columnApps.length}</span>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-3 pr-2 pb-10 hide-scrollbar">
                                    {columnApps.map(app => (
                                        <div 
                                            key={app._id} 
                                            className="bg-white border border-ink/10 hover:border-ink/20 rounded-xl p-4 shadow-sm hover:shadow-card transition-all group relative cursor-pointer"
                                            onClick={() => { setEditingApp(app); setShowForm(true); }}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-sans font-semibold text-[14px] text-ink leading-tight">{app.company}</h3>
                                                {app.priority === 'high' && <span className="w-1.5 h-1.5 rounded-full bg-status-error shrink-0 mt-1" title="High Priority" />}
                                            </div>
                                            <p className="text-[13px] text-ink/80 font-sans mb-3">{app.position}</p>
                                            
                                            <div className="flex items-center gap-3 text-[12px] text-ink/40 font-sans mb-1">
                                                {app.location && (
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {app.location}</span>
                                                )}
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(app.applicationDate)}</span>
                                            </div>

                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setDeleteDialog({ isOpen: true, id: app._id, company: app.company }); }}
                                                    className="p-1.5 bg-white shadow-sm border border-ink/5 rounded-md text-status-error hover:bg-status-error/5"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {columnApps.length === 0 && (
                                        <div className="h-[100px] border border-dashed border-ink/10 rounded-xl flex items-center justify-center text-[12px] text-ink/40 font-sans bg-white/50">
                                            No applications
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* List View */}
            {view === 'list' && (
                <div className="bg-white border border-ink/10 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left font-sans">
                        <thead className="bg-surface-2 border-b border-ink/5 text-[12px] text-ink/40 uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4 font-medium">Company & Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ink/5">
                            {applications.map(app => (
                                <tr key={app._id} className="hover:bg-surface-2/50 transition-colors group cursor-pointer" onClick={() => { setEditingApp(app); setShowForm(true); }}>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-[14px] text-ink">{app.company}</div>
                                        <div className="text-[13px] text-ink/60 mt-0.5">{app.position} {app.location && `• ${app.location}`}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={app.status}
                                            onChange={(e) => { e.stopPropagation(); handleStatusChange(app._id, e.target.value); }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="bg-transparent border border-ink/10 rounded-md text-[13px] font-medium text-ink px-2 py-1 focus:outline-none focus:border-accent"
                                        >
                                            {statuses.map(s => (
                                                <option key={s.value} value={s.value}>{s.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-ink/60">
                                        {formatDate(app.applicationDate)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {app.jobUrl && (
                                                <a href={app.jobUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1.5 text-ink/40 hover:text-accent rounded transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setDeleteDialog({ isOpen: true, id: app._id, company: app.company }); }}
                                                className="p-1.5 text-ink/40 hover:text-status-error rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="text-[14px] text-ink/60">No applications found.</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Application Form Modal */}
            {showForm && (
                <ApplicationFormModal
                    application={editingApp}
                    onClose={() => { setShowForm(false); setEditingApp(null); }}
                    onSave={() => { loadApplications(); setShowForm(false); setEditingApp(null); }}
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
            company: '', position: '', location: '', jobUrl: '',
            status: 'applied', priority: 'medium',
            applicationDate: new Date().toISOString().split('T')[0], notes: ''
        };
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (application) {
                await applicationService.update(application._id, formData);
            } else {
                await applicationService.create(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error saving:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeInScale_200ms_ease-out]">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col font-sans">
                <div className="p-6 border-b border-ink/5 flex items-center justify-between bg-white z-10 shrink-0">
                    <h2 className="font-serif text-[24px] text-ink">{application ? 'Edit Application' : 'New Application'}</h2>
                    <button onClick={onClose} className="p-2 text-ink/40 hover:text-ink hover:bg-surface-2 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 hide-scrollbar">
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-medium text-ink/80 mb-2">Company *</label>
                                <input
                                    type="text" required
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full h-[40px] px-3 bg-surface-1 border border-ink/10 rounded-lg text-[14px] focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-medium text-ink/80 mb-2">Role *</label>
                                <input
                                    type="text" required
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    className="w-full h-[40px] px-3 bg-surface-1 border border-ink/10 rounded-lg text-[14px] focus:outline-none focus:border-accent"
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-medium text-ink/80 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={formData.location || ''}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full h-[40px] px-3 bg-surface-1 border border-ink/10 rounded-lg text-[14px] focus:outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-medium text-ink/80 mb-2">Date Applied</label>
                                <input
                                    type="date"
                                    value={formData.applicationDate}
                                    onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                                    className="w-full h-[40px] px-3 bg-surface-1 border border-ink/10 rounded-lg text-[14px] focus:outline-none focus:border-accent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-ink/80 mb-2">Job URL</label>
                            <input
                                type="url" placeholder="https://"
                                value={formData.jobUrl || ''}
                                onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                                className="w-full h-[40px] px-3 bg-surface-1 border border-ink/10 rounded-lg text-[14px] focus:outline-none focus:border-accent"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-medium text-ink/80 mb-2">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full h-[40px] px-3 bg-surface-1 border border-ink/10 rounded-lg text-[14px] focus:outline-none focus:border-accent appearance-none cursor-pointer"
                                >
                                    <option value="wishlist">Wishlist</option>
                                    <option value="applied">Applied</option>
                                    <option value="interview">Interview</option>
                                    <option value="offer">Offer</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[13px] font-medium text-ink/80 mb-2">Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full h-[40px] px-3 bg-surface-1 border border-ink/10 rounded-lg text-[14px] focus:outline-none focus:border-accent appearance-none cursor-pointer"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-ink/80 mb-2">Notes</label>
                            <textarea
                                value={formData.notes || ''}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={4}
                                className="w-full p-3 bg-surface-1 border border-ink/10 rounded-lg text-[14px] focus:outline-none focus:border-accent resize-none"
                                placeholder="Any insights, interviewers' names, or follow-up dates..."
                            />
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-ink/5 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="btn-ghost">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving} className="btn-primary min-w-[100px]">
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationTracker;
