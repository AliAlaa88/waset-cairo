import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddMonumentMutation } from "../store/monumentSlice";

function InsertMonument() {
  const [text, setText] = useState(''); 
  const [photos, setPhotos] = useState([]); 

  const [addMonument, {isLoading, isSuccess, isError, error}] = useAddMonumentMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    era: "",
    family: "",
    openingHours: "",
    photos: [],
  })
  const navigate = useNavigate();

  const handleAdd = (event) => {
    event.preventDefault(); 
    if (text.trim()) {
      setPhotos([...photos, text.trim()]); 
      setText(''); 
    }
  };

  async function submit(e) {
    e.preventDefault();
    formData.photos = photos
    try {
      await addMonument(formData).unwrap();
      alert('Monument added successfully!');
      navigate('/operator-home');
    } catch (err) {
      console.error('Failed to add monument: ', err);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


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
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <textarea
              className="insM-input"
              cols="18"
              rows="5"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              className="insM-input"
              type="text"
              placeholder="Enter the Monument Location"
              required
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <input
              className="insM-input"
              type="text"
              placeholder="Enter the Monument Family"
              required
              name="family"
              value={formData.family}
              onChange={handleChange}
            />
            <input
              className="insM-input"
              type="text"
              placeholder="Enter the Monument Opening Hours"
              required
              name='openingHours'
              value={formData.openingHours}
              onChange={handleChange}
            />
            <input
              className="insM-input"
              type="text"
              placeholder="Enter the Monument Era"
              required
              name="era"
              value={formData.era}
              onChange={handleChange}
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
                  <img src={photo} className="insM-photoitem" key={index}/>
                ))}
              </ul>
            </div>
          </div>
          <button disabled={isLoading} className="insM-submitBtn" type="submit">
            Create
          </button>
          {isError && <p>Error: {error.data?.message || 'Failed to add monument'}</p>}
          {isSuccess && <p>Monument added successfully!</p>}
        </form>
      </div>
    </body>
  );
}

export default InsertMonument;