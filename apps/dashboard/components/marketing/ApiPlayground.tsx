"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Copy, Check, Terminal, Play } from "lucide-react";

const models = ["anthropic/claude-3-opus", "openai/gpt-4o", "meta-llama/llama-3-70b-instruct"];

const aiResponses: Record<string, string> = {
  "anthropic/claude-3-opus": "The answer to the ultimate question of life, the universe, and everything is 42.",
  "openai/gpt-4o": "42. This is a famous reference to Douglas Adams' 'The Hitchhiker's Guide to the Galaxy'.",
  "meta-llama/llama-3-70b-instruct": "According to the supercomputer Deep Thought in 'The Hitchhiker's Guide to the Galaxy', the answer is 42."
};

export function ApiPlayground() {
  const [activeTab, setActiveTab] = useState(models[0]);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [renderedText, setRenderedText] = useState("");

  const copyCode = () => {
    navigator.clipboard.writeText(`curl -X POST https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${activeTab}",
    "messages": [
      {"role": "user", "content": "What is the meaning of life?"}
    ]
  }'`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateExecution = () => {
    setPlaying(true);
    setRenderedText("");
    const targetText = aiResponses[activeTab || ""] || "";
    let i = 0;
    
    const interval = setInterval(() => {
      setRenderedText((prev) => prev + targetText.charAt(i));
      i++;
      if (i >= targetText.length) {
        clearInterval(interval);
        setTimeout(() => setPlaying(false), 1000);
      }
    }, 30);
  };

  return (
    <section id="models" className="py-24 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            One API to Rule Them All
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Switch between providers by simply changing a single string. We abstract away tokenization, formatting, and rate limit errors.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex border-b border-white/10 overflow-x-auto overflow-y-hidden hide-scrollbar">
            {models.map((model) => (
              <button
                key={model}
                onClick={() => {
                  setActiveTab(model);
                  setRenderedText("");
                }}
                className={`px-6 py-4 text-sm font-mono whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === model 
                    ? "border-purple-500 text-purple-400 bg-purple-500/5" 
                    : "border-transparent text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {model}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2">
            {/* Request Pane */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-white/10 relative group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> cURL Request
                </span>
                <button 
                  onClick={copyCode}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
              
              <pre className="text-sm font-mono leading-relaxed overflow-x-auto text-gray-300">
                <span className="text-blue-400">curl</span> -X POST https://openrouter.ai/api/v1/chat/completions \<br/>
                &nbsp;&nbsp;-H <span className="text-green-300">"Authorization: Bearer $API_KEY"</span> \<br/>
                &nbsp;&nbsp;-H <span className="text-green-300">"Content-Type: application/json"</span> \<br/>
                &nbsp;&nbsp;-d '{"{"}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"model"</span>: <span className="text-green-300">"{activeTab}"</span>,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"messages"</span>: [<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}<span className="text-purple-400">"role"</span>: <span className="text-green-300">"user"</span>, <span className="text-purple-400">"content"</span>: <span className="text-green-300">"What is the meaning of life?"</span>{"}"}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;]<br/>
                &nbsp;&nbsp;{"}"}'
              </pre>
              
              <button 
                onClick={simulateExecution}
                disabled={playing}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold transition-colors"
              >
                {playing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></span> Executing...
                  </span>
                ) : (
                  <><Play className="w-4 h-4 fill-current" /> Send Request</>
                )}
              </button>
            </div>

            {/* Response Pane */}
            <div className="p-6 bg-black/60 relative">
              <div className="flex items-center mb-4">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  JSON Response
                </span>
              </div>
              <div className="text-sm font-mono leading-relaxed h-[250px] overflow-y-auto">
                {renderedText ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="text-gray-400">{"{"}</span><br/>
                    &nbsp;&nbsp;<span className="text-purple-400">"id"</span>: <span className="text-green-300">"gen-123"</span>,<br/>
                    &nbsp;&nbsp;<span className="text-purple-400">"choices"</span>: [<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">{"{"}</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"message"</span>: <span className="text-gray-400">{"{"}</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"role"</span>: <span className="text-green-300">"assistant"</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"content"</span>: <span className="text-green-300">"{renderedText}"</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">{"}"}</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-400">{"}"}</span><br/>
                    &nbsp;&nbsp;]<br/>
                    <span className="text-gray-400">{"}"}</span>
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center flex-col text-muted-foreground/50 gap-4">
                    <Terminal className="w-12 h-12 opacity-50" />
                    <p>Click send to test the API</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
