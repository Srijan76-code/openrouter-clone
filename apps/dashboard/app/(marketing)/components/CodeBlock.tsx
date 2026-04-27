'use client'

import { Fragment, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import styles from './CodeBlock.module.css'

type Tab = { id: string; label: string }

const TABS: Tab[] = [
  { id: 'ts', label: 'TypeScript' },
  { id: 'py', label: 'Python' },
  { id: 'curl', label: 'curl' },
]

const SNIPPETS: Record<string, string> = {
  ts: `import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter-clone-api-gateway.onrender.com/v1",
  apiKey: "gateway-sk-12345",
});

const response = await openai.chat.completions.create({
  model: "google/gemini-3.1-pro",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "What is the capital of Germany?" }
  ],
  temperature: 0.7,
  // Orbyt extensions
  extra: {
    fallback_models: [
      "anthropic/claude-3-haiku",
      "google/gemini-2.5-flash"
    ],
    provider: "cheap",
    retry: 3
  }
});`,
  py: `from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter-clone-api-gateway.onrender.com/v1",
    api_key="gateway-sk-12345",
)

response = client.chat.completions.create(
    model="google/gemini-3.1-pro",
    messages=[
        {"role": "user", "content": "What is the capital of Germany?"}
    ],
    extra_body={
        "fallback_models": ["anthropic/claude-3-haiku", "google/gemini-2.5-flash"],
        "provider": "cheap",
        "retry": 3,
    },
)`,
  curl: `curl https://openrouter-clone-api-gateway.onrender.com/v1/chat/completions \\
  -H "Authorization: Bearer gateway-sk-12345" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "google/gemini-3.1-pro",
    "messages": [
      { "role": "user", "content": "What is the capital of Germany?" }
    ],
    "extra": {
      "fallback_models": ["anthropic/claude-3-haiku"],
      "provider": "cheap",
      "retry": 3
    }
  }'`,
}

type Token = { type: 'plain' | 'kw' | 'str' | 'com' | 'fn' | 'num'; text: string }

const KEYWORDS = new Set([
  'const', 'let', 'var', 'import', 'from', 'await', 'async', 'new', 'return',
  'if', 'else', 'for', 'in', 'of', 'function', 'class', 'true', 'false', 'null',
  // Python
  'def', 'from', 'as', 'with', 'pass', 'lambda', 'None', 'True', 'False',
])

const FUNCTIONS = new Set([
  'OpenAI', 'create', 'completions', 'chat', 'client', 'openai', 'response', 'main',
])

function tokenizeLine(line: string): Token[] {
  const out: Token[] = []
  let i = 0

  // Detect single-line comment first (// or #) outside strings
  // We tokenize char-by-char so strings are preserved correctly.
  while (i < line.length) {
    const ch = line[i]!
    const next = line[i + 1]

    // Comments
    if (ch === '/' && next === '/') {
      out.push({ type: 'com', text: line.slice(i) })
      return out
    }
    if (ch === '#') {
      out.push({ type: 'com', text: line.slice(i) })
      return out
    }

    // Strings (double or single quote)
    if (ch === '"' || ch === "'") {
      const quote = ch
      let j = i + 1
      while (j < line.length) {
        if (line[j] === '\\') { j += 2; continue }
        if (line[j] === quote) { j++; break }
        j++
      }
      out.push({ type: 'str', text: line.slice(i, j) })
      i = j
      continue
    }

    // Numbers
    if (/[0-9]/.test(ch) && (i === 0 || /[\s,([{:=]/.test(line[i - 1]!))) {
      let j = i
      while (j < line.length && /[0-9.]/.test(line[j]!)) j++
      out.push({ type: 'num', text: line.slice(i, j) })
      i = j
      continue
    }

    // Identifiers
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i
      while (j < line.length && /[A-Za-z0-9_$]/.test(line[j]!)) j++
      const word = line.slice(i, j)
      if (KEYWORDS.has(word)) out.push({ type: 'kw', text: word })
      else if (FUNCTIONS.has(word)) out.push({ type: 'fn', text: word })
      else out.push({ type: 'plain', text: word })
      i = j
      continue
    }

    // Plain (whitespace, punctuation)
    let j = i + 1
    while (j < line.length && !/[A-Za-z0-9_$"'/#]/.test(line[j]!)) j++
    out.push({ type: 'plain', text: line.slice(i, j) })
    i = j
  }

  return out
}

function classFor(type: Token['type']): string | undefined {
  switch (type) {
    case 'kw': return styles.kw
    case 'str': return styles.str
    case 'com': return styles.com
    case 'fn': return styles.fn
    case 'num': return styles.num
    default: return undefined
  }
}

function HighlightedCode({ code }: { code: string }) {
  const lines = code.split('\n')
  return (
    <pre>
      {lines.map((line, idx) => {
        const tokens = tokenizeLine(line)
        return (
          <Fragment key={idx}>
            {tokens.map((t, ti) => {
              const cls = classFor(t.type)
              return cls ? (
                <span key={ti} className={cls}>{t.text}</span>
              ) : (
                <Fragment key={ti}>{t.text}</Fragment>
              )
            })}
            {'\n'}
          </Fragment>
        )
      })}
    </pre>
  )
}

export default function CodeBlock() {
  const [tab, setTab] = useState<string>('ts')
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(SNIPPETS[tab] ?? '')
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* noop */
    }
  }

  return (
    <section id="install" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Drop-in</span>
          <h2 className={styles.title}>Two lines to switch from OpenAI.</h2>
          <p className={styles.body}>
            Point your existing OpenAI SDK at the Orbyt gateway. Add an{' '}
            <code className={styles.inlineCode}>extra</code> block to declare
            fallbacks, routing strategy, and retry policy per request.
          </p>
          <div className={styles.note}>
            <strong style={{ fontWeight: 590 }}>OpenAI-compatible.</strong>{' '}
            Existing libraries and frameworks work unchanged.
          </div>
        </div>

        <div className={styles.codeCard}>
          <div className={styles.tabs}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
                type="button"
              >
                {t.label}
              </button>
            ))}
            <button onClick={copy} className={styles.copyBtn} type="button">
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className={styles.codeBody}>
            <HighlightedCode code={SNIPPETS[tab] ?? ''} />
          </div>
        </div>
      </div>
    </section>
  )
}
