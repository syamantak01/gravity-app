import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { gravityCoinAbi, gravityCoinAddress } from '../lib/constants'
import { ethers } from 'ethers'

export const GravityContext = createContext()

export const GravityProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [products, setProducts] = useState([])
    const [currentAccount, setCurrentAccount] = useState('')    //hold the current account's address
    const [tokenAmount, setTokenAmount] = useState('')  //keep track of the amount of tokens that user will request for the app
    const [amountDue, setAmountDue] = useState('')  //tokenAmount*(conversion factor(GTC->ETH)) 
    const [etherscanLink, setEtherscanLink] = useState('')  //keep track of the Etherscan link so that we can click it and prove that transaction was real
    const [isLoading, setIsLoading] = useState(false)   //keep track of Modal
    const [balance, setBalance] = useState('')  //keep track of how much gravity coins we currently have
    const [recentTransactions, setRecentTransactions] = useState([])
    const [ownedItems, setOwnedItems] = useState([])

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
    } = useMoralis()

    //useMoralisQuery is a hook that we can use to make querying the database a lot easier 
    const {
        data: productsData,
        error: productsDataError,
        isLoading: productsDataisLoading,
    } = useMoralisQuery('Products')

    const {
        data: userData,
        error: userDataError,
        isLoading: userDataisLoaading,
    } = useMoralisQuery('_User')




    const getBalance = async () => {
        try {
            if (!isAuthenticated || !currentAccount) {
                return
            }
            const options = {
                contractAddress: gravityCoinAddress,
                //Openzepplin ERC-20 contract has 'balanceOf' function
                functionName: 'balanceOf',
                abi: gravityCoinAbi,
                params: {
                    account: currentAccount,
                },
            }

            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options) //response will be hexadecimal
                // console.log(response.toString())
                setBalance(response.toString())
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const listenToUpdates = async () => {
        let query = new Moralis.Query('EthTransactions')
        let subscription = await query.subscribe()
        subscription.on('update', async object => {
            console.log('New Transactions')
            console.log(object)
            setRecentTransactions([object])
        })
    }






    //useEffect runs at 3 different points in component life cycle: 
    //1) When the component is mounted
    //2) When the component is updating
    //3) When the component is unmounted
    //with dependency we can control when we want our side effect to run 
    //if left blank, its only going to run when the component first loads
    useEffect(() => {
        ; (async () => {
            if (!isWeb3Enabled) {
                await enableWeb3()
            }

            if (isAuthenticated) {
                await getBalance()
                await listenToUpdates()
                const currentUsername = await user?.get('nickname') //optional chaining
                setUsername(currentUsername)
                const account = await user?.get('ethAddress')
                setCurrentAccount(account)
            }
        })()
    }, [isWeb3Enabled, isAuthenticated, user, username, currentAccount, getBalance, listenToUpdates])

    useEffect(() => {
        ; (async () => {
            if (isWeb3Enabled) {
                await enableWeb3()
                await getProducts()
                await getOwnedProducts()

            }
        })()
    }, [isWeb3Enabled, productsData, productsDataisLoading])







    const handleSetUsername = () => {
        if (user) {
            if (nickname) {
                //if we press 'Set Nickname' in sidebar, we check if there is a user connected and then check if there is something in the input field
                //and then add a column in the Moralis database called nickname
                user.set('nickname', nickname)
                //update our database
                user.save()
                //clear our input field (nickname) when we are done
                setNickname('')
            }
            else {
                console.log('Username input field is empty. Please fill it to set it')
            }
        }
        else {
            console.log('No user')
        }
    }


    const connectWallet = async () => {
        await enableWeb3()
        await authenticate()
    }

    const buyProduct = async (product, price) => {
        try {
            if (!isAuthenticated) {
                return
            }
            console.log('price: ', price)
            console.log('product: ', product.name)
            console.log(userData)
            const options = {
                type: 'erc20',
                amount: price,
                receiver: gravityCoinAddress,
                contractAddress: gravityCoinAddress,
            }
            let transaction = await Moralis.transfer(options)
            const receipt = await transaction.wait()

            if (receipt) {
                const res = userData[0].add('ownedProducts', {
                    ...product,
                    purchaseDate: Date.now(),
                    etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
                })

                await res.save().then(() => {
                    alert("Purchase Successful!")
                })
            }


        }
        catch (error) {
            console.log(error.message)
        }
    }

    const buyTokens = async () => {
        if (!isAuthenticated) {
            await connectWallet()
        }

        const amount = ethers.BigNumber.from(tokenAmount)
        //1GTC = 0.0001 Ether = 100000000000000 Wei
        const price = ethers.BigNumber.from('100000000000000')
        const calcPrice = amount.mul(price)

        console.log(gravityCoinAddress)

        let options = {
            contractAddress: gravityCoinAddress,
            functionName: 'mint',
            abi: gravityCoinAbi,
            msgValue: calcPrice,
            params: {
                amount,
            },
        }
        const transaction = await Moralis.executeFunction(options)
        const receipt = await transaction.wait(2)
        setIsLoading(false)
        console.log(receipt)
        setEtherscanLink(
            `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
        )
    }


    const getProducts = async () => {
        try {
            await enableWeb3()
            // console.log('RUNNING')
            setProducts(productsData)
        }
        catch (error) {
            console.log(error)
        }
    }

    const getOwnedProducts = async () => {
        try {
            // let query = new Moralis.Query('_User')
            // let results = await query.find()

            if (userData[0].attributes.ownedProducts) {
                setOwnedItems(prevItems => [
                    ...prevItems,
                    userData[0].attributes.ownedProducts,
                ])
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <GravityContext.Provider
            //anything that is inside these curly brackets is what will be global
            value={{
                isAuthenticated,
                nickname,
                setNickname,
                username,
                handleSetUsername,
                products,
                getBalance,
                balance,
                setTokenAmount,
                tokenAmount,
                amountDue,
                setAmountDue,
                isLoading,
                setIsLoading,
                etherscanLink,
                setEtherscanLink,
                currentAccount,
                buyTokens,
                buyProduct,
                recentTransactions,
                ownedItems
            }}
        >
            {children}
        </GravityContext.Provider>
    )
}
















