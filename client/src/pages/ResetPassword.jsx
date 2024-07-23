import React, { useState } from 'react';
import keyIcon from "../assets/password-key-icon.svg";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../operations/auth';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    
    const {token}=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")


    const handelResetPassword=async(e)=>{
        e.preventDefault()
        if(newPassword===confirmPassword){
            const data=await dispatch(resetPassword({newPassword,token})) 
            if (data?.payload?.status === true) {
                navigate("/login");
              }

        }else{
        }

        setNewPassword("")
        setConfirmPassword("")

    }


    return (
        <div className="  flex  flex-col justify-center items-center text-center">

            <img src={keyIcon} alt="key icon" className="mb-10"></img>
            <h1 className=" font-inter font-semibold text-2xl mb-5">Reset Password </h1>

            <form onSubmit={handelResetPassword} className=" flex flex-col justify-center items-center gap-4">
                <input
                    className=" m-2 bg-transparent border-b-2 border-[#A448FF] placeholder-[#A448FF] font-poppins font-medium text-2xl"
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={(e) => {
                        setNewPassword(e.target.value);
                    }}
                />

                <input
                    className=" m-2 bg-transparent border-b-2 border-[#A448FF] placeholder-[#A448FF] font-poppins font-medium text-2xl"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />


                <button type='submit'  className=" bg-[#A448FF] rounded-lg font-bold font-inter text-xs text-white py-2 px-3">Reset</button>

            </form>

        </div>
    );
}

export default ResetPassword