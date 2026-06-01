import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, MessageSquare, Plus, MoreHorizontal } from 'lucide-react';
import { aiService } from '../services/api';

const AIChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [aiAvailable, setAiAvailable] = useState(true);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Mock history for sidebar
    const [history] = useState([
        { id: 1, title: 'Improve resume summary', date: 'Today' },
        { id: 2, title: 'Add metrics to Stripe bullets', date: 'Yesterday' },
        { id: 3, title: 'Frontend Engineer skills', date: 'Previous 7 Days' },
        { id: 4, title: 'ATS keyword optimization', date: 'Previous 7 Days' }
    ]);

    useEffect(() => {
        checkAIStatus();
    }, []);

    useEffect(() => {
        setMessages(prev => {
            if (prev.length === 0) {
                return [{
                    role: 'assistant',
                    content: aiAvailable
                        ? 'Hi, I\'m your career assistant. I can help you tailor your resume, craft bullet points, and prepare for interviews.\n\nHow can I help you today?'
                        : 'AI Assistant is currently unavailable. Please check your API configuration.',
                    timestamp: new Date()
                }];
            }
            return prev;
        });
    }, [aiAvailable]);

    const checkAIStatus = async () => {
        try {
            const response = await aiService.getStatus();
            setAiAvailable(response.data.available);
        } catch (error) {
            console.error('Failed to check AI status:', error);
            setAiAvailable(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = { role: 'user', content: inputMessage, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const conversationHistory = messages.slice(-5).map(msg => `${msg.role}: ${msg.content}`).join('\n');
            const response = await aiService.chat(inputMessage, null, conversationHistory);
            
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.data.message,
                timestamp: new Date(response.data.timestamp)
            }]);
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'I encountered an error connecting to the AI service. Please try again later.',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickActions = [
        'Help me improve my summary',
        'How do I write better bullets?',
        'Review my experience section'
    ];

    return (
        <div className="flex h-[calc(100vh-80px)] -mt-6 -mx-8 bg-surface-1 font-sans animate-[fadeInScale_300ms_ease-out]">
            {/* Sidebar History */}
            <aside className="w-[280px] bg-surface-1 border-r border-ink/5 flex flex-col shrink-0">
                <div className="p-4 border-b border-ink/5">
                    <button className="w-full flex items-center gap-2 justify-center h-[36px] bg-white border border-ink/10 rounded-lg text-[13px] font-medium text-ink hover:border-ink/20 transition-all shadow-sm hover:shadow">
                        <Plus className="w-4 h-4" /> New Chat
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto hide-scrollbar p-3 space-y-6">
                    {['Today', 'Yesterday', 'Previous 7 Days'].map(group => {
                        const groupItems = history.filter(h => h.date === group);
                        if (!groupItems.length) return null;
                        
                        return (
                            <div key={group}>
                                <h3 className="text-[11px] font-semibold text-ink/40 uppercase tracking-wider mb-2 px-3">{group}</h3>
                                <div className="space-y-1">
                                    {groupItems.map(item => (
                                        <button key={item.id} className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-2 transition-colors group">
                                            <MessageSquare className="w-4 h-4 text-ink/40 shrink-0 group-hover:text-ink/60 transition-colors" />
                                            <span className="text-[13px] text-ink/80 truncate">{item.title}</span>
                                            <MoreHorizontal className="w-4 h-4 text-ink/0 group-hover:text-ink/40 shrink-0 ml-auto transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col bg-white relative">
                {/* Header */}
                <header className="h-[60px] border-b border-ink/5 flex items-center px-6 shrink-0 bg-white/80 backdrop-blur-md z-10 sticky top-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center border border-ink/5">
                            <Sparkles className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                            <h2 className="text-[14px] font-semibold text-ink leading-tight">Career Assistant</h2>
                            <p className="text-[12px] text-ink/40 font-medium">Powered by Gemini</p>
                        </div>
                    </div>
                </header>

                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-4 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-ink text-white' : 'bg-surface-2 border border-ink/10 text-accent'}`}>
                                        {message.role === 'user' ? (
                                            <span className="text-[12px] font-semibold">ME</span>
                                        ) : (
                                            <Sparkles className="w-4 h-4" />
                                        )}
                                    </div>
                                    
                                    {/* Bubble */}
                                    <div className={`px-5 py-3.5 rounded-2xl ${
                                        message.role === 'user' 
                                            ? 'bg-surface-2 text-ink rounded-tr-sm' 
                                            : 'bg-white border border-ink/10 text-ink shadow-sm rounded-tl-sm'
                                    }`}>
                                        <div className="text-[14px] leading-relaxed whitespace-pre-wrap">{message.content}</div>
                                        <div className={`text-[10px] mt-2 font-medium ${message.role === 'user' ? 'text-ink/40 text-right' : 'text-ink/30'}`}>
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-4 max-w-[85%]">
                                    <div className="w-8 h-8 shrink-0 rounded-full bg-surface-2 border border-ink/10 text-accent flex items-center justify-center">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div className="px-5 py-3.5 rounded-2xl bg-white border border-ink/10 rounded-tl-sm shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-ink/40" />
                                        <span className="text-[13px] text-ink/60">Thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-4" />
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-6 bg-gradient-to-t from-white via-white to-transparent shrink-0">
                    <div className="max-w-3xl mx-auto">
                        
                        {/* Prompt Chips */}
                        {messages.length <= 1 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={() => { setInputMessage(action); inputRef.current?.focus(); }}
                                        className="text-[12px] font-medium text-ink/60 bg-surface-1 border border-ink/5 px-3 py-1.5 rounded-full hover:bg-surface-2 hover:text-ink transition-colors"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Box */}
                        <div className="relative bg-white border border-ink/10 rounded-2xl shadow-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/20 transition-all flex items-end">
                            <textarea
                                ref={inputRef}
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Message Assistant..."
                                className="w-full max-h-[120px] bg-transparent text-[14px] text-ink px-4 py-4 focus:outline-none resize-none hide-scrollbar placeholder:text-ink/30"
                                rows={1}
                                disabled={isLoading}
                                style={{ minHeight: '56px' }}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="absolute right-2 bottom-2 p-2 bg-ink text-white rounded-xl hover:bg-ink/80 transition-colors disabled:opacity-30 disabled:hover:bg-ink flex items-center justify-center shrink-0"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-center mt-3">
                            <span className="text-[11px] text-ink/40 font-medium tracking-wide">AI can make mistakes. Consider verifying important information.</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AIChatPage;
