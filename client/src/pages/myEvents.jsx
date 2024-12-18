
import React, { useState } from "react";
import Lanch from "./Lanch";
import { Link } from "react-router-dom";

function MyEvents() {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (packageId) => setActiveModal(packageId);
    const closeModal = () => setActiveModal(null);
    const handelDelete = {};

    return (
        <>
            <h2 className="my-Events">My Events</h2>
            <div className="eventToLanch">

                <div className="m-4 flex justify-end">
                    <Link to="/create-event">
                        <button className="w-40 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700">
                            Create an Event
                        </button>
                    </Link>
                </div>

                <div className="ELGroup">
                    {/* Event Package 1 */}
                    <div className="event-item">
                        EventPack1
                        <button className="eLanchButton" onClick={() => openModal("EventPack1")}>
                            Launch
                        </button>
                        <button className="edeleteButton" onClick={() => handelDelete()}>
                            Delete
                        </button>
                        <Lanch
                            visible={activeModal === "EventPack1"}
                            closeModal={closeModal}
                        />
                    </div>
                    <br/>
                    {/* Event Package 2 */}
                    <div className="event-item">
                        EventPack2
                        <button className="eLanchButton" onClick={() => openModal("EventPack2")}>
                            Launch
                        </button>
                        <button className="edeleteButton" onClick={() => handelDelete()}>
                        Delete
                        </button>
                        <Lanch
                            visible={activeModal === "EventPack2"}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyEvents;