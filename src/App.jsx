import { useEffect, useState } from 'react'
import './App.css'
import CountryComponent from './components/CountryComponent'
import Header from './components/Header'
import TableComponent from './components/TableComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  const [Countries, setCOUNTRIES] = useState([]);


  useEffect(() => {
    
    async function getCountries() {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCOUNTRIES(
        data.filter((country) => country.name.common !== "Antarctica")
      );
    }
    getCountries();
  }, [Countries]);
  // console.log(Countries)
  // useEffect(()=>{
  //   // console.log(Countries)
  // },[])
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<TableComponent Countries={Countries} />} />
          <Route path="/country/:name" element={<CountryComponent />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
