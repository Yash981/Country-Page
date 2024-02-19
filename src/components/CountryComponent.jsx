import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';

const CountryComponent = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);

    const param = useParams();
    useEffect(() => {
    
    // console.log(param);
    }, []);
    useEffect(() => {
        async function getCountries() {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const data = await res.json();
                setCountries(
                    data.filter((country) => country.name.common !== "Antarctica")
                );
                setLoading(false);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        }
        getCountries();
    }, []);

    useEffect(() => {
        function setCountryByName() {
            try {
                const newCountry = countries.find(country => country.name.common.toLowerCase() === param.name.toLowerCase());
                // console.log(newCountry);
                setCountry(newCountry);
            } catch (error) {
                console.error('Error setting country name:', error);
            }
        }
        if (!loading) { // Only set country when data is available
            setCountryByName();
        }

    }, [countries, loading, param.name]);


    function getNeighbours() {
        if (!loading && country.borders && country.borders.length > 0) {
            return country.borders.map((border) => {
                return countries.filter((country) => country.cca3 === border)[0];
            });
        }
        return []
    }
    function getCurrencyName(country){
        if(!loading && country && country.currencies){
            const currencyCode =  Object.keys(country.currencies)[0]
            return country.currencies[currencyCode].name
        }
    }
    return (
        <>
            {loading ? (<p>Loading...</p>) : (<main className="lg:w-[55%] md:w-[80%] sm:w-[100%] bg-[#1a1c1e] flex mx-auto flex-col border border-[#272a2f] px-10 py-5 rounded-xl shadow-lg">
                <div className="country max-h-48 max-w-60 object-contain translate-x-52 -translate-y-16 " >
                    {country && country.flags && <img src={country.flags.svg} className="rounded-xl" alt="hello"></img>}
                    {country && country.name && <h1 className="text-3xl text-[#fff] text-center mt-5">{country.name.common}</h1>}
                    {country && country.name && <p className="text-[#fff] text-center">{country.name.official}</p>}
                </div>
                <div className="population Area flex  ">
                    <div className="population flex gap-2 bg-[#282B30] rounded-xl w-fit p-4 mt-5 mx-auto">
                        <p className="text-[#fff] text-sm px-2">Population</p>
                        <div className="custom-divider h-auto w-[1px] bg-[#1B1D1F]"></div>
                        {country && country.population && <p className="text-[#fff] px-2">{country.population.toLocaleString()}</p>}
                    </div>
                    <div className="area flex gap-2 bg-[#282B30] rounded-xl w-fit p-4 mt-5 mx-auto">
                        <p className="text-[#fff] text-sm px-2">Area (km<sup>2</sup>)</p>
                        <div className="custom-divider h-auto w-[1px] bg-[#1B1D1F]"></div>
                        {country && country.area && <p className="text-[#fff] px-2">{country.area.toLocaleString()}</p>}
                    </div>
                </div>
                <hr className="w-[calc(100%+80px)] -ml-10 mt-10 border-[#272a2f]" />
                <div className="capital flex w-full justify-between mt-5">
                    <span className="text-[#6C727F] text-sm">Capital</span>
                    {country && country.capital && <p className="text-[#fff]">{country.capital}</p>}
                </div>
                <hr className="w-[calc(100%+80px)] -ml-10 mt-10 border-[#272a2f]" />
                <div className="capital flex w-full justify-between mt-5">
                    <span className="text-[#6C727F] text-sm">Subregion</span>
                    {country && country.subregion && <p className="text-[#fff]">{country.subregion}</p>}
                </div>
                <hr className="w-[calc(100%+80px)] -ml-10 mt-10 border-[#272a2f]" />
                <div className="capital flex w-full justify-between mt-5">
                    <span className="text-[#6C727F] text-sm">Subregion</span>
                    {country && country.subregion && <p className="text-[#fff]">{country.subregion}</p>}
                </div>
                <hr className="w-[calc(100%+80px)] -ml-10 mt-10 border-[#272a2f]" />
                <div className="capital flex w-full justify-between mt-5">
                    <span className="text-[#6C727F] text-sm">Language</span>
                    {country && country.languages && <p className="text-[#fff]">{Object.values(country.languages).join(', ')}</p>}
                </div>
                <hr className="w-[calc(100%+80px)] -ml-10 mt-10 border-[#272a2f]" />
                <div className="capital flex w-full justify-between mt-5">
                    <span className="text-[#6C727F] text-sm">Currencies</span>
                    {country && country.currencies && <p className="text-[#fff]">{getCurrencyName(country)}</p>}
                </div>
                <hr className="w-[calc(100%+80px)] -ml-10 mt-10 border-[#272a2f]" />
                <div className="capital flex w-full justify-between mt-5">
                    <span className="text-[#6C727F] text-sm">Continents</span>
                    {country && country.continents && <p className="text-[#fff]">{country.continents}</p>}
                </div>
                <hr className="w-[calc(100%+80px)] -ml-10 mt-10 border-[#272a2f]" />

                <span className="text-[#6C727F] text-sm mt-5">Neighbouring Countries</span>
                <div className="grid  mt-5 grid-cols-5 gap-5">
                    {getNeighbours().map((country, index) => <img src={country.flags.svg} key={index} alt="neighbour flag" className="  rounded-xl max-w-28 max-h-16 mt-2" />)}
                </div>

            </main>)}
        </>
    );
}

export default CountryComponent;

CountryComponent.propTypes = {
    countries: PropTypes.array.isRequired,

};