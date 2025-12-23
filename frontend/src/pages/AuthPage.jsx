import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowRight, FileText, Sparkles, Zap, Target, TrendingUp, Star } from 'lucide-react';

// AuthPage Component - Enhanced Animations v3.0
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
    const [particles, setParticles] = useState([]);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    // Generate floating particles
    useEffect(() => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);
    }, []);

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
            {/* Animated Particles Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animation: `float ${particle.duration}s ease-in-out infinite`,
                            animationDelay: `${particle.delay}s`
                        }}
                    />
                ))}
                <div className={`absolute top-1/4 ${isLogin ? 'left-1/4' : 'right-1/4'} w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-1000 animate-pulse`}></div>
                <div className={`absolute bottom-1/4 ${isLogin ? 'right-1/4' : 'left-1/4'} w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000 animate-pulse`} style={{ animationDelay: '500ms' }}></div>
                <div className={`absolute top-1/2 ${isLogin ? 'right-1/3' : 'left-1/3'} w-64 h-64 bg-pink-500/5 rounded-full blur-3xl transition-all duration-1000 animate-pulse`} style={{ animationDelay: '1000ms' }}></div>
            </div>

            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 relative z-10">
                <div className="w-full max-w-md">
                    {/* Logo with Animation */}
                    <Link to="/" className="inline-flex items-center gap-3 mb-12 group animate-slideDown">
                        <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                            <FileText className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">SmartResume</span>
                    </Link>

                    {/* Form Card with Glassmorphism */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl animate-slideUp">
                        {/* Animated Header */}
                        <div className="mb-8 overflow-hidden relative h-24">
                            <div className={`absolute w-full transition-all duration-700 ${isLogin ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                                    Welcome back
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    Sign in to continue to your workspace
                                </p>
                            </div>
                            <div className={`absolute w-full transition-all duration-700 ${!isLogin ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                                    Create account
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    Start building your perfect resume today
                                </p>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-shake backdrop-blur-sm">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Field - Only for Register */}
                            <div className={`transition-all duration-500 overflow-hidden ${!isLogin ? 'max-h-28 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm hover:bg-white/10"
                                    placeholder="John Doe"
                                    required={!isLogin}
                                />
                            </div>

                            {/* Email Field */}
                            <div className="transform transition-all duration-300 hover:scale-[1.02]">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all backdrop-blur-sm hover:bg-white/10"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="transform transition-all duration-300 hover:scale-[1.02]">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all backdrop-blur-sm hover:bg-white/10"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-all hover:scale-110"
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
                                            className="w-4 h-4 rounded border-gray-600 bg-white/5 text-purple-500 focus:ring-0 focus:ring-offset-0"
                                        />
                                        <span className="ml-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                            Remember me
                                        </span>
                                    </label>
                                    <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                            )}

                            {/* Submit Button with Gradient Animation */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-semibold rounded-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95 group"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {isLogin ? 'Signing in...' : 'Creating account...'}
                                    </>
                                ) : (
                                    <>
                                        {isLogin ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Toggle Mode */}
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <p className="text-center text-sm text-gray-400">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                                <button
                                    onClick={toggleMode}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 font-medium transition-all hover:underline"
                                >
                                    {isLogin ? 'Create account' : 'Sign in'}
                                </button>
                            </p>
                        </div>

                        {/* Demo Credentials - Only for Login */}
                        {isLogin && (
                            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg animate-fadeIn backdrop-blur-sm">
                                <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                                    <Star className="w-3 h-3" />
                                    Demo Credentials:
                                </p>
                                <p className="text-xs text-gray-400">demo@smartresume.com / demo123</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side - Animated Feature Showcase */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#111111] to-[#0a0a0a] items-center justify-center p-16 border-l border-white/10 relative overflow-hidden">
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${isLogin ? 'from-purple-500/5 to-pink-500/5' : 'from-blue-500/5 to-cyan-500/5'} transition-all duration-1000`}></div>

                <div className="max-w-md relative z-10">
                    {/* Animated Header */}
                    <div className="mb-12 overflow-hidden relative h-32">
                        <div className={`absolute w-full transition-all duration-700 ${isLogin ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-0 scale-95'}`}>
                            <h2 className="text-3xl font-bold text-white mb-4 animate-slideRight">
                                Welcome to SmartResume
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Your AI-powered career companion. Build stunning resumes and track your job search.
                            </p>
                        </div>
                        <div className={`absolute w-full transition-all duration-700 ${!isLogin ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}`}>
                            <h2 className="text-3xl font-bold text-white mb-4 animate-slideLeft">
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
                                className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'fadeInUp 0.6s ease-out forwards'
                                }}
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold mb-2 text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">{feature.title}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Animated Stats */}
                    <div className="pt-8 border-t border-white/10">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer group">
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">10+</div>
                                <div className="text-sm text-gray-400">AI Features</div>
                            </div>
                            <div className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer group">
                                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">10</div>
                                <div className="text-sm text-gray-400">Templates</div>
                            </div>
                            <div className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer group">
                                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">95%</div>
                                <div className="text-sm text-gray-400">Success</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.6;
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
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

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideRight {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideLeft {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }

                .animate-shake {
                    animation: shake 0.5s ease-out;
                }

                .animate-slideDown {
                    animation: slideDown 0.6s ease-out;
                }

                .animate-slideUp {
                    animation: slideUp 0.6s ease-out;
                }

                .animate-slideRight {
                    animation: slideRight 0.6s ease-out;
                }

                .animate-slideLeft {
                    animation: slideLeft 0.6s ease-out;
                }

                .bg-size-200 {
                    background-size: 200%;
                }

                .bg-pos-0 {
                    background-position: 0%;
                }

                .bg-pos-100 {
                    background-position: 100%;
                }
            `}</style>
        </div>
    );
};

export default AuthPage;
