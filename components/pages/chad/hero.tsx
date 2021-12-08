import tw from "twin.macro"
import Link from "next/link"

function Hero() {
    return (
        <div>
            <div tw="md:flex flex-col items-center hidden">
                <img tw="z-10" src="/assets/images/CHAD2.svg" alt="" />
                <div tw=" flex text-7xl flex-col items-center text-black border-4 cursor-pointer border-black bg-white rounded-3xl px-24 py-8 margin-top[-93px] hover:(background-color[#004FCE] text-white)">
                    <a href="https://app.defikingdoms.com/#/" target="_blank">
                        FUCKING BUY CHAD
                    </a>

                </div>
            </div>
            <div tw="flex flex-col space-y-6 width[30%] font-size[28px] leading-6 tracking-tighter text-white z-20 absolute top-16 left-8">
                <h1 tw="text-5xl text-center">FUCKING TOKENOMICS</h1>
                <span>
                    70% Liquidity <br /> 20% Airdrops <br /> 10% Partnerships <br /> 0% Dev
                </span>
                <span tw="pr-12">
                    0.369 Chad is minted on each block, the farms have a deposit fee which is used to buyback and burn Chad
                </span>
            </div>
            <div tw="flex flex-col space-y-6 width[30%] 2xl:text-3xl text-2xl text-center text-white z-20 absolute top-16 right-8 leading-8 tracking-tighter">
                <h1 tw="text-5xl ">What is CHAD?</h1>

                <span tw="">
                    Chad is a yield farming token on Harmony & Fantom created to help build liquidity for meme projects!
                </span>
            </div>
        </div >
    )
}

export default Hero
