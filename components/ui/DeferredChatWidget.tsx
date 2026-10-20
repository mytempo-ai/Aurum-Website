'use client'

import { useEffect } from 'react'

const WIDGET_SRC = 'https://dashboard.retellai.com/retell-widget.js'

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
    }

    const cleanup = () => {
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, load))
      window.removeEventListener('load', startIdleTimer)
      if (timer) clearTimeout(timer)
    }

    const startIdleTimer = () => {
      timer = setTimeout(load, IDLE_FALLBACK_MS)
    }

    INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }))
    if (document.readyState === 'complete') startIdleTimer()
    else window.addEventListener('load', startIdleTimer, { once: true })

    return cleanup
  }, [])

  return null
}
