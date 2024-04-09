import { useEffect } from 'react'

const Instant = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'instantpage'
    script.src = 'https://instant.page/5.2.0'
    script.type = 'module'
    script.integrity = 'sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z'
    document.body.appendChild(script)
    // Clean up the script when the component unmounts
    return () => {
      const existingScript = document.getElementById('instantpage')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])
  return null
}

export default Instant
