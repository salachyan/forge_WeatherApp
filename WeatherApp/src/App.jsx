import { useState } from 'react'
import WeatherApp from "./components/WeatherApp"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <WeatherApp> </WeatherApp>
  </>
)}

export default App
