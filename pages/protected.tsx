import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function ProtectedPage() {
  const { data: session } = useSession()
  const [content, setContent] = useState()
  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://some-protected.resource.com')
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    if (session) fetchData()
  }, [session])
  // If no session exists, display access denied message
  if (!session) {
    return <span>Denied</span>
  }
  // If session exists, display content
  return (
    <>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? '\u00a0'}</strong>
      </p>
    </>
  )
}
