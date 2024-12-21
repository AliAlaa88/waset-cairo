import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetCurrUserDataQuery } from "../store/userSlice";
import { useTouristEditProfileMutation } from "../store/registrationSlice";
import { User, Mail, Phone, Calendar, Users, NotepadText } from 'lucide-react';

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
			window.location.href = "/tourist-home/profile";
		} catch (err) {
			console.log(err?.data?.message || err.error);
		}
	}

	return (
		<div className="min-h-screen bg-[url('/src/assets/p6.jpg')] flex items-center justify-center p-4">
			<div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 my-8 z-10">
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<form onSubmit={signin} className="space-y-6">
					 <Link to="/tourist-home/profile">
                        <button className="bg-amber-600 text-white px-3 py-1 rounded-lg hover:bg-amber-700">Return to home</button>
                    </Link>
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
							<NotepadText className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Bio"
							required
							value={bio}
							onChange={(e) => setBio(e.target.value)}
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
							value={phoneNo}
							onChange={(e) => setPhoneNo(e.target.value)}
							className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
						/>
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
						Save Changes
					</button>
				</form>
			)}
		</div>
	</div>
	);
}

export default EditProfile;
