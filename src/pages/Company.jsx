import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import BuyOrder from './components/BuyOrder'
import SellOrder from './components/SellOrder'
import './styles/Modal.css'
import './styles/company.css'
import API from '../API'
import jwtDecode from 'jwt-decode'

export default function Company() {
    const { ticker } = useParams()
    const [companyData, setCompanyData] = useState({ name: '', price: '' })
    const [marketData, setMarketData] = useState([])
    const [showBuyModal, setShowBuyModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [watchlist, setWatchlist] = useState()
    const [included, setIncluded] = useState()
    const contariner = useRef()

    const token = localStorage.getItem('access')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.user_id
    


    useEffect(() => {
        const getWatchlist = async () => {
          try{
            const response = await API.get('get_watchlist/', {params: {user_id: userId}})
            console.log(response.data)
            const isInWatchlist = response.data.some(info => info.ticker === ticker);
            setWatchlist(isInWatchlist);
            console.log('done', isInWatchlist);
          }catch(err){
            console.log(err)
          }
        }
        getWatchlist()
      }, [included] )



    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true)
        }, 2000)
    }, [])

    useEffect(() => {
          const script = document.createElement("script");
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
          script.type = "text/javascript";
          script.async = true;

          script.innerHTML = `
            {
              "symbols": [
                [
                  "${ticker.toUpperCase()}",
                  "${ticker.toUpperCase()}|1D"
                ]
              ],
              "chartOnly": true,
              "width": "400",
              "height": "300",
              "locale": "en",
              "colorTheme": "dark",
              "autosize": false,
              "showVolume": false,
              "showMA": false,
              "hideDateRanges": true,
              "hideMarketStatus": false,
              "hideSymbolLogo": false,
              "scalePosition": "no",
              "scaleMode": "Normal",
              "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
              "fontSize": "12",
              "noTimeScale": true,
              "valuesTracking": "1",
              "changeMode": "price-and-percent",
              "chartType": "line",
              "fontColor": "rgba(255, 255, 255, 1)",
              "backgroundColor": "rgba(34, 34, 34, 1)",
              "lineWidth": 1,
              "lineType": 0,
              "dateRanges": [
                "1d|1"
              ],
              "upColor": "#22ab94",
              "downColor": "#f7525f",
              "borderUpColor": "#22ab94",
              "borderDownColor": "#f7525f",
              "wickUpColor": "#22ab94",
              "wickDownColor": "#f7525f",
              "timeHoursFormat": "12-hours",
              "color": "rgba(0, 102, 204, 1)"
            }`;

            if(contariner.current) {
                contariner.current.appendChild(script);
            }

        },[isMounted] );




    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await API.get(`assets/search/${ticker}/`)
                setCompanyData({ name: response.data[0][0], price: response.data[0][1] })
                console.log(companyData)
                setMarketData(response.data[1])
                console.log(marketData)

            } catch (err) {
                console.log('Error fetching company data: ', err)
            }
        }
        fetchCompanyData()
    }, [])

    if (showBuyModal || showSellModal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    if (!marketData.length) {
        return <p>Loading...</p>
    }


    const removeWatch = async () => {
        try{
            const response = await API.delete(`remove_watchlist/${ticker}/${userId}`)
            console.log(response.data)
            setIncluded(false)
        }catch(err){
            console.log(err)
        }
    }

    const addWatch = async () => {
        const data = {
            user_id: userId,
            new_stock: ticker
        }
        try {
            const response = await API.post('watchlist/', data)
            if (response.status === 201){
                console.log("Stock added to watchlist")
                setWatchlist(true)
                setIncluded(true)
            } else {
              console.log("Unable to add stock to watchlist")
            }
        } catch (err) {
            console.log(err)
        }
    }

    



    return (
        <div className='main-container'>
            
            <div className="container">
                <h1>{companyData.name}</h1>
                <small>{ticker.toUpperCase()}</small>
            </div>

            <h2>${companyData.price}</h2>
        <div>
            <div className='chart-div'>
                <div className="tradingview-widget-container" ref={contariner}>
                    <div className="tradingview-widget-container__widget"></div>
                    <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets</span></a> on TradingView</div>
                </div>
            </div>

            <div className="company-btn-div">
                <button className='btn-modal buy-btn' onClick={() => setShowBuyModal(true)}>BUY</button>
                <button className='btn-modal sell-btn' onClick={() => setShowSellModal(true)}>SELL</button>
            </div>

            {showBuyModal ? (
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <BuyOrder closeModal={() => setShowBuyModal(false)}
                                companyData={companyData} />
                        </div>
                    </div>
                </div>
            ) : null}
            {showSellModal ? (
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <SellOrder closeModal={() => setShowSellModal(false)}
                                companyData={companyData} />
                        </div>
                    </div>
                </div>
            ) : null}

            <p className='key-data-label'>Day Range</p>
            <hr />
            <p>$ {marketData[1]['Day Range']}</p>

            <p className='key-data-label'>52 Week Range</p>
            <hr />
            <p>$ {marketData[2]['52 Week Range']}</p>

            <p className="key-data-label">Market Cap</p>
            <hr />
            <p>{marketData[3]['Market Cap']}</p>

            <p className="key-data-label">Public Float</p>
            <hr />
            <p>{marketData[5]['Public Float']}</p>

            <p className="key-data-label">Average Volume</p>
            <hr />
            <p>{marketData[15]['Average Volume']}</p>

            <a className='more-data' 
                href={`https://www.marketwatch.com/investing/stock/${ticker}`} target='_blank'>
                More data
            </a>
            { watchlist === true ? (
                <p className='remove' 
                    onClick={removeWatch}>
                    Remove from Watchlist
                </p>
            ) : (
                <p className='add' 
                    onClick={addWatch}>
                    Add to Watchlist
                </p>
            )}
            
            </div>    
        </div>
    )
}