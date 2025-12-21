import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Briefcase, BarChart3, Sparkles, Check, Users, Award, Star } from 'lucide-react';

const LandingPage = () => {
    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered Enhancement',
            description: 'Transform your bullet points with intelligent AI suggestions that make your experience stand out.'
        },
        {
            icon: FileText,
            title: 'ATS-Optimized Templates',
            description: 'Professional templates designed to pass applicant tracking systems and impress recruiters.'
        },
        {
            icon: Briefcase,
            title: 'Job Application Tracking',
            description: 'Monitor all your applications, interviews, and offers in one organized dashboard.'
        },
        {
            icon: BarChart3,
            title: 'Analytics & Insights',
            description: 'Track your success rate and get insights to optimize your job search strategy.'
        }
    ];

    const benefits = [
        'Unlimited resume versions',
        'AI-powered content suggestions',
        'Real-time collaboration',
        'Export to PDF instantly',
        'Version history & restore',
        'Job application tracker'
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Floating Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl shadow-black/50">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
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
                                className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-all"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 mb-10 hover:bg-white/10 transition-colors">
                            <Sparkles className="w-4 h-4 text-white" />
                            <span className="font-medium">AI-Powered Career Platform</span>
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
                            <span className="text-white">Build resumes</span>
                            <br />
                            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                that get you hired
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 mb-14 leading-relaxed max-w-3xl mx-auto">
                            Create professional, ATS-optimized resumes with AI assistance.
                            <br className="hidden md:block" />
                            Track your applications and land your dream job faster.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                            <Link
                                to="/register"
                                className="group px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2 shadow-2xl shadow-white/10 hover:shadow-white/20"
                            >
                                Create Your Resume
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#features"
                                className="px-8 py-4 bg-white/5 text-white font-semibold rounded-lg hover:bg-white/10 transition-all border border-white/10 hover:border-white/20"
                            >
                                Learn More
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-16 pt-12 border-t border-white/10">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">10K+</div>
                                <div className="text-sm text-gray-500 font-medium">Active Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">95%</div>
                                <div className="text-sm text-gray-500 font-medium">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">4.9★</div>
                                <div className="text-sm text-gray-500 font-medium">User Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-20 px-8 bg-[#111111] border-y border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Everything you need to succeed
                        </h2>
                        <p className="text-xl text-gray-400">
                            Powerful tools designed for modern job seekers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl hover:border-white/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/5"
                            >
                                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/15 group-hover:scale-110 transition-all">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Why choose SmartResume?
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                We've built the most comprehensive career platform to help you land your dream job.
                                From resume creation to job tracking, we've got you covered.
                            </p>

                            <div className="space-y-4 mb-8">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-gray-300">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Try It Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            Trusted by Professionals
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Join thousands of job seekers who have successfully landed positions at top companies.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            Industry Recognition
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Featured in top career development platforms and recommended by industry experts.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Star className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            Highly Rated
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Rated 4.9/5 stars by our users for ease of use and effectiveness.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-8 bg-[#111111] border-t border-[#1a1a1a]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-bold text-white mb-6">
                        Ready to land your dream job?
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Join thousands of professionals who are already using SmartResume to advance their careers.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
                    >
                        Start Free Today
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                    <p className="mt-6 text-sm text-gray-500">
                        No credit card required • Free forever
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
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
                        © 2024 SmartResume. Built for professionals who want to stand out.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
