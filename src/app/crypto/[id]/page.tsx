'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'

// Define the structure of the data returned from the API
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: {
    small: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      inr: number;
    };
    market_cap: {
      inr: number;
    };
    total_supply: number;
    market_cap_change_percentage_24h: number;
    high_24h: {
      inr: number;
    };
    low_24h: {
      inr: number;
    };
    total_volume: {
      inr: number;
    };
    circulating_supply: number;
  };
}

const CryptoDetails = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("id");
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CryptoData>(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!cryptoData) {
    return <div className="container">Loading...</div>;
  }

  // Extract description up to the first period (.)
  const description = cryptoData.description.en.split('.')[0];

  return (
    <>
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card">
          <img
            src={cryptoData.image.small}
            className="card-img-top img-fluid"
            alt={cryptoData.name}
            style={{ maxWidth: '200px' }}
          />
          <div className="card-body">
            <h1 className="card-title">{cryptoData.name}</h1>
            <h5 className="card-text">{description}</h5>
            <p className="card-text">
              <b>Symbol:</b> {cryptoData.symbol.toUpperCase()}
            </p>
            <p className="card-text">
              <b>Rank:</b> {cryptoData.market_cap_rank}
            </p>
            <p className="card-text">
              <b>Market Cap:</b> ₹{cryptoData.market_data.market_cap.inr.toLocaleString('en-IN')}
            </p>
            <p className="card-text">
              <b>Current Price:</b> ₹{cryptoData.market_data.current_price.inr.toLocaleString('en-IN')}
            </p>
            <p className="card-text">
              <b>Total Supply:</b> {cryptoData.market_data.total_supply?.toLocaleString('en-IN')}
            </p>
            <p className="card-text">
              <b>Market Cap Change (24h):</b> {cryptoData.market_data.market_cap_change_percentage_24h}%
            </p>
            <p className="card-text">
              <b>High (24h):</b> ₹{cryptoData.market_data.high_24h.inr.toLocaleString('en-IN')}
            </p>
            <p className="card-text">
              <b>Low (24h):</b> ₹{cryptoData.market_data.low_24h.inr.toLocaleString('en-IN')}
            </p>
            <p className="card-text">
              <b>Total Volume (24h):</b> ₹{cryptoData.market_data.total_volume.inr.toLocaleString('en-IN')}
            </p>
            <p className="card-text">
              <b>Circulating Supply:</b> {cryptoData.market_data.circulating_supply?.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoDetails;
