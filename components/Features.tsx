import React from 'react'
import Divider from './Divider'
import { slug } from 'github-slugger'
import features from '@/lib/data/features'

const Features = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-24">
      <div className="flex flex-col text-left">
        <p className="text-3xl font-extrabold text-launchfast sm:text-4xl">Your Time-Saving Web Development Boilerplate</p>
        <p className="mt-3 font-medium text-gray-600 md:text-lg">
          Save time using countless integrations, API Routes, and components to send emails, login users, protect routes, track user events, accept payments worldwide, let user
          upload files, capture waitlists, start supporting customers and more!
        </p>
      </div>
      {features.map((feature, index) => (
        <div key={index}>
          {index !== 0 && <Divider className="my-0 border-gray-100/10 py-0" />}
          <a href={`#${slug(feature.heading)}`} id={slug(feature.heading)} className="mt-4 flex flex-col text-left">
            <span className="max-w-max rounded border-b border-l border-launchfast px-2 text-xl font-medium text-gray-600 shadow-sm shadow-launchfast duration-200 hover:scale-[101%]">
              {feature.heading}
            </span>
            <span className="mt-3 font-medium text-gray-600 md:text-lg">{feature.tagline}</span>
          </a>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {feature.products.map((benefit, benefitIndex) => (
              <div key={benefitIndex} className="flex flex-col rounded bg-white p-5">
                <img alt={benefit.name} className="h-[30px] w-[30px] bg-white" loading="lazy" width="30" height="30" src={benefit.logo} />
                <span className="mt-3 font-bold text-launchfast">{benefit.name}</span>
                {benefit.description && <span className="mt-3">{benefit.description}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Features
