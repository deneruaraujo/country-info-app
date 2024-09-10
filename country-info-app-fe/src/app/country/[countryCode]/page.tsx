"use client";

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { CountryInfo } from '../interface/country-info';
import { api } from '@/config/api';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Country } from '@/app/interface/country';

export default function CountryInfoPage() {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/countries/available')
      .then((response) => {
        setCountryList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching country list:', error);
      });

    if (countryCode) {
      api.get(`/countries/info/${countryCode}`)
        .then((response) => {
          setCountryInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching country info:', error);
          setLoading(false);
        });
    }
  }, [countryCode]);

  if (loading) return <p className="text-center text-lg">Loading country information...</p>;
  if (!countryInfo) return <p className="text-center text-lg">Country not found.</p>;

  const countryName = countryList.find(country => country.countryCode === countryCode)?.name || 'Unknown Country';

  const populationData = {
    labels: countryInfo.population.map((entry) => entry.year),
    datasets: [
      {
        label: 'Population Over Time',
        data: countryInfo.population.map((entry) => entry.value),
        borderColor: '#4bbcc0',
        backgroundColor: '#4baec033',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4 flex items-center">
        <Image src={countryInfo.flagUrl} width={0} height={0} alt={`${countryName} flag`} className="w-12 h-8 mr-4" />
        {countryName}
      </h1>

      <h2 className="text-2xl font-bold mb-4">Border Countries:</h2>
      <ul className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {countryInfo.borders.map((borderCountry) => (
          <li key={borderCountry.countryCode} className="bg-gray-100 p-3 rounded shadow hover:bg-gray-200">
            <a href={`/country/${borderCountry.countryCode}`} className="text-lg text-black">
              {borderCountry.commonName}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Population Over Time:</h2>
      <div className="w-full h-96">
        <Line data={populationData} />
      </div>
    </div>
  );
}
