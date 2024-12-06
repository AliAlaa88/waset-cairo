import { useState , useNavigate } from "react";

function CreatePack(){
    //const [OperaturId,setOperaturId] = useState();
    const [discription, setdiscription] = useState('');
    const [duration, setduration] = useState();
    const [hourOrday, sethourOrday] = useState('');
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [mettingLoc, setmettingLoc] = useState('');
    const [selectedType, setselectedType] = useState("");
    const [selectedMonument, setselectedMonument] = useState([]);
    const typeOpthions = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
    ];

    const MonumentOption = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
    ];
    function submit(){
        console.log("done");
       //navigate('/sign-up');
    }




    // const navigate = useNavigate();

    const handelchange1= (event)=>{

        setselectedType(event.target.value);
    };

    const handleChange2 = (event) => {
        const { options } = event.target;
        const selectedValues = Array.from(options)
          .filter((option) => option.selected)
          .map((option) => option.value);
    
        setselectedMonument(selectedValues);
      };





    return (
        <body className="creP-body">
        <div className="creP-contaner">
            <h2 className= "creP-titel">Create Packege</h2>
            <form className= "Pack" onSubmit={submit}>
                
                <div className="creP-inputs">
                    <input className = "creP-input" type= "text" 
                    placeholder="Enter the packege Name"
                    required
                    value = {name}
                    onChange={(e) => setname(e.target.value)}/>

                    <br></br>
                    <textarea className = "creP-input"
                    type="text"
                    cols="18" rows="5"
                    placeholder="discription" 
                    value={discription} 
                    onChange={(e) => setdiscription(e.target.value)} 
                    />

                    <br></br>
                    <label className= "creP-rateLable">Price</label>
                    <input className = "creP-input" type= "number"
                    min= "1000" max= "10000" 
                    placeholder="Put the tour pack price"
                    required
                    value = {price}
                    onChange={(e) => setprice(e.target.value)}
                    />

                    <br></br>
                    <input className = "creP-input" type= "text" 
                    placeholder="Enter the metting location"
                    required
                    value = {mettingLoc}
                    onChange={(e) => setmettingLoc(e.target.value)}/>

                    <div className="creP-duration">
                        <br />
                    <label className= "numday">Number of day/hour</label>
                    <input className = "creP-input" type= "number"
                    min= "0" max= "10" 
                    placeholder="enter duration of packege"
                    required
                    value = {duration}
                    onChange={(e) => setduration(e.target.value)}
                    />

                        <div className="creP-radio-group">
                        <span className = "pdayhour">day/hour</span>
                        <br />
                        <label className= "radioday">
                            <input
                                type="radio"
                                name="type"
                                value="day"
                                required
                                checked={hourOrday === "day"}
                                onChange={(e) => sethourOrday(e.target.value)}
                            />
                            day
                        </label>
                        <label className= "radiohour">
                            <input
                                type="radio"
                                name="type"
                                value="hour"
                                checked={hourOrday === "hour"}
                                onChange={(e) => sethourOrday(e.target.value)}
                                />
                                hour
                        </label>
                        </div>
                    </div>
                    <br />

                    <label className="ppacktype">Package Type</label>
                    <select className="creP-input" 
                
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
                    
                    <div className= "creP-input">
                            <label htmlFor="multiSelect">Choose options:</label>
                            <br />
                            <select
                                className="multiSelect"
                                multiple
                                value={selectedMonument}
                                onChange={handleChange2}
                                    >
                                {MonumentOption.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                                ))}
                            </select>
                            <br/>
                            <h3>selected Monuments</h3>
                            <ul>
                                {selectedMonument.map((option)=>(
                                    <li key={option}>{option}</li>
                                ))}


                            </ul>
                    </div>
                    <button className="creP-submitBtn" type="submit">Create</button>
                </div>
            </form>
        </div>
        </body>
    );

}

export default CreatePack