import { useState , useNavigate} from "react";

function InsertMonument() {
  const [discription, setdiscription] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [era, setEra] = useState('');
  const [family, setFamily] = useState('');
  const [openingHours, setOpeningHours] = useState("");
  const [text, setText] = useState(''); 
  const [photos, setPhotos] = useState([]); 
  const navigate = useNavigate();

  const handleAdd = (event) => {
    event.preventDefault(); 
    if (text.trim()) {
      setPhotos([...photos, text.trim()]); 
      setText(''); 
    }
  };

  function submit() {
    //event.preventDefault(); 
    console.log("Form submitted:", { name, discription, location, era, family, openingHours, photos });
    navigate('profile');
  }

  return (
    <body className="insM-body">
      <div className="insM-container">
        <h2 className="insM-header">Insert Monument</h2>
        <form className="insM-form" onSubmit={submit}>
          <div className="insM-inputs">
            <input
              className="insM-input"
              type="text"
              placeholder="Enter the Monument Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <textarea
              className="insM-input"
              cols="18"
              rows="5"
              placeholder="Description"
              value={discription}
              onChange={(e) => setdiscription(e.target.value)}
            />
            <input
              className="insM-input"
              type="text"
              placeholder="Enter the Monument Location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              className="insM-input"
              type="text"
              placeholder="Enter the Monument Family"
              required
              value={family}
              onChange={(e) => setFamily(e.target.value)}
            />
            <input
              className="insM-input"
              type="text"
              placeholder="Enter the Monument Opening Hours"
              required
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
            />
            <input
              className="insM-input"
              type="text"
              placeholder="Enter the Monument Era"
              required
              value={era}
              onChange={(e) => setEra(e.target.value)}
            />
            <br />
            <input
              className="insM-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write the photo URL"
            />
            <button className="insM-input" onClick={handleAdd}>
              Add
            </button>

            <div className="insM-input-Addeditem">
              <h3 className="insM-addH">Added Photos:</h3>
              <ul className="insM-listphoto">
                {photos.map((photo, index) => (
                  <li className="insM-photoitem" key={index}>
                    {photo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className="insM-submitBtn" type="submit">
            Create
          </button>
        </form>
      </div>
    </body>
  );
}

export default InsertMonument;