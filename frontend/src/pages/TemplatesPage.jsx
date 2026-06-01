import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { templateService, resumeService } from '../services/api';
import { Search, Filter, Star, Crown, TrendingUp, Clock, Users, X, Eye, Sparkles, Check } from 'lucide-react';

const TemplatesPage = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('usageCount');
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [creating, setCreating] = useState(false);

    const loadTemplates = useCallback(async () => {
        setLoading(true);
        try {
            const data = await templateService.getTemplates({
                search,
                category: category !== 'all' ? category : undefined,
                sortBy,
                sortOrder: 'desc'
            });
            setTemplates(data.templates || []);
        } catch (error) {
            console.error('Failed to load templates:', error);
        } finally {
            setLoading(false);
        }
    }, [search, category, sortBy]);

    useEffect(() => {
        loadTemplates();
    }, [loadTemplates]);

    const handleUseTemplate = async (template) => {
        setCreating(true);
        try {
            // Create a new resume with this template
            const newResume = await resumeService.createResume({
                title: `Resume - ${template.name}`,
                templateId: template._id,
                personalInfo: {
                    fullName: '',
                    email: '',
                    phone: '',
                    location: '',
                    summary: ''
                },
                experience: [],
                education: [],
                skills: { technical: [], soft: [], languages: [], tools: [] },
                projects: [],
                certifications: [],
                metadata: {
                    layout: template.name.toLowerCase().includes('modern') ? 'modern' : 'standard'
                }
            });

            // Navigate to the resume workspace
            navigate(`/resumes/${newResume._id}`);
        } catch (error) {
            console.error('Failed to create resume:', error);
            alert('Failed to create resume from template');
        } finally {
            setCreating(false);
        }
    };

    const categories = [
        { id: 'all', label: 'All Templates', icon: Sparkles },
        { id: 'modern', label: 'Modern', icon: TrendingUp },
        { id: 'classic', label: 'Classic', icon: Clock },
        { id: 'minimal', label: 'Minimal', icon: Filter },
        { id: 'creative', label: 'Creative', icon: Star },
        { id: 'professional', label: 'Professional', icon: Users },
        { id: 'technical', label: 'Technical', icon: Check }
    ];

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-600'
                            }`}
                    />
                ))}
                <span className="text-sm text-ink/60 ml-1">({rating.toFixed(1)})</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-surface-1 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-ink mb-2">Template Gallery</h1>
                    <p className="text-ink/60">Choose from our collection of professional resume templates</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search templates..."
                            className="w-full pl-12 pr-4 py-3 bg-surface-2 border border-ink/5 rounded-lg text-ink placeholder-ink/40 focus:border-white/30 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 bg-surface-2 border border-ink/5 rounded-lg text-ink focus:border-white/30 focus:outline-none transition-all"
                    >
                        <option value="usageCount">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="createdAt">Newest</option>
                    </select>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${category === cat.id
                                        ? 'bg-white text-black'
                                        : 'bg-surface-2 text-ink/60 hover:bg-[#161616] hover:text-ink border border-ink/5'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Templates Grid */}
                {loading ? (
                    <div className="text-center py-12 text-ink/60">Loading templates...</div>
                ) : templates.length === 0 ? (
                    <div className="text-center py-12 text-ink/60">No templates found</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => (
                            <div
                                key={template._id}
                                className="group bg-surface-2 border border-ink/5 rounded-xl overflow-hidden hover:border-white/20 transition-all hover:shadow-xl hover:shadow-black/50"
                            >
                                {/* Template Preview */}
                                <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                                    {/* Placeholder Preview */}
                                    <div className="absolute inset-0 bg-surface-3 flex items-center justify-center">
                                        <div className="text-center p-8">
                                            <div className="w-full h-2 bg-gray-700 rounded mb-3"></div>
                                            <div className="w-3/4 h-2 bg-gray-700 rounded mb-6"></div>
                                            <div className="space-y-2">
                                                <div className="w-full h-1 bg-gray-800 rounded"></div>
                                                <div className="w-full h-1 bg-gray-800 rounded"></div>
                                                <div className="w-2/3 h-1 bg-gray-800 rounded"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        {template.isPremium && (
                                            <span className="px-2 py-1 bg-yellow-500/90 text-black text-xs font-bold rounded flex items-center gap-1">
                                                <Crown className="w-3 h-3" />
                                                Premium
                                            </span>
                                        )}
                                        {template.usageCount > 100 && (
                                            <span className="px-2 py-1 bg-blue-500/90 text-ink text-xs font-bold rounded flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                Popular
                                            </span>
                                        )}
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-canvas/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedTemplate(template);
                                                setShowPreview(true);
                                            }}
                                            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-ink rounded-lg hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Preview
                                        </button>
                                        <button
                                            onClick={() => handleUseTemplate(template)}
                                            disabled={creating}
                                            className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2"
                                        >
                                            <Check className="w-4 h-4" />
                                            Use This
                                        </button>
                                    </div>
                                </div>

                                {/* Template Info */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-ink text-lg">{template.name}</h3>
                                        <span className="px-2 py-1 bg-surface-3 text-xs font-medium text-ink/60 rounded capitalize">
                                            {template.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-ink/60 mb-3 line-clamp-2">{template.description}</p>

                                    {/* Rating & Usage */}
                                    <div className="flex items-center justify-between">
                                        {renderStars(template.rating || 4.5)}
                                        <div className="flex items-center gap-1 text-xs text-ink/40">
                                            <Users className="w-3 h-3" />
                                            {template.usageCount || 0} uses
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    {template.tags && template.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {template.tags.slice(0, 3).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-surface-3 text-xs text-ink/60 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Preview Modal */}
                {showPreview && selectedTemplate && (
                    <div className="fixed inset-0 bg-canvas/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-surface-1 border border-ink/5 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-ink/5">
                                <div>
                                    <h2 className="text-2xl font-serif font-semibold text-ink">{selectedTemplate.name}</h2>
                                    <p className="text-sm text-ink/60 mt-1">{selectedTemplate.description}</p>
                                </div>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 hover:bg-surface-2 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-ink/60" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="aspect-[8.5/11] bg-white rounded-lg shadow-2xl mb-6">
                                    {/* Template preview would go here */}
                                    <div className="w-full h-full flex items-center justify-center text-ink/60">
                                        Template Preview
                                    </div>
                                </div>

                                {/* Template Details */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 bg-surface-2 rounded-lg border border-ink/5">
                                        <div className="text-sm text-ink/60 mb-1">Category</div>
                                        <div className="font-semibold text-ink capitalize">{selectedTemplate.category}</div>
                                    </div>
                                    <div className="p-4 bg-surface-2 rounded-lg border border-ink/5">
                                        <div className="text-sm text-ink/60 mb-1">Rating</div>
                                        {renderStars(selectedTemplate.rating || 4.5)}
                                    </div>
                                    <div className="p-4 bg-surface-2 rounded-lg border border-ink/5">
                                        <div className="text-sm text-ink/60 mb-1">Usage Count</div>
                                        <div className="font-semibold text-ink">{selectedTemplate.usageCount || 0} times</div>
                                    </div>
                                    <div className="p-4 bg-surface-2 rounded-lg border border-ink/5">
                                        <div className="text-sm text-ink/60 mb-1">Type</div>
                                        <div className="font-semibold text-ink">
                                            {selectedTemplate.isPremium ? 'Premium' : 'Free'}
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-ink mb-3">Features</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['ATS-Friendly', 'Modern Design', 'Easy to Edit', 'Professional Layout'].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-ink/80">
                                                <Check className="w-4 h-4 text-green-400" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-ink/5 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="px-6 py-3 bg-surface-2 text-ink rounded-lg hover:bg-[#161616] transition-colors border border-ink/5"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        handleUseTemplate(selectedTemplate);
                                        setShowPreview(false);
                                    }}
                                    disabled={creating}
                                    className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    {creating ? 'Creating...' : 'Use This Template'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplatesPage;
