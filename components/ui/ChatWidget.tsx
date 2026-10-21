'use client'

import { useEffect } from 'react'
import { RETELL_WIDGET_SRC } from '@/lib/site'

/** Fired on window once the widget script has run (see Hero: phones start the video after it) */
export const CHAT_WIDGET_LOADED_EVENT = 'aurum:chat-widget-loaded'

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

/**
 * Starts the Retell concierge widget as soon as the page is interactive. Its script
 * is already downloading by then (modulepreload in the root layout), so the widget
 * initialises without waiting for the rest of the page's images and fonts.
 */
export default function ChatWidget() {
  useEffect(() => {
    if (document.getElementById('retell-widget')) return
    const script = document.createElement('script')
    script.id = 'retell-widget'
    script.src = RETELL_WIDGET_SRC
    script.type = 'module'
    script.async = true
    Object.entries(WIDGET_ATTRS).forEach(([k, v]) => script.setAttribute(k, v))
    const markLoaded = () => {
      script.dataset.loaded = 'true'
      window.dispatchEvent(new Event(CHAT_WIDGET_LOADED_EVENT))
    }
    script.addEventListener('load', markLoaded, { once: true })
    script.addEventListener('error', markLoaded, { once: true })
    document.body.appendChild(script)
  }, [])

  return null
}
