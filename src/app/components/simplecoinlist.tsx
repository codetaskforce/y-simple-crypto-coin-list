'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FcSearch } from "react-icons/fc";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  image: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

const CoinTracker = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CryptoData[]>(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((crypto) => {
    return crypto.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {/* <Navbar /> */}

      <div className="flex flex-wrap mx-3 mb-5 text-black">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200">

              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-3xl/tight">
                  <span className="mr-3 font-semibold">Simple Crypto Coin List</span>
                  <span className="mt-1 font-medium text-lg">An app to review Crypto Coin price, market cap, 1h, 24hr & 7D percentage change.</span>
                </h3>
                <div className="relative flex flex-wrap items-center my-2">
                  <div className="w-72">
                    <div className="relative w-full min-w-[200px] h-10">
                      <div className="absolute grid w-5 h-5 place-items-center text-gray-500 top-2/4 right-3 -translate-y-2/4">
                        <FcSearch />
                      </div>
                      <input
                        className=" w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-gray-200 focus:border-gray-900"
                        placeholder=" "
                        value={searchQuery}
                        onChange={handleSearchChange} />
                      <label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate -placeholder-shown:text-gray-500 leading-tight -focus:leading-tight -disabled:text-transparent -disabled:-placeholder-shown:text-gray-500 transition-all -top-1.5 -placeholder-shown:text-sm text-[11px] -focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 -placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t -focus:before:border-t-2 before:border-l -focus:before:border-l-2 before:pointer-events-none before:transition-all -disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 -placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t -focus:after:border-t-2 after:border-r -focus:after:border-r-2 after:pointer-events-none after:transition-all -disabled:after:border-transparent -placeholder-shown:leading-[3.75] text-gray-500 -focus:text-gray-900 before:border-gray-200 -focus:before:!border-gray-900 after:border-gray-200 -focus:after:!border-gray-900">
                        Search crypto name
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">

                  <table className="w-full my-0 align-middle border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem]">
                        <th className="pb-3 text-start min-w-[100px]">Name</th>
                        <th className="pb-3 text-end min-w-[100px]">Symbol</th>
                        <th className="pb-3 text-end min-w-[100px]">Price</th>
                        <th className="pb-3 text-end min-w-[100px]">Market Cap</th>
                        <th className="pb-3 text-end min-w-[100px]">1h change</th>
                        <th className="pb-3 text-end min-w-[100px]">24h change</th>
                        <th className="pb-3 text-end min-w-[100px]">7D change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((crypto) => (
                        <tr className="border-b border-dashed last:border-b-0" key={crypto.id}>
                          <td className="p-3 pl-0">
                            <div className="flex items-center">
                              <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                <img
                                  src={crypto.image}
                                  alt={crypto.name}
                                  className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                />
                              </div>
                              <div className="flex flex-col justify-start">
                                <Link href={{
                                  pathname: `/crypto/${crypto.id}`,
                                  query: { id: crypto.id }
                                }} className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg text-secondary-inverse hover:text-primary">
                                  {crypto.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-md">{crypto.symbol.toUpperCase()}</span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-md">${Number(crypto.current_price.toFixed(2)).toLocaleString('en-US')}</span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-md">${crypto.market_cap.toLocaleString('en-US')}</span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span
                              className={`font-semibold text-md ${crypto.price_change_percentage_1h_in_currency < 0 ? 'text-red-500' : 'text-green-500'
                                }`}
                            >
                              {crypto.price_change_percentage_1h_in_currency.toFixed(2)}%
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span
                              className={`font-semibold text-md ${crypto.price_change_percentage_24h_in_currency < 0 ? 'text-red-500' : 'text-green-500'
                                }`}
                            >
                              {crypto.price_change_percentage_24h_in_currency.toFixed(2)}%
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span
                              className={`font-semibold text-md ${crypto.price_change_percentage_7d_in_currency < 0 ? 'text-red-500' : 'text-green-500'
                                }`}
                            >
                              {crypto.price_change_percentage_7d_in_currency.toFixed(2)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinTracker;
