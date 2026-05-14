import { useEffect, useState, useRef } from 'react'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://smart-api-gateway-backend.onrender.com'

export function useLiveEvents() {
  const [events, setEvents] = useState([])
  const [connected, setConnected] = useState(false)
  const sourceRef = useRef(null)

  useEffect(() => {
    const source = new EventSource(`${BACKEND_URL}/api/stream`)
    sourceRef.current = source

    source.onopen = () => setConnected(true)
    source.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data)
        setEvents(prev => [event, ...prev].slice(0, 100))
      } catch (err) {
        console.error('SSE parse error:', err)
      }
    }
    source.onerror = () => setConnected(false)

    return () => source.close()
  }, [])

  return { events, connected }
}