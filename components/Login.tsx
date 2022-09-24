import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import {useMetamask} from "@thirdweb-dev/react";
function Login() {
  const connectWithMetamask=useMetamask();
  return (
    <div className='bg-[#091b18] min-h-screen flex flex-col items-center justify-center text-center'>
       <Head>
         <title>CRYPTO LOTTERY</title> 
      </Head>  
      <div className='flex flex-col items-center mb-10'>
        <Image className='rounded-full'
height={200}
width={200}
src={"https://images-platform.99static.com//OIVGByEHdx-cioj4XK2I1UGbiyE=/737x736:1473x1473/fit-in/500x500/99designs-contests-attachments/131/131508/attachment_131508449"}/>
       
       <h1 className='text-6xl p-4 text-white font-bold'>CRYPTO LOTTERY</h1>
       <h2 className='text-white p-4 text-xl'>Login with MetaMask to Play</h2>
       <button className='bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font bold'
       onClick={connectWithMetamask}>Login with MetaMask</button>
        </div>
    </div>
  )
}

export default Login
