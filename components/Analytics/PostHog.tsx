import posthog from 'posthog-js'
import React, { useEffect } from 'react'

interface PHProps {
  ID?: string
}

const PostHog: React.FC<PHProps> = ({ ID }) => {
  useEffect(() => {
    if (ID && window['enabled_posthog'] !== 1) {
      window['enabled_posthog'] = 1
      posthog.init(ID, { api_host: 'https://app.posthog.com' })
    }
  }, [ID])
  return null
}

export default PostHog
