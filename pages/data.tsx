import Head from 'next/head'
import tw from 'twin.macro'
import Counter from "../components/pages/home/counter"
import SocialIcon from "../components/social"
import { ethers } from 'ethers'
import Nav from '../components/nav'
import { useState,useEffect,useContext } from 'react'
import FarmsContext from '../context/FarmsContext'

export default function Data() {
    const { lpFarms, singleStakeFarms, prices } = useContext(FarmsContext)
    const [chadBurnt, setChadBurnt] = useState("loading")
    const [tvl, setTvl] = useState("loading")
  
    useEffect(() => {
        calculateTvl()
        getChadBurnt()
    }, [lpFarms, singleStakeFarms, prices])

    const calculateTvl = async () => {
      if (lpFarms && singleStakeFarms && prices) {  
        const lpTokens = lpFarms.map(f => f.pool.stakedToken)
        const singleTokens = singleStakeFarms.map(f => f.pool.stakedToken)
        const allTokens = [...lpTokens, ...singleTokens]
  
        const tvls = await Promise.all(allTokens.map(token => token.getTvl(prices)))
        const totalTvl = tvls.reduce((sum, tvl) => parseFloat(tvl) + sum, 0)
  
        setTvl(totalTvl.toLocaleString('en-US', { style: 'currency', currency: 'USD'}))
      }
    }

    const getChadBurnt = async () => {
        const provider = new ethers.providers.JsonRpcProvider("https://api.harmony.one")
        const CHAD_TOKEN_ADDRESS = "0x107fBFEe852fE413EBAA1551015944D72F90767C"
        const ERC20_ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }]
        const chadMasterContract = new ethers.Contract(CHAD_TOKEN_ADDRESS, ERC20_ABI, provider);
        const chadBurnt = await chadMasterContract.balanceOf("0x0000000000000000000000000000000000000001")
        let chadBurtFormatted = parseFloat(ethers.utils.formatEther(chadBurnt)) 
        setChadBurnt(chadBurtFormatted.toLocaleString('en-US', {}))
    }

    let burn = getChadBurnt()
    return (
        <div tw="font-family[Tempest] height[100vh] md:hidden">
            <Head>
                <title>Data | Chad Finance</title>
                <meta name="description" content="Chad Finance" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div tw="h-full flex flex-col background-color[#004FCE]">
                <Nav />


                <div tw="flex flex-col h-full justify-between font-family[tempest] py-8">
                    {/* top */}
                    <div tw="flex flex-col items-center justify-around  space-y-2">
                        {/* featured image */}
                        <div tw=" mb-12">
                            <img tw="w-full" src="/assets/images/heroimage.svg" alt="" />
                        </div>

                        {/* Values */}

                        <div tw="flex flex-col items-center justify-around space-y-3 ">
                            <span tw="text-xl text-white">Fucking TVL</span>
                            <Counter value={tvl} />
                            <span tw=" mt-4 text-xl text-white">Fucking $Chad Burnt</span>
                            <Counter value={chadBurnt} />
                        </div>

                    </div>

                    <div tw="">
                        <SocialIcon />
                    </div>
                </div>
            </div>

        </div>
    )
}