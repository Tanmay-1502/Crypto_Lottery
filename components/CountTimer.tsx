import React from 'react'
import {useContract, useContractData} from "@thirdweb-dev/react"
import Countdown from 'react-countdown'

type Props={
    hours:number;
    minutes:number;
    seconds: number;
    completed:boolean;
}
function CountTimer() {

    const {contract}=useContract(
        process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
    )
    const{data:expiration, isLoading:isLoadingExpiration}=useContractData(
        contract, "expiration"
    )
    const renderer=({hours,minutes,seconds, completed}:Props)=>{
      if (completed){
        return (
            <div>
                <h2 className='text-white text-xl text-center animate-bounce'>
                    Ticket Sales have now CLOSED for this draw
                </h2>

                <div className='flex space-x-6'>
                
                <div className='flex-1'>
                    <div className='count animate-pulse' >{hours}</div>
                    <div className='count-label'>Hours</div>
                </div>

                <div className='flex-1'>
                    <div className='count animate-pulse'>{minutes}</div>
                    <div className='count-label'>Minutes</div>
                </div>
                <div className='flex-1'> 
                    <div className='count animate-pulse'>{seconds}</div>
                    <div className='count-label'>Seconds</div>
                </div>
            </div>

            </div>
        );
      }
      else {
        return (
            <div>
                <h3 className='text-white text-sm mb-2 italic'>
                    Time Remaining
                </h3>
                
                <div className='flex space-x-6'>
                
                <div className='flex-1'>
                    <div className='count' >{hours}</div>
                    <div className='count-label'>Hours</div>
                </div>

                <div className='flex-1'>
                    <div className='count'>{minutes}</div>
                    <div className='count-label'>Minutes</div>
                </div>
                <div className='flex-1'> 
                    <div className='count'>{seconds}</div>
                    <div className='count-label'>Seconds</div>
                </div>
            </div>
            </div>
        )
      }
    }
  return (
    <div>
        <Countdown date={new Date(expiration*1000)} renderer={renderer}/>
    </div>
  )
}

export default CountTimer