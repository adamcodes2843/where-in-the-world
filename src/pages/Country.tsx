import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import data from '../data.json'
import { darkType } from "./Home"

export default function Country ({darkMode}:darkType) {
    let {countryName} = useParams()
    let findCountry = data.filter((country) => country.name === countryName)
    let country = findCountry[0]
    console.log(country)
    let currencies = country?.currencies?.map((x) => x.name)
    let languages = country?.languages?.map((x) => x.name)
    let borderArray = country?.borders

    let borderers = () => {
        let borderCountries = data.filter((country) => (
           borderArray?.includes(country.alpha3Code))
        ).map((country) => (country.name))
        return borderCountries
    }
    console.log(borderers())
    return (
        <main className="m-6 text-sm md:text-base font-light">
            <Link to={'/'} className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} rounded shadow font-light flex justify-center items-center w-[104px] h-8`}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-4" />
                Back
            </Link>
            <div className="flex flex-col my-12 gap-10">
                <img src={country.flags.png} alt="country flag" className="rounded-lg" />
                <div className="flex flex-col gap-8">
                    <h2 className="font-extrabold text-[22px]">{country.name}</h2>
                    <ul className="flex flex-col gap-2">
                        <li><span className="font-semibold">Native Name: </span>{country.nativeName}</li>
                        <li><span className="font-semibold">Population: </span>{country.population.toLocaleString()}</li>
                        <li><span className="font-semibold">Region: </span>{country.region}</li>
                        <li><span className="font-semibold">Sub Region: </span>{country.subregion}</li>
                        <li><span className="font-semibold">Capital: </span>{country.capital}</li>
                    </ul>
                    <ul className="flex flex-col gap-2">
                        <li><span className="font-semibold">Top Level Domain: </span>{country.topLevelDomain}</li>
                        <li><span className="font-semibold">Currencies: </span>{currencies}</li>
                        <li><span className="font-semibold">Languages: </span>{languages}</li>
                    </ul>
                    <div>
                        <h3 className="text-base font-semibold">Border Countries:</h3>
                        <ul className="flex flex-wrap gap-2 my-2">
                            {borderers().map((borderCountry) => (
                                <li key={Math.random()} className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} px-8 py-2 rounded-lg shadow`}>
                                    <Link to={'/country/' + borderCountry}>{borderCountry}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}