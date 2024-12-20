import React, {useState, useEffect} from 'react'
import { User, Mail, Phone, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOperatorEditProfileMutation } from '../store/registrationSlice';
import { useGetCurrUserDataQuery } from '../store/userSlice';

const EditProfileOperator = () => {

    const [operatorEdit] = useOperatorEditProfileMutation();
    const { data: profileData, isFetching } = useGetCurrUserDataQuery();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phonenumber, setphonenumber] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [gender, setGender] = useState("");

    useEffect(() => {
		if (profileData) {
			setFirstName(profileData.fname);
			setLastName(profileData.lname);
			setUsername(profileData.username);
			setEmail(profileData.email);
			const date = new Date(profileData.birthdate).toISOString().split("T")[0];
			setBirthdate(date);
			setGender(profileData.gender);
			setphonenumber(profileData.phonenumber);
		}
	}, [profileData]);

    async function signin(event) {
		event.preventDefault();
		try {
			const res = await operatorEdit({
				firstName,
				lastName,
				username,
				phonenumber,
				email,
				birthdate,
				gender,
			}).unwrap();
			navigate("/");
		} catch (err) {
			console.log(err?.data?.message || err);
		}
	}

    return (
        <div className="min-h-screen bg-[url('/src/assets/p6.jpg')] flex items-center justify-center p-4">
			<div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 my-8 z-10">
            {isFetching ? (
				<p>Loading...</p>
			) : (
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
    )
}

export default EditProfileOperator;
