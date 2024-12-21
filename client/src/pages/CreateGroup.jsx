import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMonumentsQuery } from "../store/monumentSlice";
import {
	useAddGroupMutation,
	useJoinGroupMutation,
} from "../store/groupsSlice";

function CreateGroup() {
	const [name, setname] = useState("");
	const [description, setdescription] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [languages, setLanguages] = useState([]);
	const [selectedMonument, setselectedMonument] = useState(0);
	const navigate = useNavigate();
	const { data: monuments, isFetching } = useGetMonumentsQuery();
	const [createGroup] = useAddGroupMutation();
	const [joinGroup] = useJoinGroupMutation();
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

	const Creclik = async (event) => {
		event.preventDefault();
		if (!name || !description || !selectedLanguage || !selectedMonument) {
			alert("Please fill in all the required information");
		} else {
			try {
				const res = await createGroup({
					name,
					commonLanguage: selectedLanguage,
					prefferedMonument: selectedMonument,
				}).unwrap();
				joinGroup(res.data.id)
				navigate("../");
			} catch (error) {
				console.error("Failed to create group:", error);
			}
		}
	};

	function Cancel() {
		console.log("return to home page");
		navigate("../");
	}

	return (
		<div className="cerG-body">
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<div className="create-container">
					<div className="create-box">
						<h1 className="create-title">Create tourist group</h1>
						<form onSubmit={Creclik}>
							<div className="inputs">
								<div className="input">
									<input
										type="text"
										required
										placeholder="Group name"
										value={name}
										onChange={(e) => setname(e.target.value)}
										className="create-group-input"
									/>
								</div>
								<label className="creG-optionlable">
									Choose Common Language
								</label>
								<select
									className="create-group-input creG-input"
									value={selectedLanguage}
									onChange={(e) => setSelectedLanguage(e.target.value)}
								>
									<option value="" disabled className="slc-lang">
										Select a Language
									</option>
									{languages.map((language, index) => (
										<option key={index} value={language}>
											{language}
										</option>
									))}
								</select>
								<br />
								<br />
								<label className="creG-optionlable">
									Choose Preffered Monument
								</label>
								<select
									className="create-group-input creG-input"
									value={selectedMonument}
									onChange={(e) => setselectedMonument(e.target.value)}
								>
									<option value="" disabled>
										Select a Monument
									</option>
									{monuments.map((option) => (
										<option key={option.id} value={option.id}>
											{option.name}
										</option>
									))}
								</select>
								<br />
								<br />
								<div className="input">
									<textarea
										type="text"
										cols="18"
										rows="5"
										required
										placeholder="description"
										value={description}
										onChange={(e) => setdescription(e.target.value)}
										className="create-group-input"
									/>
								</div>
							</div>
							<div className="cbuttons">
								<button
									className="cancelBtn"
									type="button"
									onClick={() => Cancel()}
								>
									Cancel
								</button>
								<button className="submitBtn" type="submit">
									Create
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default CreateGroup;
