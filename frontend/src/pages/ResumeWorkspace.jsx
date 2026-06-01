import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layout, Settings2, GripVertical, Plus, Sparkles, Check, X, Download, ZoomIn, ZoomOut } from 'lucide-react';

const ResumeWorkspace = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);
    
    // UI State
    const [rightPanelOpen, setRightPanelOpen] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [docSettings, setDocSettings] = useState({ font: 'inter', color: '#141210', margin: 'normal', spacing: 'normal' });

    useEffect(() => {
        // Mock loading resume
        setTimeout(() => {
            setResume({
                title: 'Senior Frontend Engineer',
                personalInfo: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
                experience: [],
                education: [],
                skills: { technical: [] }
            });
        }, 500);
    }, [id]);

    if (!resume) {
        return <div className="h-screen flex items-center justify-center bg-surface-1 font-sans text-ink/60">Loading workspace...</div>;
    }

    return (
        <div className="h-screen flex flex-col font-sans bg-surface-1 overflow-hidden animate-[fadeInScale_300ms_ease-out]">
            {/* TOP BAR */}
            <header className="h-[52px] bg-white border-b border-ink/5 px-4 flex items-center justify-between shrink-0 z-10">
                <div className="flex flex-1 items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="text-[13px] text-ink/60 hover:text-ink flex items-center gap-1.5 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Dashboard
                    </button>
                </div>
                
                <div className="flex-1 flex justify-center">
                    <input 
                        type="text" 
                        value={resume.title}
                        onChange={(e) => setResume({...resume, title: e.target.value})}
                        className="font-serif text-[16px] text-ink text-center bg-transparent border-b border-transparent hover:border-ink/20 focus:border-accent focus:outline-none px-2 py-1 transition-colors w-64"
                    />
                </div>
                
                <div className="flex flex-1 items-center justify-end gap-4">
                    <span className="text-[12px] text-ink/40">Last saved 2 min ago</span>
                    <button className="btn-ghost text-[13px] h-[32px] px-3 font-medium">Preview</button>
                    <button className="btn-primary text-[13px] h-[32px] px-4 rounded-lg flex items-center gap-2 font-medium">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <div className="w-px h-4 bg-ink/10 mx-2" />
                    <button className="p-2 text-ink/60 hover:bg-surface-2 rounded-lg transition-colors">
                        <Layout className="w-4 h-4" />
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* LEFT PANEL */}
                <aside className="w-[240px] bg-white border-r border-ink/5 flex flex-col shrink-0 z-10">
                    <div className="p-4 flex-1 overflow-y-auto hide-scrollbar">
                        <h3 className="text-caption text-ink/40 mb-4">Sections</h3>
                        <div className="space-y-1 mb-4">
                            {['Contact', 'Summary', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications'].map(sec => (
                                <div key={sec} className="group flex items-center gap-2 p-2 hover:bg-surface-2 rounded-lg cursor-pointer">
                                    <GripVertical className="w-3.5 h-3.5 text-ink/20 group-hover:text-ink/40 transition-colors" />
                                    <span className="text-[14px] text-ink flex-1">{sec}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-status-success/80" />
                                </div>
                            ))}
                        </div>
                        <button className="text-[13px] text-ink/60 hover:text-ink font-medium flex items-center gap-1.5 p-2 transition-colors">
                            <Plus className="w-4 h-4" /> Add section
                        </button>

                        <div className="mt-8 border-t border-ink/5 pt-6">
                            <h3 className="text-caption text-ink/40 mb-4">Document settings</h3>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-[12px] font-medium text-ink/80 block mb-2">Font</label>
                                    <select className="w-full h-[36px] text-[13px] border border-ink/10 rounded-lg px-2 bg-white appearance-none cursor-pointer">
                                        <option>Classic (Playfair)</option>
                                        <option>Modern (Inter)</option>
                                        <option>Technical (Mono)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[12px] font-medium text-ink/80 block mb-2">Color accent</label>
                                    <div className="flex gap-2">
                                        {['#141210', '#2B5BA8', '#2D6A4F', '#92622A', '#6B2B85'].map(color => (
                                            <button 
                                                key={color} 
                                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${docSettings.color === color ? 'ring-2 ring-offset-1 ring-accent' : ''}`} 
                                                style={{backgroundColor: color}}
                                                onClick={() => setDocSettings({...docSettings, color})}
                                            >
                                                {docSettings.color === color && <Check className="w-3 h-3 text-white" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[12px] font-medium text-ink/80 block mb-2">Page margins</label>
                                    <input type="range" className="w-full accent-accent cursor-pointer" min="0" max="2" defaultValue="1" />
                                    <div className="flex justify-between text-[11px] text-ink/40 mt-1">
                                        <span>Narrow</span><span>Normal</span><span>Wide</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[12px] font-medium text-ink/80 block mb-2">Line spacing</label>
                                    <input type="range" className="w-full accent-accent cursor-pointer" min="0" max="2" defaultValue="1" />
                                    <div className="flex justify-between text-[11px] text-ink/40 mt-1">
                                        <span>Compact</span><span>Normal</span><span>Loose</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* CENTER CANVAS */}
                <main className="flex-1 bg-[#ECEAE4] overflow-y-auto flex justify-center py-12 px-8 relative hide-scrollbar">
                    <div className="w-[794px] min-h-[1123px] shrink-0 bg-white shadow-[0_8px_40px_rgba(20,18,16,0.12)] rounded-[2px] p-16 transition-all relative group">
                        
                        {/* Fake document content based on spec */}
                        <div className="mb-8 border border-transparent hover:border-accent p-4 -m-4 rounded transition-colors cursor-text group/section">
                            <h1 className="font-serif text-[42px] text-ink leading-tight text-center">John Doe</h1>
                            <p className="text-[14px] text-ink/80 mt-2 text-center font-sans tracking-wide">
                                San Francisco, CA • john@example.com • (555) 123-4567 • linkedin.com/in/johndoe
                            </p>
                        </div>
                        
                        <div className="mb-6 border border-transparent hover:border-accent p-4 -m-4 rounded transition-colors cursor-text group/section">
                            <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider border-b border-ink/8 pb-2 mb-4">Experience</h2>
                            
                            <div className="mb-6">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-ink text-[15px]">Senior Frontend Engineer <span className="font-normal text-ink/60">at Stripe</span></h3>
                                    <span className="text-[13px] text-ink/60">2021 - Present</span>
                                </div>
                                <ul className="mt-2 space-y-1.5 text-[14px] text-ink/80">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[8px] mt-1.5 opacity-60">▪</span> 
                                        <span>Led frontend architecture for the new billing portal, decreasing time-to-market for new payment features by 30%.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[8px] mt-1.5 opacity-60">▪</span> 
                                        <span>Decreased bundle size by 40%, improving Time to Interactive (TTI) by 1.2s across the dashboard.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[8px] mt-1.5 opacity-60">▪</span> 
                                        <span>Mentored 4 junior engineers and established new React testing patterns using React Testing Library.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-ink text-[15px]">Software Engineer <span className="font-normal text-ink/60">at Airbnb</span></h3>
                                    <span className="text-[13px] text-ink/60">2018 - 2021</span>
                                </div>
                                <ul className="mt-2 space-y-1.5 text-[14px] text-ink/80">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[8px] mt-1.5 opacity-60">▪</span> 
                                        <span>Developed and maintained core UI components in the shared design system used by 50+ engineers.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[8px] mt-1.5 opacity-60">▪</span> 
                                        <span>Migrated legacy Redux codebase to React Context and Hooks, reducing boilerplate code by 25%.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-6 border border-transparent hover:border-accent p-4 -m-4 rounded transition-colors cursor-text group/section">
                            <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider border-b border-ink/8 pb-2 mb-4">Education</h2>
                            <div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-ink text-[15px]">B.S. Computer Science <span className="font-normal text-ink/60">at UC Berkeley</span></h3>
                                    <span className="text-[13px] text-ink/60">2014 - 2018</span>
                                </div>
                                <p className="text-[14px] text-ink/80">GPA: 3.8/4.0 • Dean's List all semesters</p>
                            </div>
                        </div>

                        <div className="mb-6 border border-transparent hover:border-accent p-4 -m-4 rounded transition-colors cursor-text group/section">
                            <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider border-b border-ink/8 pb-2 mb-4">Skills</h2>
                            <p className="text-[14px] text-ink/80 leading-relaxed">
                                <span className="font-semibold text-ink">Languages:</span> JavaScript, TypeScript, HTML/CSS, Python, SQL<br/>
                                <span className="font-semibold text-ink">Frameworks:</span> React, Next.js, Node.js, Express, Tailwind CSS<br/>
                                <span className="font-semibold text-ink">Tools:</span> Git, Webpack, Vite, Jest, Cypress, Figma, AWS
                            </p>
                        </div>
                        
                        {/* Page break indicator */}
                        <div className="absolute top-[1123px] left-0 w-full border-t border-dashed border-status-error/40 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <div className="absolute right-4 -top-3 bg-white border border-status-error/20 text-status-error text-[11px] px-2 py-0.5 rounded shadow-sm">
                                Content below this line won't print on page 1
                            </div>
                        </div>
                    </div>

                    {/* Canvas Controls */}
                    <div className="fixed bottom-6 right-[324px] flex items-center gap-2 bg-white rounded-lg border border-ink/10 p-1 shadow-sm transition-all z-20">
                        <button className="p-1.5 hover:bg-surface-2 rounded text-ink/60 transition-colors"><ZoomOut className="w-4 h-4" /></button>
                        <span className="text-[12px] font-medium px-2 text-ink">100%</span>
                        <button className="p-1.5 hover:bg-surface-2 rounded text-ink/60 transition-colors"><ZoomIn className="w-4 h-4" /></button>
                    </div>
                </main>

                {/* RIGHT PANEL (AI/ATS) */}
                {rightPanelOpen && (
                    <aside className="w-[300px] bg-white border-l border-ink/5 flex flex-col shrink-0 z-10 animate-[slideInRight_300ms_ease-out]">
                        <div className="p-6 border-b border-ink/5 bg-surface-1/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[14px] font-semibold text-ink">ATS Live Score</h3>
                                <button onClick={() => setRightPanelOpen(false)} className="text-ink/40 hover:text-ink transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="font-serif text-[42px] text-status-success leading-none tracking-tight">82</span>
                                <span className="text-[13px] text-ink/40 font-medium uppercase tracking-wider">/ 100</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-status-success rounded-full" style={{width: '82%'}} />
                            </div>
                            <div className="text-[12px] text-ink/60">Based on your current content</div>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto hide-scrollbar">
                            <h3 className="text-[14px] font-semibold text-ink mb-5 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-accent" /> AI Suggestions
                            </h3>

                            <div className="space-y-4">
                                {/* Suggestion Card */}
                                <div className="bg-white border border-ink/5 border-l-[3px] border-l-accent rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="inline-block px-2 py-1 bg-surface-2 rounded text-[10px] font-semibold uppercase tracking-wider text-ink/60 mb-3">
                                        Bullet enhancement
                                    </div>
                                    <p className="text-[13px] text-ink mb-4 leading-relaxed">
                                        Instead of "Improved performance", try: <span className="font-medium bg-accent/5 px-1 py-0.5 rounded text-accent">"Decreased bundle size by 40%, improving TTI by 1.2s"</span>
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button className="bg-accent text-white h-[28px] px-3 text-[12px] rounded-lg font-medium hover:brightness-95 transition-all">Apply</button>
                                        <button className="bg-surface-2 text-ink/60 hover:text-ink hover:bg-ink/5 h-[28px] px-3 text-[12px] rounded-lg font-medium transition-all">Dismiss</button>
                                    </div>
                                </div>
                                
                                <div className="bg-white border border-ink/5 border-l-[3px] border-l-status-warning rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="inline-block px-2 py-1 bg-surface-2 rounded text-[10px] font-semibold uppercase tracking-wider text-ink/60 mb-3">
                                        Keyword missing
                                    </div>
                                    <p className="text-[13px] text-ink mb-4 leading-relaxed">
                                        Consider adding <span className="font-medium bg-status-warning/10 px-1 py-0.5 rounded text-status-warning">"React Context"</span> to your skills section based on your target role.
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button className="bg-accent text-white h-[28px] px-3 text-[12px] rounded-lg font-medium hover:brightness-95 transition-all">Apply</button>
                                        <button className="bg-surface-2 text-ink/60 hover:text-ink hover:bg-ink/5 h-[28px] px-3 text-[12px] rounded-lg font-medium transition-all">Dismiss</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Floating AI Button (when collapsed) */}
                {!rightPanelOpen && (
                    <button 
                        onClick={() => setRightPanelOpen(true)}
                        className="absolute right-6 top-20 w-12 h-12 bg-white rounded-full shadow-lg border border-ink/5 flex items-center justify-center text-accent hover:scale-105 transition-transform z-20 group"
                        title="AI Assistant"
                    >
                        <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                        <div className="absolute top-0 right-0 w-3 h-3 bg-status-error border-2 border-white rounded-full" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ResumeWorkspace;
