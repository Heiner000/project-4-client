import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BuyOrder from './components/BuyOrder'
import SellOrder from './components/SellOrder'
import './styles/Modal.css'

export default function Company({ ticker = 'aapl' }) {
    const [companyData, setCompanyData] = useState({ name: '', price: '' })
    const [showBuyModal, setShowBuyModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/assets/search/${ticker}/`)
                setCompanyData({ name: response.data[0][0], price: response.data[0][1] })
                console.log(response)
            } catch (err) {
                console.log('Error fetching company data: ', err)
            }
        }
        fetchCompanyData()
    }, [ticker])

    if (showBuyModal || showSellModal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div>
            <h1>{companyData.name}</h1>
            <h2>current price: ${companyData.price}</h2>

            <div className='chart-div'>Chart plugin goes here</div>

            <div className="btn-div">
                <button className='btn-modal' onClick={() => setShowBuyModal(true)}>BUY</button>
                <button className='btn-modal' onClick={() => setShowSellModal(true)}>SELL</button>
            </div>

            {showBuyModal ? (
                <div className="modal">
                    <div onClick={() => setShowBuyModal(false)} className="overlay"></div>
                    <div className="modal-content">
                        <BuyOrder closeModal={() => setShowBuyModal(false)} 
                        companyData={companyData}
                        />
                    </div>
                </div>
            ) : null}
            {showSellModal ? (
                <div className="modal">
                    <div onClick={() => setShowSellModal(false)} className="overlay"><div className="modal-content">
                        <SellOrder closeModal={() => setShowSellModal(false)} />
                    </div>
                    </div>
                </div>
            ) : null}

            <p className='key-data'>52 Week Range</p>
            <p>companyData.yearRange</p>

            <p className='key-data'>Day Range</p>
            <p>companyData.dayRange</p>

            <p className="key-data">Average Volume</p>
            <p>companyData.avgVolume</p>
        </div>
    )
}