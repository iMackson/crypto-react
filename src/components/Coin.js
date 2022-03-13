import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { LineChart } from "./LineChart"
import { AuthContext } from "./contexts/authContext"

export function Coin() {
    const { coinId } = useParams();
    const [priceData, setPriceData] = useState(null);
    const [labels, setLabels] = useState(null);
    const { user } = useContext(AuthContext)
    
    

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
        
        fetchCoin()
    }, [coinId])


    return (
        <div>
            <div className="border-t border-gray-200 py-5 ">
                <h2 className="text-2xl text-gray-800">{coinId}</h2>
            </div>
            {!priceData && (
                <div className="px-5 bg-gray-100 rounded-sm py-5">
                    <h4 className="text-xl text-gray-600">Loading...</h4>
                </div>
            )}
            {user ? (
                <>
                {priceData && labels && (
                <LineChart priceData={priceData} labels={labels} coinId={coinId}/>
                )}
                </>
            ) : (
                <p>You need to be logged in to view price chart</p>
            )}
            
        </div>
    )
}