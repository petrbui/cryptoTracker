import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coins/coins";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("1");
  const [currancy, setCurrancy] = useState("czk");

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currancy}&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [{ page, currancy }]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 99];
  const currencies = ["czk", "usd"];

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Market</h1>
        <div class='dropdown'>
          <button class='dropbtn'>Dropdown</button>
          <div class='dropdown-content'>
            {currencies.map((curr) => {
              return (
                <a
                  href='#'
                  onClick={() => {
                    setCurrancy(curr);
                  }}
                >
                  {curr.toUpperCase()}
                </a>
              );
            })}
          </div>
        </div>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            curr={currancy}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
      <div className='coin-pages'>
        {pages.map((pages) => {
          return (
            <a
              href='!#'
              onClick={() => {
                setPage(pages);
              }}
            >
              {pages}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default App;
