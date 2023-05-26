import ReactSelect from 'react-select'
import { useState, useEffect } from 'react'
import API from '../API'
import './styles/homepage.css'
import jwtDecode from 'jwt-decode'




export default function HomePage({ userFunds, setUserFunds }) {


  const [selectedStock, setSelectedStock] = useState()
  const [watchlist, setWatchlist] = useState()
  const [username, setUsername] = useState('User')
  // const [userFunds, setUserFunds] = useState(0)
  const [userPortfolioShares, setUserPortfolioShares] = useState([])
  const [userPortfolioValues, setUserPortfolioValues] = useState([])
  const [portfolioTotalValue, setPortfolioTotalValue] = useState(0)
  const [percentageChange, setPercentageChange] = useState([])

  const options = [
    { value: 'aapl', label: 'Apple - AAPL' },
    { value: 'msft', label: 'Microsoft - MSFT' },
    { value: 'amzn', label: 'Amazon - AMZN' },
    { value: 'goog', label: 'Google - GOOG' },
    { value: 'meta', label: 'Facebook - META' },
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
      try {
        const response = await API.get('user_info/', { params: { user_id: userId } })
        setUsername(response.data.username)
        setUserFunds(response.data.funds)
      } catch (err) {
        console.log(err)
      }
    }
    getUsername()
  }, [userId, userFunds])


  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const response = await API.get('get_watchlist/', { params: { user_id: userId } })
        setWatchlist(response.data)
        console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getWatchlist()
  }, [userId])


  useEffect(() => {
    const getUserPortfolioShares = async () => {
      try {
        const response = await API.get('user_all_shares/', { params: { user_id: userId } })
        setUserPortfolioShares(response.data)
        console.log('UE getUserPortfolioShares: ', userPortfolioShares)
      } catch (err) {
        console.log(err)
      }
    }
    const getUserPortfolioValues = async () => {
      try {
        const response = await API.get('user_portfolio_values/', { params: { user_id: userId } })
        setUserPortfolioValues(response.data.portfolio_values)
        setPortfolioTotalValue(response.data.total_portfolio_value)
        setPercentageChange(response.data.unrealized_change_percentage)
      } catch (err) {
        console.log(err)
      }
    }
    getUserPortfolioShares()
    getUserPortfolioValues()
  }, [userId])
  
  useEffect(() => {
    console.log('Updated userPortfolio Shares: ', userPortfolioShares);
    console.log('Updated userPortfolio Values: ', userPortfolioValues);
    console.log('Updated portfolio Total Value: ', portfolioTotalValue);
    console.log('Updated percentage Change: ', percentageChange);
  }, [userPortfolioShares, userPortfolioValues, portfolioTotalValue, percentageChange]);



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
      if (response.status === 201) {
        console.log("Stock added to watchlist")
        getWatchlist()
      } else {
        console.log("Unable to add stock to watchlist")
      }
    } catch (err) {
      console.log(err)
    }
  }





  const getWatchlist = async () => {
    try {
      const response = await API.get('get_watchlist/', { params: { user_id: userId } })
      setWatchlist(response.data)
    } catch (err) {
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


  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await API.get('view_trades/')
        console.log('all trades', response.data)
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
    return [...watchlist].reverse().map((stock, i) => {
      return (
        <div className='watch-stock' key={i} onClick={() => changeWindow(stock.ticker)}>
          <p>{stock.ticker.toUpperCase()}</p>
          <p className={parseFloat(stock.percentage) > 0 ? 'gain' : 'loss'}>{stock.percentage}</p>
        </div>
      )
    })
  }




  const displayPortfolio = () => {
    // iterate over the userPortfolio state
    return userPortfolioValues.map((portfolioItem, i) => {
      // get each ticker
      const ticker = Object.keys(portfolioItem)[0]
      // get the value for that ticker
      const value = portfolioItem[ticker]

      // find the matching shares object
      const sharesObject = userPortfolioShares.find(item => Object.keys(item)[0] === ticker)
      // pull out the shares for that ticker
      const shares = sharesObject ? Object.values(sharesObject)[0] : 0

      // only proceed if the user has 1 or more shares
      if (shares < 1) {
        return null
      }

      // find the matching percent change object
      const percentageChangeObject = percentageChange.find(item => Object.keys(item)[0] === ticker)
      // pull out the % change for that ticker
      const changePercentage = percentageChangeObject ? percentageChangeObject[ticker] : "N/A"
      return (
        <div className="portfolio-stock" key={i} onClick={() => changeWindow(ticker)}>
          <p>{ticker.toUpperCase()}</p>
          <p className={parseFloat(changePercentage) > 0 ? 'gain' : 'loss'}>% {changePercentage}</p>
          <p>$ {value}</p>
        </div>
      )
    })
  }


  if (!userPortfolioValues.length) {
    return <div className='loading'><p>Loading...</p></div>
  }

  return (
    <div className='container'>
      <h1>Hi, {username}</h1>
      <div className='user-funds'>
        <h2>Funds:</h2>
        <p>$ {userFunds}</p>
      </div>

      <div className='outer-portfolio'>
        <h2>Portfolio:<span className='portfolio'> $ {portfolioTotalValue}</span></h2>
        <div className='portfolio-container'>
          {displayPortfolio()}
        </div>
      </div>

      <div className='outer-watchlist'>
        <h2>Watchlist</h2>
        <div className='watchlist-container'>
          {watchlist ? displayWatchlist() : <p>loading...</p>}
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