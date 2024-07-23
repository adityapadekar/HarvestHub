import { useEffect } from "react";
// import { getUserInfo } from "../redux/slices/auth";
import { useDispatch } from "react-redux";

// Convert the function to a functional component or a custom hook
const GetUserInfoComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const callUserInfoDispatch = async () => {
            // await dispatch(getUserInfo());
        };

        callUserInfoDispatch();
    }, []);

    return null; // You might return JSX here if needed
};

export default GetUserInfoComponent;
