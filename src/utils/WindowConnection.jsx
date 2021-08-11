import React, { useState, useEffect, useCallback } from 'react';
import { ethers, Signer } from "ethers"
import Address from '../components/Address'
import Network from '../components/Network'
import SendEth from '../components/SendEth'
import Chains from '../chains/chains.json'


const WindowConnection = () => {

    const [provider, setProvider] = useState(null)
    const [isProviderSet, setIsProviderSet] = useState(false);

    // Check if Metamask provider exist
    // Get the signer from the provider
    // All this at the end of the page load
    useEffect(() => {
        if (window.ethereum) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
            setIsProviderSet(true)
        } else {
            console.log('Please install MetaMask!');
            // @TOAST - danger - ***
        }

    }, [])

    const [signer, setSigner] = useState("")
    const getSigner = async () => {
        if (provider) {
            try {
                //L'obj signer fourni par le provider
                const providerSigner = await provider.getSigner(0)
                // getAdress =  methode fournis par l'obj getSigner()
                setSigner(await providerSigner.getAddress())
            } catch (error) {
                console.log(error)
                //TOAST: Pls Login to your Metamask
            }
        }
    }

    const [balance, setBalance] = useState("")
    const getBalance = async () => {
        if (signer) {
            try {
                const balanceByProvider = await provider.getBalance(signer)
            // Convert BN to Ether wth ethers.utils
            setBalance(await ethers.utils.formatEther(balanceByProvider))   
            } catch (error) {
                console.error(error)
            }
        }
    }

    const [explorerAddress, setExplorerAddress] = useState("")
    const createLink = async () => {
        try {
            setExplorerAddress(await networkProvider.explorers[0].url)
        } catch (error) {
            // TOAST: danger("🙅‍♀️ We can't find an explorer for this network !", 1000)
        }
    }

    const [currency, setCurrency] = useState({
        name: "",
        symbol: ""
    })

    const getCurrencySymbol = async () => {
        try {
            setCurrency({
                name: networkProvider.nativeCurrency.name,
                symbol: networkProvider.nativeCurrency.symbol
            })
        } catch (error) {
            setCurrency({
                name: "",
                symbol: ""
            })
            // danger("🙅‍♀️ We don't have this currency !", 1000)
        }
    }

    const [networkProvider, setNetworkProvider] = useState({})
    const getNetwork = async () => {
        if (provider) {
            const providerNetwork = await provider.getNetwork()
            for (let indexChains = 0; indexChains < Chains.length; indexChains++) {
                if (providerNetwork.chainId === Chains[indexChains].networkId) {
                    setNetworkProvider({ ...Chains[indexChains] })
                    break;
                }
            }
        }
    }

    const [isConnected, setIsConnected] = useState(false)
    const initSigner = () => {
        getSigner()
        getNetwork()
        createLink()
        getCurrencySymbol()
        getBalance()
        
        // console.info(balance)
        // console.info(networkProvider)
        setIsConnected(true)
    }

    useEffect(() => {
        initSigner()

    }, [provider])

    const [tx, setTx] = useState({
        from: "",
        to: "",
        amount: 0,
        amountWei: "",
        txHash: "",
        isMined: false,
      })
    // const sendEth = useCallback(
    //     async () => {
    //       tx.from = signer
    //       tx.txHash = ""
    //       // console.log(tx.amount)
    //       if (web3.utils.isAddress(tx.to) && tx.amount > 0) {
    //         tx.amountWei = web3.utils.toWei(tx.amount)
    //         console.log(tx)
    //         try {
    //           // send transaction
    //           await web3.eth.sendTransaction({ from: tx.from, to: tx.to, value: tx.amountWei })
    //             .on('sending', () => {
    //               // Then => Start loader
    //               setIsLoading(true)
    //               // Then => clear input at the end
    //               info("Transaction send ! \n Please confirm the transaction on metamask", 3000)
    //             })
    //             .on('transactionHash', (hash) => {
    //               // Then => update txHash and show
    //               setTx({txHash:hash}) 
    //               info("Tx Hash is here !", 8000)
    //             })
    //             .on('receipt', (receipt) => {
    //               // When is mined start toast validation transaction
    //               if (receipt.status) {
    //                 tx.isMined = true
    //                 // Stop Loading
    //                 setIsLoading(false)
    //                 clearInput()
    //                 info("Transaction has been confirmed !", 8000)
    //               }
    //             })
    //             // .on('error', danger("🤷‍♀️ Something went wrong !", 8000))
    
    //         } catch (error) {
    //           // console.log(error)
    //           if (error.code === 4001) {
    //             setIsLoading(false)
    //             danger(" 🙅‍♀️ You reject the transaction !", 8000)
    //           }
    //         }
    //       } else {
    //         if (!web3.utils.isAddress(tx.to)) danger("🤷‍♀️ Please enter a valid Address!", 8000)
    //         if (tx.amount === 0) danger("🤷‍♀️ Please enter a valid Amount!", 8000)
    //       }
    //     },
    //     [web3, accounts, tx]
    //   )
    return (
        <main className={"container"}>
            {
                isProviderSet ? (
                    <>
                        {/* InitWallet composant to show the button if false */}
                        <SendEth balance={balance} networkName={networkProvider.shortName} symbol={currency.symbol} func={initSigner} loader={""} tx={tx} />
                        <Network provider={networkProvider} address={signer} />
                        <Address signer={signer} explorer={explorerAddress} func={initSigner} />
                        {/* // Provider
                    // function send */}
                    </>
                ) : (
                    <h1>Install MetaMask</h1>
                    // Normal page
                )

            }
        </main>
    );
}

export default WindowConnection;
