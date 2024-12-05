import { useState , useNavigate } from "react";

function Feedback(){
    const [tourId, settourId] = useState()
    //const [Torust,setTourtId] = useState();
    const [discription, setdiscription] = useState('');
    const [date, setdate] = useState('');
    const [type, settype] = useState('');
    const [rating, setrating] = useState();
    const navigate = useNavigate();
    function submit(){
        console.log("done");
        const today = new Date().toISOString().split("T")[0];
        setdate(today);
        navigate('profile');
    }


    return (
        <div className = "feedback-contaner">
            
            <form className = "fdForm" onSubmit={submit}>
            <h2 className = "feedback-tital">Feedback</h2>
                <div className = "fd-inputs">
                    <input className = "fd-input" type= "text" 
                    placeholder="Enter the tour id from ticket"
                    required
                    value = {tourId}
                    onChange={(e) => settourId(e.target.value)}/>

                    <textarea className = "fd-input"
                    type="text"
                    cols="18" rows="5"
                    placeholder="discription" 
                    value={discription} 
                    onChange={(e) => setdiscription(e.target.value)} 
                    />
                    <br></br>

                    <label className= "fd-rateLable">Rating</label>
                    <input className = "fd-input" type= "number"
                    min= "0" max= "5" step= "0.5"
                    placeholder="rate from 1 to 5"
                    required
                    value = {rating}
                    onChange={(e) => setrating(e.target.value)}
                    />

                    <div className="fd-radio-group">
                        <span>Type</span>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="Tour Guide"
                                required
                                checked={type === "Tour Guide"}
                                onChange={(e) => settype(e.target.value)}
                            />
                            Tour Guide
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="Tour"
                                checked={type === "Tour"}
                                onChange={(e) => settype(e.target.value)}
                                />
                                Tour
                        </label>
                    </div>


                </div>
                <div className="fd-buttons">
                <button className="fd-cancleBtn" type="button" >Cancle</button>
                <button className="fd-submitBtn" type="submit">submit</button>
                </div>
            </form>
        </div>
    );
}

export default Feedback