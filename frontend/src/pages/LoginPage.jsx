import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, FileText, CheckCircle } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-2xl font-bold text-white">SmartResume</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-white mb-3">
                            Welcome back
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Sign in to continue to your workspace
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 pr-12 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
                        <p className="text-center text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-white hover:underline font-medium">
                                Create account
                            </Link>
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                        <p className="text-xs text-gray-500 mb-2">Demo Credentials:</p>
                        <p className="text-xs text-gray-400">demo@smartresume.com / demo123</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Feature Showcase */}
            <div className="hidden lg:flex flex-1 bg-[#111111] items-center justify-center p-16 border-l border-[#1a1a1a]">
                <div className="max-w-md">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Build resumes that get you hired
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Join thousands of professionals who landed their dream jobs with SmartResume's AI-powered platform.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">AI-Powered Enhancement</h3>
                                <p className="text-gray-400 text-sm">Transform your content with intelligent suggestions</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">ATS-Optimized Templates</h3>
                                <p className="text-gray-400 text-sm">Get past applicant tracking systems</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Track Your Progress</h3>
                                <p className="text-gray-400 text-sm">Monitor applications and interviews in one place</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-8">
                            <div>
                                <div className="text-3xl font-bold text-white">10K+</div>
                                <div className="text-sm text-gray-400">Active Users</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">95%</div>
                                <div className="text-sm text-gray-400">Success Rate</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">4.9★</div>
                                <div className="text-sm text-gray-400">User Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
