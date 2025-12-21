import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resumeService } from '../services/api';
import { FileText, Plus, Trash2, Edit, Clock, Download, Star, Search, Filter, SortAsc } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

const ResumesPage = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState('all'); // 'all', 'active', 'inactive'
    const [sortBy, setSortBy] = useState('lastModified'); // 'lastModified', 'title', 'createdAt'
    const [sortOrder, setSortOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, resumeId: null, resumeTitle: '' });

    useEffect(() => {
        loadResumes();
    }, [searchTerm, filterActive, sortBy, sortOrder, page]);

    const loadResumes = async () => {
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
    };

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

    if (loading && page === 1) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400">Loading resumes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">My Resumes</h1>
                            <p className="text-base text-gray-400">Manage and create professional resumes</p>
                        </div>
                        <Link
                            to="/resumes/new"
                            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Create New Resume
                        </Link>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search resumes by title or role..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-lg text-white placeholder-gray-500 focus:border-white/30 focus:outline-none transition-all"
                            />
                        </div>

                        {/* Filter by Status */}
                        <select
                            value={filterActive}
                            onChange={(e) => setFilterActive(e.target.value)}
                            className="px-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-lg text-white focus:border-white/30 focus:outline-none transition-all"
                        >
                            <option value="all">All Resumes</option>
                            <option value="active">Active Only</option>
                            <option value="inactive">Inactive Only</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-lg text-white focus:border-white/30 focus:outline-none transition-all"
                        >
                            <option value="lastModified">Last Modified</option>
                            <option value="title">Title</option>
                            <option value="createdAt">Date Created</option>
                        </select>

                        {/* Sort Order */}
                        <button
                            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                            className="px-4 py-3 bg-[#111111] border border-[#1a1a1a] rounded-lg text-white hover:bg-[#161616] transition-all flex items-center gap-2"
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
                        className="group flex flex-col items-center justify-center p-6 bg-[#111111] border-2 border-dashed border-[#333] rounded-xl hover:border-white/50 hover:bg-[#161616] transition-all min-h-[220px] gap-4"
                    >
                        <div className="w-14 h-14 rounded-full bg-[#222] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                            <Plus className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                        <span className="font-semibold text-gray-400 group-hover:text-white transition-colors">Create New Resume</span>
                    </Link>

                    {resumes.map((resume) => (
                        <div
                            key={resume._id}
                            className="group relative bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 hover:border-white/20 transition-all flex flex-col min-h-[220px] shadow-sm hover:shadow-xl hover:shadow-black/50"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-[#222] border border-[#222] group-hover:border-[#333] transition-all">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="relative z-20">
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
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                                    {resume.title || 'Untitled Resume'}
                                </h3>
                                <p className="text-sm text-gray-400 line-clamp-2">
                                    {resume.metadata?.targetRole || 'No role specified'}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a] mt-auto">
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
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
                            className="px-4 py-2 bg-[#111111] border border-[#1a1a1a] rounded-lg text-white hover:bg-[#161616] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
                                        : 'bg-[#111111] border border-[#1a1a1a] text-white hover:bg-[#161616]'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-[#111111] border border-[#1a1a1a] rounded-lg text-white hover:bg-[#161616] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && resumes.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No resumes found</h3>
                        <p className="text-gray-400 mb-6">
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
