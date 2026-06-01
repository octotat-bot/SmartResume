import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resumeService } from '../services/api';
import { FileText, Plus, Trash2, Clock, Download, Search, SortAsc, Copy } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

const ResumesPage = () => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState('all'); // 'all', 'active', 'inactive'
    const [sortBy, setSortBy] = useState('lastModified'); // 'lastModified', 'title', 'createdAt'
    const [sortOrder, setSortOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, resumeId: null, resumeTitle: '' });
    const [duplicating, setDuplicating] = useState(null);

    const loadResumes = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 12,
                sortBy,
                sortOrder
            };

            if (searchTerm) params.search = searchTerm;
            if (filterActive !== 'all') params.isActive = filterActive === 'active';

            const data = await resumeService.getResumes(params);
            setResumes(data.resumes || []);
            setTotalPages(data.pagination?.pages || 1);
        } catch (error) {
            console.error('Failed to load resumes:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, filterActive, sortBy, sortOrder, page]);

    useEffect(() => {
        loadResumes();
    }, [loadResumes]);

    const handleDelete = async () => {
        try {
            await resumeService.deleteResume(deleteDialog.resumeId);
            loadResumes();
            setDeleteDialog({ isOpen: false, resumeId: null, resumeTitle: '' });
        } catch (error) {
            console.error('Failed to delete resume:', error);
            setDeleteDialog({ isOpen: false, resumeId: null, resumeTitle: '' });
        }
    };

    const handleDuplicate = async (resumeId, e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            setDuplicating(resumeId);
            const duplicatedResume = await resumeService.duplicateResume(resumeId);

            // Navigate to the duplicated resume
            navigate(`/resumes/${duplicatedResume._id}`);
        } catch (error) {
            console.error('Failed to duplicate resume:', error);
            setDuplicating(null);
        }
    };

    if (loading && page === 1) {
        return (
            <div className="min-h-screen bg-canvas p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Skeleton */}
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <div className="w-48 h-10 bg-ink/5 rounded-md mb-3 animate-pulse" />
                            <div className="w-64 h-5 bg-ink/5 rounded-md animate-pulse" />
                        </div>
                        <div className="w-40 h-12 bg-ink/5 rounded-lg animate-pulse" />
                    </div>
                    {/* Filter Skeleton */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 h-12 bg-ink/5 rounded-lg animate-pulse" />
                        <div className="w-full md:w-40 h-12 bg-ink/5 rounded-lg animate-pulse" />
                        <div className="w-full md:w-40 h-12 bg-ink/5 rounded-lg animate-pulse" />
                        <div className="w-12 h-12 bg-ink/5 rounded-lg animate-pulse" />
                    </div>
                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-white border border-ink/5 rounded-xl p-6 min-h-[220px] flex flex-col justify-between shadow-sm">
                                <div className="mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-ink/5 animate-pulse" />
                                </div>
                                <div className="flex-1 mb-4">
                                    <div className="w-3/4 h-6 bg-ink/5 rounded-md mb-3 animate-pulse" />
                                    <div className="w-1/2 h-4 bg-ink/5 rounded-md mb-3 animate-pulse" />
                                    <div className="flex gap-2">
                                        <div className="w-16 h-5 bg-ink/5 rounded-full animate-pulse" />
                                        <div className="w-12 h-5 bg-ink/5 rounded-full animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-ink/5 mt-auto">
                                    <div className="w-24 h-4 bg-ink/5 rounded-md animate-pulse" />
                                    <div className="w-16 h-8 bg-ink/5 rounded-lg animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-1 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-ink mb-2">My Resumes</h1>
                            <p className="text-base text-ink/60">Manage and create professional resumes</p>
                        </div>
                        <div className="flex gap-3">
                            {resumes.length > 0 && (
                                <button
                                    onClick={() => alert('Bulk export feature requires JSZip package. Run: npm install jszip')}
                                    className="px-6 py-3 btn-primary text-ink font-semibold rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                                    title="Export all resumes as ZIP"
                                >
                                    <Download className="w-5 h-5" />
                                    Export All
                                </button>
                            )}
                            <Link
                                to="/resumes/new"
                                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Create New Resume
                            </Link>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                            <input
                                type="text"
                                placeholder="Search resumes by title or role..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-surface-2 border border-ink/5 rounded-lg text-ink placeholder-ink/40 focus:border-white/30 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Filter by Status */}
                        <select
                            value={filterActive}
                            onChange={(e) => setFilterActive(e.target.value)}
                            className="px-4 py-3 bg-surface-2 border border-ink/5 rounded-lg text-ink focus:border-white/30 focus:outline-none transition-all"
                        >
                            <option value="all">All Resumes</option>
                            <option value="active">Active Only</option>
                            <option value="inactive">Inactive Only</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 bg-surface-2 border border-ink/5 rounded-lg text-ink focus:border-white/30 focus:outline-none transition-all"
                        >
                            <option value="lastModified">Last Modified</option>
                            <option value="title">Title</option>
                            <option value="createdAt">Date Created</option>
                        </select>

                        {/* Sort Order */}
                        <button
                            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                            className="px-4 py-3 bg-surface-2 border border-ink/5 rounded-lg text-ink hover:bg-[#161616] transition-all flex items-center gap-2"
                            title={sortOrder === 'desc' ? 'Descending' : 'Ascending'}
                        >
                            <SortAsc className={`w-5 h-5 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Resumes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Create New Card */}
                    <Link
                        to="/resumes/new"
                        className="group flex flex-col items-center justify-center p-6 bg-surface-2 border-2 border-dashed border-[#333] rounded-xl hover:border-white/50 hover:bg-[#161616] transition-all min-h-[220px] gap-4"
                    >
                        <div className="w-14 h-14 rounded-full bg-surface-3 hover:brightness-95 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                            <Plus className="w-7 h-7 text-ink/60 group-hover:text-ink transition-colors" />
                        </div>
                        <span className="font-semibold text-ink/60 group-hover:text-ink transition-colors">Create New Resume</span>
                    </Link>

                    {resumes.map((resume) => (
                        <div
                            key={resume._id}
                            className="group relative bg-surface-2 border border-ink/5 rounded-xl p-6 hover:border-white/20 transition-all flex flex-col min-h-[220px] shadow-sm hover:shadow-xl hover:shadow-black/50"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-xl bg-surface-3 flex items-center justify-center text-ink/40 group-hover:text-ink group-hover:bg-surface-3 hover:brightness-95 border border-[#222] group-hover:border-[#333] transition-all">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="relative z-20 flex gap-1">
                                    <button
                                        onClick={(e) => handleDuplicate(resume._id, e)}
                                        disabled={duplicating === resume._id}
                                        className="p-2 text-gray-600 hover:text-accent hover:bg-blue-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                        title="Duplicate"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setDeleteDialog({
                                                isOpen: true,
                                                resumeId: resume._id,
                                                resumeTitle: resume.title || 'Untitled Resume'
                                            });
                                        }}
                                        className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 mb-4">
                                <h3 className="text-xl font-bold text-ink mb-2 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                                    {resume.title || 'Untitled Resume'}
                                </h3>
                                <p className="text-sm text-ink/60 line-clamp-2 mb-2">
                                    {resume.metadata?.targetRole || 'No role specified'}
                                </p>
                                {/* Tags */}
                                {resume.tags && resume.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {resume.tags.slice(0, 3).map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-0.5 bg-blue-500/20 text-accent text-xs rounded-full border border-blue-500/30"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {resume.tags.length > 3 && (
                                            <span className="px-2 py-0.5 bg-gray-500/20 text-ink/60 text-xs rounded-full">
                                                +{resume.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-ink/5 mt-auto">
                                <div className="flex items-center gap-2 text-xs text-ink/40 font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{new Date(resume.lastModified || resume.updatedAt || Date.now()).toLocaleDateString()}</span>
                                </div>
                                <div className="relative z-20">
                                    <Link
                                        to={`/resumes/${resume._id}`}
                                        className="text-xs font-bold bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-block"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>

                            {/* Full Card Link overlay */}
                            <Link
                                to={`/resumes/${resume._id}`}
                                className="absolute inset-0 z-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20"
                            />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-surface-2 border border-ink/5 rounded-lg text-ink hover:bg-[#161616] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${page === i + 1
                                        ? 'bg-white text-black'
                                        : 'bg-surface-2 border border-ink/5 text-ink hover:bg-[#161616]'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-surface-2 border border-ink/5 rounded-lg text-ink hover:bg-[#161616] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && resumes.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-ink mb-2">No resumes found</h3>
                        <p className="text-ink/60 mb-6">
                            {searchTerm || filterActive !== 'all'
                                ? 'Try adjusting your filters or search term'
                                : 'Create your first resume to get started'}
                        </p>
                        {!searchTerm && filterActive === 'all' && (
                            <Link
                                to="/resumes/new"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Create Your First Resume
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, resumeId: null, resumeTitle: '' })}
                onConfirm={handleDelete}
                title="Delete Resume"
                message={`Are you sure you want to delete "${deleteDialog.resumeTitle}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
            />
        </div>
    );
};

export default ResumesPage;
