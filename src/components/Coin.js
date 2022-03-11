import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { LineChart } from "./LineChart"

export function Coin() {
    const { coinId } = useParams();
    const [priceData, setPriceData] = useState(null);
    const [labels, setLabels] = useState(null);
    
    

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
            <div>{coinId}</div>
            {!priceData && "Loading..."}
            {priceData && labels && (
                <LineChart priceData={priceData} labels={labels} coinId={coinId}/>
            )}
            
        </div>
    )
}