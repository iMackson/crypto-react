import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { LineChart } from "./LineChart"
import { AuthContext } from "./contexts/authContext"
import { Loader } from './Loader'

export function Coin() {
    const { coinId } = useParams();
    const [priceData, setPriceData] = useState(null);
    const [labels, setLabels] = useState(null);
    const { user } = useContext(AuthContext);
    const [coin, setCoin] = useState({});
    
    

    useEffect(() => {
        const date = new Date()
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
        const firstDayUnix = firstDay.getTime() / 1000;
        const currentDayUnix = date.getTime() / 1000;
        let vs_currency = "usd";
      
       const formatUnix = (unixTimetamp) => {
           const date = new Date(unixTimetamp)
           return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
       }

        async function fetchCoin() {
            return await axios.get(
                `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${vs_currency}&from=${firstDayUnix}&to=${currentDayUnix}`)
            .then(res => {
                setPriceData(res.data.prices.map(item => item[1]))
                setLabels(res.data.prices.map(item => formatUnix(item[0])))
            })
            .catch(err => {
                console.log(err)
            })
        }

       async function coinData() {

            return await axios.get(
                `https://api.coingecko.com/api/v3/coins/${coinId}`)
            .then(response => {
                setCoin(response.data)
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        
        if (user) {
            coinData()
            fetchCoin()
        }
        
        

    }, [coinId, user])


    return (
        <div>
            {user ? (
                <>
                    {(!coin || !priceData) && <Loader />}
                    {coin && priceData && labels && (
                        <>
                            <div className="flex items-center border-t border-gray-200 py-5 ">
                                <img src={coin.image.small} alt={coin.id} className="w-12 h-12" />
                                <h2 className="ml-3 text-2xl text-gray-800">{coin.name}</h2>
                            </div>
                            {priceData && labels && (
                            <LineChart 
                                priceData={priceData} 
                                labels={labels} 
                                coinId={coinId}/>
                            )}
    
                        </>
                    )}
                </>
            ) : (
                <p>You need to be logged in to view price chart</p>
            )}
        </div>    
    )
}