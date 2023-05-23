import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BuyOrder from './components/BuyOrder'
import SellOrder from './components/SellOrder'
import './styles/Modal.css'
import './styles/company.css'
import API from '../API'

export default function Company() {
    const { ticker } = useParams()
    const [companyData, setCompanyData] = useState({ name: '', price: '' })
    const [marketData, setMarketData] = useState([])
    const [showBuyModal, setShowBuyModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)

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

    return (
        <div>
            <h1>{companyData.name}</h1>
            <h2>${companyData.price}</h2>

            <div className='chart-div'>Chart plugin goes here</div>

            <div className="btn-div">
                <button className='btn-modal buy-btn' onClick={() => setShowBuyModal(true)}>BUY</button>
                <button className='btn-modal sell-btn' onClick={() => setShowSellModal(true)}>SELL</button>
            </div>

            {showBuyModal ? (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content">
                        <BuyOrder closeModal={() => setShowBuyModal(false)}
                            companyData={companyData}
                        />
                    </div>
                </div>
            ) : null}
            {showSellModal ? (
                <div className="modal">
                    <div className="overlay"><div className="modal-content">
                        <SellOrder closeModal={() => setShowSellModal(false)}
                            companyData={companyData} />
                    </div>
                    </div>
                </div>
            ) : null}

            <p className='key-data-label'>Day Range</p>
            <hr/>
            <p>{marketData[1]['Day Range']}</p>

            <p className='key-data-label'>52 Week Range</p>
            <hr/>
            <p>{marketData[2]['52 Week Range']}</p>

            <p className="key-data-label">Market Cap</p>
            <hr/>
            <p>{marketData[3]['Market Cap']}</p>
            
            <p className="key-data-label">Public Float</p>
            <hr/>
            <p>{marketData[5]['Public Float']}</p>

            <p className="key-data-label">Average Volume</p>
            <hr/>
            <p>{marketData[15]['Average Volume']}</p>

            <a href={`https://www.marketwatch.com/investing/stock/${ticker}`} target='_blank'>More data...</a>
        </div>
    )
}