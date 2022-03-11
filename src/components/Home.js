
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';





export default function Home() {

    const [coins, setCoins] =  useState(null)
    useEffect(() => {
      
      
      async function pingAPI() {
        return await axios.get("https://api.coingecko.com/api/v3/ping")
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
  
      async function coinList() {
        return await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then(res => {
          setCoins(res.data)
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      }
  
      pingAPI()
      coinList()
    }, [])
  
    return (
      <div>     
        {coins && (
          <ul>
            {coins.map(coin => {
              return (
                <li key={coin.id} className="coin-list-item">
                  <Link to={`/${coin.id}/`}>{coin.name}</Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )  
  }