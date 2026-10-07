import { useEffect, useMemo, useRef, useState } from 'react'
import { categories } from './commands'

const total = categories.reduce((n, c) => n + c.items.length, 0)

function legacyCopy(text) {
  const t = Object.assign(document.createElement('textarea'), { value: text })
  document.body.appendChild(t)
  t.select()
  const ok = document.execCommand('copy')
  t.remove()
  if (!ok) throw new Error('copy failed')
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    legacyCopy(text)
  }
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = async () => {
    try {
      await copyText(text)
      setDone(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setDone(false), 1800)
    } catch {
      /* sem permissão de área de transferência: nada a fazer */
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border px-3.5 text-sm font-semibold transition-colors ${
        done
          ? 'border-accent bg-accent text-on-accent'
          : 'border-line text-ink hover:border-accent hover:text-accent'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {done ? <path d="m5 12 5 5L20 7" /> : <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></>}
      </svg>
      <span aria-live="polite">{done ? `${text} copiado` : 'Copiar comando'}</span>
    </button>
  )
}

function Command({ item }) {
  return (
    <li className="border-t border-line py-7 md:odd:pr-8 md:even:pl-8 md:even:border-l">
      <h3 className="font-mono text-2xl font-semibold tracking-tight text-accent">{item.c}</h3>
      <p className="mt-2 max-w-[56ch] text-base leading-relaxed">{item.d}</p>
      <div className="mt-4 border-l-2 border-accent bg-sample py-3 pr-4 pl-4">
        <p className="text-sm text-muted">Exemplo</p>
        <code className="mt-1 block break-words font-mono text-sm font-medium">{item.ex}</code>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.r}</p>
      </div>
      <CopyButton text={item.c} />
    </li>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('todos')
  const input = useRef()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault()
        input.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const q = query.trim().toLowerCase().replace(/^\//, '')

  const sections = useMemo(
    () =>
      categories
        .filter((cat) => active === 'todos' || cat.id === active)
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((i) => !q || `${i.c} ${i.d} ${i.r}`.toLowerCase().includes(q)),
        }))
        .filter((cat) => cat.items.length),
    [q, active],
  )
  const shown = sections.reduce((n, s) => n + s.items.length, 0)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-8">
      <header className="pt-14 pb-10 sm:pt-20">
        <h1 className="max-w-[18ch] text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl">
          Comandos <span className="font-mono font-medium text-accent">/</span> do ChatGPT
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
          {total} comandos por categoria. Cada um traz o que faz, um exemplo para digitar e um botão para copiar.
        </p>

        <label className="mt-10 flex items-center border-b-2 border-ink pb-2 focus-within:border-accent">
          <span className="sr-only">Buscar comando</span>
          <span aria-hidden="true" className="font-mono text-4xl font-medium text-accent sm:text-5xl">/</span>
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="busque por nome ou tarefa"
            autoComplete="off"
            spellCheck="false"
            className="min-w-0 flex-1 bg-transparent px-2 font-mono text-2xl outline-none placeholder:text-muted/70 sm:text-3xl"
          />
          <span aria-hidden="true" className="caret -ml-1 hidden h-8 w-0.5 bg-accent sm:block" />
          <kbd className="ml-3 hidden rounded border border-line px-2 py-0.5 font-mono text-sm text-muted sm:block">/</kbd>
        </label>
      </header>

      <div className="lg:grid lg:grid-cols-[13rem_1fr] lg:gap-12">
        <nav aria-label="Categorias" className="lg:sticky lg:top-6 lg:self-start">
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
            {[{ id: 'todos', name: 'Todos', items: { length: total } }, ...categories].map((cat) => (
              <li key={cat.id} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={active === cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`flex min-h-11 w-full cursor-pointer items-baseline justify-between gap-4 rounded-md border px-3.5 py-2 text-left text-sm font-semibold whitespace-nowrap transition-colors lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 ${
                    active === cat.id
                      ? 'border-accent bg-accent text-on-accent lg:bg-transparent lg:text-accent'
                      : 'border-line text-muted hover:text-ink lg:border-line'
                  }`}
                >
                  {cat.name}
                  <span className="font-mono text-xs font-normal">{cat.items.length}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="mt-6 min-w-0 lg:mt-0">
          <p className="sr-only" role="status">{shown} comandos encontrados</p>
          {sections.map((cat) => (
            <section key={cat.id} className="mb-14" aria-labelledby={`h-${cat.id}`}>
              <h2 id={`h-${cat.id}`} className="text-3xl font-bold tracking-tight">{cat.name}</h2>
              <p className="mt-1 mb-5 max-w-[60ch] leading-relaxed text-muted">{cat.desc}</p>
              <ul className="grid md:grid-cols-2">
                {cat.items.map((item) => <Command key={item.c} item={item} />)}
              </ul>
            </section>
          ))}

          {!shown && (
            <div className="border-t border-line py-12">
              <p className="text-xl font-semibold">Nenhum comando para “{query}”.</p>
              <p className="mt-1 text-muted">Tente outra palavra, como “chat”, “modelo” ou “revisar”.</p>
              <button
                type="button"
                onClick={() => { setQuery(''); setActive('todos') }}
                className="mt-4 min-h-11 cursor-pointer rounded-md border border-line px-3.5 text-sm font-semibold hover:border-accent hover:text-accent"
              >
                Limpar busca
              </button>
            </div>
          )}
        </main>
      </div>

      <footer className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-muted">
        Comandos do app desktop conforme a{' '}
        <a className="underline hover:text-accent" href="https://learn.chatgpt.com/docs/reference/slash-commands">documentação oficial</a>.
        Os atalhos do chat web variam por plano e plataforma. Digite <kbd className="font-mono">/</kbd> no ChatGPT para ver os seus.
      </footer>
    </div>
  )
}
