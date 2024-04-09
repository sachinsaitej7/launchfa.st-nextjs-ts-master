import React from 'react'

interface SlackPreviewLabel {
  title: string
  href: string
}

interface Preload {
  as: string
  href: string
}

interface SEOProps {
  title?: string
  description?: string
  url?: string
  image?: string
  preloads?: Preload[]
  icon?: string
  slackPreviewLabels?: SlackPreviewLabel[]
}

const SEO: React.FC<SEOProps> = ({
  title = 'LaunchFa.st',
  description = 'LaunchFa.st',
  url = 'https://www.launchfa.st',
  image = 'https://www.launchfa.st/seo.png',
  preloads,
  icon = 'https://www.launchfa.st/purple-icon.png',
  slackPreviewLabels,
}: SEOProps) => {
  const canonicalUrl = new URL(url)
  canonicalUrl.hostname = 'www.launchfa.st'
  return (
    <>
      {/* Global Metadata */}
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href={icon} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl.toString()} />
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      {/* Twitter */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:url" content={url} />
      {/* Slack Preview Labels */}
      {slackPreviewLabels?.map((label, index) => (
        <React.Fragment key={index}>
          <meta name={`twitter:label${index + 1}`} content={label.title} />
          <meta name={`twitter:data${index + 1}`} content={label.href} />
        </React.Fragment>
      ))}
      {/* Preload(s) */}
      {preloads?.map((preload, index) => <link rel="preload" as={preload.as} href={preload.href} key={index} />)}
    </>
  )
}

export default SEO
