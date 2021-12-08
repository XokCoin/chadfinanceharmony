import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preload"
                        href="/assets/fonts/tempestapacheexpandital.ttf"
                        as="font"
                        type="font/truetype"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/tempest/tempestapacheexpandital-webfont.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/tempest/tempestapacheexpandital-webfont.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/assets/fonts/Bangers.ttf"
                        as="font"
                        type="font/truetype"
                        crossOrigin=""
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument