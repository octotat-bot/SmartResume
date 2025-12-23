import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, FileText, User, Sparkles, CheckCircle, Zap, Target, TrendingUp } from 'lucide-react';

const AuthPage = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const [isLogin, setIsLogin] = useState(isLoginPage);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${isLogin ? 'sign in' : 'create account'}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setEmail('');
        setPassword('');
        setName('');
    };

    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered',
            description: '10 AI features to enhance your resume',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Create professional resumes in minutes',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Target,
            title: 'ATS Optimized',
            description: 'Pass applicant tracking systems',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: TrendingUp,
            title: 'Track Progress',
            description: 'Monitor all your applications',
            color: 'from-orange-500 to-yellow-500'
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-1/4 ${isLogin ? 'left-1/4' : 'right-1/4'} w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-1000 animate-pulse`}></div>
                <div className={`absolute bottom-1/4 ${isLogin ? 'right-1/4' : 'left-1/4'} w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000 animate-pulse delay-500`}></div>
            </div>

            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 relative z-10">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <FileText className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-2xl font-bold text-white">SmartResume</span>
                    </Link>

                    {/* Animated Header */}
                    <div className="mb-10 overflow-hidden">
                        <div className={`transition-all duration-500 ${isLogin ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 absolute'}`}>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                Welcome back
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Sign in to continue to your workspace
                            </p>
                        </div>
                        <div className={`transition-all duration-500 ${!isLogin ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 absolute'}`}>
                            <h1 className="text-4xl font-bold text-white mb-3">
                                Create account
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Start building your perfect resume today
                            </p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-shake">
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field - Only for Register */}
                        <div className={`transition-all duration-500 overflow-hidden ${!isLogin ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                    required={!isLogin}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition-all focus:shadow-lg focus:shadow-white/5"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="transform transition-all duration-300 hover:scale-[1.02]">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition-all focus:shadow-lg focus:shadow-white/5"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me - Only for Login */}
                        {isLogin && (
                            <div className="flex items-center justify-between pt-2 animate-fadeIn">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-600 bg-[#1a1a1a] text-white focus:ring-0 focus:ring-offset-0"
                                    />
                                    <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        Remember me
                                    </span>
                                </label>
                                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {isLogin ? 'Signing in...' : 'Creating account...'}
                                </>
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle Mode */}
                    <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
                        <p className="text-center text-sm text-gray-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={toggleMode}
                                className="text-white hover:underline font-medium transition-all hover:text-purple-400"
                            >
                                {isLogin ? 'Create account' : 'Sign in'}
                            </button>
                        </p>
                    </div>

                    {/* Demo Credentials - Only for Login */}
                    {isLogin && (
                        <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg animate-fadeIn">
                            <p className="text-xs text-gray-500 mb-2">Demo Credentials:</p>
                            <p className="text-xs text-gray-400">demo@smartresume.com / demo123</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - Animated Feature Showcase */}
            <div className="hidden lg:flex flex-1 bg-[#111111] items-center justify-center p-16 border-l border-[#1a1a1a] relative overflow-hidden">
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${isLogin ? 'from-purple-500/5 to-pink-500/5' : 'from-blue-500/5 to-cyan-500/5'} transition-all duration-1000`}></div>

                <div className="max-w-md relative z-10">
                    {/* Animated Header */}
                    <div className="mb-12 overflow-hidden">
                        <div className={`transition-all duration-700 ${isLogin ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'}`}>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Welcome to SmartResume
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Your AI-powered career companion. Build stunning resumes and track your job search.
                            </p>
                        </div>
                        <div className={`transition-all duration-700 ${!isLogin ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Start Your Journey
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Join thousands of professionals who landed their dream jobs with SmartResume.
                            </p>
                        </div>
                    </div>

                    {/* Animated Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`p-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'fadeInUp 0.6s ease-out forwards'
                                }}
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold mb-2 text-sm">{feature.title}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="pt-8 border-t border-white/10">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="text-center transform hover:scale-110 transition-transform">
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">10+</div>
                                <div className="text-sm text-gray-400">AI Features</div>
                            </div>
                            <div className="text-center transform hover:scale-110 transition-transform">
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">10</div>
                                <div className="text-sm text-gray-400">Templates</div>
                            </div>
                            <div className="text-center transform hover:scale-110 transition-transform">
                                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">95%</div>
                                <div className="text-sm text-gray-400">Success</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add custom animations */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }

                .animate-shake {
                    animation: shake 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default AuthPage;
