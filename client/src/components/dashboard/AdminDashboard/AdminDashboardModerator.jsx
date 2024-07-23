import React, { useEffect, useState } from "react";
import { getAllModerators } from "../../../operations/moderator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ModeratorAdminCard from "../../cards/ModeratorAdminCard";
import UpdateModeratorModel from "../../model/UpdateModeratorModel";
const AdminDashboardModerator = () => {
    const dispatch = useDispatch();
    const { moderator } = useSelector((state) => state);

    const fetchModerators = async () => {
        try {
            const response = await dispatch(getAllModerators());
            console.log("moderator response",response);
        } catch (error) {
            console.error("Error fetching moderators:", error);
        }
    };

    useEffect(() => {
        fetchModerators();
    }, []);

    const [openUpdateModel, setUpdateModel] = useState(false);
    const [updateModeratorData, setUpdateModerator] = useState("");

    return (
        <>
            <div className="flex flex-wrap justify-center  gap-2">
                {moderator?.allModerators?.length > 0 &&
                    moderator?.allModerators?.map((item, index) => (
                        <ModeratorAdminCard
                            setUpdateModel={setUpdateModel}
                            key={index}
                            address={item.address}
                            contact_number={item.contact_number}
                            email={item.email}
                            name={item.name}
                            username={item.username}
                            id={item.id}
                            setUpdateModerator={setUpdateModerator}
                        />
                    ))}
            </div>
            {openUpdateModel && (
                <UpdateModeratorModel
                    setUpdateModel={setUpdateModel}
                    updateModeratorData={updateModeratorData}
                />
            )}
        </>
    );
};

export default AdminDashboardModerator;
