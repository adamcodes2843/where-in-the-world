import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps{
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header ({setDarkMode, darkMode}: HeaderProps) {
    
    return (
        <nav className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white border-b-2'} h-20 w-full flex justify-between items-center px-6 md:px-12 lg:px-20`}>
            <h1 className="font-extrabold text-sm md:text-base lg:text-2xl">Where in the world?</h1>
            <button type="button" onClick={() => setDarkMode(!darkMode)} className="font-semibold text-xs lg:text-base">
                <FontAwesomeIcon icon={faMoon} className="mx-2" />
                Dark Mode
            </button>
        </nav>
    )
}