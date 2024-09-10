"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Country } from './interface/country';
import { api } from '../config/api';

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/countries/available')
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-lg">Loading countries...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Countries</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded shadow hover:bg-gray-200">
            <Link href={`/country/${country.countryCode}`}>
              <span className='text-black'>{country.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
