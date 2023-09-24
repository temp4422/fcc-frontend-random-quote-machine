// 1. Import *useState* and *useEffect*
import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 2. Create our *quote* variable as well as the *setQuote* function via useState
  // We're setting the default value of quote to null, so that while we wait for the fetch to complete, we dont attempt to render the text
  let [quote, setQuote] = useState(null)

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

      // --- Generate random number with array.length
      function getRandomOf(number) {
        return Math.round(Math.random() * number)
      }
      const randomNum = getRandomOf(data.quotes.length)
      // --- End

      // Choose reandom quote
      const quote = data.quotes[randomNum].quote

      // Set quote
      setQuote(quote)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div id="quote-box" className="w-96 h-72 bg-red-100 p-4 rounded-lg">
      <div id="text" className="h-4/6">
        {quote}
      </div>
      <div id="author" className="h-1/6 bg-red-200">
        {/* {quoteAuthor} */}
      </div>

      <div className="bg-red-300 h-1/6">
        <button id="tweet-quote" className="bg-red-400">
          tweet-quote
        </button>
        <button id="new-quote" className="bg-red-500">
          new-quote
        </button>
      </div>
    </div>
  )
}

export default App

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://www.freecodecamp.org/news/fetch-data-react/
// https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
// https://rapidapi.com/guides/fetch-api-react
// https://legacy.reactjs.org/docs/hooks-effect.html
