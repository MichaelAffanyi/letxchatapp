import React from 'react'
import { 
    instagram_icon, 
    facebook_icon, 
    twitter_icon, 
    linkedin_icon 
} from '../../svg/Icons'

function Footer() {
  return (
    <div className='w-full h-[455px] bg-[#755D57E5] px-24 flex items-center justify-center text-white'>
        <div className='w-full flex justify-between'>
            <div>
                <div className='font-semibold text-5xl'>Logo</div>
                <span className=' text-xl'>Lorem ipsum dolor sit amet<br/> consectetur adipiscing </span>
                <div className='flex mt-16 gap-8'>
                    {instagram_icon}
                    {facebook_icon}
                    {twitter_icon}
                    {linkedin_icon}
                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer