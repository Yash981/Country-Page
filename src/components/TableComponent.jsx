
import { Suspense, useEffect } from 'react'
import Search from '/Search.svg'
import { useState } from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'
export default function TableComponent({ Countries }) {
    const tableCellStyles = {
        paddingTop:'1rem',
        paddingBottom:'1rem',
        
    }
    // console.log(Countries)
    const [filteredcountries, setfilteredcountries] = useState(Countries)


    const [searchTerm, setSearchTerm] = useState("")
    const [formData, setFormData] = useState({
        americas: true,
        asia: true,
        europe: true,
        africa: true,
        oceania: true,
        antarctica: true,
        un: false,
        independent: false
    })
    const [sorty, setSorty] = useState('population')

    const updateFormData = (e) => {
        if (e.target.type !== 'checkbox') {
            setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        }
        else {
            setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.checked }));
        }
    }
    
    function sortCountries(countries) {
        if (sorty === 'name') {
            return countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
        } else if (sorty === 'population') {
            return countries.sort((a, b) => b.population - a.population)
        } else if (sorty === 'area') {
            return countries.sort((a, b) => b.area - a.area)
        } else {
            throw new Error('Invalid sort type');
        }
    }



    useEffect(() => {
        function filterCountries() {
            const filters = []
            for (const [key, value] of Object.entries(formData)) {
                        if (value === true) filters.push(key);
            }
    
            let newFilteredCountries = Countries.filter(country => {
                if (filters.includes("un") || filters.includes("independent")) {
                    return true;
                }
                return filters.includes(country.region.toLowerCase());
            });
            

            if (filters.includes("un")) {
                newFilteredCountries = newFilteredCountries.filter(country => country.unMember);
            }
    
            if (filters.includes("independent")) {
                newFilteredCountries = newFilteredCountries.filter(country => country.independent);
            }
    

            newFilteredCountries = newFilteredCountries.filter(country =>
                country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            );
    
            setfilteredcountries(newFilteredCountries);
        }
        filterCountries();
    }, [Countries, formData, searchTerm]);

    // console.log(Countries.length)
    return (
        <>
            <div className="md:w-[90%] max-sm:w-[100%] max-sm:rounded-none bg-[#1a1c1e] flex  mx-auto flex-col border border-[#272a2f] px-10 py-5 md:rounded-xl sm:justify-around ">
                <div className="form_header flex justify-between   w-full md:px-10 py-5 flex-1 pl-2 sm:pr-[0.5rem] sm:gap-24">
                    <h1 className='flex flex-0.5 text-[#6C727F] items-center'>Found {Countries.length} Countries</h1>
                    <div className="search_Input flex   bg-[#272a2f] font-medium md:flex-[0.4] sm:flex-[1] rounded-xl">
                        <img src={Search} alt="search" className='px-2 pr-0' />
                        <input type="text" placeholder="Search By Name,Region,Subregion" className='outline-none w-full  bg-[#272a2f] text-[#6C727F] px-2 py-3 rounded-xl' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                <main className="sidebar_table md:flex md:w-full md:flex-1   md:flex-row sm:flex-col">
                    <section className="form_sidebar flex  gap-5 flex-col w-full md:w-1/4">
                        <div className="sorty ">
                            <label id='sortBy ' htmlFor='sortyBy' className='flex flex-col text-[#6C727F] font-medium gap-2 '>Sort By
                                <select name="sortBy" id="sortBy" className=' bg-transparent border border-[#272a2f] outline-none text-[#D2D5DA] rounded-lg p-2  appearance-none bg-[url(Expand_down.svg)] bg-no-repeat bg-right pr-10 mr-4 '
                                    onChange={(e) => setSorty(e.target.value)}>
                                    <option value="population" className='text-[#6C727F]'>population</option>
                                    <option value="name" className='text-[#6C727F]'>Name</option>
                                    <option value="area" className='text-[#6C727F]'>Area</option>
                                </select>
                            </label>
                        </div>
                        <div className="regiony flex md:flex-col gap-2 sm:flex-row sm:flex-wrap">
                            <legend id='region' className='text-[#6C727F]   sm:w-full'>Region</legend>
                            <div className="flex gap-2">
                                <label htmlFor="americas" className={`rounded-full cursor-pointer relative text-md px-2 py-1  ${formData.americas?'bg-[#272a2f] text-[#d2d5da]':'bg-transparent text-[#6c727f]'}`}>America
                                    <input type="checkbox" checked={formData.americas} name="americas" id="americas"
                                        className='absolute top-1/2 left-1/2 opacity-0 -translate-x-1/2 -translate-y-1/2 ' onChange={(e) => updateFormData(e)} />
                                </label>
                                <label htmlFor="asia"  className={`rounded-full cursor-pointer relative text-md px-2 py-1  bg-[#272a2f] text-[#d2d5da] ${formData.asia?'bg-[#272a2f] text-[#d2d5da]':'bg-transparent text-[#6c727f]'}`}>Asia
                                    <input type="checkbox" checked={formData.asia} name="asia" id="asia" className='absolute top-1/2 left-1/2 opacity-0 -translate-x-1/2 -translate-y-1/2  ' onChange={(e) => updateFormData(e)} />
                                </label>
                            </div>
                            <div className="flex gap-2 md:flex-wrap lg:flex-nowrap">
                                <label htmlFor="antarctica" className={`rounded-full cursor-pointer relative text-md px-2 py-1  ${formData.antarctica?'bg-[#272a2f] text-[#d2d5da]':'bg-transparent text-[#6c727f]'}`}>Antarctica
                                    <input type="checkbox" checked={formData.antarctica} name="antarctica" id="antarctica" className='absolute top-1/2 left-1/2 opacity-0 -translate-x-1/2 -translate-y-1/2 ' onChange={(e) => updateFormData(e)} />
                                </label>
                                <label htmlFor="africa" className={`rounded-full cursor-pointer relative text-md px-2 py-1   ${formData.africa?'bg-[#272a2f] text-[#d2d5da]':'bg-transparent text-[#6c727f]'}`}>Africa
                                    <input type="checkbox" checked={formData.africa} name="africa" id="africa" className='absolute top-1/2 left-1/2 opacity-0 -translate-x-1/2 -translate-y-1/2 ' onChange={(e) => updateFormData(e)} />
                                </label>
                                <label htmlFor="europe" className={`rounded-full cursor-pointer relative text-md px-2 py-1   ${formData.europe?'bg-[#272a2f] text-[#d2d5da]':'bg-transparent text-[#6c727f]'}`}>Europe
                                    <input type="checkbox" checked={formData.europe} name="europe" id="europe" className='absolute top-1/2 left-1/2 opacity-0 -translate-x-1/2 -translate-y-1/2 ' onChange={(e) => updateFormData(e)} />
                                </label>
                            </div>
                            <div className="flex gap-2">
                                <label htmlFor="oceania" className={`rounded-full cursor-pointer relative text-md px-2 py-1   ${formData.oceania?'bg-[#272a2f] text-[#d2d5da]':'bg-transparent text-[#6c727f]'}`}>Oceania
                                    <input type="checkbox" checked={formData.oceania} name="oceania" id="oceania" className='absolute top-1/2 left-1/2 opacity-0 -translate-x-1/2 -translate-y-1/2 ' onChange={(e) => updateFormData(e)} />
                                </label>
                            </div>

                        </div>
                        <div className="statusy flex flex-col gap-2 sm:mb-5">
                            <legend className='text-[#6C727F]'>status</legend>
                            <label htmlFor="un" className='text-[#d2d5da] flex gap-3'>
                                <input type="checkbox" checked={formData.un} name="un" id="un" className='bg-transparent w-6 h-6 appearance-none border-[2px] border-[#6C727F] checked:bg-[url(./Done_round.svg)] bg-center checked:bg-[#4E80EE] rounded-[4px]' onChange={(e) => updateFormData(e)} />
                                Member of the United <br  className='sm:hidden md:block'/> Nations
                            </label>
                            <label htmlFor="independent" className='text-[#d2d5da] flex gap-3'>
                                <input type="checkbox" checked={formData.independent} name="independent" id="independent"
                                    className=' w-6 h-6 appearance-none bg-transparent border-[2px] border-[#6C727F] checked:bg-[url(./Done_round.svg)] bg-center checked:bg-[#4E80EE] rounded-[4px]' onChange={(e) => updateFormData(e)} />
                                Independent
                            </label>
                        </div>
                    </section>

                    <Suspense fallback={<ContentLoader />}>
                    <table className='table-fixed border-collapse w-full  '>
                        <thead className=''>
                            <tr className='table-row '>
                                <th className='text-[#6C727F]  table-cell border-b-[0.3px] border-b-[#6C727F] pb-2'>Flag</th>
                                <th className='text-[#6C727F] table-cell border-b-[0.5px] border-b-[#6C727F] pb-2'>Name</th>
                                <th className='text-[#6C727F] table-cell border-b-[0.5px] border-b-[#6C727F] pb-2'>Population</th>
                                <th className='text-[#6C727F] table-cell border-b-[0.5px] border-b-[#6C727F] pb-2'>Area(km<sup>2</sup>)</th>
                                <th className=' text-[#6C727F] sm:hidden md:hidden lg:table-cell border-b-[0.5px] border-b-[#6C727F] mb-2 pb-2 '>Region</th>
                            </tr>
                        
                        </thead>
                        <div className="m-3"></div>
                        {/*  */}
                        <tbody className=''>
        
                            {filteredcountries && sortCountries(filteredcountries).map((country, idx) => {
                                return (
                                    <>
                                        <tr className='table-row my-2 align-middle ' key={idx} style={{textAlign:'center'}}>
                                            <td className=' grid place-items-center '><Link to={`/country/${country.name.common}`}><img src={country.flags.svg} alt="flag" className='max-w-[3rem] max-h-[2.5rem] '/></Link></td>
                                            <td className='text-[#d2d5da] table-cell' style={tableCellStyles}><Link to={`/country/${country.name.common}`}>{country.name.common}</Link></td>
                                            <td className='text-[#d2d5da] table-cell' style={tableCellStyles}>{country.population.toLocaleString()}</td>
                                            <td className='text-[#d2d5da] table-cell' style={tableCellStyles}>{country.area.toLocaleString()}</td>
                                            <td className='text-[#d2d5da] table-cell sm:hidden md:hidden lg:block' style={tableCellStyles}>{country.region}</td>
                                        </tr>
                                    </>
                                )
                            }
                            )}

                        </tbody>
                    </table>
                    </Suspense>
                </main>
            </div>
        </>

    )
}
TableComponent.propTypes = {
    Countries: PropTypes.array.isRequired,




}
