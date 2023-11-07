import { Link } from "react-router-dom"

interface cardProps {
    flag: string,
    name: string,
    population: number,
    region: string,
    capital: string | undefined,
    darkMode: boolean
}

const Card = ({flag, name, population, region, capital, darkMode}: cardProps) => {
  let countryName = name.replace(/ *\([^)]*\) */g, "")
  if (countryName === 'United Kingdom of Great Britain and Northern Ireland') {
    countryName = 'United Kingdom'
  }
  return (
    <Link to={'country/' + name}>
      <img src={flag} alt="country flag" className="rounded-t-lg h-[160px] w-full" />
      <div className={`${darkMode ? 'bg-[rgb(43,57,69)]' : 'bg-white'} flex flex-col items-start px-6 pb-10 pt-2 rounded-b-lg h-[176px]`}>
        <h2 className="font-extrabold text-lg py-4">{countryName}</h2>
        <div className="h-full">
          <p><span className="font-semibold">Population: </span>{population.toLocaleString()}</p>
          <p><span className="font-semibold">Region: </span>{region}</p>
          <p><span className="font-semibold">Capital: </span>{capital ? capital : 'N/A'}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card