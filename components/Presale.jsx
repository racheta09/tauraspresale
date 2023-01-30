import {
    Alert,
    AlertTitle,
    Box,
    Button,
    ButtonGroup,
    Container,
    Grid,
    Paper,
    Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import Web3 from "web3"
import millify from "millify"

import MetamaskSVG from "../assests/MetamaskSVG.js"
import BscSVG from "../assests/BscSVG.js"

import TaurasSeller from "../assests/json/TaurasSeller.json"
import ERC20 from "../assests/json/IERC20.json"
import Aggregator from "../assests/json/AggregatorV3Interface.json"

import { PresaleContent } from "./PresaleContent"
import Image from "next/image.js"

let web3, taurasseller, busdContract, aggregator
export const Presale = () => {
    const activeNetwork = 56 // 97
    const busdAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    const aggregatorAddress = "0x87Ea38c9F24264Ec1Fff41B04ec94a97Caf99941"
    // const busdAddress = "0xE0dFffc2E01A7f051069649aD4eb3F518430B6a4" // testnet
    // const aggregatorAddress = "0x0630521aC362bc7A19a4eE44b57cE72Ea34AD01c" //testnet

    const [account, setAccount] = useState(0)
    const [chainID, setChainID] = useState(0)
    const [sold, setSold] = useState(0)
    const [end, setEnd] = useState(false)
    const [bnbbal, setBnbbal] = useState(0)
    const [busdbal, setBusdbal] = useState(0)
    const [bnbtext, setBnbtext] = useState(0)
    const [busdtext, setBusdtext] = useState(0)
    const [txhash, setTxhash] = useState(0)
    const [error, setError] = useState(false)
    const [bnbusd, setBnbusd] = useState(0)
    const [trcbnb, setTRCbnb] = useState(0)
    const [trcbusd, setTRCbusd] = useState(0)
    const [rate, setRate] = useState(0)
    const [remainingtokens, setRemainingtokens] = useState(0)
    const [isWalletInstalled, setIsWalletInstalled] = useState(false)

    useEffect(() => {
        if (window.ethereum || window.BinanceChain) {
            setIsWalletInstalled(true)
        } else {
            setIsWalletInstalled(false)
        }
    }, [])

    let presaleData = {
        sold,
        bnbbal,
        busdbal,
        error,
        trcbnb,
        trcbusd,
        bnbusd,
        bnbtext,
        busdtext,
        bnbChange,
        busdChange,
        buyTRCwithBNB,
        buyTRCwithBUSD,
        txhash,
        remainingtokens,
    }

    // const ourMediaQuery = useMediaQuery("(min-width:800px)")

    async function addmetaprovider() {
        web3 = new Web3(window.ethereum)
        const chain = await web3.eth.getChainId()
        console.log(chain)
        setChainID(chain)
        if (chain === activeNetwork) {
            await getAccount()
        }
    }

    async function addbcwprovider() {
        web3 = new Web3(window.BinanceChain)
        const chain = await web3.eth.getChainId()
        console.log(chain)
        setChainID(chain)
        if (chain === activeNetwork) {
            await getAccount()
        }
    }

    async function getAccount() {
        const accounts = await web3.eth.requestAccounts()
        console.log(accounts[0])
        setAccount(accounts[0])
        const bnbBalance = (await web3.eth.getBalance(accounts[0])) / 10 ** 18
        console.log(bnbBalance)
        setBnbbal(bnbBalance.toFixed(4))
        busdContract = new web3.eth.Contract(ERC20.abi, busdAddress)
        let busdBalance =
            (await busdContract.methods.balanceOf(accounts[0]).call()) /
            10 ** 18
        console.log(busdBalance)
        setBusdbal(busdBalance.toFixed(4))
        taurasseller = new web3.eth.Contract(
            TaurasSeller.abi,
            TaurasSeller.networks[activeNetwork].address
        )
        let tokensSold = await taurasseller.methods.tokensSold().call()
        setSold(parseFloat(tokensSold) * 10 ** -18)
        let ended = await taurasseller.methods.saleEnded().call()
        setEnd(ended)
        let _rate = await taurasseller.methods.rate().call()
        setRate(_rate)
        let _remainingtokens = await taurasseller.methods.remainingTokens().call()
        setRemainingtokens(_remainingtokens * 10 ** -18)
        console.log(remainingtokens)
        console.log(tokensSold, ended, rate)
        aggregator = new web3.eth.Contract(Aggregator.abi, aggregatorAddress)
        let bprice = await aggregator.methods.latestAnswer().call()
        setBnbusd((1 / (bprice * 10 ** -18)).toFixed(4))
        console.log((1 / (bprice * 10 ** -18)).toFixed(4))
        // let bprice = await fetch(
        //     'https://api.coingecko.com/api/v3/coins/binancecoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false',
        // )
        // let bnbprice = await bprice.json()
        // console.log(bnbprice.market_data.current_price.usd)
        // setBnbusd(bnbprice.market_data.current_price.usd)
    }

    function bnbChange(event) {
        let value = event.target.value
        setBnbtext(value)
        setTRCbnb(millify(value * rate))
    }

    function busdChange(event) {
        let value = event.target.value
        setBusdtext(value)
        setTRCbusd(millify((value / bnbusd) * rate))
    }

    async function buyTRCwithBNB() {
        try {
            if (bnbtext === 0) {
                throw new Error({ message: "Cannot Buy 0 TRC" })
            }
            let sold = await taurasseller.methods.buyTRCwithBNB().send({
                from: account,
                value: web3.utils.toWei(bnbtext.toString()),
                gas: "300000",
                gasPrice: "10000000000",
            })
            setError(false)
            setTxhash(sold["transactionHash"])
            console.log(txhash)
            await getAccount()
        } catch (error) {
            setError(error)
            console.error(error)
        }
    }

    async function buyTRCwithBUSD() {
        try {
            if (busdtext === 0) {
                throw new Error({ message: "Cannot Buy 0 TRC" })
            }
            let allowed = await busdContract.methods
                .allowance(account, TaurasSeller.networks[activeNetwork].address)
                .call()
            // console.log((web3.utils.fromWei(allowed) * 10 ** 18) >= parseInt(web3.utils.toWei(busdtext.toString())))
            if (
                web3.utils.fromWei(allowed) * 10 ** 18 >=
                parseInt(web3.utils.toWei(busdtext.toString()))
            ) {
                let sold = await taurasseller.methods
                    .buyTRCwithBUSD(web3.utils.toWei(busdtext.toString()))
                    .send({
                        from: account,
                        gas: "300000",
                        gasPrice: "10000000000",
                    })
                setError(false)
                setTxhash(sold["transactionHash"])
                console.log(txhash)
                await getAccount()
            } else {
                let approved = await busdContract.methods
                    .approve(
                        TaurasSeller.networks[activeNetwork].address,
                        web3.utils.toWei(busdtext.toString())
                    )
                    .send({ from: account })
                setError({ message: "BUSD Approved Successfully" })
                setTxhash(approved["transactionHash"])
                console.log(txhash)
                await buyTRCwithBUSD()
            }
        } catch (error) {
            setError(error)
            console.error(error)
        }
    }

    async function addtrctoken() {
        const tokenAddress = "0xc67e20354aae72f669cde0a66c37c1c5cc0dd752"
        const tokenSymbol = "TRC"
        const tokenDecimals = 18
        const tokenImage =
            "https://taurascoin.io/dashboard/data/images/logo.png"

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20", // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            })

            if (wasAdded) {
                console.log("Thanks for your interest!")
            } else {
                console.log("Your loss!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const ConnectButtons = () => (
        <ButtonGroup
            // orientation={ourMediaQuery ? `horizontal` : `vertical`}
            orientation="vertical"
            variant="contained"
            color="primary"
            aria-label="text primary button group"
            sx={{
                padding: "10px",
                margin: "10px",
            }}
        >
            <Button onClick={addmetaprovider} startIcon={<MetamaskSVG />}>
                Metamask
            </Button>
            <Button onClick={addbcwprovider} startIcon={<BscSVG />}>
                Binance Chain Wallet
            </Button>
            <Button
                onClick={addtrctoken}
                startIcon={
                    <Image src="/logo.png" alt="logo" width="32" height="32"/>
                }
            >
                Add TRC to Metamask
            </Button>
        </ButtonGroup>
    )

    const NoMetamask = () => (
        <Container align="center">
            <Button
                color="primary"
                variant="contained"
                target="_blank"
                href="https://docs.binance.org/wallets/bsc-wallets.html"
            >
                Install BSC Supported Wallet
            </Button>
        </Container>
    )

    const PresaleEnd = () => (
        <Grid container justify="center" align="center">
            <Alert severity="success">
                <AlertTitle>PreSale Ended</AlertTitle>
            </Alert>
        </Grid>
    )

    const NotSupportedNetwork = () => (
        <Grid container item justify="center" align="center">
            <Alert severity="error">
                <AlertTitle>
                    Not Supported Network({chainID}). Switch to BSC Mainnet.
                </AlertTitle>
            </Alert>
        </Grid>
    )

    return (
        <main>
            <Paper
                sx={{
                    padding: "1rem",
                    margin: "1rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "rgba(12,12,12,0.5)",
                    textAlign: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    letterSpacing: "0.1rem",
                    border: "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "0px 0px 10px rgba(238,45,15,0.1)",
                }}
            >
                <h1>Private Sale</h1>
                <Grid
                    container
                    spacing={3}
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Grid
                        item
                        sm={12}
                        lg={6}
                        sx={{
                            padding: "20px",
                        }}
                    >
                        <Image src="/logo.png" alt="logo" width="200" height="200"/>
                        <Typography variant="h4">Token Sale is Live</Typography>
                        <Typography variant="h5">0.06USDT/TRC</Typography>
                    </Grid>
                    <Grid item sm={12} lg={6}>
                        {isWalletInstalled ? (
                            end ? (
                                <PresaleEnd />
                            ) : chainID !== activeNetwork && chainID !== 0 ? (
                                <NotSupportedNetwork />
                            ) : account ? (
                                <PresaleContent {...presaleData} />
                            ) : (
                                <ConnectButtons />
                            )
                        ) : (
                            <NoMetamask />
                        )}
                        <Box mt={3}>
                            Contract Address to add to the wallet <br />{" "}
                            <code>
                                0xc67e20354aae72f669cde0a66c37c1c5cc0dd752
                            </code>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </main>
    )
}
