
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Crown } from 'lucide-react';
import { getTravelAdvice } from '../services/geminiService';
import { Message } from '../types';

const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the Kingsway Luxury Elite Concierge. How may I assist in planning your arrival today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const aiResponse = await getTravelAdvice(userMessage);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Sticky Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] bg-[#FDFCF0] text-black p-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black uppercase tracking-widest text-xs"
      >
        <Crown size={20} />
        <span className="hidden md:inline">Elite Concierge</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[70] w-[90vw] md:w-[400px] h-[600px] bg-[#121212] rounded-[32px] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#1a1a1a] border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FDFCF0] rounded-xl flex items-center justify-center">
                  <Crown size={22} className="text-black" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-widest uppercase">Kingsway Concierge</p>
                  <p className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#FDFCF0] text-black font-bold shadow-xl' 
                      : 'bg-[#1a1a1a] text-gray-300 border border-white/5 shadow-inner'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/5 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-gray-500" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Curating...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-[#1a1a1a] border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Request advice..."
                  className="w-full bg-[#080808] border border-white/10 rounded-2xl py-4 px-6 pr-14 outline-none focus:border-[#FDFCF0]/40 transition-all text-sm text-white"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 bg-[#FDFCF0] text-black rounded-xl hover:bg-white transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-[9px] text-gray-600 text-center mt-4 uppercase tracking-[0.3em] font-bold">Arrive With Confidence</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIConcierge;
