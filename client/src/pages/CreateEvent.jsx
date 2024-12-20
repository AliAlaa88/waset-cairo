import { useState , useNavigate } from "react";

function CreateEvent(){
    //const [OperaturId,setOperaturId] = useState();
    const [discription, setdiscription] = useState('');
    const [duration, setduration] = useState();
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [mettingLoc, setmettingLoc] = useState('');
    const [selectedType, setselectedType] = useState("");
    const [selectedEvent, setselectedEvent] = useState([]);
    const typeOpthions = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
    ];

    const EventOptions = [
        "Options 1",
        "Options 2",
        "Options 3",
        "Options 4",
        "Options 5",
    ];
    function submit(){
        console.log("done");
       //navigate('/sign-up');
    }




    // const navigate = useNavigate();

    const handelchange1= (event)=>{

        setselectedType(event.target.value);
    };
    const handelchange2= (event)=>{

        setselectedEvent(event.target.value);
    };






    return (
        <body className= "Ev-body">
        <div className="Ev-contaner">
            <form className= "Event" onSubmit={submit}>
                <h2 className= "Ev-titel">Create Event</h2>
                <div className="Ev-inputs">
                    <input className = "Ev-input" type= "text" 
                    placeholder="Enter the Event Name"
                    required
                    value = {name}
                    onChange={(e) => setname(e.target.value)}/>

                    <br></br>
                    <textarea className = "Ev-input"
                    type="text"
                    cols="18" rows="5"
                    placeholder="discription" 
                    value={discription} 
                    onChange={(e) => setdiscription(e.target.value)} 
                    />

                    <br></br>
                    <label className= "Ev-rateLable">Price</label>
                    <input className = "Ev-input" type= "number"
                    min= "1000" max= "10000" 
                    placeholder="Put the Event price"
                    required
                    value = {price}
                    onChange={(e) => setprice(e.target.value)}
                    />

                    <br></br>
                    <input className = "Ev-input" type= "text" 
                    placeholder="Enter the metting location"
                    required
                    value = {mettingLoc}
                    onChange={(e) => setmettingLoc(e.target.value)}/>

                    <div className="Ev-duration">
                        <br />
                    <label>Duration</label>
                    <input className = "Ev-input" type= "number"
                    min= "0" max= "10" 
                    placeholder="enter duration of event"
                    required
                    value = {duration}
                    onChange={(e) => setduration(e.target.value)}
                    />

                        
                    </div>
                    <br />

                    <label className= "packtype">Event Type</label>
                    <select className="Ev-input" 
                
                    value={selectedType}
                    onChange={handelchange1}
                    >
                        <option value="" disabled>
                            select option
                        </option>
                        {typeOpthions.map((option)=>(
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <br/>
                    
                    <div className= "Ev-input">
                    <label className= "eventtype">Monument</label>
                    <select className="Ev-input" 
                
                    value={selectedEvent}
                    onChange={handelchange2}
                    >
                        <option value="" disabled>
                            select option
                        </option>
                        {EventOptions.map((option)=>(
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    </div>
                    <button className="Ev-submitBtn" type="submit">Create</button>
                </div>
            </form>
        </div>
        </body>
    );

}

export default CreateEvent