import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Wifi, 
  Tv, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

interface WaveBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onOpenOrderModal: (planId?: string) => void;
  onOpenQuickPay: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: { label: string; action: () => void }[];
}

export const WaveBotModal: React.FC<WaveBotModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenOrderModal,
  onOpenQuickPay,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: "Namaste! 🙏 I am WaveBot, your NetWave Nepal Virtual Assistant. How can I help you today? You can ask about fiber plans, router troubleshooting (like Red LOS light), bill payments, or coverage in your area.",
      timestamp: 'Just now',
      options: [
        { label: '🔥 Recommend best Fiber Plan', action: () => handleSendPrompt("What is the best fiber plan for home streaming and gaming?") },
        { label: '🔴 Router Red LOS Light Troubleshooting', action: () => handleSendPrompt("My router shows a blinking Red LOS light. How do I fix it?") },
        { label: '💳 How to Pay Bill via eSewa/Khalti', action: () => handleSendPrompt("How do I renew my bill online?") },
        { label: '📍 Check Coverage in Pokhara / Kathmandu', action: () => handleSendPrompt("Is NetWave fiber available in Pokhara Lakeside and Kathmandu?") },
      ]
    }
  ]);

  if (!isOpen) return null;

  const handleSendPrompt = (text: string) => {
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    generateBotResponse(text);
  };

  const generateBotResponse = (prompt: string) => {
    const lower = prompt.toLowerCase();
    let replyText = "";
    let options: { label: string; action: () => void }[] | undefined = undefined;

    if (lower.includes('red') || lower.includes('los') || lower.includes('blinking') || lower.includes('light') || lower.includes('no internet')) {
      replyText = "⚠️ **Red LOS (Loss of Signal) Light Guide:**\n\n1. Check the thin yellow optical fiber drop cable connected to the blue/green port beneath your router. Ensure it is firmly clicked in and not tightly bent.\n2. Do not pull or fold the fiber cable (optical glass can fracture).\n3. If it remains red, there may be an optical break in your street node. You can raise an instant support ticket for our field technician to visit with a fusion splicer.";
      options = [
        { label: '🛠️ Open Router Diagnostician Page', action: () => { onClose(); onNavigate('support'); } },
        { label: '📞 Call 24/7 Helpline (+977 1-4789000)', action: () => window.open('tel:+97714789000') },
      ];
    } else if (lower.includes('plan') || lower.includes('package') || lower.includes('speed') || lower.includes('price') || lower.includes('cost') || lower.includes('recommend')) {
      replyText = "⚡ **Recommended Fiber Plans for Nepal:**\n\n• **Home Plus Turbo (200 Mbps)**: NPR 1,249/mo (NPR 12,499/yr) — Perfect for 4K streaming, multi-device families & remote work.\n• **GigaPlay + NetWave TV 4K (300 Mbps)**: NPR 1,599/mo (NPR 15,999/yr) — 250+ HD Live Channels + 4K Android Box + SonyLIV.\n• **Home Starter (100 Mbps)**: NPR 999/mo — Budget-friendly ultra-reliable fiber.\n\n*All annual subscriptions include Free Optical ONT Router & Zero Installation Fee!*";
      options = [
        { label: '🚀 Book New Connection', action: () => { onClose(); onOpenOrderModal('nw-combo-300'); } },
        { label: '📊 View Full Comparison Matrix', action: () => { onClose(); onNavigate('plans'); } },
      ];
    } else if (lower.includes('pay') || lower.includes('bill') || lower.includes('recharge') || lower.includes('esewa') || lower.includes('khalti') || lower.includes('renew')) {
      replyText = "💳 **Online Recharge & Bill Payment:**\n\nYou can instantly renew your NetWave subscription using **eSewa, Khalti, ConnectIPS, Fonepay QR**, or Cards.\nSimply enter your Customer ID (e.g. `NW104829`) or registered mobile number in our Quick Pay portal to view your invoice and renew with zero extra gateway fee!";
      options = [
        { label: '💳 Open Quick Pay Portal Now', action: () => { onClose(); onOpenQuickPay(); } },
      ];
    } else if (lower.includes('coverage') || lower.includes('pokhara') || lower.includes('kathmandu') || lower.includes('chitwan') || lower.includes('butwal') || lower.includes('area')) {
      replyText = "📍 **NetWave Nepal Coverage Status:**\n\nWe provide 100% pure FTTH coverage across:\n• **Kathmandu Valley** (Kathmandu, Lalitpur, Bhaktapur)\n• **Gandaki** (Pokhara Metropolitan, Lakeside, New Road, Prithvi Chowk)\n• **Chitwan** (Bharatpur, Narayangarh, Tandi)\n• **Lumbini** (Butwal, Bhairahawa, Nepalgunj)\n• **Koshi** (Biratnagar, Dharan, Itahari)\n\nAverage installation turnaround is under 12 hours!";
      options = [
        { label: '🗺️ Open Coverage & Node Monitor', action: () => { onClose(); onNavigate('coverage'); } },
        { label: '⚡ Request Fiber Connection', action: () => { onClose(); onOpenOrderModal(); } },
      ];
    } else if (lower.includes('tv') || lower.includes('channel') || lower.includes('ott') || lower.includes('sonyliv')) {
      replyText = "📺 **NetWave TV 4K Entertainment:**\n\nEnjoy 250+ Live Channels (Kantipur HD, Star Sports HD, Sony Sports Ten HD, HBO HD, Discovery 4K, Cartoon Network) plus 7-Day Catch-Up TV and complimentary OTT subscriptions (SonyLIV Premium, ShemarooME). All powered by a 4K Voice Remote Android TV Box.";
      options = [
        { label: '📺 Explore TV Channels Catalog', action: () => { onClose(); onNavigate('tv'); } },
      ];
    } else {
      replyText = "Thank you for reaching out! NetWave Nepal offers pure fiber internet, 4K IPTV, low-latency gaming routing to Singapore and Mumbai, and 24/7 customer care. Would you like to check our plans, test your current internet speed, or speak with an agent?";
      options = [
        { label: '🚀 Explore Internet Plans', action: () => { onClose(); onNavigate('plans'); } },
        { label: '⚡ Run Speed Test', action: () => { onClose(); onNavigate('speedtest'); } },
        { label: '📞 Contact Support Desk', action: () => { onClose(); onNavigate('support'); } },
      ];
    }

    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: 'Just now',
        options,
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setInput('');
    handleSendPrompt(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col h-[650px] max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-bold text-white">WaveBot AI Assistant</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-cyan-300">NetWave Nepal 24/7 Smart Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/50">
          {messages.map((m) => {
            const isBot = m.sender === 'bot';
            return (
              <div
                key={m.id}
                className={`flex items-start space-x-2.5 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                    isBot ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-blue-600 text-white'
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isBot
                        ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-tr-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  </div>

                  {/* Interactive Quick Action Buttons */}
                  {m.options && m.options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={opt.action}
                          className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-900/60 border border-slate-700 hover:border-cyan-400 text-cyan-300 transition-colors cursor-pointer flex items-center space-x-1"
                        >
                          <span>{opt.label}</span>
                          <ArrowRight className="w-3 h-3 text-cyan-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleFormSubmit} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about NetWave Nepal fiber, router lights, or bill..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold rounded-xl disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
