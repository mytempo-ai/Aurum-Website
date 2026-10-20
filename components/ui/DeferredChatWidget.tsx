'use client'

import { useEffect } from 'react'

const WIDGET_SRC = 'https://dashboard.retellai.com/retell-widget.js'
// Origins the widget talks to: its own script host and the Retell API (chat sessions)
const RETELL_ORIGINS = ['https://dashboard.retellai.com', 'https://api.retellai.com']

const WIDGET_ATTRS: Record<string, string> = {
  'data-public-key': 'public_key_791aa9fa55765bfd1776d',
  'data-agent-id': 'agent_d70716fca0fc829b07bb93c056',
  'data-agent-version': 'Aurum Concierge',
  'data-title': 'Aurum Concierge',
  'data-logo-url': 'NOTHING',
  'data-color': '#C8933A',
  'data-popup-message': 'How may I help you? Interested in booking an event?',
  'data-show-ai-popup': 'true',
  'data-show-ai-popup-time': '1',
  'data-auto-open': 'false',
}

// Fallback for visitors who never scroll or tap: load once the page has been idle this long
const IDLE_FALLBACK_MS = 12000

const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'] as const

/**
 * Loads the Retell concierge widget only after the visitor first interacts with
 * the page (or after a long idle fallback), so its script and pop-up never compete
 * with the page's main content on first load.
 *
 * Once the page has loaded it is warmed up without being run: the widget module is
 * downloaded and compiled (modulepreload) and connections to Retell are opened, so
 * the first scroll/tap starts it instantly and opening the chat skips the handshakes.
 */
export default function DeferredChatWidget() {
  useEffect(() => {
    let loaded = false
    let timer: ReturnType<typeof setTimeout> | undefined

    const load = () => {
      if (loaded) return
      loaded = true
      cleanup()
      if (document.getElementById('retell-widget')) return
      const script = document.createElement('script')
      script.id = 'retell-widget'
      script.src = WIDGET_SRC
      script.type = 'module'
      script.async = true
      Object.entries(WIDGET_ATTRS).forEach(([k, v]) => script.setAttribute(k, v))
      document.body.appendChild(script)
      // Open the API connection now so it's ready by the time the chat is clicked
      RETELL_ORIGINS.forEach((origin) => addLink('preconnect', origin, 'anonymous'))
    }

    const addLink = (rel: string, href: string, crossOrigin?: string) => {
      if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      if (crossOrigin !== undefined) link.crossOrigin = crossOrigin
      document.head.appendChild(link)
    }

    const warmUp = () => {
      // Matches the module script's request (CORS, no credentials), so the injected
      // <script type="module"> reuses the preloaded module instead of refetching it
      if (!loaded) addLink('modulepreload', WIDGET_SRC)
      RETELL_ORIGINS.forEach((origin) => addLink('preconnect', origin, 'anonymous'))
    }

    const onPageLoad = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback
      if (idle) idle(warmUp, { timeout: 2000 })
      else setTimeout(warmUp, 500)
      timer = setTimeout(load, IDLE_FALLBACK_MS)
    }

    const cleanup = () => {
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, load))
      window.removeEventListener('load', onPageLoad)
      if (timer) clearTimeout(timer)
    }

    INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }))
    if (document.readyState === 'complete') onPageLoad()
    else window.addEventListener('load', onPageLoad, { once: true })

    return cleanup
  }, [])

  return null
}
