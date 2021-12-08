import { ethers } from "ethers"
import getPendingRewards from "../helpers/getPendingRewards"
import LpToken from "./LpToken"
import Token from "./Token"

class Pool {
  stakedToken: Token | LpToken
  tvl: string
  apr: string
  allocationPoints: number
  pendingRewardsForUser: number
  usersDeposit: number
  fee: number
  pid: number
  ready: boolean
  masterChad: ethers.Contract

  constructor(stakedToken: Token | LpToken, allocationPoints: number, pid: number, fee: number, masterChad: ethers.Contract) {
    this.stakedToken = stakedToken
    this.allocationPoints = allocationPoints
    this.masterChad = masterChad
    this.pid = pid
    this.fee = fee

    this.ready = false
    this.tvl = "-1"
    this.apr = "-1"
    this.pendingRewardsForUser = -1
    this.usersDeposit = -1
  }

  async updatePool(userWalletAddress: string, prices: Map<string, ethers.BigNumber>): Promise<Pool> {
    await this.updateStakedTokenInfo(userWalletAddress)
    await Promise.all([this.updateApr(prices), this.updatePendingRewards(userWalletAddress), this.updateUsersDeposit(userWalletAddress)])

    return this
  }

  async updateStakedTokenInfo(userWalletAddress) {
    this.stakedToken = await this.stakedToken.getUpdated(userWalletAddress)
  }

  async updateTvl(prices) {
    this.tvl = await this.stakedToken.getTvl(prices)

    return this.tvl
  }

  async updateApr(prices: Map<string, ethers.BigNumber>) {
    const chadTokenAddress = "0x107fBFEe852fE413EBAA1551015944D72F90767C"
    const totalAllocPoints: ethers.BigNumber = await this.masterChad.totalAllocPoint()
    const poolAlloc = ethers.BigNumber.from(this.allocationPoints)
    const chadPerBlock: ethers.BigNumber = await this.masterChad.ChadPerBlock()
    const secondsInYear = ethers.BigNumber.from(60 * 60 * 24 * 365) // We make assumption that block time is 1 second
    const chadRewardsInYear = chadPerBlock.mul(secondsInYear).mul(poolAlloc).div(totalAllocPoints)
    const divider = ethers.BigNumber.from("1" + "0".repeat(18))

    const rewardsValue = chadRewardsInYear.mul(prices.get(chadTokenAddress)).div(divider)
    await this.updateTvl(prices)
    
    const rewardsValueAsNumber = parseFloat(ethers.utils.formatUnits(rewardsValue))
    const tvlAsNumber = parseFloat(this.tvl)
    const apr = rewardsValueAsNumber / tvlAsNumber * (100)

    this.apr = apr.toFixed(2)

    return this.apr
  }

  async updatePendingRewards(userAddress) {
    this.pendingRewardsForUser = await getPendingRewards(this.pid, userAddress, this.masterChad)

    return this.pendingRewardsForUser
  }

  async updateUsersDeposit(userAddress) {
    const userInfo = await this.masterChad.userInfo(this.pid, userAddress)
    const usersDeposit: ethers.BigNumber = userInfo.amount
    this.usersDeposit = parseFloat(ethers.utils.formatUnits(usersDeposit))

    return this.usersDeposit
  }
}

export default Pool