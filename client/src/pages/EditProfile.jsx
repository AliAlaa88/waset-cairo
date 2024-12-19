import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function EditProfile() {
  	const profileData = useSelector((state) => state.ui.profileData);
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState(profileData.firstName);
	const [lastName, setLastName] = useState(profileData.lastName);
	const [username, setUsername] = useState(profileData.username);
	const [email, setEmail] = useState(profileData.email);
	const [birthdate, setBirthdate] = useState(profileData.birthdate);
	const [gender, setGender] = useState(profileData.gender);

	function signin(event) {
    event.preventDefault();
    // update profile data dispatch here
		navigate("../");
	}

	return (
		<div className="signup-container">
			<form className="signup-form" onSubmit={signin}>
				<h1 className="signup-title">Edit Profile</h1>
				<div className="signup-input-group">
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
				</div>

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

				<button type="submit" className="signup-button">
					Save
				</button>
			</form>
		</div>
	);
}

export default EditProfile;
