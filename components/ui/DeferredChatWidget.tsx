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

// A scroll or tap before the page has finished loading starts the widget right away
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'] as const

/**
 * Starts the Retell concierge widget as soon as the page has finished loading (or on
 * the visitor's first interaction, if that comes sooner), so it is initialised and its
 * pop-up is showing before the visitor reaches for it, without competing with the
 * page's own files during the initial load. Connections to Retell are opened early by
 * the preconnect hints in the root layout.
 */
export default function DeferredChatWidget() {
  useEffect(() => {
    const load = () => {
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
      window.removeEventListener('load', load)
    }

    if (document.readyState === 'complete') {
      load()
      return
    }
    INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }))
    window.addEventListener('load', load, { once: true })

    return cleanup
  }, [])

  return null
}
