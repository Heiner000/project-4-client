import axios from 'axios'
import ReactSelect from 'react-select'
import { useState, useEffect } from 'react'
import API from '../API'
import './styles/homepage.css'
import jwtDecode from 'jwt-decode'

export default function HomePage(){

  const [selectedStock, setSelectedStock] = useState()
  const [watchlist, setWatchlist] = useState()
  const [username, setUsername] = useState('User')
  const options = [
    { value: 'aapl', label: 'Apple - AAPL' },
    { value: 'msft', label: 'Microsoft - MSFT' },
    { value: 'amzn', label: 'Amazon - AMZN' },
    { value: 'goog', label: 'Google - GOOG' },
    { value: 'fb', label: 'Facebook - FB' },
    { value: 'tsla', label: 'Tesla - TSLA' },
    { value: 'brk.b', label: 'Berkshire Hathaway - BRK.B' },
    { value: 'v', label: 'Visa - V' },
    { value: 'jnj', label: 'Johnson & Johnson - JNJ' },
    { value: 'wmt', label: 'Walmart - WMT' },
    { value: 'jpm', label: 'JPMorgan Chase - JPM' },
    { value: 'pg', label: 'Procter & Gamble - PG' },
    { value: 'xom', label: 'Exxon Mobil - XOM' },
    { value: 'ba', label: 'Boeing - BA' },
    { value: 'baba', label: 'Alibaba - BABA' },
    { value: 'dis', label: 'Disney - DIS' },
    { value: 'nvda', label: 'NVIDIA - NVDA' },
    { value: 'nflx', label: 'Netflix - NFLX' },
    { value: 'hd', label: 'Home Depot - HD' },
    { value: 'ko', label: 'Coca Cola - KO' },
    { value: 'ma', label: 'Mastercard - MA' },
    { value: 'intc', label: 'Intel - INTC' },
    { value: 'vz', label: 'Verizon - VZ' },
    { value: 'unh', label: 'UnitedHealth Group - UNH' },
    { value: 'pfe', label: 'Pfizer - PFE' },
    { value: 'mrk', label: 'Merck - MRK' },
    { value: 'pep', label: 'PepsiCo - PEP' },
    { value: 'cvs', label: 'CVS Health - CVS' },
    { value: 'cmcsa', label: 'Comcast - CMCSA' },
    { value: 'bac', label: 'Bank of America - BAC' },
    { value: 'adbe', label: 'Adobe - ADBE' },
    { value: 'c', label: 'Citigroup - C' },
    { value: 'orcl', label: 'Oracle - ORCL' },
    { value: 'pypl', label: 'Paypal - PYPL' },
    { value: 'ibm', label: 'IBM - IBM' },
    { value: 'mcd', label: 'McDonald\'s - MCD' },
    { value: 't', label: 'AT&T - T' },
    { value: 'abbv', label: 'AbbVie - ABBV' },
    { value: 'acn', label: 'Accenture - ACN' },
    { value: 'abt', label: 'Abbott Laboratories - ABT' },
    { value: 'crm', label: 'Salesforce - CRM' },
  ];
  
  const token = localStorage.getItem('access')
  const decodedToken = jwtDecode(token)
  const userId = decodedToken.user_id

  useEffect(() => {
    const getUsername = async () => {
      try{
        const response = await API.get('user_info/', {params: {user_id: userId}})
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
    }
    getUsername()
  }, [])
  

  useEffect(() => {
    // const user_id = 3
    const getWatchlist = async () => {
      try{
        const response = await API.get('get_watchlist/', {params: {user_id: userId}})
        setWatchlist(response.data)
      }catch(err){
        console.log(err)
      }
    }
    getWatchlist()
  }, [])


  


  const handleChange = (selectedOption) => {
    setSelectedStock(selectedOption);
  };





  const addStock = async () => {
    const existingStock = watchlist.find(stock => stock === selectedStock.value);
    if (existingStock) {
      console.log("Stock already exists in the watchlist");
      return;
  }
    const data = {
      user_id: userId, // this will change accordignly to the logged in user
      new_stock: selectedStock.value
    }
    try {
      const response = await API.post('watchlist/', data)
      if (response.status === 201){
        console.log("Trade created successfully")
        getWatchlist()
      } else {
        console.log("Unable to create trade")
      }
    } catch (err) {
      console.log(err)
    }
  }





  const getWatchlist = async () => {
    try{
      const response = await API.get('get_watchlist/', {params: {user_id: userId}})
      setWatchlist(response.data)
    }catch(err){
      console.log(err)
    }
  }


  // const addStock = async () => {
  //   const data = {
  //     asset_type: 'stock',
  //     ticker: 'aapl',
  //     quantity: 5,
  //     price: 81.25,
  //     trade_type: 'buy',
  //     user_id: 2
  //   }
  //   try {
  //     const response = await axios.post('http://localhost:8000/trades/', data)
  //     if (response.status === 201){
  //       console.log("Trade created successfully")
  //     } else {
  //       console.log("Unable to create trade")
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  useEffect( () => {
    const fetchStocks = async () => {
      try{
        const response = await API.get('view_trades/')
        console.log('all trades',response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchStocks()
  }, [])

  // const fetch_stocks = async () => {
  //   try{
  //     const response = await axios.get('http://localhost:8000/view_trades/')
  //     console.log(response)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const changeWindow = (ticker) => {
    window.location.href = `company/${ticker}`
  }

  const displayWatchlist = () => {
    return [...watchlist].reverse().map((ticker, i) => {
      return(
        <div className='watch-stock' onClick={() => changeWindow(ticker)}>
          <p key={i}>{ticker}</p>
        </div>
      )
    })
  }




  const displayStocks = async () => {
    axios.get(`http://localhost:8000/portfolio/`)
  }




    return(
        <div className='container'>
            <h1>Hi, USER</h1>
            <div className='outer-portfolio'>
            <h2>Portfolio</h2>
              <div className='portfolio-container'>
                {/* users purchased stocks here */}
              </div>
            </div>

            <div className='outer-watchlist'>
              <h2>Watchlist</h2>
              <div className='watchlist-container'>
                {watchlist ? displayWatchlist() : 'loading'}
              </div>

              <div className='new-stock'>
                <ReactSelect className='select'
                  value={selectedStock}
                  onChange={handleChange}
                  options={options}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: 'transparent',
                      border: '2px solid #0066cc',
                      color: 'white',
                    }),
                  }}
                  />
                <button onClick={addStock}>+</button>
              </div>

            </div>
        </div>
    )
}