import { useState } from 'react'
import { VIDEO, VIDEOS } from '@/lib/constants'
import { gtmEvent } from '@/lib/gtm'

interface VideoCardProps {
  videoId: string
  title: string
  thumbnail?: string
  type: string
  featured?: boolean
}

function VideoCard({ videoId, title, thumbnail, type, featured }: VideoCardProps) {
  const [playing, setPlaying] = useState(false)
  const thumb = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '')

  const handlePlay = () => {
    if (!videoId) return
    setPlaying(true)
    gtmEvent('video_play', { video_type: type })
  }

  if (!videoId) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/[.06] border-2 border-dashed border-white/[.08] flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-white/[.06] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </div>
        <span className="font-label text-[.68rem] tracking-[.2em] uppercase text-white/30">{title}</span>
      </div>
    )
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-card-hover bg-cream ${featured ? 'aspect-[16/9]' : 'aspect-video'}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full cursor-pointer border-0 bg-transparent group"
          aria-label={`Reproduzir vídeo: ${title}`}
        >
          <img
            src={thumb}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${featured ? 'w-22 h-22 sm:w-28 sm:h-28' : 'w-18 h-18 sm:w-22 sm:h-22'} rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <svg width={featured ? 32 : 28} height={featured ? 32 : 28} viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-gold">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </div>
          </div>
          <span className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 font-label text-white/90 text-[.62rem] sm:text-[.68rem] tracking-[.2em] uppercase drop-shadow-md">
            <span className="text-gold-lt">&#9654;</span> {title}
          </span>
        </button>
      )}
    </div>
  )
}

export default function VideoSection() {
  const hasAny = VIDEO.youtubeId || VIDEOS.some(v => v.youtubeId)
  if (!hasAny) return null

  const hasSecondary = VIDEOS.length > 0

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
          {hasSecondary ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
              <VideoCard videoId={VIDEO.youtubeId} title={VIDEO.title} thumbnail={VIDEO.thumbnail} type="institucional" featured />
              <div className="flex flex-col gap-5">
                {VIDEOS.map((v, i) => (
                  <VideoCard key={i} videoId={v.youtubeId} title={v.title} thumbnail={v.thumbnail} type={v.type || 'tour'} />
                ))}
              </div>
            </div>
          ) : (
            <VideoCard videoId={VIDEO.youtubeId} title={VIDEO.title} thumbnail={VIDEO.thumbnail} type="institucional" featured />
          )}
        </div>

      </div>
    </section>
  )
}
