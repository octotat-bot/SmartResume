import { Link } from 'react-router-dom';
import { ArrowRight, Check, Wand2, BarChart3, Cpu } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-canvas selection:bg-accent/20">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-canvas/90 backdrop-blur-[16px] border-b border-ink/5 h-16 transition-all duration-200">
                <div className="max-w-[1200px] mx-auto px-5 lg:px-12 h-full flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="font-sans font-semibold text-[18px] text-ink tracking-tight">SmartResume</span>
                    </Link>

                    <div className="flex gap-8 items-center">
                        <Link to="/login" className="text-sm font-sans font-medium text-ink/70 hover:text-ink transition-colors">
                            Sign in
                        </Link>
                        <Link to="/register" className="btn-primary py-2 px-6">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-24 px-5 lg:px-12 max-w-[1200px] mx-auto min-h-[90vh] flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 text-left">
                        <div className="text-caption text-accent mb-6">AI Resume Builder</div>
                        <h1 className="text-[64px] font-serif leading-[1.1] text-ink mb-6 tracking-tight">
                            Your résumé,<br />refined.
                        </h1>
                        <p className="text-body-large text-ink/70 mb-10 max-w-md">
                            A carefully crafted tool for career professionals. Build, track, and optimize your job applications with understated confidence.
                        </p>
                        <Link to="/register" className="btn-primary text-base inline-flex items-center gap-2">
                            Create your resume <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    
                    <div className="lg:col-span-7 relative">
                        {/* Elegant Hero Mockup */}
                        <div className="bg-surface-1 border border-ink/5 rounded-xl shadow-paper p-8 aspect-[4/3] flex flex-col">
                            <div className="flex gap-4 border-b border-ink/5 pb-4 mb-6">
                                <div className="w-12 h-12 bg-surface-2 rounded-full flex-shrink-0"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-1/3 bg-ink/10 rounded"></div>
                                    <div className="h-3 w-1/4 bg-ink/5 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-4 flex-1">
                                <div className="h-3 w-full bg-ink/5 rounded"></div>
                                <div className="h-3 w-5/6 bg-ink/5 rounded"></div>
                                <div className="h-3 w-4/6 bg-ink/5 rounded"></div>
                            </div>
                            {/* Subtle AI indicator */}
                            <div className="absolute -bottom-6 -right-6 bg-surface-1 border border-ink/5 shadow-card rounded-lg p-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                    <Wand2 className="w-4 h-4 text-accent" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-ink">AI Optimized</div>
                                    <div className="text-xs text-ink/60">ATS Score: 98%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - Editorial Layout */}
            <section className="py-24 px-5 lg:px-12 max-w-[1200px] mx-auto border-t border-ink/5">
                <h2 className="text-[42px] font-serif text-ink mb-20 text-left">The standard for<br/>professional applications.</h2>
                
                <div className="space-y-32">
                    {/* Feature 01 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">
                        <div className="absolute -left-8 -top-16 text-[120px] font-serif text-ink/5 select-none -z-10">01</div>
                        <div className="md:col-span-5">
                            <h3 className="text-2xl font-serif text-ink mb-4">Precision Formatting</h3>
                            <p className="text-body text-ink/70">
                                Forget wrestling with margins and page breaks. Our intelligent editor handles the typesetting, ensuring your document looks impeccable whether viewed on screen or printed on heavy stock.
                            </p>
                        </div>
                        <div className="md:col-span-7 bg-surface-2 rounded-xl h-64 border border-ink/5"></div>
                    </div>

                    {/* Feature 02 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">
                        <div className="absolute right-0 -top-16 text-[120px] font-serif text-ink/5 select-none -z-10">02</div>
                        <div className="md:col-span-7 order-2 md:order-1 bg-surface-2 rounded-xl h-64 border border-ink/5"></div>
                        <div className="md:col-span-5 order-1 md:order-2">
                            <h3 className="text-2xl font-serif text-ink mb-4">Smart Organization</h3>
                            <p className="text-body text-ink/70">
                                Maintain multiple tailored versions of your resume without the clutter. Duplicate, tag, and organize with a system designed for modern career navigation.
                            </p>
                        </div>
                    </div>
                    
                    {/* Feature 03 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">
                        <div className="absolute -left-8 -top-16 text-[120px] font-serif text-ink/5 select-none -z-10">03</div>
                        <div className="md:col-span-5">
                            <h3 className="text-2xl font-serif text-ink mb-4">Deep Analytics</h3>
                            <p className="text-body text-ink/70">
                                Understand how your resume performs before you apply. We analyze readability, structure, and keyword density against industry standards.
                            </p>
                        </div>
                        <div className="md:col-span-7 bg-surface-2 rounded-xl h-64 border border-ink/5 flex items-center justify-center">
                            <BarChart3 className="w-12 h-12 text-ink/20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Features Section */}
            <section className="py-24 px-5 lg:px-12 bg-surface-2 border-y border-ink/5">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="text-caption text-accent mb-4">Intelligence built-in</div>
                        <h2 className="text-[42px] font-serif text-ink mb-8">
                            Write with authority.
                        </h2>
                        <p className="text-body-large text-ink/70 mb-10">
                            Our proprietary AI doesn't just generate text—it refines your achievements into compelling, ATS-optimized narratives that respect the intelligence of the hiring manager.
                        </p>
                        
                        <div className="space-y-6">
                            {[
                                { title: 'Strategic Rephrasing', desc: 'Transforms passive duties into active achievements.' },
                                { title: 'ATS Alignment', desc: 'Maps your experience directly to job descriptions.' },
                                { title: 'Targeted Preparation', desc: 'Generates specific interview questions based on your profile.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-5 h-5 rounded border border-accent flex items-center justify-center bg-accent/10">
                                            <Check className="w-3 h-3 text-accent" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-base font-semibold text-ink mb-1">{item.title}</div>
                                        <div className="text-sm text-ink/70">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-surface-1 border border-ink/5 shadow-card rounded-xl p-6 font-mono text-sm">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-ink/5">
                            <Cpu className="w-4 h-4 text-accent" />
                            <span className="text-ink/60">Analysis Engine</span>
                        </div>
                        <div className="space-y-4 text-ink/80">
                            <p className="flex gap-3"><span className="text-accent">›</span> Scanning document structure...</p>
                            <p className="flex gap-3"><span className="text-status-success">✓</span> Structure validation passed.</p>
                            <p className="flex gap-3"><span className="text-accent">›</span> Analyzing semantic density...</p>
                            <p className="flex gap-3"><span className="text-status-warning">!</span> Recommendation: Quantify impact in recent role.</p>
                            <div className="mt-6 p-4 bg-surface-2 rounded-lg border border-ink/5 text-ink">
                                <strong>Suggestion:</strong> "Managed team" → "Directed cross-functional team of 12, increasing delivery velocity by 34%"
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Tracker Section */}
            <section className="py-24 px-5 lg:px-12 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <div className="space-y-4">
                            {/* Tracker Card 1 */}
                            <div className="card flex items-center justify-between p-6">
                                <div className="flex flex-col">
                                    <span className="text-lg font-serif text-ink">Stripe</span>
                                    <span className="text-sm text-ink/60">Frontend Engineer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-status-success"></div>
                                    <span className="text-xs text-ink/60 uppercase tracking-wider font-medium">Interviewing</span>
                                </div>
                            </div>
                            {/* Tracker Card 2 */}
                            <div className="card flex items-center justify-between p-6 opacity-80">
                                <div className="flex flex-col">
                                    <span className="text-lg font-serif text-ink">Vercel</span>
                                    <span className="text-sm text-ink/60">Design Engineer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-status-info"></div>
                                    <span className="text-xs text-ink/60 uppercase tracking-wider font-medium">Applied</span>
                                </div>
                            </div>
                            {/* Tracker Card 3 */}
                            <div className="card flex items-center justify-between p-6 opacity-60">
                                <div className="flex flex-col">
                                    <span className="text-lg font-serif text-ink">Linear</span>
                                    <span className="text-sm text-ink/60">Product Designer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-status-warning"></div>
                                    <span className="text-xs text-ink/60 uppercase tracking-wider font-medium">Draft</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="order-1 lg:order-2">
                        <h2 className="text-[42px] font-serif text-ink mb-6">
                            Clarity in the process.
                        </h2>
                        <p className="text-body-large text-ink/70 mb-8">
                            A minimalist board to track your career movements. No visual noise, just the state of your applications at a glance.
                        </p>
                        <Link to="/register" className="btn-secondary">
                            Explore Tracker
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-ink/5 bg-surface-1 py-12">
                <div className="max-w-[1200px] mx-auto px-5 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="font-sans font-semibold text-[18px] text-ink">SmartResume</div>
                    <div className="flex gap-8 text-sm text-ink/60">
                        <a href="#" className="hover:text-ink transition-colors">Manifesto</a>
                        <a href="#" className="hover:text-ink transition-colors">Privacy</a>
                        <a href="#" className="hover:text-ink transition-colors">Terms</a>
                    </div>
                    <div className="text-sm text-ink/40">
                        © {new Date().getFullYear()} SmartResume Studio.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
