import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import data from '../data.json'
import Card from "../components/Card"

export default function Home () {
    const [text, setText] = useState('')
    const [openFilter, setOpenFilter] = useState(false)
    const [regionChoice, setRegionChoice] = useState('')
    const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']
    
    let countryIndexArray: number[] = []

    const handleRegion = (region: string) => {
        setOpenFilter(false)
        setRegionChoice(region)
    }
    
    const eightRandomCountries = () => {
        let count = 6;
        while (count >= 1) {
            countryIndexArray = [...countryIndexArray, (Math.floor(Math.random() * 250))]
            count--
        }
    }
    eightRandomCountries()
    console.log(data[100])
    return (
        <main className="m-6">
            <section className="flex flex-col justify-between items-start gap-8">
            <input type="text" value={text} placeholder="Search for a country..." onChange={(e) => setText(e.target.value)} className="text-xs w-full px-8 py-4 h-12 rounded-lg shadow" />
            <div className="relative text-xs">
                <button type="button" onClick={() => setOpenFilter(!openFilter)} className="bg-white rounded-lg shadow h-12 w-[200px] flex justify-between items-center px-6">
                    Filter by Region
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
                <div className={`${openFilter ? 'absolute top-full left-0' : 'hidden'} w-[200px] px-6 py-4 gap-2 flex flex-col items-start bg-white mt-2 rounded-lg shadow`}>
                    {regions.map((region) => (
                        <button key={Math.random()} type="button" onClick={() => handleRegion(region)}>
                            {region}
                        </button>
                    ))}
                </div>
            </div>
            </section>
            <section>
                <ul>
                    {countryIndexArray.map((index) => (
                        <li key={Math.random()}>
                            <Card 
                                flag={data[index].flag}
                                name={data[index].name}
                                population={data[index].population}
                                region={data[index].region}
                                capital={data[index].capital}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}