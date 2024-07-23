import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllItems } from "../../../operations/products";
const AdminDashboardProduct = () => {
    const dispatch = useDispatch();
    const fetchAllProducts = async () => {
        // const data = await dispatch(getAllItems());
        // console.log("data",data);
    };

    useEffect(() => {
        fetchAllProducts();
        
    }, []);
    return <div>AdminDashboardProduct</div>;
};


export default AdminDashboardProduct;
