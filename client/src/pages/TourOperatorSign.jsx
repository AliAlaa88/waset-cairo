import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOperatorSignupMutation } from "../store/registrationSlice";

function Signup() {
	const navigate = useNavigate();
	const [operatorSignup] = useOperatorSignupMutation();

	const [code, setcode] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phonenumber, setphonenumber] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [gender, setGender] = useState("");

	async function signin(event) {
		event.preventDefault();
		try {
			const res = await operatorSignup({
				firstName,
				lastName,
				username,
				phonenumber,
				email,
				password,
				birthdate,
				gender,
			}).unwrap();
			navigate("/");
		} catch (err) {
			console.log(err?.data?.message || err.error);
		}
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
						type="number"
						placeholder="phonenumber"
						required
						value={phonenumber}
						onChange={(e) => setphonenumber(e.target.value)}
					/>
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
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default Signup;
