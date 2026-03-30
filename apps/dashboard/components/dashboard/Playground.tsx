"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Send, Bot, User, Sparkles, Settings2, Loader2, ChevronDown } from "lucide-react";

const MODELS = [
  { id: "gpt-4o", name: "OpenAI: GPT-4o", icon: Sparkles },
  { id: "claude-3-5", name: "Anthropic: Claude 3.5 Sonnet", icon: Bot },
  { id: "gemini-1-5", name: "Google: Gemini 1.5 Pro", icon: Sparkles },
  { id: "mistral-large", name: "Mistral: Large", icon: Bot },
];

const DUMMY_RESPONSE = "This is a simulated streaming response from the LLM router. In a real production environment, you would connect this to your backend service which would stream Server-Sent Events (SSE) back to the client. The design here focuses on a premium aesthetic with glassmorphism, dynamic loading states, and a clean, user-friendly control panel style.";

export default function Playground() {
  const [model, setModel] = useState(MODELS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'assistant', content: string}[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStream, setCurrentStream] = useState("");
  
  const streamRef = useRef(currentStream);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    streamRef.current = currentStream;
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentStream, chatHistory]);

  const handleSend = () => {
    if (!prompt.trim() || isStreaming) return;
    
    // Add user message
    setChatHistory(prev => [...prev, { role: "user", content: prompt }]);
    setPrompt("");
    setIsStreaming(true);
    setCurrentStream("");

    // Simulate network delay then stream
    setTimeout(() => {
      let index = 0;
      const responseText = DUMMY_RESPONSE;
      
      const interval = setInterval(() => {
        if (index < responseText.length) {
          setCurrentStream(prev => prev + responseText.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setChatHistory(prev => [...prev, { role: "assistant", content: responseText }]);
          setCurrentStream("");
          setIsStreaming(false);
        }
      }, 20); // 20ms per character
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4 relative z-10 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Request Playground</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Test prompts across any connected model</p>
          </div>
        </div>
        
        {/* Model Selector */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium"
          >
            {model?.icon && <model.icon className="w-4 h-4 text-primary" />}
            {model?.name}
            <ChevronDown className="w-4 h-4 ml-2 text-muted-foreground" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-md bg-[#121212] border border-white/10 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              {MODELS.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setModel(m); setIsDropdownOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/10 transition-colors text-left"
                >
                  <m.icon className="w-4 h-4 text-primary/70" />
                  {m.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full border-r border-white/5">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {chatHistory.length === 0 && !isStreaming ? (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                   <Sparkles className="w-8 h-8 text-muted-foreground" />
                 </div>
                 <p className="text-sm font-medium">Send a message to start testing the router.</p>
               </div>
            ) : null}
            
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 shrink-0 rounded-md flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10' : 'bg-primary/20 text-primary border border-primary/30'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 bg-clip-text" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-transparent text-gray-300'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isStreaming && (
              <div className="flex gap-4">
                 <div className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center bg-primary/20 text-primary border border-primary/30">
                  <Bot className="w-4 h-4" />
                 </div>
                 <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg-transparent text-gray-300 relative">
                   {currentStream || (
                     <div className="flex space-x-1 items-center h-5">
                       <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                       <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                       <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></div>
                     </div>
                   )}
                   {currentStream && <span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse align-middle"></span>}
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 bg-black/20 backdrop-blur-md">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Press Enter to send)"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder:text-muted-foreground min-h-[52px] max-h-32"
                rows={1}
              />
              <Button 
                size="sm" 
                onClick={handleSend}
                disabled={!prompt.trim() || isStreaming}
                className="absolute right-2 top-2 h-9 w-9 p-0 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 transition-all"
              >
                {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2 px-1 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
               <span>Tokens: ~{prompt.length / 4 | 0}</span>
               <span>{model?.name}</span>
            </div>
          </div>
        </div>
        
        {/* Parameters Sidebar */}
        <div className="w-64 bg-black/10 p-5 hidden md:block border-l border-white/5 space-y-6">
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-muted-foreground pb-2 border-b border-white/5">
            <Settings2 className="w-4 h-4" /> Parameters
          </div>
          
          <div className="space-y-3">
             <div className="flex justify-between items-center text-xs font-bold">
               <label className="text-gray-300">Temperature</label>
               <span className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">{temperature}</span>
             </div>
             <input 
               type="range" 
               min="0" max="2" step="0.1" 
               value={temperature}
               onChange={(e) => setTemperature(parseFloat(e.target.value))}
               className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
             />
             <p className="text-[10px] text-muted-foreground leading-tight">
               Controls randomness: Lowering results in less random completions.
             </p>
          </div>
          
          <div className="space-y-3">
             <div className="flex justify-between items-center text-xs font-bold">
               <label className="text-gray-300">Max Tokens</label>
               <span className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">{maxTokens}</span>
             </div>
             <input 
               type="range" 
               min="256" max="4096" step="256" 
               value={maxTokens}
               onChange={(e) => setMaxTokens(parseInt(e.target.value))}
               className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
             />
             <p className="text-[10px] text-muted-foreground leading-tight">
               The maximum number of tokens to generate in the completion.
             </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
