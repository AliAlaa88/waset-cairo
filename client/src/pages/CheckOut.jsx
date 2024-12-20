import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const [tourname, setTourname] = useState("");
  const [tickets, setTickets] = useState(9);
  const [discount, setDiscount] = useState(0);
  const [gourp, setGourp] = useState("");
  const [cost, setCost] = useState(100);
  const navigate = useNavigate();

  const handleGroupChange = (event) => {
    setGourp(event.target.value);
    setDiscount(tickets > 3 ? tickets : 0);
  };

  const handleCheckout = () => {
    navigate('/tourist-home');

  };

  return (
    <div className = "ckout-body">
      <div className="checkout-container">
        <h1 className = "ckout-title">Checkout</h1>

          <div className="dropdown-container">
            <label className = "tour-selectlabel">Choose a Tourist Group if exist:</label>
            <select className = "tour-select" value={gourp} onChange={handleGroupChange}>
              <option value="" disabled>
                Select a Group
              </option>
              <option value="T001">Group1 - The Great Pyramids</option>
              <option value="T002">Group2 - Nile River Cruise</option>
              <option value="T003">Group3 - Luxor Temple</option>
            </select>
          </div>

        <div className="summary">
          <p className = "ckout-tourName">Selected Tour Name: {tourname || "None"}</p>
          <p className = "ckout-Ntic">Number of Tickets: {tickets}</p>
          <p className = "ckout-discount">Discount: {discount}%</p>
          <p className = "ckout-totalcost">Total Cost: ${(tickets * cost - ((discount/100) * tickets * cost)).toFixed(2)}</p>
        </div>
        <button className = "ckout-btn" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default CheckOut;
