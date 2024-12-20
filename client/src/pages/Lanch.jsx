import React, { useState } from "react";
import { useGetGuidesQuery } from "../store/userSlice";
import { useAddTourMutation, useUpdateTourMutation } from "../store/tourSlice";

function Lanch({ visible, closeModal, type, id, tourID }) {
    const {data: guides, isFetching} = useGetGuidesQuery();
    const [addTour] = useAddTourMutation();
    const [updateTour] = useUpdateTourMutation();

    const [numTicket, setnumTicket] = useState('');
    const [startDate, setstartDate] = useState(new Date().toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState('');
    const [tourGuide, settourGuide] = useState('');

    async function submit(event) {
        event.preventDefault();
        try{
            if(type === "package"){
                await addTour({
                    startDate: startDate,
                    endDate: endDate,
                    ticketCap: numTicket,
                    tourguideID: tourGuide,
                    tourpackageID: id
                }).unwrap();
            }
            else if(type === "event"){
                await addTour({
                    startDate: startDate,
                    endDate: endDate,
                    ticketCap: numTicket,
                    tourguideID: tourGuide,
                    eventID: id
                }).unwrap();
            }
            else if(type === "editpackage"){
                await updateTour({
                    id: tourID,
                    startDate: startDate,
                    endDate: endDate,
                    ticketCap: numTicket,
                    tourguideID: tourGuide,
                    tourpackageID: id
                }).unwrap();
            }
            else if(type === "editevent"){
                await updateTour({
                    id: tourID,
                    startDate: startDate,
                    endDate: endDate,
                    ticketCap: numTicket,
                    tourguideID: tourGuide,
                    eventID: id
                }).unwrap();
            }
            else return;

            alert("Launched Tour Successfully!");
            closeModal();
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }

    const handelchange = (event) => {
        settourGuide(event.target.value);
    };

    if (!visible) return null; // Render nothing if the modal is not visible
    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="La-container">
                    <form className="La-form" onSubmit={submit}>
                        <div className="La-inputs">
                            <label className="La-label">Choose Guide</label>
                            <select
                                className="La-input"
                                required
                                value={tourGuide}
                                onChange={handelchange}
                            >
                                <option value="" disabled>
                                    Select guide
                                </option>
                                {guides?.map((guide) => (
                                    <option key={guide.id} value={guide.id}>
                                        {guide.fname} {guide.lname}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <label className="La-label">Choose starting date</label>
                            <input
                                className="La-input"
                                type="date"
                                required
                                value={startDate}
                                //sets minimum allowable date as today (cannot choose previous dates)
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setstartDate(e.target.value)}
                            />
                            <br />
                            <label className="La-label">Choose end date</label>
                            <input
                                className="La-input"
                                type="date"
                                required
                                value={endDate}
                                //sets minimum allowable date as startdate (cannot choose previous dates)
                                min={startDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <br/>
                            <label className="La-label">Choose number of tickets</label>
                            <input
                                className="La-numticket"
                                type="number"
                                min="1"
                                max="50"
                                required
                                value={numTicket}
                                onChange={(e) => setnumTicket(e.target.value)}
                            />
                        </div>
                        <button className="La-submitBtn" type="submit">
                            Launch
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Lanch;