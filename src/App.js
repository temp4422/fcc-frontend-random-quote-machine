// 1. Import *useState* and *useEffect*
import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 2. Create our *quoteText* variable as well as the *setQuote* function via useState
  // We're setting the default value of quoteText to null, so that while we wait for the fetch to complete, we dont attempt to render the text
  let [quoteText, setQuote] = useState(null)

  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    )
      .then((response) => response.json())
      // 4. Setting *quote* to the quote url that we received from the response above
      .then((data) => {
        setQuote(data.quotes[0].quote)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div id="quote-box" className="w-96 h-72 bg-red-100 p-4 rounded-lg">
      <div id="text" className="h-4/6">
        {quoteText}
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
