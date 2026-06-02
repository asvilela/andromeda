import { VIDEO, VIDEOS } from '@/lib/constants'

interface VideoCardProps {
  videoId: string
  title: string
}

function VideoCard({ videoId, title }: VideoCardProps) {
  if (!videoId) return null

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-card-hover">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
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

      </div>
    </section>
  )
}
