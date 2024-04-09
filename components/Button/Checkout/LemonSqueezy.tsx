import React, { useEffect, useState } from 'react'

interface ButtonLSCheckoutProps {
  minimal?: boolean
  brandName?: string
  className?: string
  productUrl: string
}

const ButtonLSCheckout: React.FC<ButtonLSCheckoutProps> = ({ minimal = false, brandName = 'LaunchFa.st', className = '', productUrl }) => {
  const [buttonId, setButtonId] = useState<string>('')
  useEffect(() => {
    const BUTTON_ID = productUrl.replace(/[^a-zA-Z0-9]/g, '-')
    const setupLS = () => {
      window.createLemonSqueezy()
      const buttonElements = document.querySelectorAll('#' + BUTTON_ID)
      buttonElements.forEach((element) => {
        element.classList.remove('pointer-events-none')
        element.addEventListener('click', () => {
          window.LemonSqueezy.Url.Open(element.getAttribute('id'))
        })
      })
      window['hasLemonSqueezy'] = true
      window.LemonSqueezy.Setup({
        eventHandler: (event: any) => {
          console.log(event)
        },
      })
    }
    const buttonElements = document.querySelectorAll('#' + BUTTON_ID)
    buttonElements.forEach((element) => {
      element.classList.add('pointer-events-none')
    })
    if (window['hasLemonSqueezy']) {
      setupLS()
    } else {
      const script = document.createElement('script')
      script.onload = () => {
        setTimeout(() => {
          setupLS()
        }, 100)
      }
      script.src = 'https://assets.lemonsqueezy.com/lemon.js'
      document.head.appendChild(script)
    }
    setButtonId(BUTTON_ID)
  }, [productUrl])

  return (
    <button id={buttonId} className={`flex flex-row items-center justify-center gap-x-2 rounded-full text-white ${minimal ? 'py-1 pl-2 pr-4' : 'px-10 py-3'} ${className}`}>
      <img
        loading="lazy"
        alt="LaunchFast Logo"
        src="/purple-icon.png"
        width={minimal ? '24' : '30'}
        height={minimal ? '24' : '30'}
        className={minimal ? 'h-[24px] w-[24px]' : 'h-[30px] w-[30px]'}
      />
      <span> Get {brandName}</span>
    </button>
  )
}

export default ButtonLSCheckout
