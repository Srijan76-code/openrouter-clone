'use client'

import { useState } from 'react'
import styles from './CodeBlock.module.css'

type Tab = 'python' | 'javascript' | 'curl'

const pythonCode = `from openai import OpenAI

client = OpenAI(
  base_url="https://api.aetherroute.ai/v1",
  api_key="sk-your-api-key"
)

response = client.chat.completions.create(
  model="anthropic/claude-sonnet-4-6",
  messages=[{"role": "user", "content": "Hello!"}]
)

print(response.choices[0].message.content)`

const jsCode = `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.aetherroute.ai/v1',
  apiKey: 'sk-your-api-key',
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-4-6',
  messages: [{ role: 'user', content: 'Hello!' }],
});

console.log(response.choices[0].message.content);`

const curlCode = `curl https://api.aetherroute.ai/v1/chat/completions \\
  -H "Authorization: Bearer sk-your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "anthropic/claude-sonnet-4-6",
       "messages": [{"role":"user","content":"Hello!"}]}'`

const checkList = [
  'OpenAI SDK compatible — zero code changes',
  '300+ models via one key',
  'Automatic failover and fallback routing',
  'Per-request model switching',
  'Streaming support out of the box',
]

// Minimal syntax highlighting
function highlight(code: string, lang: Tab) {
  if (lang === 'python') {
    return code
      .replace(/\b(from|import|class|def|return|if|else|for|in|print)\b/g, '<span class="kw">$1</span>')
      .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="str">$&</span>')
      .replace(/\b(OpenAI|create)\b/g, '<span class="fn">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="num">$1</span>')
  }
  if (lang === 'javascript') {
    return code
      .replace(/\b(import|from|const|new|await|let|var|return)\b/g, '<span class="kw">$1</span>')
      .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="str">$&</span>')
      .replace(/\b(OpenAI|create|log)\b/g, '<span class="fn">$1</span>')
  }
  // curl — highlight strings only
  return code.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="str">$&</span>')
}

export default function CodeBlock() {
  const [activeTab, setActiveTab] = useState<Tab>('python')
  const [copied, setCopied] = useState(false)

  const getActiveCode = () => {
    if (activeTab === 'python') return pythonCode
    if (activeTab === 'javascript') return jsCode
    return curlCode
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getActiveCode())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <section id="code-section" className={styles.section} aria-label="Developer integration">
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Left */}
          <div className={styles.left}>
            <p className={styles.eyebrow}>Developer First</p>
            <h2 className={styles.title}>Drop In.<br />No Rewrite.</h2>
            <p className={styles.subtitle}>
              Our API is 100% OpenAI-compatible. Point your existing SDK at our endpoint
              and you&apos;re done. Switch models with one parameter change.
            </p>
            <ul className={styles.checklist}>
              {checkList.map((item) => (
                <li key={item}>
                  <span className={styles.checkIcon}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — terminal */}
          <div className={styles.terminal}>
            <div className={styles.tabs}>
              {(['python', 'javascript', 'curl'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'javascript' ? 'JavaScript' : tab === 'python' ? 'Python' : 'cURL'}
                </button>
              ))}
            </div>

            <button className={styles.copyBtn} onClick={handleCopy} aria-label="Copy code">
              {copied ? 'Copied!' : 'Copy'}
            </button>

            <div className={styles.codeDisplay}>
              <pre
                className={styles.codeBlock}
                dangerouslySetInnerHTML={{
                  __html: highlight(getActiveCode(), activeTab) + '<span class="' + styles.cursor + '"></span>',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
