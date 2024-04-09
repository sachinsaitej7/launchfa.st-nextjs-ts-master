import React, { useEffect } from 'react'

interface GAProps {
  ID?: string
}

const GA: React.FC<GAProps> = ({ ID }) => {
  useEffect(() => {
    if (ID) {
      const script = document.createElement('script')
      script.id = 'googleanalytics'
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
      script.onload = () => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push(['js', new Date()])
        window.dataLayer.push(['config', ID])
      }
      document.head.appendChild(script)
    }
    // Clean up the script when the component unmounts
    return () => {
      const existingScript = document.getElementById('googleanalytics')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [ID])
  return null
}

export default GA
