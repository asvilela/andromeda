interface Props {
  label: string
  id?: string
  children: React.ReactNode
  maxWidth?: string
  subtitle?: string
}

export default function SectionHeader({ label, id, children, maxWidth = '22ch', subtitle }: Props) {
  return (
    <div className="mb-14 reveal">
      <span className="block text-gold-dk text-[.72rem] font-sans font-medium tracking-[.25em] uppercase mb-5">{label}</span>
      <h2
        id={id}
        className="font-serif font-normal text-cream leading-[1.06]"
        style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)', maxWidth }}
      >
        {children}
      </h2>
      {subtitle && (
        <p className="text-[1.05rem] text-text-2 leading-[1.85] mt-5 max-w-[54ch]">{subtitle}</p>
      )}
      <div className="gold-line mt-7" />
    </div>
  )
}
