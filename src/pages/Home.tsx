import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faAngleDown } from '@fortawesome/free-solid-svg-icons'
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
    const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

    useEffect(() => {
        eightRandomCountries()
    }, [])

    const handleRegion = (region: string) => {
        setOpenFilter(false)
        setRegionChoice(region)
    }
    
    const eightRandomCountries = () => {
        let countryIndexArray: number[] = []
        let count = 8;
        while (count >= 1) {
            countryIndexArray = [...countryIndexArray, (Math.floor(Math.random() * 250))]
            count--
        }
        setIndexArray(countryIndexArray)
    }
    
    return (
        <main className="mx-6 pb-12">
            <section className="flex flex-col justify-between items-start gap-8 mt-6">
            <input type="text" value={text} placeholder="Search for a country..." onChange={(e) => setText(e.target.value)} className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} text-xs w-full px-8 py-4 h-12 rounded-lg shadow`} />
            <div className="relative text-xs">
                <button type="button" onClick={() => setOpenFilter(!openFilter)} className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} rounded-lg shadow h-12 w-[200px] flex justify-between items-center px-6`}>
                    Filter by Region
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
                <div className={`${openFilter ? 'absolute top-full left-0' : 'hidden'} w-[200px] px-6 py-4 gap-2 flex flex-col items-start ${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white '} mt-2 rounded-lg shadow`}>
                    {regions.map((region) => (
                        <button key={Math.random()} type="button" onClick={() => handleRegion(region)}>
                            {region}
                        </button>
                    ))}
                </div>
            </div>
            </section>
            <section className="">
                <ul className="grid grid-cols-fluid gap-12 mt-12 p-6">
                    {indexArray.map((index) => (
                        <li key={Math.random()} className="w-[264px] mx-auto rounded-b-lg shadow">
                            <Card 
                                flag={data[index].flags.png}
                                name={data[index].name}
                                population={data[index].population}
                                region={data[index].region}
                                capital={data[index].capital}
                                darkMode={darkMode}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}