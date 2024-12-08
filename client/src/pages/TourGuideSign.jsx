import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";

function Signup() {
    const navigate = useNavigate();
    const [code,setcode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specialliztion, setspecialliztion] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [languages, setLanguages] = useState([]); 
    const [selectedLanguage, setSelectedLanguage] = useState(''); 
    




    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                
                const uniqueLanguages = new Set();
                data.forEach((country) => {
                    if (country.languages) {
                        Object.values(country.languages).forEach((lang) =>
                            uniqueLanguages.add(lang)
                        );
                    }
                });
                setLanguages([...uniqueLanguages].sort((a, b) => a.localeCompare(b))); 
            })
            .catch((error) => console.error("Error fetching countries:", error));
    }, []);

    function signin(event) {
        event.preventDefault();
        navigate('/');
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={signin}>
                <h1 className="signup-title">Sign Up</h1>
                <div className="signup-input-group">
                    <input
                        className="signup-input"
                        type="number"
                        placeholder="enter registration code"
                        required
                        value={code}
                        onChange={(e) => setcode(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="email"
                        placeholder="E-mail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="enter Specialization"
                        required
                        value={specialliztion}
                        onChange={(e) => setspecialliztion(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="number"
                        placeholder="phonenumber"
                        required
                        value={phonenumber}
                        onChange={(e) => setphonenumber(e.target.value)}
                    />

                    <div className="signup-input-group">
                    <label className="signups-label">
                        <span className="selc-lang">Select Language:</span>
                    </label>
                    <select
                        className="signup-input"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        required
                    >
                        <option value="" disabled className="slc-lang">
                            Select a language
                        </option>
                        {languages.map((language, index) => (
                            <option key={index} value={language}>
                                {language}
                            </option>
                        ))}
                    </select>
                </div>



                </div>


                <label className="signup-label signup-birth-date">
                    <span>Birth Date:</span>
                    <input
                        className="signup-input"
                        type="date"
                        name="birthdate"
                        required
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />
                </label>

                <div className="signup-radio-group">
                    <span>Gender</span>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            required
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Female
                    </label>
                </div>

                <button type="submit" className="signup-button">Sign Up</button>
            </form>


        </div>
    );
}

export default Signup;
