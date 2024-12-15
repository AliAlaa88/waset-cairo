import React, { useState } from "react";
import Lanch from "./Lanch";
import {Link} from 'react-router-dom';

function MyPackes() {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (packageId) => setActiveModal(packageId);
    const closeModal = () => setActiveModal(null);
    const handelDelete = {};

    return (
        <>
            <h2 className="my-Packes">My Packages</h2>
            <div className="tourToLanch">

                <div className="m-4 flex justify-end">
                    <Link to="/insert-monument">
                        <button className="w-40 mr-2 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700">
                            Add a Monument
                        </button>
                    </Link>
                    <button className="w-48 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700">
                        Create a Tour Package
                    </button>
                </div>
                
                <div className="LGroup">
                    {/* Tour Package 1 */}
                    <div className="tour-item">
                        TourPack1
                        <button className="LanchButton" onClick={() => openModal("TourPack1")}>
                            Launch
                        </button>
                        <button className="tdeleteButton" onClick={() => handelDelete()}>
                            Delete
                        </button>
                        <Lanch
                            visible={activeModal === "TourPack1"}
                            closeModal={closeModal}
                        />
                    </div>
                    <br/>
                    {/* Tour Package 2 */}
                    <div className="tour-item">
                        TourPack2
                        <button className="LanchButton" onClick={() => openModal("TourPack2")}>
                            Launch
                        </button>
                        <button className="tdeleteButton" onClick={() => handelDelete()}>
                            Delete
                        </button>
                        <Lanch
                            visible={activeModal === "TourPack2"}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPackes;