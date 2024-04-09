import FAQ from '@/components/FAQ'
import features from '@/lib/data/features'
import Divider from '@/components/Divider'
import Pricing from '@/components/Pricing'
import Features from '@/components/Features'

export default function Home() {
  return (
    <>
      <div className="relative mx-auto mt-12 flex max-w-[900px] flex-col items-center px-4 sm:mt-24 sm:px-8 xl:px-0">
        <div
          style={{ background: 'radial-gradient(white, #ffe8a930, white)' }}
          className="absolute left-1/2 top-1/3 -z-10 h-[300px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-[4deg] transform"
        ></div>
        <a href="https://www.producthunt.com/posts/launchfast/" target="_blank" className="flex flex-row items-center justify-center">
          <img
            height="54"
            width="250"
            loading="lazy"
            alt="LaunchFast Logo"
            className="rounded-lg bg-gray-100"
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=417262&theme=light"
          />
        </a>
        <h1 className="mt-6 text-center text-4xl font-extrabold leading-[3rem] md:text-5xl md:!leading-[4rem]">
          <span className="text-gray-600">Launch your apps&nbsp;</span>
          <span className="animate-fade-200 whitespace-nowrap border border-gray-800 px-1 text-gray-600">in hours</span>
          <span className="text-gray-600"> with these&nbsp;</span>
          <span className="animate-fade-400 whitespace-nowrap bg-astro px-2 text-white shadow-2xl">Astro</span>
          <span className="text-gray-600">,</span>
          <span className="animate-fade-400 whitespace-nowrap bg-black/75 px-2 text-white shadow-2xl">Next.js</span>
          <span className="text-gray-600"> and&nbsp;</span>
          <span className="animate-fade-400 whitespace-nowrap bg-svelte px-2 text-white shadow-2xl">SvelteKit</span>
          <span className="text-gray-600"> boilerplates</span>
        </h1>
        <p className="mt-4 animate-fade-600 text-center text-gray-400">Maximize Your Productivity with LaunchFa.st Templates</p>
        <p className="mt-2 max-w-xl animate-fade-600 text-center text-xl text-gray-600 md:text-2xl">
          <span className="text-black">SEO</span>, <span className="text-black">Analytics</span>, <span className="text-black">Storage</span>,{' '}
          <span className="text-black">Auth</span>,<span className="text-black"> Payments</span>, and <span className="text-black">Email</span> starter at your fingertips, in a
          click.
        </p>
        <div className="mt-12 flex flex-col flex-wrap items-center justify-center gap-y-8 sm:flex-row sm:items-start sm:gap-x-3 sm:gap-y-0">
          <a
            href="#pricing"
            className="w-[300px] rounded-lg bg-branding py-[0.7rem] text-center text-lg text-white shadow-2xl transition duration-200 hover:-rotate-1 hover:scale-105"
          >
            Get LaunchFast Boilerplates &rarr;
          </a>
          <a
            href="#features"
            className="w-[180px] rounded-lg border border-svelte py-3 text-center text-svelte transition duration-200 hover:-rotate-1 hover:bg-svelte hover:text-white"
          >
            Know More &rarr;
          </a>
        </div>
      </div>
      <Divider className="mt-12 border-gray-100/50" />
      <Features />
      <Divider className="mt-12 border-gray-100/50" />
      <Pricing pricingFeatures={[...features.map((i) => i.heading), 'Integrations on-demand', 'Priority Support']} />
      <Divider className="mt-12 border-gray-100/50" />
      <FAQ />
    </>
  )
}
