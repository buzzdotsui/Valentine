import React, { useState } from 'react';
import { planDate, analyzeMemory, writeLoveLetter } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const GeminiFeatures: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'date' | 'memory' | 'letter'>('date');
    
    // State for Date Planner
    const [location, setLocation] = useState('');
    const [interests, setInterests] = useState('');
    const [dateResult, setDateResult] = useState('');
    const [dateLoading, setDateLoading] = useState(false);

    // State for Memory Analysis
    const [memoryResult, setMemoryResult] = useState('');
    const [memoryLoading, setMemoryLoading] = useState(false);

    // State for Love Letter
    const [partnerName, setPartnerName] = useState('Nifemi');
    const [letterResult, setLetterResult] = useState('');
    const [letterLoading, setLetterLoading] = useState(false);

    const handlePlanDate = async () => {
        if (!location || !interests) return;
        setDateLoading(true);
        try {
            const result = await planDate(location, interests);
            setDateResult(result);
        } catch (e) {
            setDateResult("Something went wrong planning the date. Maybe we can just order pizza?");
        } finally {
            setDateLoading(false);
        }
    };

    const handleMemoryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setMemoryLoading(true);
        try {
            const result = await analyzeMemory(file);
            setMemoryResult(result);
        } catch (e) {
            setMemoryResult("I couldn't quite see that clearly, but I'm sure it's beautiful.");
        } finally {
            setMemoryLoading(false);
        }
    };

    const handleWriteLetter = async () => {
        setLetterLoading(true);
        try {
            const result = await writeLoveLetter(partnerName || 'my love');
            setLetterResult(result);
        } catch (e) {
            setLetterResult("Words fail me, but my heart knows.");
        } finally {
            setLetterLoading(false);
        }
    };

    return (
        <div className="mt-8 w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/60 mb-20 transition-all">
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-4 border-b border-white/50 flex justify-center space-x-2 md:space-x-4 overflow-x-auto">
                <button 
                    onClick={() => setActiveTab('date')}
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-sm whitespace-nowrap ${activeTab === 'date' ? 'bg-rose-500 text-white shadow-lg scale-105' : 'bg-white text-rose-400 hover:bg-rose-50'}`}
                >
                    Plan Date 🗺️
                </button>
                <button 
                    onClick={() => setActiveTab('memory')}
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-sm whitespace-nowrap ${activeTab === 'memory' ? 'bg-rose-500 text-white shadow-lg scale-105' : 'bg-white text-rose-400 hover:bg-rose-50'}`}
                >
                    Our Memories 📹
                </button>
                <button 
                    onClick={() => setActiveTab('letter')}
                    className={`px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-sm whitespace-nowrap ${activeTab === 'letter' ? 'bg-rose-500 text-white shadow-lg scale-105' : 'bg-white text-rose-400 hover:bg-rose-50'}`}
                >
                    Deep Love 💌
                </button>
            </div>

            <div className="p-8 min-h-[400px]">
                {activeTab === 'date' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-gray-800 romantic-font mb-2">Plan the Perfect Date</h3>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Where shall we go?</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-rose-400 uppercase tracking-widest ml-1">City</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Lagos, Paris, New York" 
                                    className="w-full bg-white/80 border border-pink-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-shadow shadow-inner"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-rose-400 uppercase tracking-widest ml-1">Vibe</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Candlelight dinner, Rooftop movies" 
                                    className="w-full bg-white/80 border border-pink-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-shadow shadow-inner"
                                    value={interests}
                                    onChange={e => setInterests(e.target.value)}
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handlePlanDate}
                            disabled={dateLoading}
                            className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-70 disabled:scale-100"
                        >
                            {dateLoading ? '✨ Creating magic...' : 'Get Romantic Suggestions'}
                        </button>
                        {dateResult && (
                            <div className="mt-6 p-6 bg-white/80 rounded-2xl shadow-inner border border-white prose prose-pink max-w-none">
                                <ReactMarkdown>{dateResult}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'memory' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-gray-800 romantic-font mb-2">Analyze Our Vibe</h3>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">What does our love look like?</p>
                        </div>
                        
                        <label className="block w-full cursor-pointer group">
                            <div className="border-3 border-dashed border-pink-300 rounded-2xl p-10 text-center bg-pink-50/50 group-hover:bg-pink-50 transition-colors relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10">
                                    <span className="text-5xl block mb-2">📸</span>
                                    <span className="text-rose-500 font-bold text-lg">
                                        {memoryLoading ? 'Analyzing the magic...' : 'Upload a photo or video of us'}
                                    </span>
                                </div>
                                <input 
                                    type="file" 
                                    accept="image/*,video/*" 
                                    onChange={handleMemoryUpload}
                                    className="hidden"
                                />
                            </div>
                        </label>

                        {memoryResult && (
                            <div className="mt-6 p-6 bg-white/90 rounded-2xl shadow-md border-l-4 border-rose-400">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap italic font-serif text-lg">
                                    "{memoryResult}"
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'letter' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-gray-800 romantic-font mb-2">A Letter from the Heart</h3>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Let AI express my soul</p>
                        </div>
                        
                        <div className="relative">
                             <input 
                                type="text" 
                                placeholder="Partner's Name" 
                                className="w-full bg-white/80 border border-pink-200 rounded-xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-shadow shadow-inner"
                                value={partnerName}
                                onChange={e => setPartnerName(e.target.value)}
                            />
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">💌</span>
                        </div>

                        <button 
                            onClick={handleWriteLetter}
                            disabled={letterLoading}
                            className="w-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-70 disabled:scale-100"
                        >
                            {letterLoading ? '🖊️ Thinking deeply...' : 'Write Love Letter'}
                        </button>
                        
                        {letterResult && (
                            <div className="mt-6 p-8 bg-[#fffdf0] border border-[#eaddcf] rounded-xl shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-200 via-pink-200 to-red-200"></div>
                                <div className="font-serif text-xl leading-loose text-gray-800 relative z-10">
                                    <ReactMarkdown>{letterResult}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};