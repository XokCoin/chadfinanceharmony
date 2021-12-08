import Price from "../types/Price"

const WONE_ADDRESS = "0xcf664087a5bb0237a0bad6742852ec6c8d69a27a"

const getOnePrice = async (): Promise<Price> => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=harmony&vs_currencies=usd')
  const data = await response.json()
  
  return {
    tokenAddress: WONE_ADDRESS,
    price: data.harmony.usd
  }
}

export default getOnePrice