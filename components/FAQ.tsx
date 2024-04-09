import React from 'react'
import faqList from '@/lib/data/faqs'

interface FAQProps {
  faqs?: { question: string; answer: string }[]
}

const FAQ: React.FC<FAQProps> = ({ faqs = faqList }) => {
  return (
    <section id="faq">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-24">
        <div className="flex flex-col text-left">
          <p className="text-base-content text-3xl font-extrabold text-launchfast sm:text-4xl">Questions and Answers</p>
        </div>
        <ul className="basis-1/2">
          {faqs.map((i, _) => (
            <li key={_} className="group">
              <label
                className="border-base-content/10 relative flex w-full cursor-pointer items-center gap-2 border-t py-5 text-left text-base font-semibold md:text-lg"
                onClick={() => {
                  document.querySelector('#answer_' + _)?.classList.toggle('hidden')
                  document.querySelector('#icon-plus-' + _)?.classList.toggle('hidden')
                  document.querySelector('#icon-minus-' + _)?.classList.toggle('hidden')
                }}
              >
                <span className="text-base-content flex-1 font-medium">{i.question}</span>
                <svg id={`icon-minus-${_}`} className="ml-auto hidden h-4 w-4 flex-shrink-0 fill-current" viewBox="0 0 16 16" xmlns="https://www.w3.org/2000/svg">
                  <rect y="7" width="16" height="2" rx="1" className="origin-center rotate-180 transform transition duration-200 ease-out" />
                </svg>
                <svg id={`icon-plus-${_}`} className="ml-auto block h-4 w-4 flex-shrink-0 fill-current" viewBox="0 0 16 16" xmlns="https://www.w3.org/2000/svg">
                  <rect y="7" width="16" height="2" rx="1" className="false origin-center transform transition duration-200 ease-out" />
                  <rect y="7" width="16" height="2" rx="1" className="false origin-center rotate-90 transform transition duration-200 ease-out" />
                </svg>
              </label>
              <div id={`answer_${_}`} className="mb-5 hidden overflow-hidden whitespace-pre-line">
                {i.answer}
              </div>
            </li>
          ))}
          <div className="text-base-content/80 border-t pt-4">
            Got more? Send me a DM on&nbsp;
            <a className="text-base-content border-b border-launchfast" target="_blank" href="https://twitter.com/rishi_raj_jain_">
              Twitter
            </a>
            &nbsp;or by&nbsp;
            <a href="mailto:jain71000@gmail.com" target="_blank" className="text-base-content border-b border-launchfast">
              email
            </a>
            .
          </div>
        </ul>
      </div>
    </section>
  )
}

export default FAQ
