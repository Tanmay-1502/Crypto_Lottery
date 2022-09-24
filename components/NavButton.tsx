import React from 'react'
interface Props{
    title:string;
    isActive?: boolean;
    onClick?: ()=> void;

}
function NavButton({title, isActive, onClick}: Props) {
  return (
    
<button 
onClick={onClick}
className={`${isActive && "bg-[#036756]" } text-white hover:bg-[#036756] py-2 px-4 rounded font-bold` }>
        {title}
        </button>
     
  )
}
//0xB7E6e3c9c9950b6fcBb2b45C3ed3fabBd34B5b56
export default NavButton