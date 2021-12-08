import tw from "twin.macro"
import Link from "next/link"

function Hero() {
    return (
        <div>
            <div tw="md:flex flex-col items-center hidden">
                <img tw="z-10" src="/assets/images/CHAD2.svg" alt="" />
                <div tw=" flex text-7xl flex-col items-center text-black border-4 cursor-pointer border-black bg-white rounded-3xl px-24 py-8 margin-top[-93px] hover:(background-color[#004FCE] text-white)">
                    <a href="https://exchange.paintswap.finance/#/swap?outputCurrency=0x107fBFEe852fE413EBAA1551015944D72F90767C" target="_blank">
                        FUCKING BUY CHAD
                    </a>

                </div>
            </div>
            <div tw="flex flex-col space-y-6 width[30%] font-size[28px] leading-6 tracking-tighter text-white z-20 absolute top-16 left-8">
                <h1 tw="text-5xl text-center">TOKENOMICS</h1>
                <span>
                    55% pre-sale <br /> 30% liquidity <br /> 10% marketing & dev fund <br /> 5% airdrop
                </span>
                <span tw="pr-12">
                    .69 Chad is minted each block, the farms have a deposit fee which is used to buyback and burn Chad
                </span>
            </div>
            <div tw="flex flex-col space-y-6 width[30%] 2xl:text-3xl text-2xl text-center text-white z-20 absolute top-16 right-8 leading-8 tracking-tighter">
                <h1 tw="text-5xl ">What is CHAD?</h1>

                <span tw="">
                    Chad is a yield farming token on Fantom Opera created to help provide liquidity to other meme tokens, a launch pad, and support farming pools for new projects.
                </span>
            </div>
        </div >
    )
}

export default Hero
