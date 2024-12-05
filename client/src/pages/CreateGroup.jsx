import { useState , useNavigate } from "react";

function CreateGroup() {
  const [name, setname] = useState('');
  const [discribion, setdiscribion] = useState('');
  const [language, setlanguage] = useState('');
  const [fmonument, setfmonument] = useState('');
  const navigate = useNavigate();

  const Creclik = (event) => {
    event.preventDefault();

    if (!name || !discribion) {
      alert('Please fill in both group name and discribion');
    } else {
      navigate('profile');
    }
  };


function Cancle(){
    console.log("return to home page");
   // navigate('/home');
}


  return (
    <div className="create-container">
      <div className="create-box">
        <h1 className="create-title">Create tourst group</h1>
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
              <input 
                type="text" 
                required 
                placeholder="favoret monument"
                value={fmonument}  
                onChange={(e) => setfmonument(e.target.value)} 
              />
            </div>
            <div className="input">
              <textarea 
                type="text"
                cols="18" rows="5"
                required 
                placeholder="discribion" 
                value={discribion} 
                onChange={(e) => setdiscribion(e.target.value)} 
              />
            </div>
          </div>
          <div className="buttons">
            <button className="cancleBtn" type="button" onClick={() => Cancle()}>Cancle</button>
            <button className="submitBtn" type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroup;
