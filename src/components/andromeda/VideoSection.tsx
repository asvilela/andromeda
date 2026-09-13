import { useState } from 'react'
import { VIDEO, VIDEOS, PROJECT } from '@/lib/constants'

interface VideoCardProps {
  videoId: string
  title: string
}

// Click-to-play facade: shows YouTube's own thumbnail and only injects the real
// iframe (its player JS, ~1MB, plus tracking beacons) once a visitor actually
// wants to watch, instead of loading it eagerly for every page view.
function VideoCard({ videoId, title }: VideoCardProps) {
  const [playing, setPlaying] = useState(false)
  if (!videoId) return null

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-card-hover bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full border-0 cursor-pointer group bg-transparent p-0"
          aria-label={`Assistir: ${title}`}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors duration-200 shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-charcoal ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export default function VideoSection() {
  const hasAny = VIDEO.youtubeId || VIDEOS.some(v => v.youtubeId)
  if (!hasAny) return null

  return (
    <section id="videos" className="section-dark bg-charcoal py-20 sm:py-28 px-[8vw]" aria-labelledby="video-title">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 reveal">
          <span className="block font-label text-gold-lt text-[.76rem] tracking-[.25em] uppercase mb-4">Vídeos</span>
          <h2
            id="video-title"
            className="font-serif font-normal text-white leading-[1.08]"
            style={{ fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)', maxWidth: '22ch' }}
          >
            Conheça o projeto antes de escolher sua unidade
          </h2>
          <p className="text-[1.05rem] text-white/50 leading-[1.8] mt-5 max-w-[54ch]">
            Veja os diferenciais do empreendimento, localização, plantas e estrutura de lazer.
          </p>
        </div>

        <div className="reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <VideoCard videoId={VIDEO.youtubeId} title={VIDEO.title} />
            {VIDEOS.map((v, i) => (
              <VideoCard key={i} videoId={v.youtubeId} title={v.title} />
            ))}
          </div>
        </div>

        {/* Book CTA block */}
        <div className="reveal mt-12 bg-white/[.04] border border-white/10 rounded-2xl p-8 sm:p-10 text-center">
          <h3
            className="font-serif text-white font-normal leading-tight mb-4"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}
          >
            Conheça todos os detalhes do {PROJECT.name}
          </h3>
          <p className="text-white/60 text-[.92rem] leading-relaxed max-w-[48ch] mx-auto mb-6">
            Baixe o book completo com plantas, perspectivas, diferenciais e localização do empreendimento.
          </p>
          <a
            href="#book"
            className="inline-flex items-center gap-3 px-8 py-4 font-label text-[.78rem] tracking-[.18em] uppercase no-underline border border-gold/40 text-gold-lt hover:bg-gold/10 hover:border-gold/60 transition-colors duration-200 rounded-xl"
          >
            Baixar book completo
          </a>
        </div>
      </div>
    </section>
  )
}
