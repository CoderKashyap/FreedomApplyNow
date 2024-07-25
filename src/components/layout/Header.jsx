import React from 'react'
import freedomLogo from "/freedomLogo.svg";
import CallIcon from '@mui/icons-material/Call';

const Header = () => {
    return (<>
        <div className='text-white flex justify-around items-center bg-black px-6 py-12'>
            <span><img src={freedomLogo} alt="freedomLogo" width={244} height={51} /></span>
            <div className='flex justify-center items-center gap-3 border py-2 px-3 rounded-lg border-[#D9D9D9]'>
                <span className='rounded-full px-2 py-1.5 bg-blue-400'> <CallIcon fontSize='small' /> </span>
                <span className='font-semibold font-sora'>(+1) 866 944 7778</span>
            </div>
        </div>
    </>
    )
}

export default Header;