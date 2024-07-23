import React from 'react';
import password from '../assets/password.svg';
import { useLocation } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const PasswordTemplate = () => {
    const location = useLocation();

    const matchRoute = (route) => {
        return location.pathname === route;
    }


  return (
    <div>
        <div className=' flex my-20'>
            <div className='w-[100%] sm:w-[95%] md:w-[90%] lg:w-[80%]  relative z-10  overflow-hidden gap-2 flex md:flex-row flex-col  items-center justify-center mx-auto  my-7 rounded-2xl pb-10 border-2 border-[#268FFF] bg-[#E7F3FF]'>
            {/* bg-gradient-to-b from-[#B0FFB1]  */}
                <img src={password} alt='password image' className='' />

                <div className=' items-start  '>
                    {
                        matchRoute('/forgot-password')
                            ? <ForgotPassword />
                            : <ResetPassword/>
                    }

                </div>

                <div className=' absolute h-[876px] w-[876px] rounded-full bg-[#ffffff] left-[55%]  -top-[45%] -z-20 md:block hidden border-2 border-[#268FFF]'></div>
            </div>
        </div>
    </div>
  )
}

export default PasswordTemplate