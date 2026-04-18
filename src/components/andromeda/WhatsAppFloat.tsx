import { WhatsAppIcon } from './Icons'

export default function WhatsAppFloat({ onOpenPopup }: { onOpenPopup: () => void }) {
  return (
    <button
      onClick={onOpenPopup}
      className="fixed bottom-10 right-10 z-[200] w-[60px] h-[60px] bg-wpp rounded-full flex items-center justify-center border-0 cursor-pointer p-0 shadow-lg"
      style={{ boxShadow: '0 4px 24px rgba(37,211,102,.3)' }}
      aria-label="Falar com consultor via WhatsApp"
    >
      <div
        className="absolute w-[60px] h-[60px] bg-wpp rounded-full"
        aria-hidden="true"
        style={{ animation: 'wpp-pulse 2.5s infinite' }}
      />
      <WhatsAppIcon size={28} className="relative z-10 text-white" />
    </button>
  )
}
