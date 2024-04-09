import React from 'react'
import ButtonCheckout from './Button/Checkout/Stripe'

const CTA = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <img alt="Cover" loading="lazy" src="https://rishi.app/static/favicon-image.jpg" className="absolute left-0 top-0" />
      <div className="flex max-w-[300px] flex-col items-center space-y-3">
        <h1>Boost Your App</h1>
        <h2>Some tagline here</h2>
        <ButtonCheckout brandName="LaunchFa.st" />
      </div>
    </div>
  )
}

export default CTA
