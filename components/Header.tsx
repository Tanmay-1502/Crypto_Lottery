import React from 'react'
import Image from 'next/image'
import NavButton from './NavButton'
import{Bars3BottomRightIcon} from '@heroicons/react/24/solid'

import {useAddress, useDisconnect} from '@thirdweb-dev/react'
function Header() {
  const address=useAddress();
  const disconnect=useDisconnect();

  return (
    <header className='grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5'>
    <div className='m-2 flex items-center space-x-2'>
        
<Image className='rounded-full'
height={100}
width={100}
src={"https://images-platform.99static.com//OIVGByEHdx-cioj4XK2I1UGbiyE=/737x736:1473x1473/fit-in/500x500/99designs-contests-attachments/131/131508/attachment_131508449"}/>
       
        <div>
        <h1 className='text-white font-bold text-lg'>
   lottery dapp
        </h1>
<p className='text-xs text-emerald-500 truncate'>
    User: {address?.substring(0,5)}...{address?.substring(address.length,address.length-5)}
</p>
        </div>
        </div>

        <div className='hidden md:flex items-center justify-center round-md md:col-span-3'>
            <div className='bg-[#0A1F1c] space-x-1'>
                <NavButton isActive title="BUY Tickets"/>
                <NavButton onClick={disconnect} title="LOGOUT" />
            </div>
        </div>

        <div className='ml-auto flex flex-col text-right'>
          <Bars3BottomRightIcon className='h-8 mx-auto text-white cursor-pointer'/>
          <span className='md:hidden'>
            <NavButton onClick={disconnect} title='LOGOUT'/>
          </span>
          </div>

    </header>
  )
}

export default Header