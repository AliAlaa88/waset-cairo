import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Report(){
    const [tourId, settourId] = useState()
    //const [gaideTorust,setgaideTourtId] = useState();
    const [discription, setdiscription] = useState('');
    const [date, setdate] = useState('');
    const [rating, setrating] = useState();
    const navigate = useNavigate();
    function submit(){
        console.log("done");
        const today = new Date().toISOString().split("T")[0];
        setdate(today);
        navigate('profile');
    }


    return (
        <div className = "report-contaner">
            
            <form className = "rpForm" onSubmit={submit}>
            <h2 className = "report-tital">Report</h2>
                <div className = "rp-inputs">
                    <input className = "rp-input" type= "text" 
                    placeholder="Enter the tour id"
                    required
                    value = {tourId}
                    onChange={(e) => settourId(e.target.value)}/>

                    <textarea className = "rp-input"
                    type="text"
                    cols="18" rows="5"
                    placeholder="discription" 
                    value={discription} 
                    onChange={(e) => setdiscription(e.target.value)} 
                    />
                    <br></br>

                    <label className= "rp-rateLable">Rating</label>
                    <input className = "rp-input" type= "number"
                    min= "0" max= "5" step= "0.5"
                    placeholder="rate from 1 to 5"
                    required
                    value = {rating}
                    onChange={(e) => setrating(e.target.value)}
                    />



                </div>
                <div className="rp-buttons">
                <button className="rp-cancleBtn" type="button" >Cancle</button>
                <button className="rp-submitBtn" type="submit">submit</button>
                </div>
            </form>
        </div>
    );
}

export default Report