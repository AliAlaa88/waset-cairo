import { useState, useEffect } from "react";
import { useNavigate, Link, redirect } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { User, Lock, Pyramid } from 'lucide-react';

import {
	useTouristLoginMutation,
	useGuideLoginMutation,
	useOperatorLoginMutation,
} from "../store/registrationSlice";

function Login() {
	const [touristLogin] = useTouristLoginMutation();
	const [guideLogin] = useGuideLoginMutation();
	const [operatorLogin] = useOperatorLoginMutation();

	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");
	const [role, setRole] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate(`/${userInfo.role || role}-home`);
		}
	}, [userInfo]);

	const Logclik = async (event) => {
		event.preventDefault();
		if (!username || !password) {
			alert("Please fill in both username and password");
		} else {
			try {
				let res;
				switch (role) {
					case "tourist":
						res = await touristLogin({ username, password }).unwrap();
						break;
					case "guide":
						res = await guideLogin({ username, password }).unwrap();
						break;
					case "operator":
						res = await operatorLogin({ username, password }).unwrap();
						break;
					default:
						alert("Please select a role");
						break;
				}
				dispatch(setCredentials({ ...res?.body }));
				// navigate(`/`, { state: { triggerFetch: true } });
				window.location.href = "/";
			
			} catch (err) {
				if (err?.data?.msg == "Invalid Credentials!") {
					alert("Incorrect username or password or role \n Please try again");
				}
				else if(err?.data?.msg == "You are permanently banned!"){
					alert("You are permanently banned!");
				}
			}
		}
	};

	return (
		<div className="min-h-screen bg-[url('/src/assets/p6.jpg')] flex items-center justify-center p-4">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
				<div className="text-center">
					<div className="flex justify-center mb-4">
						<Pyramid className="h-12 w-12 text-amber-600" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
					<p className="text-gray-600">Discover the wonders of Egypt</p>
				</div>

				<form onSubmit={Logclik} className="space-y-6">
					<div className="space-y-4">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<User className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								required
								placeholder="Username"
								value={username}
								onChange={(e) => setusername(e.target.value)}
								className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
							/>
						</div>

						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="h-5 w-5 text-gray-400" />
							</div>	
							<input
								type="password"
								required
								placeholder="Password"
								value={password}
								onChange={(e) => setpassword(e.target.value)}
								className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">Select your role:</label>
							<div className="grid grid-cols-3 gap-4">
								{['tourist', 'guide', 'operator'].map((roleOption) => (
								<label
									key={roleOption}
									className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${
									role === roleOption
										? 'bg-amber-50 border-amber-500 text-amber-700'
										: 'border-gray-200 hover:bg-gray-50'
									}`}
								>
									<input
									type="radio"
									name="role"
									value={roleOption}
									checked={role === roleOption}
									onChange={(e) => setRole(e.target.value)}
									className="sr-only"
									/>
									<span className="capitalize">{roleOption}</span>
								</label>
								))}
							</div>
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
					>
						Login
					</button>

					<div className="grid grid-cols-3 gap-4">
						{[
						{ text: 'Tourist Sign Up', path: '/sign-up' },
						{ text: 'Guide Sign Up', path: '/guide-sign' },
						{ text: 'Operator Sign Up', path: '/operator-sign' }
						].map((option) => (
						<button
							key={option.path}
							type="button"
							onClick={() => navigate(option.path)}
							className="text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-100 rounded-lg py-1 font-medium"
						>
							{option.text}
						</button>
						))}
					</div>
				</form>
			</div>	
        </div>
	);
}

export default Login;
