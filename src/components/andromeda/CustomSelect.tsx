import { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

export default function CustomSelect({ options, value, onChange, placeholder = 'Selecione', label }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      {label && <label className="block font-sans font-medium text-[.72rem] tracking-[.15em] uppercase text-text-2 mb-2.5">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-white border px-5 py-[14px] text-left text-[.95rem] outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/15 transition-colors transition-shadow duration-200 rounded-xl flex items-center justify-between cursor-pointer font-sans ${
          isOpen ? 'border-gold ring-2 ring-gold/15' : 'border-charcoal/[.08] hover:border-charcoal/[.15]'
        }`}
      >
        <span className={selected ? 'text-cream' : 'text-text-2/50'}>{selected ? selected.label : placeholder}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`text-text-2/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div role="listbox" className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-charcoal/[.08] rounded-2xl shadow-card-hover z-50 py-1.5 max-h-[220px] overflow-y-auto">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setIsOpen(false) }}
              className={`w-full text-left px-5 py-3.5 text-[.9rem] transition-colors duration-150 cursor-pointer border-0 bg-transparent font-sans ${
                opt.value === value ? 'text-gold-dk bg-gold/[.06] font-medium' : 'text-cream hover:bg-bg2'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
