import React, { useState } from 'react'
import "./App.css";
import { useEffect } from 'react';
import Axios from 'axios';
import Coin from './components/Coin';


function App() {
  const [listOfCoins, setlistOfCoins] =useState([]);
  const [searchword, setsearchWord] = useState("");


  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (Response) =>{
        setlistOfCoins(Response.data.coins);
      }
    );
  }, []);

  const filteredCoins = listOfCoins.filter((coin) =>{
    return coin.name.toLowerCase().includes(searchword.toLowerCase());
  })
  return (
    <div className="App">
    <div className="cryptoHeader">
      <input type="text" placeholder="Bitcoin..." onChange={(event) => setsearchWord(event.target.value)}/>
    </div>
    <div className="cryptoDisplay">
      {filteredCoins.map((coin) => {
        return(
           <Coin name={coin.name} icon={coin.icon} price={coin.price} symbol={coin.symbol} />
        );
      })}
      </div>     
    </div>
  )
}

export default App;