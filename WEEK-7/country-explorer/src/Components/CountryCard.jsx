import {useState,useEffect} from "react"

function CountryCard({ country }) {
  return (
    <div className="bg-neutral-300 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4">
      
      <img
        src={country.flags.png}
        alt={country.name.common}
        className="w-full h-40 object-cover rounded-md"
      />

      <h3 className="text-xl font-bold mt-3">
        {country.name.common}
      </h3>

      <p className="text-gray-600 mt-1">
        <span className="font-semibold">Capital:</span> {country.capital?.[0] || "N/A"}
      </p>

      <p className="text-gray-600">
        <span className="font-semibold">Population:</span>{" "}
        {country.population.toLocaleString()}
      </p>

      <p className="text-gray-600">
        <span className="font-semibold">Region:</span> {country.region}
      </p>

    </div>
  );
}

export default CountryCard;