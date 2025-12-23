import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Briefcase, BarChart3, Sparkles, Check, Users, Award, Star, Wand2, TrendingUp, Copy, Tag, Printer, Download, History, Zap, Brain, Target, Rocket } from 'lucide-react';

const LandingPage = () => {
    const newFeatures = [
        {
            icon: Wand2,
            title: 'AI-Powered Assistant',
            description: '10 AI features including bullet enhancement, ATS analysis, cover letter generation, and interview prep.',
            color: 'from-purple-500 to-pink-500',
            glow: 'purple'
        },
        {
            icon: Copy,
            title: 'Instant Duplication',
            description: 'Clone any resume with one click. Perfect for creating role-specific versions quickly.',
            color: 'from-blue-500 to-cyan-500',
            glow: 'blue'
        },
        {
            icon: BarChart3,
            title: 'Resume Analytics',
            description: 'Word count, reading time, completeness score, and personalized recommendations.',
            color: 'from-orange-500 to-yellow-500',
            glow: 'orange'
        },
        {
            icon: Tag,
            title: 'Smart Organization',
            description: 'Tag your resumes for easy filtering and organization. Find the right resume instantly.',
            color: 'from-green-500 to-emerald-500',
            glow: 'green'
        },
        {
            icon: Printer,
            title: 'Print Optimized',
            description: 'Professional print layouts with perfect page breaks and ATS-friendly formatting.',
            color: 'from-indigo-500 to-purple-500',
            glow: 'indigo'
        },
        {
            icon: Download,
            title: 'Bulk Export',
            description: 'Export all your resumes as PDFs in one ZIP file. Save time, stay organized.',
            color: 'from-pink-500 to-rose-500',
            glow: 'pink'
        }
    ];

    const aiFeatures = [
        'Bullet Point Enhancement',
        'Professional Summary Generation',
        'ATS Compatibility Analysis',
        'Cover Letter Writing',
        'Interview Question Preparation',
        'Skill Recommendations',
        'Resume Optimization',
        'Job Description Parsing',
        'AI Chat Assistant',
        'Content Suggestions'
    ];

    const templates = [
        'Technical',
        'Standard',
        'Modern',
        'Minimalist',
        'Creative',
        'Professional',
        'Compact',
        'Elegant',
        'Bold',
        'Timeline'
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Floating Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl shadow-black/50">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                <FileText className="w-5 h-5 text-black" />
                            </div>
                            <span className="text-base font-bold text-white">SmartResume</span>
                        </Link>

                        <div className="flex gap-2 items-center">
                            <Link
                                to="/login"
                                className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105"
                            >
                                Get Started Free
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-8 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm mb-10 hover:scale-105 transition-transform">
                            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                            <span className="font-medium text-white">Now with 10 AI-Powered Features</span>
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
                            <span className="text-white">Your AI-Powered</span>
                            <br />
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                                Career Companion
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 mb-14 leading-relaxed max-w-3xl mx-auto">
                            Create stunning resumes with AI assistance, track applications,
                            <br className="hidden md:block" />
                            and land your dream job faster than ever before.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                            <Link
                                to="/register"
                                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all inline-flex items-center justify-center gap-2 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                            >
                                Start Creating Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#features"
                                className="px-8 py-4 bg-white/5 text-white font-semibold rounded-lg hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 hover:scale-105"
                            >
                                Explore Features
                            </a>
                        </div>

                        {/* Enhanced Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
                            <div className="text-center group hover:scale-110 transition-transform">
                                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">10+</div>
                                <div className="text-sm text-gray-500 font-medium">AI Features</div>
                            </div>
                            <div className="text-center group hover:scale-110 transition-transform">
                                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">10</div>
                                <div className="text-sm text-gray-500 font-medium">Templates</div>
                            </div>
                            <div className="text-center group hover:scale-110 transition-transform">
                                <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">95%</div>
                                <div className="text-sm text-gray-500 font-medium">Success Rate</div>
                            </div>
                            <div className="text-center group hover:scale-110 transition-transform">
                                <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">4.9★</div>
                                <div className="text-sm text-gray-500 font-medium">User Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Features Showcase */}
            <div id="features" className="py-20 px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111111]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-400 mb-6">
                            <Zap className="w-4 h-4" />
                            <span className="font-medium">Just Released</span>
                        </div>
                        <h2 className="text-5xl font-bold text-white mb-4">
                            Powerful New Features
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We've added game-changing features to make your job search easier and more effective
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl hover:border-white/30 transition-all hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
                            >
                                {/* Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all shadow-lg`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Features Section */}
            <div className="py-20 px-8 bg-[#111111]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-400 mb-6">
                                <Brain className="w-4 h-4" />
                                <span className="font-medium">AI-Powered</span>
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-6">
                                10 AI Features to
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Supercharge Your Resume
                                </span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Our advanced AI assistant helps you create compelling content, optimize for ATS systems, and prepare for interviews - all in one place.
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {aiFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-300 group hover:text-white transition-colors">
                                        <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-105 shadow-lg shadow-purple-500/30"
                            >
                                Try AI Features Free
                                <Sparkles className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm">
                                <div className="space-y-4">
                                    <div className="bg-[#0a0a0a] rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Wand2 className="w-5 h-5 text-purple-400" />
                                            <span className="font-semibold text-white">AI Enhancement</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Transform basic bullet points into compelling achievements</p>
                                    </div>
                                    <div className="bg-[#0a0a0a] rounded-lg p-4 border border-white/10 hover:border-blue-500/50 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Target className="w-5 h-5 text-blue-400" />
                                            <span className="font-semibold text-white">ATS Analysis</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Ensure your resume passes applicant tracking systems</p>
                                    </div>
                                    <div className="bg-[#0a0a0a] rounded-lg p-4 border border-white/10 hover:border-green-500/50 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FileText className="w-5 h-5 text-green-400" />
                                            <span className="font-semibold text-white">Cover Letters</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Generate tailored cover letters in seconds</p>
                                    </div>
                                    <div className="bg-[#0a0a0a] rounded-lg p-4 border border-white/10 hover:border-orange-500/50 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Briefcase className="w-5 h-5 text-orange-400" />
                                            <span className="font-semibold text-white">Interview Prep</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Get role-specific interview questions and answers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Showcase */}
            <div className="py-20 px-8 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-4">
                            10 Professional Templates
                        </h2>
                        <p className="text-xl text-gray-400">
                            Choose from our collection of ATS-optimized, beautifully designed templates
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                        {templates.map((template, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-[#111111] border border-[#1a1a1a] rounded-xl hover:border-white/30 transition-all hover:-translate-y-1 text-center"
                            >
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-all">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-white font-semibold">{template}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
                        >
                            Browse All Templates
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Job Tracking Section */}
            <div className="py-20 px-8 bg-[#111111]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border border-blue-500/30 backdrop-blur-sm">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                            <Briefcase className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">Google</div>
                                            <div className="text-sm text-gray-400">Software Engineer</div>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">Interview</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                            <Briefcase className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">Microsoft</div>
                                            <div className="text-sm text-gray-400">Product Manager</div>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">Applied</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                            <Briefcase className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">Amazon</div>
                                            <div className="text-sm text-gray-400">Data Scientist</div>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">Offer</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 mb-6">
                                <BarChart3 className="w-4 h-4" />
                                <span className="font-medium">Application Tracking</span>
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-6">
                                Track Every Application
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    From Apply to Offer
                                </span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Never lose track of your job applications again. Our intelligent tracker helps you manage every stage of your job search with ease.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300">Kanban board view for visual tracking</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300">Automatic status updates and reminders</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300">Success rate analytics and insights</span>
                                </div>
                            </div>

                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                            >
                                Start Tracking Free
                                <Rocket className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111111] border-t border-[#1a1a1a]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-6xl font-bold text-white mb-6">
                        Ready to land your
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            dream job?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Join thousands of professionals using SmartResume to create stunning resumes and track their job search.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all text-lg hover:scale-105 shadow-2xl shadow-purple-500/30"
                    >
                        Start Free Today
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                    <p className="mt-6 text-sm text-gray-500">
                        No credit card required • Free forever • 10 AI features included
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-[#1a1a1a] bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center shadow-lg">
                                <FileText className="w-5 h-5 text-black" />
                            </div>
                            <span className="text-lg font-bold text-white">SmartResume</span>
                        </div>
                        <div className="flex gap-8 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
                        © 2024 SmartResume. AI-powered career platform for professionals who want to stand out.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
