import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Codeswear - Wear the Code</title>
        <meta name="description" content="codeswear.com - Wear the Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl  font-bold underline">
      Hello world!

    </h1>
    </div>
  )
}
