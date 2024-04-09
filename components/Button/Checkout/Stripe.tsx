interface ButtonCheckoutProps {
  minimal?: boolean
  brandName?: string
  className?: string
}

const ButtonCheckout: React.FC<ButtonCheckoutProps> = ({ minimal = false, brandName = 'LaunchFa.st', className = 'bg-launchfast' }) => {
  return (
    <form method="post" action="/api/stripe/checkout">
      <button className={`flex cursor-pointer flex-row items-center justify-center gap-x-2 rounded-full text-white ${minimal ? 'py-1 pl-2 pr-4' : 'px-10 py-3'} ${className}`}>
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
    </form>
  )
}

export default ButtonCheckout
