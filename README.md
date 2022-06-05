# Gravity App🔥

## A web3 application where we can buy valuable sneakers of the metaverse world

## [Demo Link](https://main--courageous-fairy-cf063c.netlify.app/) 🔗

<div align="center">
  <img src="https://i.postimg.cc/CxZXqhWM/ezgif-com-video-to-gif-1.gif" alt="Gravity Demo" width="100%" />
  <br>
</div>

<br/>
<br/>

## Technologies used

- `NextJS`: Frontend
- `Tailwind CSS`: Style the components
- `Moralis: Database`: Authentication, Web3 API
- `Hardhat`: To deploy the Smart Contract
- `OpenZepplin`: ERC20 contract
- `Ether.js`: To interact with Ethereum blockchain
- `Netlify`: To deploy the website

## How to Use

### Setup

- Create a new testnet server with Moralis 'gravity-app'
- Deploy the website on Netlify
- `yarn add moralis react-moralis`
- `yarn add react-icons react-spinners react-simple-hook-model`
- `yarn add @walletconnect/web3-provider @web3auth/web3auth ethers`
- `yarn add magic-sdk moment web3uikit`

## Getting Started

First install the packages by running:

```bash
yarn
#or
npm install
```

Create Moralis project and copy the Moralis server URL and Moralis App ID to the .env file. Then setup the Products databse in Moralis

Create Alchemy project and copy the Alchemy URL to the smart_contract/.env file

Copy the metamask private key to the smart_contract/.env file

Run the smart_contract/scripts/deploy.js

```bash
npx hardhat run scripts/deploy.js
```

Then copy the smart_contract/artifacts/contracts/GravityCoin.sol/GravityCoin.json to lib folder
And set the `gravityCoinAddress` in the lib/cosntants.js to the address of your deployed contract

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
  
## How I went on with the project

- Fill the <b>index</b> page(index.js) with components that we want (<b>Sidebar</b> and <b>Main</b>)
- <b> Sidebar component </b>
  - For Login/Connect wallet button, we can use Moralis.
    - To use Moralis, in _app.js, wrap the component inside <b>MoralisProvider</b>
- Add all the digital arts(.gif and .png) in the assets folder
- Setup Context Folder
  - We use context api so that we could create all the variables and functions there and then call it anywhere within the app by making them global.
  - In GravityContext.js, we set up the useContext hook(in React) and we're going to create a context so we can put all our variables and functions in like a global store that we can call anywhere in our app
  - In _app.js, wrap the main component in the Context-Provider(GravityProvider)
  - we keep track of <b>username</b>, <b>nickname</b>(nickname is the username input taken by the user in case username is empty)
  - Also we keep track of whether its autheticated or not(wallet is connected or not) by flagging the <b>isAuthenticated</b> of Moralis

- <b>Product Component</b>
  - Set up the assets/products using Moralis database(Moralis database is built on top of MongodB)
  - Within Main component there are three sub components:
    - Header Component
    - Featured Component
    - Cards Component: Represents where all our digital assets of our store will be
      - Within this component, we will map through another component for each asset(Card Component which will map to each asset)
  - Now we pull the assets from the Moralis database and use these assets to map to each card

- <b> Gravity Token(GTC) - Smart Contract</b>
  - First install <b>Hardhat</b>, which is an environment that lets us test, deploy, and compile the smart contracts
  - Then install OpenZepplin
  - Made an ERC-20 token: Gravity Coin(GTC)

- <b>Header Component </b>
  - Will have the functionality of where we can buy GravityCoins in exchange for our Ethereum: <b>BuyModal Component</b>

- Next we make our assets buyable
  - First thing that we need to do is we need to query for users when we are going to buy assets because eventually when an user buy an asset we want to save it and attach it to that user because if they log in they should see all the assets they have bought.
  - Add the buyProduct() function to the Card component such that when we click the Card we can buy the product

- <b>History Component</b>
  - This component shows the owned items that the user has purchased.

- Finally deployed the project using <b>Netlify</b>
