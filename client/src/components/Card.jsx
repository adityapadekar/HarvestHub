import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
Card.propTypes={
    backcolor:PropTypes.string,
    name:PropTypes.string,
    image:PropTypes.string,
    textColor:PropTypes.string,
    link:PropTypes.string
   
};

export default function Card({backcolor,name,image,textColor,link}) {
    
    
    // console.log("links",)
    const cardStyle={
        backgroundColor:backcolor,
        color:textColor
    
    }
    // const color=backcolor
    return (
        <>
           <Link to={`${link}`}>
           <div className={` xl:w-[270px] rounded-xl border-2 shadow-sm p-10 m-2 text-3xl font-poppins`} style={cardStyle}>
                <img className={`bg-${backcolor}`} src={image} alt="card image" />
                <figcaption className="w-full text-center">{name}</figcaption>
                
            </div>
           </Link>
        </>
    );
};
