import { useEffect, useState } from "react";

export default function getLocationCoordinates() {
    const [location,setLocation]=useState(null);

    useEffect(()=>{

        // check geolcation is supported by browser
        if(navigator.geolocation){
            // get current location
            navigator.geolocation.getCurrentPosition((position)=>{
                const {latitude,longitude}=position.coords;
                setLocation({latitude,longitude});
            },
            (error)=>{
                console.log("error in getting location",error.message);
            }
        
            );
        }else{
            console.log("Geolcation is not supported by browser");
        }

    },[]);


    // returning so i can use in another any component
    return location;
};
