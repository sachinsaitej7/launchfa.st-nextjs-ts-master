import React from 'react'
import IconCross from './Icons/Cross'
import IconHamburger from './Icons/Hamburger'
import ButtonCheckout from './Button/Checkout/Stripe'

interface HeaderProps {
  logo?: string
}

const Header: React.FC<HeaderProps> = ({ logo = '/purple-icon.png' }) => {
  const header = {
    viewID: 'header', // You can use a unique ID of your choice
    labelID: 'view-header', // You can use a unique ID of your choice
  }
  return (
    <div className="relative mx-auto flex max-w-7xl flex-row items-center justify-between px-8 pt-2">
      <a href="/" className="flex flex-row items-center gap-x-2">
        <img alt="LaunchFast Logo" height={30} width={30} src={logo} className="h-[30px] w-[30px] rounded-full bg-gray-100" loading="lazy" />
        <span className="text-2xl font-semibold text-launchfast">LaunchFast</span>
      </a>
      <div className="hidden flex-row items-center gap-x-8 sm:flex">
        <a className="text-gray-800 hover:text-launchfast hover:underline" href="/#pricing">
          Pricing
        </a>
        <a className="text-gray-800 hover:text-launchfast hover:underline" href="/#demo">
          Demo
        </a>
        <ButtonCheckout minimal={true} brandName="LaunchFa.st" />
      </div>
      <label className="rounded-full border p-2 sm:hidden" htmlFor={header.labelID}>
        <IconHamburger />
      </label>
      <input className="hidden" type="checkbox" id={header.labelID} />
      <div
        id={header.viewID}
        className="absolute right-0 top-0 z-20 flex h-screen w-[250px] flex-col overflow-hidden border-l bg-white shadow-2xl transition-all duration-300 ease-in-out sm:!hidden"
      >
        <div className="flex flex-row items-center justify-between border-b px-5 py-2">
          <span>Menu</span>
          <label className="rounded-full border p-2" htmlFor={header.labelID}>
            <IconCross />
          </label>
        </div>
        <div className="flex flex-col gap-y-4 p-5">
          <a href="/" className="text-xl font-semibold text-launchfast">
            Home
          </a>
          <a href="/#pricing" className="text-xl">
            Pricing
          </a>
          <a href="/#demo" className="text-xl">
            Demo
          </a>
          <ButtonCheckout brandName="LaunchFa.st" />
        </div>
      </div>
    </div>
  )
}

export default Header
