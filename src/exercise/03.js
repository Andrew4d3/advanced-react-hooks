// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// 🐨 create your CountContext here with React.createContext
const CountContext = React.createContext()

// 🐨 create a CountProvider component here that does this:
const CountProviver = props => {
  //   🐨 get the count state and setCount updater with React.useState
  const [count, setCount] = React.useState(0)
  //   🐨 create a `value` array with count and setCount
  const value = [count, setCount]
  //   🐨 return your context provider with the value assigned to that array and forward all the other props
  //   💰 more specifically, we need the children prop forwarded to the context provider
  return <CountContext.Provider value={value} {...props} />
}

const useCountProvider = () => {
  const value = React.useContext(CountContext)

  if (!value) {
    throw new Error(
      'useCountProvider should be called from inside a CountProvider child',
    )
  }

  return value
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const [count] = useCountProvider()

  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const [, setCount] = useCountProvider()

  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      {/*
        🐨 wrap these two components in the CountProvider so they can access
        the CountContext value
      */}
      <CountProviver>
        <CountDisplay />
        <Counter />
      </CountProviver>
    </div>
  )
}

export default App
