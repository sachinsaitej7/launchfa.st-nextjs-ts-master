import React from 'react'

interface PricingProps {
  pricingFeatures: string[]
}

const Pricing = ({ pricingFeatures = [] }: PricingProps) => {
  return (
    <section id="pricing" className="mx-auto flex max-w-7xl flex-col gap-8 px-8 pb-16 pt-24">
      <div className="flex flex-col text-left">
        <p className="text-3xl sm:text-4xl">
          <span className="animate-fade-400 border px-2 text-launchfast">Pay once</span>,
          <span className="animate-fade-400 whitespace-nowrap bg-astro px-2 font-bold text-white shadow-2xl">use forever</span>
        </p>
        <p className="mt-3 text-xl text-gray-600">
          LaunchFa.st Astro, Next.js and SvelteKit Boilerplates are each a one-time purchase. You get *all* the good things in a single purchase.{' '}
          <span className="text-black">Buy the bundle</span>
          to get all in one!
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 rounded border p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pricingFeatures.map((i) => (
            <div key={i} className="flex flex-row items-center gap-x-3">
              <svg
                width="20"
                height="20"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"> </polyline>
              </svg>
              <span>{i}</span>
            </div>
          ))}
          <div className="flex flex-row items-center gap-x-3">
            <svg
              width="20"
              height="20"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
            <span className="underline">And many, many more</span>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex max-w-max flex-col border p-8">
            <p className="text-4xl font-semibold tracking-tighter lg:text-5xl">
              <span className="text-launchfast/50 line-through">198$</span>
              <span className="ml-2 text-launchfast">79$</span>
              <span className="ml-2 text-xs font-normal tracking-normal text-launchfast">/ forever</span>
            </p>
            <div className="mt-4 flex max-w-max -rotate-1 flex-row border px-2 text-xl">
              <span className="font-semibold text-black">NEXTCONF</span>&nbsp;(
              {/* <Redemption template="nextjs" />) */}
            </div>
            <div className="mt-8 flex flex-row items-center gap-x-3">
              <svg
                width="20"
                height="20"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"> </polyline>
              </svg>
              <span>All goodness as above</span>
            </div>
            <div className="mt-8 flex flex-row items-center gap-x-3">
              <svg
                width="20"
                height="20"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"> </polyline>
              </svg>
              <span>Next.js Boilerplate</span>
            </div>
            <form className="mt-8 shadow-2xl" method="post" action="/api/stripe/checkout">
              <input readOnly className="hidden" type="text" name="template" value="nextjs" />
              <button className="block max-w-max -rotate-1 rounded bg-black px-4 py-1 text-2xl font-medium text-white shadow hover:scale-[102.5%]">
                Get Next.js Boilerplate &rarr;
              </button>
            </form>
          </div>
          <div className="flex max-w-max flex-col border p-8">
            <p className="text-4xl font-semibold tracking-tighter lg:text-5xl">
              <span className="text-launchfast/50 line-through">198$</span>
              <span className="ml-2 text-launchfast">99$</span>
              <span className="ml-2 text-xs font-normal tracking-normal text-launchfast">/ forever</span>
            </p>
            <div className="mt-4 flex max-w-max -rotate-1 flex-row border px-2 text-xl">
              <span className="font-semibold text-svelte">SVELTE30</span>&nbsp;(
              {/* <Redemption template="sveltekit" />) */}
            </div>
            <div className="mt-8 flex flex-row items-center gap-x-3">
              <svg
                width="20"
                height="20"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"> </polyline>
              </svg>
              <span>All goodness as above</span>
            </div>
            <div className="mt-8 flex flex-row items-center gap-x-3">
              <svg
                width="20"
                height="20"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"> </polyline>
              </svg>
              <span>SvelteKit Boilerplate</span>
            </div>
            <form className="mt-8 shadow-2xl" method="post" action="/api/stripe/checkout">
              <input readOnly className="hidden" type="text" name="template" value="sveltekit" />
              <button className="block max-w-max -rotate-1 rounded bg-svelte px-4 py-1 text-2xl font-medium text-white shadow hover:scale-[102.5%]">
                Get Svelte Boilerplate &rarr;
              </button>
            </form>
          </div>
          <div className="flex max-w-max flex-col border p-8">
            <p className="text-4xl font-semibold tracking-tighter lg:text-5xl">
              <span className="text-launchfast/50 line-through">150$</span>
              <span className="ml-2 text-launchfast">75$</span>
              <span className="ml-2 text-xs font-normal tracking-normal text-launchfast">/ forever</span>
            </p>
            <div className="mt-4 flex max-w-max -rotate-1 flex-row border px-2 text-xl">
              <span className="font-semibold text-astro">ASTROLAUNCH</span>&nbsp;(
              {/* <Redemption template="astro" />) */}
            </div>
            <div className="mt-8 flex flex-row items-center gap-x-3">
              <svg
                width="20"
                height="20"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"> </polyline>
              </svg>
              <span>All goodness as above</span>
            </div>
            <div className="mt-8 flex flex-row items-center gap-x-3">
              <svg
                width="20"
                height="20"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Astro Boilerplate</span>
            </div>
            <form className="mt-8 shadow-2xl" method="post" action="/api/stripe/checkout">
              <input readOnly className="hidden" type="text" name="template" value="astro" />
              <button className="block max-w-max -rotate-1 rounded bg-astro px-4 py-1 text-2xl font-medium text-white shadow hover:scale-[102.5%]">
                Get Astro Boilerplate &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
