import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px' }
    )

    const observeNew = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        observer.observe(el)
      })
    }

    observeNew()

    const mutationObserver = new MutationObserver(observeNew)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}
