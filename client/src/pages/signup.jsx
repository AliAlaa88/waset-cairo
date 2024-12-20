import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTouristSignupMutation } from "../store/registrationSlice";
import { User, Mail, Lock, Phone, Globe, Languages, Calendar, Users } from 'lucide-react';

function Signup() {
	const navigate = useNavigate();
	const [touristSignup] = useTouristSignupMutation();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phonenumber, setphonenumber] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [gender, setGender] = useState("");
	const [countries, setCountries] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("");

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all")
			.then((response) => response.json())
			.then((data) => {
				const formattedCountries = data
					.map((country) => ({
						name: country.name.common,
						code: country.cca2,
					}))
					.sort((a, b) => a.name.localeCompare(b.name));
				setCountries(formattedCountries);

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

	async function signin(event) {
		event.preventDefault();
		try {
			const res = await touristSignup({
				firstName,
				lastName,
				username,
				phonenumber,
				email,
				password,
				birthdate,
				gender,
				selectedCountry,
				selectedLanguage,
			}).unwrap();
			navigate("/");
		} catch (err) {
			console.log(err?.data?.message || err);
		}
	}


	return (
		<div className="min-h-screen bg-[url('/src/assets/p6.jpg')] flex items-center justify-center p-4">
			<div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 my-8 z-10">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Join Our Community!</h1>
					<p className="text-gray-600 mt-2">Begin your Egyptian adventure today</p>
				</div>

				<form onSubmit={signin} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<User className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="First Name"
								required
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
							/>
						</div>


						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<User className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="Last Name"
								required
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
							/>
						</div>

					</div>


					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<User className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Username"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
						/>
					</div>

					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Mail className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="email"
							placeholder="Email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
						/>
					</div>


					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Lock className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="password"
							placeholder="Password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
						/>
					</div>

					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Phone className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="tel"
							placeholder="Phone Number"
							required
							value={phonenumber}
							onChange={(e) => setphonenumber(e.target.value)}
							className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Globe className="h-5 w-5 text-gray-400" />
							</div>
							<select
								value={selectedCountry}
								onChange={(e) => setSelectedCountry(e.target.value)}
								required
								className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
							>
								<option value="" disabled>Select Country</option>
								{countries.map((country) => (
								<option key={country.code} value={country.name}>
									{country.name}
								</option>
								))}
							</select>
						</div>

						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Languages className="h-5 w-5 text-gray-400" />
							</div>
							<select
								value={selectedLanguage}
								onChange={(e) => setSelectedLanguage(e.target.value)}
								required
								className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
							>
								<option value="" disabled>Select Language</option>
								{languages.map((language) => (
								<option key={language} value={language}>
									{language}
								</option>
								))}
							</select>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Calendar className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="date"
								required
								value={birthdate}
								max={new Date().toISOString().split("T")[0]}
								onChange={(e) => setBirthdate(e.target.value)}
								className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
							/>
							</div>

						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Users className="h-5 w-5 text-gray-400" />
							</div>
							<div className="flex items-center pl-10 space-x-4 h-full">
								<label className="flex items-center space-x-2 cursor-pointer">
									<input
										type="radio"
										name="gender"
										value="M"
										required
										checked={gender === "M"}
										onChange={(e) => setGender(e.target.value)}
										className="form-radio text-amber-600 focus:ring-amber-500"
									/>
									<span>Male</span>
								</label>
								<label className="flex items-center space-x-2 cursor-pointer">
									<input
										type="radio"
										name="gender"
										value="F"
										checked={gender === "F"}
										onChange={(e) => setGender(e.target.value)}
										className="form-radio text-amber-600 focus:ring-amber-500"
									/>
									<span>Female</span>
								</label>
							</div>
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
					>
						Create Account
					</button>
				</form>
			</div>
        </div>
	);
}

export default Signup;
