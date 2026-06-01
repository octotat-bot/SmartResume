import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Focus states for floating labels
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0); // 0-3
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    // Calculate password strength
    useEffect(() => {
        let score = 0;
        if (!password) {
            setPasswordStrength(0);
            return;
        }
        if (password.length > 5) score += 1;
        if (password.length > 8) score += 1;
        if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score += 1;
        setPasswordStrength(score);
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!agreeTerms) {
            setError('Please agree to the Terms of Service and Privacy Policy');
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/onboarding');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const strengthColors = ['bg-ink/10', 'bg-status-error', 'bg-status-warning', 'bg-status-success'];
    const strengthWidths = ['w-0', 'w-1/3', 'w-2/3', 'w-full'];

    return (
        <div className="min-h-screen flex bg-surface-1">
            {/* Left Brand Side (40%) */}
            <div className="hidden md:flex w-[40%] bg-canvas flex-col justify-between p-12 border-r border-ink/5">
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="font-serif italic text-ink/50 text-[40px] leading-[1.1] mb-12">
                        Every great career<br />
                        starts with a<br />
                        great first impression.
                    </h2>
                    
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[13px] text-ink/60 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                            Resume reviewed by 50,000+ professionals
                        </div>
                        <div className="flex items-center gap-3 text-[13px] text-ink/60 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                            Average ATS score improvement: 34 points
                        </div>
                        <div className="flex items-center gap-3 text-[13px] text-ink/60 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                            Trusted by engineers, designers & executives
                        </div>
                    </div>
                </div>
                
                <div className="text-[14px] font-sans font-semibold text-ink">
                    SmartResume
                </div>
            </div>

            {/* Right Form Side (60%) */}
            <div className="flex-1 flex flex-col p-6 md:p-12 relative overflow-y-auto">
                {/* Mobile Logo */}
                <div className="md:hidden text-[14px] font-sans font-semibold text-ink text-center mt-5 mb-10">
                    SmartResume
                </div>
                
                <div className="flex-1 flex flex-col justify-center items-center w-full">
                    <div className="w-full max-w-[360px]">
                        <h1 className="font-serif text-[32px] text-ink mb-2">
                            Create your account
                        </h1>
                        <p className="text-[14px] text-ink/60 font-sans mb-8">
                            Start building your professional future.
                        </p>

                        {error && (
                            <div className="mb-6 text-[13px] text-status-error flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <button type="button" className="w-full h-[46px] bg-white border border-ink/15 rounded-xl flex items-center justify-center gap-3 hover:bg-ink/5 transition-colors mb-6 group">
                            <GoogleIcon />
                            <span className="text-[14px] font-sans font-medium text-ink/80 group-hover:text-ink transition-colors">Continue with Google</span>
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-ink/10" />
                            <span className="text-[12px] text-ink/40 font-sans">or</span>
                            <div className="flex-1 h-px bg-ink/10" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="relative pt-4">
                                <label 
                                    className={`absolute left-0 transition-all duration-200 pointer-events-none font-sans
                                        ${nameFocused || name ? '-top-1 text-[12px] text-accent' : 'top-6 text-[15px] text-ink/40'}
                                    `}
                                >
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onFocus={() => setNameFocused(true)}
                                    onBlur={() => setNameFocused(false)}
                                    className={`w-full h-[48px] bg-transparent border-0 border-b outline-none transition-colors font-sans text-[15px] p-0
                                        ${nameFocused ? 'border-accent' : 'border-ink/15'}
                                    `}
                                    required
                                />
                            </div>

                            <div className="relative pt-4">
                                <label 
                                    className={`absolute left-0 transition-all duration-200 pointer-events-none font-sans
                                        ${emailFocused || email ? '-top-1 text-[12px] text-accent' : 'top-6 text-[15px] text-ink/40'}
                                    `}
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    className={`w-full h-[48px] bg-transparent border-0 border-b outline-none transition-colors font-sans text-[15px] p-0
                                        ${emailFocused ? 'border-accent' : 'border-ink/15'}
                                    `}
                                    required
                                />
                            </div>

                            <div className="relative pt-4">
                                <label 
                                    className={`absolute left-0 transition-all duration-200 pointer-events-none font-sans
                                        ${passwordFocused || password ? '-top-1 text-[12px] text-accent' : 'top-6 text-[15px] text-ink/40'}
                                    `}
                                >
                                    Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    className={`w-full h-[48px] bg-transparent border-0 border-b outline-none transition-colors font-sans text-[15px] p-0 pr-10
                                        ${passwordFocused ? 'border-accent' : 'border-ink/15'}
                                    `}
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-7 text-ink/40 hover:text-ink/80 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                
                                {/* Password Strength Bar */}
                                <div className="h-1 w-full bg-ink/5 mt-1 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-300 ${strengthWidths[passwordStrength]} ${strengthColors[passwordStrength]}`} 
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="mt-0.5 w-4 h-4 rounded border-ink/20 text-accent focus:ring-accent/20 cursor-pointer"
                                    />
                                    <span className="text-[13px] text-ink/60 font-sans leading-tight group-hover:text-ink/80 transition-colors">
                                        I agree to the Terms of Service and Privacy Policy
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !agreeTerms}
                                className="w-full h-[48px] mt-6 bg-accent text-white font-sans font-medium text-[15px] rounded-xl hover:brightness-95 transition-all disabled:opacity-50 disabled:hover:brightness-100 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create account'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link to="/login" className="text-[13px] text-ink/60 font-sans hover:text-accent transition-colors">
                                Already have an account? <span className="text-ink hover:text-accent font-medium">Sign in</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
