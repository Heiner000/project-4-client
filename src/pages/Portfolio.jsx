import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import API from '../API'
import './styles/portfolio.css'

export default function Portfolio() {
    const [trades, setTrades] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const token = localStorage.getItem('access')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                const response = await API.get(`trade_history/?user_id=${userId}`)
                setTrades(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchTrades()
    }, [userId])
    

    useEffect(() => {
        console.log('trades: ', trades)
    }, [trades])

    const handleChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase())
    }

    const filteredTrades = trades.filter(
        trade => trade.ticker.toLowerCase().includes(searchTerm) || trade.trade_type.toLowerCase().includes(searchTerm)
    )

    const formatDate = (isoString) => {
        const date = new Date(isoString)

        let day = date.getDate()
        let month = date.getMonth() + 1 // months are zero indexed, so add 1
        const year = date.getFullYear().toString().substr(-2) // get the last two digits of year
        const hour = date.getHours()
        let minutes = date.getMinutes()

        // add a leading zero for single digit months
        if (day < 10) day = '0' + day
        if (month < 10) month = '0' + month
        if (minutes < 10) minutes = '0' + minutes;

        const formattedDate = `${month}/${day}/${year} ${hour}:${minutes}`

        return (formattedDate)
    }

    return (
        <div>
            <div className="container">
                <h1>Portfolio History</h1>
                <input
                    type='text'
                    placeholder='Search trades...'
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <div className='trades-container'>
                {filteredTrades.map((trade, i) => (
                    <div className='trade-row' key={`trade-${i}`}>
                        <div className='trade-col'>{trade.ticker.toUpperCase()}</div>
                        <div className={`trade-col ${trade.trade_type === 'BUY' ? 'buy' : 'sell'}`}>{trade.trade_type}</div>
                        <div className='trade-col'>{trade.quantity}</div>
                        <div className='trade-col'>$ {trade.price}</div>
                        <div className='trade-col date'>{formatDate(trade.timestamp)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}