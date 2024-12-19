import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCurrUserDataQuery } from "../store/userSlice";
import { useTouristEditProfileMutation } from "../store/registrationSlice";
function EditProfile() {
	const { data: profileData, isFetching } = useGetCurrUserDataQuery();
	const [touristEditProfile] = useTouristEditProfileMutation();
	const navigate = useNavigate();
	
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [gender, setGender] = useState("");
	const [bio, setBio] = useState("");
	const [phoneNo, setPhoneNo] = useState(0);
	
	useEffect(() => {
		if (profileData) {
			setFirstName(profileData.fname);
			setLastName(profileData.lname);
			setUsername(profileData.username);
			setEmail(profileData.email);
			const date = new Date(profileData.birthdate).toISOString().split("T")[0];
			setBirthdate(date);
			setGender(profileData.gender);
			setBio(profileData.bio);
			setPhoneNo(profileData.phonenumber);
		}
	}, [profileData]);

	async function signin(event) {
		event.preventDefault();
		try {
			const res = await touristEditProfile({
				firstName,
				lastName,
				username,
				email,
				gender,
				birthdate,
				bio,
				phoneNo,
			}).unwrap();
			window.location.reload();
		} catch (err) {
			console.log(err?.data?.message || err.error);
		}
	}

	return (
		<div className="signup-container">
			{isFetching ? (
				<p>Loading...</p>
			) : (
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
						<textarea
							className="signup-input"
							placeholder="Bio"
							required
							value={bio}
							onChange={(e) => setBio(e.target.value)}
						/>
						<input
							className="signup-input"
							type="number"
							placeholder="phonenumber"
							required
							value={phoneNo}
							onChange={(e) => setPhoneNo(e.target.value)}
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
								value="M"
								required
								checked={gender === "M"}
								onChange={(e) => setGender(e.target.value)}
							/>
							Male
						</label>
						<label>
							<input
								type="radio"
								name="gender"
								value="F"
								checked={gender === "F"}
								onChange={(e) => setGender(e.target.value)}
							/>
							Female
						</label>
					</div>

					<button type="submit" className="signup-button">
						Save
					</button>
				</form>
			)}
		</div>
	);
}

export default EditProfile;
