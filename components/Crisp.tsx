import React, { useEffect } from 'react'

interface CrispProps {
  ID?: string
}

const Crisp: React.FC<CrispProps> = ({ ID }) => {
  useEffect(() => {
    if (ID && window['enabled_crisp'] !== 1) {
      window.$crisp = []
      window.CRISP_WEBSITE_ID = ID
      const script = document.createElement('script')
      script.id = 'crispsupport'
      script.src = 'https://client.crisp.chat/l.js'
      document.body.appendChild(script)
      window['enabled_crisp'] = 1
    }
    // Clean up the script when the component unmounts
    return () => {
      const existingScript = document.getElementById('crispsupport')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [ID])
  return null
}

export default Crisp
