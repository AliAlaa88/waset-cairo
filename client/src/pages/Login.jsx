import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
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
			navigate(`/${role}-home`);
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
        console.log(res?.body);
				navigate(`/`);
			} catch (err) {
				console.log(err?.data?.message || err.error);
			}
		}
	};

	return (
		<div className="login-container">
			<div className="login-box">
				<h1 className="login-title">Login</h1>
				<form onSubmit={Logclik}>
					<div className="inputs">
						<div className="input">
							<input
								type="text"
								required
								placeholder="username"
								value={username}
								onChange={(e) => setusername(e.target.value)}
							/>
						</div>
						<div className="input">
							<input
								type="password"
								required
								placeholder="Password"
								value={password}
								onChange={(e) => setpassword(e.target.value)}
							/>
						</div>
						<div className="signup-radio-group">
							<span>Role:</span>
							<label>
								<input
									type="radio"
									name="role"
									value="tourist"
									required
									checked={role === "tourist"}
									onChange={(e) => setRole(e.target.value)}
								/>
								Tourist
							</label>
							<label>
								<input
									type="radio"
									name="role"
									value="guide"
									checked={role === "guide"}
									onChange={(e) => setRole(e.target.value)}
								/>
								Guide
							</label>
							<label>
								<input
									type="radio"
									name="role"
									value="operator"
									checked={role === "operator"}
									onChange={(e) => setRole(e.target.value)}
								/>
								Operator
							</label>
						</div>
					</div>
					<div className="buttons">
						<button
							className="btn btn-secondary"
							type="button"
							onClick={() => navigate("/sign-up")}
						>
							Sign Up tourist
						</button>
						<button
							className="btn btn-secondary"
							type="button"
							onClick={() => navigate("/operator-sign")}
						>
							Sign Up operator
						</button>
						<button
							className="btn btn-secondary"
							type="button"
							onClick={() => navigate("/guide-sign")}
						>
							Sign Up guide
						</button>
						<button className="btn btn-primary" type="submit">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
