import React from 'react';

const Info = () => {
    const user = JSON.parse(localStorage.getItem('user'));

  
    return (
        <div className=" shadow-md rounded-lg" >

            <div className='w-full p-4 bg-white border-b rounded-xl  mb-2 text-3xl md:text-4xl text-center font-bold'>Profile</div>
            <div className=" w-full p-4 bg-white rounded-lg  mb-2 " >
                <p className='  font-semibold text-2xl md:text-3xl my-4'>{user?.username}</p>
                <p className=' font-semibold  text-2xl md:text-3xl'>{user?.email}</p>
            </div>

            <div className=" w-full p-4  bg-white rounded-lg border  ">
                <h1 className=" text-xl md:text-2xl font-bold mb-4 text-center">Profile Information</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xl">
                    <div>
                        <p className="font-semibold">Name:</p>
                        <p>{user?.name}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Email:</p>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Phone Number:</p>
                        <p>{user?.contactNumber ? user?.contactNumber : 'NA'}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Address:</p>
                        <p>{user?.address ? user?.address : 'NA'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;
