
import React, { useState } from "react";
import Lanch from "./Lanch";
import { Link } from "react-router-dom";
import { useGetOperatorEventsQuery } from "../store/userSlice";

function MyEvents() {
    const [activeModal, setActiveModal] = useState(null);

    const {data: events, isFetching: eventsFetching, isError: eventsError} = useGetOperatorEventsQuery();

    const openModal = (packageId) => setActiveModal(packageId);
    const closeModal = () => setActiveModal(null);
    const handelDelete = {};

    if(eventsFetching) return (<p>Loading...</p>);
    return (
        <>
            <div className="flex items-center bg-amber-50 rounded-xl p-6 shadow-md border border-gold-300">
                        <div className="flex-grow">
                            <h2 className="text-3xl text-center font-bold text-yellow-800 mb-2">My Events</h2>
                        </div>
            </div>
            <div className="eventToLanch">

                <div className="m-4 flex justify-end">
                    <Link to="/create-event">
                        <button className="w-40 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700">
                            Create an Event
                        </button>
                    </Link>
                </div>

                <div className="space-y-6">
                    {events?.map((event) => (
                    <div 
                        key={event.id} 
                        className="flex items-center bg-amber-50 rounded-xl p-6 shadow-md border border-gold-300 hover:bg-amber-100 transition-all duration-300"
                    >
                        <div className="flex-grow">
                            <h2 className="text-2xl text-yellow-700 mb-2">
                                {event.name}
                            </h2>
                        </div>
                        <button onClick={() => {openModal(event.id)}}
                        className="ml-6 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 hover:text-white transition-colors duration-300"
                        >
                            Launch Tour
                        </button>
                        <Lanch
                            visible={activeModal === event.id}
                            closeModal={closeModal}
                            type="event"
                            id={event.id}
                        />
                    </div>))}
                </div>
            </div>
        </>
    );
}

export default MyEvents;