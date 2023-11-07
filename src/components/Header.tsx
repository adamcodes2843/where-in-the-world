import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps{
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header ({setDarkMode, darkMode}: HeaderProps) {
    
    return (
        <nav className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white border-b-2'} h-20 w-full flex justify-between items-center px-6 `}>
            <h1 className="font-extrabold text-sm"><Link to="/">Where in the world?</Link></h1>
            <button type="button" onClick={() => setDarkMode(!darkMode)} className="font-semibold text-xs">
                <FontAwesomeIcon icon={faMoon} className="mx-2" />
                Dark Mode
            </button>
        </nav>
    )
}