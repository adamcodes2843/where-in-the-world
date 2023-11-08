import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import data from '../data.json'
import Card from "../components/Card"

export interface darkType {
    darkMode: boolean
}

export default function Home ({darkMode}:darkType) {
    const [text, setText] = useState('')
    const [openFilter, setOpenFilter] = useState(false)
    const [regionChoice, setRegionChoice] = useState('')
    const [indexArray, setIndexArray] = useState<number[]>([])
    const [countryList, setCountryList] = useState(data)
    const [warningMessage, setWarningMessage] = useState('')

    const  inputRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate();

    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    useEffect(() => {
        eightRandomCountries()
    }, [countryList])

    const handleRegion = (region: string) => {
        setText('')
        setWarningMessage('')
        setOpenFilter(false)
        setRegionChoice(region)
        setCountryList(data.filter((country) => country.region === region))
    }
    
    const eightRandomCountries = () => {
        let range = countryList.length;
        let countryIndexArray: number[] = [];
        let count = 8;
        while (count >= 1) {
            let randomNumber = (Math.floor(Math.random() * range))
            if (countryIndexArray.includes(randomNumber)) {
                continue
            } else {
                countryIndexArray = [...countryIndexArray, randomNumber]
                count--
            }
        }
        setIndexArray(countryIndexArray)
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            magnifyingGlassClick()
        } else {
            if (warningMessage) {
                setWarningMessage('')
            }
        }
    }
    const magnifyingGlassClick = () => {
        if (text) {
            let textCheck = data.filter((country) => country.name.slice(0, text.length).toLowerCase() == text)
            if (textCheck.length ===  1) {
                let a3Code = textCheck[0].alpha3Code;
                navigate(`/country/${a3Code}`)
            } else if (textCheck.length > 1) {
                setWarningMessage("More than one country matches the search...")
            } else {
                setWarningMessage("No country matches the search...")
            }
        } else {
            inputRef.current!.focus()
        }
    }
    
    return (
        <main className="mx-6 md:mx-12 lg:mx-20 pb-12">
            <section className="flex flex-col md:flex-row justify-between items-start gap-8 mt-6 lg:my-12">
                <div className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} flex items-center h-12 lg:h-14 rounded-lg shadow w-full md:w-[480px] relative`}>
                    <button type="button" onClick={() => magnifyingGlassClick()} className="px-6 md:px-8"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    <input ref={inputRef} type="text" value={text} placeholder="Search for a country..." onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} text-xs w-full py-4 hover:cursor-pointer focus:outline-none rounded-r-lg`} />
                    <p className={`${!warningMessage ? 'hidden' : 'absolute top-full left-0 mt-1 md:mt-2 text-red-600 w-full ml-1 md:ml-0 md:text-center text-sm'}`}>{warningMessage}</p>
                </div>
                <div className="relative text-xs">
                    <button type="button" onClick={() => setOpenFilter(!openFilter)} className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} rounded-lg shadow h-12 lg:h-14 w-[200px] flex justify-between items-center px-6`}>
                        {regionChoice && !text ? regionChoice : 'Filter by Region'}
                        <FontAwesomeIcon icon={faAngleDown} className={`${openFilter && 'rotate-180'}`} />
                    </button>
                    <div className={`${openFilter ? 'absolute top-full left-0' : 'hidden'} w-[200px] px-6 py-4 gap-2 flex flex-col items-start ${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white '} mt-2 rounded-lg shadow cursor-pointer w-full`}>
                    {regions.map((region) => (
                        <button key={Math.random()} type="button" onClick={() => handleRegion(String(region))}>
                            {region}
                        </button>
                    ))}
                    </div>
                </div>
            </section>
            <section className="">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-y-12 lg:gap-x-6 2xl:gap-20 mt-12 mx-auto">
                    {text.length < 1 ? countryList.map((country, i) => (
                        indexArray.includes(i) &&
                        <li key={Math.random()} className="w-[264px] mx-auto rounded-b-lg shadow">
                            <Card 
                                flag={country.flags.png}
                                name={country.name}
                                population={country.population}
                                region={country.region}
                                capital={country.capital}
                                code={country.alpha3Code}
                                darkMode={darkMode}
                            />
                        </li>
                    ))
                    : data.filter((country) => country.name.toLowerCase().slice(0,text.length) === text.toLowerCase()).map((country) => (
                        <li key={Math.random()} className="w-[264px] mx-auto rounded-b-lg shadow">
                            <Card 
                                flag={country.flags.png}
                                name={country.name}
                                population={country.population}
                                region={country.region}
                                capital={country.capital}
                                code={country.alpha3Code}
                                darkMode={darkMode}
                            />
                        </li>
                    )).slice(0,8)
                    }
                </ul>
            </section>
        </main>
    )
}