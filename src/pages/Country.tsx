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
    let currencies = country?.currencies?.map((x) => x.name).join(', ')
    let languages = country?.languages?.map((x) => x.name).join(', ')
    let borderArray = country?.borders

    let borderers = () => {
        let borderCountries = data.filter((country) => (
           borderArray?.includes(country.alpha3Code))
        ).map((country) => (country.name))
        return borderCountries
    }

    return (
        <main className="mx-6 pt-6 lg:mx-20 text-sm md:text-base font-light">
            <Link to={'/'} className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} rounded shadow font-light flex justify-center items-center w-[104px] lg:w-[136px] h-8 lg:h-10 mt-2 mb-12 lg:mt-16 lg:mb-24`}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-4" />
                Back
            </Link>
            <div className="flex flex-col lg:flex-row lg:my-12 lg:gap-24 lg:w-full gap-10">
                <img src={country.flags.png} alt="country flag" className="rounded-lg max-w-[560px] max-h-[401px] lg:w-1/2" />
                <div className="flex flex-col gap-8 lg:w-1/2 lg:justify-center">
                    <h2 className="font-extrabold text-[22px] lg:text-[32px] leading-10">{country.name.replace(/ *\([^)]*\) */g, "")}</h2>
                    <div className="flex flex-col lg:flex-row gap-8">
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
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3 lg:mt-6">
                        <h3 className="text-base font-semibold">Border Countries:</h3>
                        <div className="flex flex-wrap gap-2 my-2">
                            {borderers().map((borderCountry) => (
                                <Link to={'/country/' + borderCountry} key={Math.random()} className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} rounded-lg shadow px-6 py-2 text-sm`}>{borderCountry}</Link>
                            )).splice(0,6)}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}