 import { useEffect, useState } from "react";
import './App.css'
import SearchBar from './Components/SearchBar';
import CountryList from './Components/CountryList';

function App(){

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try{
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region"
      );

      if(!res.ok){
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setCountries(data);
      setFilteredCountries(data);

    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    const result = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(result);
  };

  return(
    <div className='text-center p-10 bg-gray-500 max-auto mx-auto min-h-screen'>

      <h1 className="text-4xl font-bold mb-6">
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading countries</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <CountryList countries={filteredCountries} />
      )}

    </div>
  )
}

export default App;