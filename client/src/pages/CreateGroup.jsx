import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateGroup() {
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [language, setlanguage] = useState('');
  const navigate = useNavigate();
  const [selectedMonument, setselectedMonument] = useState("");

  const MonumentOption = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
];
const handleChange1= (event)=>{

  setselectedMonument(event.target.value);
};

  const Creclik = (event) => {
    event.preventDefault();

    if (!name || !description) {
      alert('Please fill in both group name and description');
    } else {
      navigate('/home');
    }
  };


function Cancel(){
    console.log("return to home page");
    navigate('/home');
}


  return (
    <body className= "cerG-body">
      <div className="create-container">
        <div className="create-box">
          <h1 className="create-title">Create tourist group</h1>
          <form onSubmit={Creclik}>
            <div className="inputs">
              <div className="input">
                <input 
                  type="text" 
                  required 
                  placeholder="Group name"
                  value={name}  
                  onChange={(e) => setname(e.target.value)} 
                />
              </div>
              <div className="input">
                <input 
                  type="text" 
                  required 
                  placeholder="language"
                  value={language}  
                  onChange={(e) => setlanguage(e.target.value)} 
                />
                <br/>
                <label className ="creG-optionlable">Choose Option</label>
                <select className="creG-input" 
                  
                  value={selectedMonument}
                  onChange={handleChange1}
                  >
                      <option value="" disabled>
                          select option
                      </option>
                      {MonumentOption.map((option)=>(
                          <option key={option} value={option}>
                              {option}
                          </option>
                      ))}
                  </select>
                  <br/>
              </div>
              <div className="input">
                <textarea 
                  type="text"
                  cols="18" rows="5"
                  required 
                  placeholder="description" 
                  value={description} 
                  onChange={(e) => setdescription(e.target.value)} 
                />
              </div>
            </div>
            <div className="cbuttons">
              <button className="cancelBtn" type="button" onClick={() => Cancel()}>Cancel</button>
              <button className="submitBtn" type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}

export default CreateGroup;
