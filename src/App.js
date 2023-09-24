// 1. Import *useState* and *useEffect*
import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 2. Create our *quote* variable as well as the *setQuote* function via useState
  // We're setting the default value of quote to null, so that while we wait for the fetch to complete, we dont attempt to render the text
  let [quote, setQuote] = useState({ text: null, author: null })

  useEffect(() => {
    // Call getData() separately because useEffect() (the first argument) cannot be made an async function.
    getData()
  }, [])

  async function getData() {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      )
      const data = await response.json()
      const randomNum = getRandomOf(data.quotes.length)
      // Choose random quote object
      const dataItem = data.quotes[randomNum]
      // Set quote
      setQuote({ text: dataItem.quote, author: dataItem.author })
    } catch (error) {
      console.error(error)
    }
  }
  // Generate random number helper function
  function getRandomOf(number) {
    return Math.round(Math.random() * number)
  }

  function handleClick() {
    getData()
  }

  return (
    <div id="quote-box" className="w-96 h-72 bg-[#F8F8FF] p-4 rounded-lg">
      <div id="text" className="grid place-items-center text-center	overflow-hidden h-4/6">
        {quote.text}
      </div>
      <div id="author" className="h-1/6 text-right">
        {`- ${quote.author}`}
      </div>

      <div className="grid grid-flow-col gap-52 h-1/6">
        <button
          id="tweet-quote"
          class="bg-gray-500 opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded w-14 grid place-items-center"
        >
          {/* Twitter Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </button>
        <button
          onClick={handleClick}
          id="new-quote"
          className="bg-gray-500 opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded w-20"
        >
          More!
        </button>
      </div>
    </div>
  )
}

export default App

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://react.dev/learn/state-a-components-memory
// https://www.freecodecamp.org/news/fetch-data-react/
// https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
// https://rapidapi.com/guides/fetch-api-react
// https://legacy.reactjs.org/docs/hooks-effect.html
