import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllMarkets } from "../../operations/markets";
import { updateModerator } from "../../operations/moderator";
import PropTypes from "prop-types";
import Select from "react-select";
export default function UpdateModeratorModel({
    setUpdateModel,
    updateModeratorData,
}) {
    const dispatch = useDispatch();

    const { market } = useSelector((state) => state);
    const [searchValue, setSearchValue] = useState(undefined);
    const [operation, setOperation] = useState("");

    const handleMarketChange = (selectedOption) => {
        setSearchValue(selectedOption);
    };

    const fetchAllMarkets = async () => {
        const data = await dispatch(getAllMarkets());
    };

    useEffect(() => {
        fetchAllMarkets();
    }, []);

    const moderatorMArketMAppingOperations = ["assign", "unassign", "reassign"];

    const handelUpdateModerator = async () => {
        console.log("inside")
        if(searchValue === undefined ){
            return;
        }

        console.log("search val " , searchValue)
        
        const data =  dispatch(
            updateModerator({ updateModeratorData, searchValue, operation }),
        );

        console.log(data)

    };
  
    return (
        <div className=" absolute inset-0 flex h-[110%]  items-center justify-center bg-black bg-opacity-90">
            <div className="flex flex-col gap-2 rounded-md bg-white p-4 ">
                <div
                    className="w-full rounded-full pr-10 text-center text-2xl shadow-md"
                    onClick={() => setUpdateModel(false)}
                >
                    Close
                </div>
                <h1 className="w-full border bg-green-700 py-2 text-center text-2xl font-semibold ">
                    Update Moderator
                </h1>
                <div className="flex  items-center justify-center  gap-2 rounded-md border p-2 text-center ">
                    <p>Moderator Name :</p>
                    <p className=" px-2 py-1  text-center text-gray-400 outline-none">
                        {updateModeratorData?.name}
                    </p>
                </div>
                <div className="flex  items-center justify-center  gap-2 rounded-md border p-2 text-center ">
                    <p>Moderator UserName :</p>
                    <p className=" px-2 py-1  text-center text-gray-400 outline-none">
                        {updateModeratorData?.username}
                    </p>
                </div>
                <div className="flex  items-center justify-center  gap-2 rounded-md border p-2 text-center ">
                    <p>Moderator Email :</p>
                    <p className=" px-2 py-1  text-center text-gray-400 outline-none">
                        {updateModeratorData?.email}
                    </p>
                </div>
                <div className="flex  items-center justify-center  gap-2 rounded-md border p-2 text-center ">
                    <p>Moderator Address :</p>
                    <p className=" px-2 py-1  text-center text-gray-400 outline-none">
                        {updateModeratorData?.address
                            ? updateModeratorData?.address
                            : "No Address Provided"}
                    </p>
                </div>
                <div className="flex  items-center justify-center  gap-2 rounded-md border p-2 text-center ">
                    <p>Moderator Address :</p>
                    <p className=" px-2 py-1  text-center text-gray-400 outline-none">
                        {updateModeratorData?.contact_number
                            ? updateModeratorData?.contact_number
                            : "No Contact Number Provided"}
                    </p>
                </div>
                <div className="flex flex-col  gap-2 p-2 text-center ">
                    <label htmlFor="product name">Select Market</label>
                    <Select
                        options={market?.allMarkets?.map((item) => ({
                        
                            value: item.id,
                            label: item.market_name,
                        }))}
                        onChange={handleMarketChange}
                        placeholder="Select Market"
                    />
                </div>

                <div className="flex flex-col gap-2  p-2  text-center ">
                    <label htmlFor="product name">Select OPerations</label>
                    <Select
                        options={moderatorMArketMAppingOperations?.map(
                            (item, index) => ({
                                value: item,
                                label: item,
                            }),
                        )}
                        onChange={(selectedOption) =>
                            setOperation(selectedOption)
                        }
                        placeholder="Select Operation"
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        onClick={handelUpdateModerator}
                        className="rounded-md border bg-green-600 px-10 py-1 text-white "
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

UpdateModeratorModel.propTypes = {
    setUpdateModel: PropTypes.func.isRequired,
    updateModeratorData: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.string,
        contact_number: PropTypes.string,
    }).isRequired,
};
