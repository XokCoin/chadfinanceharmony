import { ethers } from "ethers"
import getTokenBalance from "../helpers/getTokenBalance"

class Token {
  address: string
  name: string
  symbol: string
  totalSupply: ethers.BigNumber
  decimals: number
  stakedOnFarm: ethers.BigNumber
  balanceInUserWallet: ethers.BigNumber
  contract: ethers.Contract
  tokens: string[]

  constructor(
    address: string, 
    name: string, 
    symbol: string, 
    totalSupply: ethers.BigNumber, 
    decimals: number, 
    staked: ethers.BigNumber = ethers.BigNumber.from(0), 
    balanceInUserWallet: ethers.BigNumber = ethers.BigNumber.from(0), 
    contract: ethers.Contract,
    tokens: string[]
    ) {
      this.address = address
      this.name = name
      this.symbol = symbol
      this.totalSupply = totalSupply
      this.decimals = decimals
      this.stakedOnFarm = staked
      this.balanceInUserWallet = balanceInUserWallet
      this.contract = contract
      this.tokens = tokens
  }

  async getTvl(prices: Map<string, ethers.BigNumber>): Promise<string> {
    const CHAD_MASTER_ADDRESS = "0x23c29a9a56D40507149059D3D4dB5a8FF342D366"

    let stringifiedTvl

    if (this.stakedOnFarm) {
      const tokenPrice = prices.get(this.tokens[0].toLowerCase())
      const tokenAmount = this.stakedOnFarm
      const lockedTvl = tokenPrice.mul(tokenAmount)
      stringifiedTvl = ethers.utils.formatUnits(lockedTvl, 36)
    } else {
      const tokenPrice = prices.get(this.tokens[0].toLowerCase())
      const tokenAmount = await getTokenBalance(this.contract, CHAD_MASTER_ADDRESS)
      this.stakedOnFarm = tokenAmount
      const lockedTvl = tokenPrice.mul(tokenAmount)
      stringifiedTvl = ethers.utils.formatUnits(lockedTvl, 36)
    }

    return stringifiedTvl.substring(0, stringifiedTvl.indexOf(".") + 2)
  }

  async getUpdated(userWalletAddress: string): Promise<Token> {
    const CHAD_MASTER_ADDRESS = "0x23c29a9a56D40507149059D3D4dB5a8FF342D366"
    const promiseResults = await Promise.all([getTokenBalance(this.contract, CHAD_MASTER_ADDRESS), getTokenBalance(this.contract, userWalletAddress)])
    const updatedStakeAmount = promiseResults[0]
    const updatedBalanceInUserWallet = promiseResults[1]

    return new Token(
      this.address, 
      this.name, 
      this.symbol, 
      this.totalSupply, 
      this.decimals, 
      updatedStakeAmount,
      updatedBalanceInUserWallet, 
      this.contract, 
      this.tokens)
  }
}

export default Token

