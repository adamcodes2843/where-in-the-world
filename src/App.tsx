import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import Country from './pages/Country'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className={`${darkMode ? 'bg-[rgb(32,44,55)] text-white' : 'bg-[rgb(250,250,250)] text-[rgb(17,21,23)]'} font-nunitoSans w-full min-h-screen`}>
      <Router>
        <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="country/:countryName" element={<Country darkMode={darkMode} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
