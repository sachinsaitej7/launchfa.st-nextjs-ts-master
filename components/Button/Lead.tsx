import React from 'react'

const ButtonLead = () => {
  const handleSubmit = (event: any) => {
    // You can add your form submission logic here
    // For example, sending the email to your API
    event.preventDefault()
    const email = event.target.email.value
    // Your form submission logic goes here
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-3">
      <input
        required
        name="email"
        type="email"
        placeholder="jain71000@gmail.com"
        className="w-[200px] rounded-md border py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
      />
      <button
        type="submit"
        className="w-[200px] appearance-none rounded border border-opacity-0 bg-launchfast px-3 py-1 text-white transition duration-300 hover:border-launchfast hover:border-opacity-100 hover:bg-white hover:text-launchfast hover:shadow-2xl"
      >
        Join Waitlist &rarr;
      </button>
    </form>
  )
}

export default ButtonLead
