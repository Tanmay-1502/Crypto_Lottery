import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import {useAddress, useContract, useContractCall, useContractData} from '@thirdweb-dev/react'
import Login from '../components/Login'
import PropagateLoader  from 'react-spinners/PropagateLoader'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import CountTimer from '../components/CountTimer'
import toast from "react-hot-toast"
import Marquee from 'react-fast-marquee'
import Admin from '../components/Admin'
const Home: NextPage = () => {
  const address=useAddress();
  const [userTickets, setUserTickets]=useState(0);
  const {contract, isLoading}=useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
const {data: remainingTickets}=useContractData(
  contract, "RemainingTickets"
)
const {data:currentWinningReward}=useContractData(
  contract, "CurrentWinningReward"
)
const {data: ticketPrice}=useContractData(
  contract, "ticketPrice"
)

const {data:expiration}=useContractData(
  contract, "expiration"
)
const {data: winnings}=useContractData(
  contract, "getWinningsForAddress", address
)
const {mutateAsync:BuyTickets}=useContractCall(
  contract, "BuyTickets"
);
const {data:tickets}=useContractData(contract, "getTickets");

const {mutateAsync:WithdrawWinnings}=useContractCall(
  contract, "WithdrawWinnings"
)

const {data:lastWinner}=useContractData(contract, "lastWinner");
const{data: lastWinnerAmount}=useContractData(contract, "lastWinnerAmount")
  const {data: isLotteryOperator}=useContractData(
    contract, "lotteryOperator"
  )

useEffect(()=>{
  if(!tickets) return;
  const totalTickets: string[]=tickets;
  const noOfUserTickets=totalTickets.reduce(
    (total, ticketAddress)=> (ticketAddress===address? total+1:total),0
  )
  setUserTickets(noOfUserTickets);
},[tickets,address]);

const withdrawM=async ()=>{
  const notification=toast.loading("Withdrawing winnings")
  try{
    const data=await WithdrawWinnings([{}]);

    toast.success("Winnings withdrawn successfully", {
      id:notification,
    })
  } catch(err){
    toast.error("Something went wrong",{
      id:notification
    })
    console.error("contract call failure", err)
  }
}
const handleClick=async()=>{
  if(!ticketPrice) return;
  const notification=toast.loading("Buying your tickets...");
  
  try{
  const data=await BuyTickets([
    {
      value:ethers.utils.parseEther(
        (
          Number(ethers.utils.formatEther(ticketPrice))*quantity).toString()
      )
    }
  ])
  toast.success("Tickets purchased successfully", {
    id:notification,
  })
  console.info("contract call success", data)
  } catch(err){
    toast.error("Something went wrong!",{
       id: notification,
    })
    console.error("contract call failure", err)
  }
}
  const [quantity, setQuantity]=useState<number>(1);
//  if(!address) return <Login/>
  if(isLoading) return (
    <div className='bg-[#091B18] h-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center space-x-2 mb-10'>
      <Image className='rounded-full'
height={200}
width={200}
src={"https://images-platform.99static.com//OIVGByEHdx-cioj4XK2I1UGbiyE=/737x736:1473x1473/fit-in/500x500/99designs-contests-attachments/131/131508/attachment_131508449"}/>
      
      <h1 className='text-white'>
        Loading the draw
      </h1>
      </div>
      <PropagateLoader color='white' size={30}/>
    </div>
  ) 
  return (
   

    <div className="bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Crypto LOTTERY</title>
      </Head>
      <div className='flex-1'>
         <Header/>
         <Marquee className='bg-[#0a1f1c] p-5 mb-5' gradient={false} speed={100}>
<div className='flex space-x-2 mx-10'>
  <h4 className='text-white font-bold'>Last Winner: {lastWinner?.toString()}</h4>
  <h4 className='text-white font-bold'>Previous winnings:{" "}{lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount?.toString())}{" "}Matic</h4>
</div>
         </Marquee>

         {/* {isLotteryOperator===address && (
          <div className="flex justify-center">
            <Admin/>
          </div>
         )} */}
     {/* {winnings>0 &&( */}
      <div className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'>
        <button onClick={withdrawM} className='p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full'>
          <p className='font-bold'>CONGRATULATIONS YOU WON!!!</p>
          <p >Total winnings: {ethers.utils.formatEther(winnings.toString())}{" "}Matic</p>
        <br />
        <p className='font-semibold'>Click here to withdraw</p>
        </button>
      </div>
     {/* )} */}

     <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5'>
      <div className='stats-container'>
<h1 className='text-5xl text-white font-semibold text-center'>
The Next Draw
</h1>
<div className='flex justify-between p-2 space-x-2'>
<div className="stats">
  <h2 className='text-sm'>
    Total Pool
  </h2>
  <p className='text-xl'>
    {currentWinningReward && ethers.utils.formatEther(
      currentWinningReward.toString()
    )}{" "} Matic
  </p>

</div>
<div className="stats">
  <h2 className='text-sm'>
    Tickets Remaining
  </h2>
  <p className="text-xl">{remainingTickets?.toNumber()}</p>
</div>
</div>

<div className="mt-5 mb-3">
  <CountTimer/>
</div>
      </div>

      <div className="stats-container space-y-2">
        <div className="stats-container">
          <div className="flex justify-between items-center text-white pb-2">
            <h2 className='mr-1'>Price per ticket</h2>
            <p>{" "}
            {ticketPrice && ethers.utils.formatEther(
      ticketPrice.toString()
    )}{" "} Matic
            </p>
          </div>

          <div className="flex text-white items-center space-x-2 bg-[#091b18] border-[#004337] border p-4">
            <p>TICKETS</p>
            <input type="number" className="flex w-full bg-transparent text-right outline-none"
            min={1}
            max={10} value={quantity} 
            onChange={(e)=>setQuantity(Number(e.target.value))}/>
          </div>

          <div className="space-y-2 mt-5">
            <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
              <p>Total cost of tickets</p>
              <p>{ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString()))*quantity}{" "}  Matic</p>
            </div>
            <div className="flex items-center justify-between text-emerald-300 text-xs italic">
              <p>Service fees</p>
              <p>0.001 Matic</p>
            </div>
            <div className="flex items-center justify-between text-emerald-300 text-xs italic">
              <p>Network fees</p>
              <p>TBC</p>
            </div>
          </div>

          <button
          disabled={
            expiration?.toString< Date.now().toString() || remainingTickets?.toNumber()===0
          }
          onClick={handleClick}
          className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 font-semibold px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed">
            Buy {quantity} tickets for{" "}
            {ticketPrice && 
            Number(ethers.utils.formatEther(ticketPrice.toString()))*quantity}{" "} Matic
          </button>
        </div>

{/* {userTickets>0 && ( */}
        <div className='stats'>
          <p className='mb-2 text-lg'>You have {userTickets} Tickets in this draw</p>
          <div className='flex max-w-sm flex-wrap gap-x-2 gap-y-2'>
            {Array(8).fill("").map((_, index)=>(
              <p className='text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic' key={index}>{index+1}</p>
            ))}
          </div>
        </div>
      {/* )} */}

      </div>
     </div>
<footer className='border-t border-emerald-500/20 flex-1 items-center text-white justify-between p-5'>
<p className='text-xs text-center text-emerald-100 pl-5'>
  DISCLAIMER: Gambling can be addictive and may lead to finanacial problems. Play responsibly and at your own risk.
</p>
</footer>
    </div>
    </div>
  )
}

export default Home
