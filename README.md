# SimuStock

## Summary 
* This is a simulation trading app for both stocks and cryptocurrencies, targeted towards mobile users. It allows users to register, view near real-time market data, manage a virtual portfolio, execute trades, and gain an understanding and experience without any real-world financial risk.

## Team Members
* Brian Rogers
* Garrett Heiner

## Technologies
* Backend: python, django, postresql
* Frontend: React, javascript
* Beautiful Soup -> this will be used for our DIY API. Scraping the stock prices off of MarketWatch will give us real time data for the user.
* TradingView Plugin -> this allows us to show historical graph data to the user of a specific stock without us having to 

![home](https://i.imgur.com/4PLL5vm.png)
![company](https://i.imgur.com/gdX1bLD.png)
![trade history](https://i.imgur.com/8agTl6G.png)

## General Approach
We approached this project by structuring it as a full stack application, using Django for the backend and React for the frontend. The Django backend is designed as an API that can handle CRUD operations. It's primarily responsible for managing database models, user authentication, and interactions with outside sources.

The frontend, built in React, is a single-page application that provides an interactive user interface. It interacts with the Django backend through API calls using Axios. It also uses jwt-decode for decoding JSON Web Tokens (JWT), react-router-dom for routing, and dotenv to manage environment variables.

We planned to deploy the server on Heroku & the client on Netlify.

## Install Instructions
* For the server:
 1. Clone the server repo & navigate to the project root directory
 2. Activate your virtual environment
 3. Run `pip install -r requirements.txt` to download dependencies

 * For the client:
  1. Clone the client repo and navigate to the project root directory
  2. Run `npm install` to download dependencies

## Problems and Hurdles
* Managing state between components became a challenge, especially updating the database with rapid changes to our models data, but we doubled down on our API pings, and really took advantage of useEffects and their dependency arrays to update state
* Finding the best way to scrape the data we needed, and then how to deliver and parse that on the front end
* Sunk Cost - There were moments where we may have discovered that there might be a better way to calculate or track a specific piece of data, however, it felt like we didn't have enough time to refactor things, because that could start a cascade of dominos before the ship date
* We realized that not every product is going to ship bug free, and we can always continually tinker with things to improve them
* Getting the chart plugin to render regularly was a significant hurdle that took a lot of experimenting
* Understanding and implementing Django's full suite of offerings, like built-in Authorization and Authentication is still a major hurdle

---
## RESTful Routing Chart

| HTTP Verb | URL Pattern | CRUD Action | Description |
| --- | --- | --- | --- |
| POST | /register | CREATE | Register a new user |
| POST | /login | READ | Log in an existing user |
| GET | /logout | READ | Log out the current user |
| GET | /portfolio | READ | Show the current user's portfolio |
| POST | /portfolio/<ticker> | CREATE | Add a new asset to the portfolio |
| PUT | /portfolio/<ticker> | UPDATE | Update an asset in the portfolio |
| DELETE | /portfolio/<ticker> | DELETE | Remove an asset from the portfolio |
| POST | /trades | CREATE | Execute a trade |
| GET | /assets/search/<ticker> | READ | Search for a stock or crypto |
| GET | /assets/prices/<ticker> | READ | Get the real-time price of an asset |
| GET | /users | READ | Retrieve a list of all users |
| POST | /users/<username>/friends | CREATE | Send a friend request |
| PUT | /users/<username>/friends | UPDATE | Accept a friend request |
| DELETE | /users/<username>/friends | DELETE | Remove a friend |
| GET | /users/<username>/portfolio | READ | View a friend's portfolio |
| GET | /users/<username>/trades | READ | View a friend's trades |
---
## ERD
![erd](https://i.imgur.com/EgMCLCL.png)
---
## Wireframe
![wireframes 1](https://i.imgur.com/DUkbvG8.png)
![wireframes 2](https://i.imgur.com/aKM8qo5.png)

## User Stories 
* As a user, I want to register an account to keep track of my simulated portfolio
* As a user, I want to log into and out of my account & see my portfolio
* As a user, I want to search for stocks & cryptocurrencies by ticker
* As a user, I want to see near real-time prices of various stocks and cryptocurrencies
* As a user, I want to execute simulated buy/sell trades
* As a user, I want to see historical data and charts for stocks and crypto
* As a user, I want to friend users and see their trades/portfolios
* As a user, I want to view other users' profiles so that I can easily view all of *their* previous posts.

## MVP

* User needs to be able to see accurate and up to date stock prices and history.
* The user should be able to search for a specific stock to get more details for it.
* The ability to purcase a stock and also have the trade value go up and down with the market is a must.
* The user should also be able to purchase the same stock multiple times and at different values. (weekly buyers)
* User needs to be able to sell the stock and have the gains or losses update to their total funds.

## Stretches

* The ability to follow your friends and see what their investing in.
* Implement Pandas, Matplotlib and dateutil.parse to create graphs from the historical data and not rely on the plugin. (the plugin limits our design options)
* let the user create their own algorithim for automatic buying and selling.
* The user can save and name the algorithim and apply it other stocks.
* have a 'real world' mode where users can leave the sand box and buy and sell.
* Make a desktop version.

## Potential Roadblocks

* Calling the api to update the value of the stocks can be difficult especially when someone decides to sell multiple stocks for the same company but all at different values. It needs to be accurate.
* We want to have 'tickets' that will have the effect of covering the old window with the new buying or selling ticket. This could be a css obstacle.
* Working with react native is new, so we predict running into roadblocks there.
* If we hit our stretch goals than having the user create their own algorithims can prove difficult since they are creating conditions that will need to be turned into function in the program. 
* Not a roadblock but maybe a worry is if MarketWatch changes it's html page, we will need to update our application.

## Daily Sprints

**Friday**:
- Finalize project planning/approval
- Set up Django/PostgreSQL environment
- Begin user registration/login
- Continue web scraper for stocks

**Saturday**:
- Set up data models and relationships
- Finish the web scraper for stocks
- Test and validate stock data

**Sunday**:
- Double check data from scraper
- Connect frontend to backend

**Monday**:
- Add functionality for trades

**Tuesday**:
- Add functionality for portfolio tracking

**Wednesday**:
- Implement plugins
- Deployment?

**Thursday**:
- Bug fixes & testing

**Friday**:
- Present App

### Sources
Modal: https://github.com/ecole-du-web/React-modal-yt