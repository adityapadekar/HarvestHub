import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMarkets } from "../../../operations/markets";

// markets cards
import MarketAdminCards from "../../cards/MarketAdminCards";

const AdminDashboardMarket = () => {
    const dispatch = useDispatch();
    const { market } = useSelector((state) => state);

    const fetchAllMarkets = async () => {
        const data = await dispatch(getAllMarkets());
    };

    // fecth all markets when component loads
    useEffect(() => {
        fetchAllMarkets();
    }, []);
    return <>
        <div className="flex flex-wrap justify-center  gap-2">
            {market?.allMarkets?.length > 0 &&
                market?.allMarkets?.map((item, index) => (
                    <MarketAdminCards
                        // setUpdateModel={setUpdateModel}
                        key={index}
                        address={item.address}
                        contact_number={item.contact_number}
                        email={item.email}
                        name={item.name}
                        username={item.username}
                        id={item.id}
                        // setUpdateModerator={setUpdateModerator}
                    />
                ))}
        </div>
        {/* {openUpdateModel && (
            <UpdateModeratorModel
                setUpdateModel={setUpdateModel}
                updateModeratorData={updateModeratorData}
            />
        )} */}
    </>;
};

export default AdminDashboardMarket;
