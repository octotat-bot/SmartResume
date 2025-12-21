import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, X, FileText, Shield } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const passwordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    };

    const strength = passwordStrength(formData.password);
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
                            Create your account
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Start building professional resumes today
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                            <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
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

                            {formData.password && (
                                <div className="mt-3">
                                    <div className="flex gap-1.5 mb-2">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < strength ? strengthColors[strength - 1] : 'bg-[#2a2a2a]'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    {strength > 0 && (
                                        <p className="text-xs text-gray-400">
                                            Password strength: <span className="text-gray-300 font-medium">{strengthLabels[strength - 1]}</span>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 pr-12 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                                {formData.confirmPassword && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {formData.password === formData.confirmPassword ? (
                                            <Check className="w-5 h-5 text-green-400" />
                                        ) : (
                                            <X className="w-5 h-5 text-red-400" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
                        <p className="text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Terms */}
                    <p className="mt-6 text-center text-xs text-gray-500">
                        By creating an account, you agree to our{' '}
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                        {' '}and{' '}
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                    </p>
                </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="hidden lg:flex flex-1 bg-[#111111] items-center justify-center p-16 border-l border-[#1a1a1a]">
                <div className="max-w-md">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Everything you need to succeed
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Get access to powerful tools that help you create, optimize, and track your job applications.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Professional Templates</h3>
                                <p className="text-gray-400 text-sm">Choose from ATS-optimized templates designed by experts</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Secure & Private</h3>
                                <p className="text-gray-400 text-sm">Your data is encrypted and never shared with third parties</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Free Forever</h3>
                                <p className="text-gray-400 text-sm">Core features are completely free, no credit card required</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-sm text-gray-400 mb-4">Trusted by professionals at</p>
                        <div className="flex items-center gap-6 text-gray-500">
                            <span className="font-semibold">Google</span>
                            <span className="font-semibold">Microsoft</span>
                            <span className="font-semibold">Amazon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
