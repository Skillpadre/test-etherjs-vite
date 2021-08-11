import React, { useState } from 'react'
import './App.css'
import WindowConnection from './utils/WindowConnection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <WindowConnection />
      {/* <div className={"normal-page"}>
        <h1>Normal Page</h1>
      </div> */}
    </div>
  )
}

export default App
