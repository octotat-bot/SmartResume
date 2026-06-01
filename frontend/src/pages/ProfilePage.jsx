import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Toggle from '../components/Toggle';
import { CheckCircle2, ChevronDown } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useAuth();
    
    // Form state
    const [name, setName] = useState(user?.name || '');
    const [profession, setProfession] = useState('Software Engineer');
    
    // Preferences state
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [autoSave, setAutoSave] = useState(true);
    
    // Notifications state
    const [notifications, setNotifications] = useState({
        followUp: true,
        ats: true,
        tips: false
    });

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="max-w-[640px] mx-auto pb-20 animate-[fadeInScale_300ms_ease-out]">
            <h1 className="font-serif text-[28px] text-ink mb-12">Settings</h1>

            {/* Profile Section */}
            <section className="mb-12">
                <h2 className="text-caption text-ink/40 mb-6">Profile</h2>
                
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-[64px] h-[64px] rounded-full bg-ink text-surface-2 flex items-center justify-center text-[20px] font-medium shrink-0">
                        {getInitials(user?.name)}
                    </div>
                    <div>
                        <button className="text-[14px] font-sans font-medium text-ink hover:text-accent transition-colors">
                            Change photo
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[13px] font-medium text-ink/80 mb-2 font-sans">Full name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-[44px]"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-[13px] font-medium text-ink/80 mb-2 font-sans">Email address</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="w-full h-[44px] bg-surface-2 text-ink/60 border-transparent pr-24 cursor-not-allowed"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-status-success/10 rounded text-status-success text-[11px] font-medium font-sans">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Verified
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-medium text-ink/80 mb-2 font-sans">Profession</label>
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="w-full h-[44px]"
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button className="btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
            </section>

            <hr className="border-ink/5 mb-12" />

            {/* Preferences Section */}
            <section className="mb-12">
                <h2 className="text-caption text-ink/40 mb-6">Preferences</h2>

                <div className="space-y-8">
                    <div>
                        <label className="block text-[13px] font-medium text-ink/80 mb-3 font-sans">Default template</label>
                        <div className="flex gap-4">
                            {['modern', 'classic', 'technical'].map((tpl) => (
                                <button
                                    key={tpl}
                                    onClick={() => setSelectedTemplate(tpl)}
                                    className={`w-[80px] h-[112px] rounded-lg border transition-all flex items-center justify-center bg-white
                                        ${selectedTemplate === tpl 
                                            ? 'border-accent ring-1 ring-accent/30' 
                                            : 'border-ink/10 hover:border-ink/30'
                                        }`}
                                >
                                    <div className="w-[60px] h-[84px] bg-surface-2 flex flex-col gap-1.5 p-2">
                                        <div className="w-full h-1.5 bg-ink/10" />
                                        <div className="w-2/3 h-1 bg-ink/5" />
                                        <div className="w-3/4 h-1 bg-ink/5" />
                                        <div className="w-full h-1 bg-ink/5 mt-1" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[13px] font-medium text-ink/80 mb-2 font-sans">Default font</label>
                        <div className="relative">
                            <select className="w-full md:w-[240px] h-[44px] appearance-none pr-10 cursor-pointer">
                                <option value="inter">Inter (Sans-serif)</option>
                                <option value="playfair">Playfair Display (Serif)</option>
                                <option value="ibm">IBM Plex Mono (Monospace)</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-ink/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[14px] font-medium text-ink font-sans mb-0.5">Auto-save</div>
                            <div className="text-[13px] text-ink/60 font-sans">Automatically save resume changes as you type.</div>
                        </div>
                        <Toggle checked={autoSave} onChange={setAutoSave} />
                    </div>
                </div>
            </section>

            <hr className="border-ink/5 mb-12" />

            {/* Notifications Section */}
            <section className="mb-12">
                <h2 className="text-caption text-ink/40 mb-6">Notifications</h2>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[14px] font-medium text-ink font-sans mb-0.5">Application follow-up reminders</div>
                            <div className="text-[13px] text-ink/60 font-sans">Get notified when it's time to follow up on an application.</div>
                        </div>
                        <Toggle 
                            checked={notifications.followUp} 
                            onChange={(val) => setNotifications(prev => ({ ...prev, followUp: val }))} 
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[14px] font-medium text-ink font-sans mb-0.5">ATS score updates</div>
                            <div className="text-[13px] text-ink/60 font-sans">Alerts when our parsing engine improves.</div>
                        </div>
                        <Toggle 
                            checked={notifications.ats} 
                            onChange={(val) => setNotifications(prev => ({ ...prev, ats: val }))} 
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[14px] font-medium text-ink font-sans mb-0.5">Weekly job search tips</div>
                            <div className="text-[13px] text-ink/60 font-sans">Curated advice from career professionals.</div>
                        </div>
                        <Toggle 
                            checked={notifications.tips} 
                            onChange={(val) => setNotifications(prev => ({ ...prev, tips: val }))} 
                        />
                    </div>
                </div>
            </section>

            <hr className="border-ink/5 mb-12" />

            {/* Account Section */}
            <section>
                <h2 className="text-caption text-ink/40 mb-6">Account</h2>

                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-ink/5 bg-white">
                        <div>
                            <div className="text-[14px] font-medium text-ink font-sans mb-0.5">Free plan</div>
                            <div className="text-[13px] text-ink/60 font-sans">Basic resume building and tracking.</div>
                        </div>
                        <button className="btn-secondary">
                            Upgrade to Pro
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <div className="text-[14px] font-medium text-ink font-sans">Password</div>
                        <button className="btn-ghost">
                            Change password
                        </button>
                    </div>

                    <div className="pt-6">
                        <button className="text-[14px] font-medium text-status-error/80 hover:text-status-error hover:bg-status-error/5 px-3 py-2 rounded-lg transition-colors font-sans -ml-3">
                            Delete account
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
