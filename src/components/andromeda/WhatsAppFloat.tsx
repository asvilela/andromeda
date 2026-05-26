import { WhatsAppIcon } from './Icons'

export default function WhatsAppFloat({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[200] w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] bg-wpp rounded-full flex items-center justify-center border-0 cursor-pointer p-0 shadow-lg hover:scale-105 transition-transform duration-200"
      style={{ boxShadow: '0 4px 24px rgba(37,211,102,.3)' }}
      aria-label="Falar com consultor via WhatsApp"
    >
      <div
        className="absolute inset-0 bg-wpp rounded-full"
        aria-hidden="true"
        style={{ animation: 'wpp-pulse 2.5s infinite' }}
      />
      <WhatsAppIcon size={28} className="relative z-10 text-white" />
    </button>
  )
}
