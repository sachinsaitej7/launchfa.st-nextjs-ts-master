import React, { useEffect } from 'react'

interface PirschProps {
  ID?: string
}

const Pirsch: React.FC<PirschProps> = ({ ID }) => {
  useEffect(() => {
    if (ID) {
      const script = document.createElement('script')
      script.src = 'https://api.pirsch.io/pirsch-extended.js'
      script.id = 'pirschextendedjs'
      // @ts-ignore
      script['dataset-code'] = ID
      document.body.appendChild(script)
    }
    // Clean up the script when the component unmounts
    return () => {
      const existingScript = document.getElementById('pirschextendedjs')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [ID])
  return null
}

export default Pirsch
