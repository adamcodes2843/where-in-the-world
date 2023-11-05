import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import Country from './pages/Country'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="font-nunitoSans w-full bg-[rgb(250,250,250)] h-screen">
      <Router>
        <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="country/:id" element={<Country />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
