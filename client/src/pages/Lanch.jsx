import React, { useState } from "react";

function Lanch({ visible, closeModal }) {
    const [numTicket, setnumTicket] = useState();
    const [startDate, setstartDate] = useState('');
    const [tourGuide, settourGuide] = useState('');
    const guideOpthions = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
    ];

    function submit(event) {
        event.preventDefault(); // Prevent form from refreshing the page
        console.log("Form submitted!");
        closeModal(); // Close the modal after submission
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
                                    Select option
                                </option>
                                {guideOpthions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
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
                                onChange={(e) => setstartDate(e.target.value)}
                            />
                            <br />
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