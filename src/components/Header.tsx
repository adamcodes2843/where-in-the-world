import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps{
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header ({setDarkMode, darkMode}: HeaderProps) {
    console.log(darkMode)
    return (
        <nav className="h-20 w-full flex justify-between items-center px-4 bg-white border-b-2">
            <h1 className="font-extrabold text-2xl"><Link to="/">Where in the world?</Link></h1>
            <button type="button" onClick={() => setDarkMode(!darkMode)} className="font-semibold">
                <FontAwesomeIcon icon={faMoon} className="mx-2" />
                Dark Mode
            </button>
        </nav>
    )
}