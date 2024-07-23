import React, { useState } from 'react';
import Info from '../components/Profile/Info';
import Setting from '../components/Profile/Setting';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate=useNavigate();
    const [profile, setProfile] = useState(true);
    const [settings, setSettings] = useState(false);


    const handleProfile = () => {
        setProfile(true);
        setSettings(false);
      
    }

    const handleSetting = () => {
        setProfile(false);
        setSettings(true);
     
    }

    const handleLogout = () => {
        
        localStorage.removeItem('user');
        navigate("/login")

    }

    const user = JSON.parse(localStorage.getItem('user'));



    
    return (
        <div className="flex flex-wrap justify-center  md:mt-3  py-10 gap-6 rounded-lg">

            <div className="bg-white rounded-lg shadow-md text-xl p-14  text-center h-fit font-poppins flex items-center justify-center flex-col">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="User Avatar" className="rounded-full mx-auto mb-4 h-[150px] flex items-center justify-center" />
                <button className={`px-3 my-3 ${profile ? 'bg-green-500 text-white py-1 rounded-md' : ''} w-full`} onClick={handleProfile}>Profile</button>
                <button className={`px-3 my-3 ${settings ? 'bg-green-500 text-white py-2 rounded-md' : ''} w-full`} onClick={handleSetting}>Settings</button>
                <button className={`px-3 my-3 hover:bg-green-300 hover:text-white py-2 rounded-md  w-full`} onClick={handleLogout}>Logout</button>
            </div>

            <div className="sm:w-[50%]">

                {profile && <Info />}
                {settings && <Setting />}
               

            </div>
        </div>
    );
}

export default Profile;
