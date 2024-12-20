import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMonumentsQuery } from "../store/monumentSlice";
import { useAddPackMutation } from "../store/packSlice";
function CreatePack() {
	const { data: monuments, isFetching } = useGetMonumentsQuery();
	const [createPack] = useAddPackMutation();
	const [discription, setdiscription] = useState("");
	const [duration, setduration] = useState(0);
	const [hourOrday, sethourOrday] = useState("");
	const [name, setname] = useState("");
	const [price, setprice] = useState(0);
	const [mettingLoc, setmettingLoc] = useState("");
	const [selectedType, setselectedType] = useState("");
	const [selectedMonuments, setselectedMonuments] = useState([]);
	const navigate = useNavigate();

	const packTypes = [
		"Historical",
		"Cultural",
		"Religious",
		"Medical",
		"Adventure",
		"Eco",
		"Festival",
	];
	async function submit(event) {
		event.preventDefault();
		if (
			!name ||
			!discription ||
			!hourOrday ||
			!duration ||
			!price ||
			!mettingLoc ||
			!selectedMonuments
		) {
			alert("Please fill in all the required information");
		} else {
			try {
				const res = await createPack({
					name,
					description: discription,
					meetingLocation: mettingLoc,
					type: selectedType,
					duration: duration,
					rating: 0,
					price,
					monumentids: selectedMonuments.map(
						(monument) =>
							monuments.find((_monument) => _monument.name === monument).id
					),
				}).unwrap();
				navigate("../");
			} catch (error) {
				console.error("Failed to create Pack:", error);
			}
		}
	}
	const handelchange1 = (event) => {
		setselectedType(event.target.value);
	};
	const handleChange2 = (event) => {
		if (selectedMonuments.includes(event.target.value)) {
			return;
		}
		const monument = monuments.find(
			(monument) => monument.id == event.target.value
		);
		setselectedMonuments((prev) => [...prev, monument.name]);
	};
	const handleCancelSelection = (event) => {
		const monumentName = event.target.textContent;
		setselectedMonuments((prev) =>
			prev.filter((name) => name !== monumentName)
		);
	};

	return (
		<div className="creP-body">
			<div className="creP-contaner">
				{isFetching ? (
					<p>Loading...</p>
				) : (
					<>
						<form className="Pack" onSubmit={submit}>
							<h2 className="Ev-titel">Create Package</h2>
							<div className="creP-inputs">
								<label className="creP-rateLable">Name</label>
								<input
									className="creP-input"
									type="text"
									placeholder="Enter the packege Name"
									required
									value={name}
									onChange={(e) => setname(e.target.value)}
								/>
								<label className="creP-rateLable">Description</label>
								<textarea
									className="creP-input"
									type="text"
									cols="18"
									rows="5"
									placeholder="Description"
									value={discription}
									onChange={(e) => setdiscription(e.target.value)}
								/>
								<label className="creP-rateLable">Price</label>
								<input
									className="creP-input"
									type="number"
									placeholder="Put the tour pack price"
									required
									value={price}
									onChange={(e) => setprice(e.target.value)}
								/>
								<label className="creP-rateLable">Meeting Location</label>
								<input
									className="creP-input"
									type="text"
									placeholder="Enter the Meeting Location"
									required
									value={mettingLoc}
									onChange={(e) => setmettingLoc(e.target.value)}
								/>

								<div className="creP-duration">
									<label className="numday">Duration</label>
									<input
										className="creP-input"
										type="number"
										placeholder="enter duration of packege"
										required
										value={duration}
										onChange={(e) => setduration(e.target.value)}
									/>

									<div className="creP-radio-group">
										<label className="radioday">
											<input
												type="radio"
												name="type"
												value="day"
												required
												checked={hourOrday === "day"}
												onChange={(e) => sethourOrday(e.target.value)}
											/>
											Day(s)
										</label>
										<label className="radiohour">
											<input
												type="radio"
												name="type"
												value="hour"
												checked={hourOrday === "hour"}
												onChange={(e) => sethourOrday(e.target.value)}
											/>
											Hour(s)
										</label>
									</div>
								</div>

								<label className="packtype">Package Type</label>
								<select
									className="creP-input"
									value={selectedType}
									onChange={handelchange1}
								>
									<option value="" disabled>
										Select Type
									</option>
									{packTypes.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>

								<label className="packtype">Monuments</label>
								<div className="creP-input">
									<label className="packtype">
										Choose Monuments:
									</label>
									<select
										className="multiSelect"
										multiple
										onChange={handleChange2}
									>
										{monuments.map((monument) => (
											<option key={monument.id} value={monument.id}>
												{monument.name}
											</option>
										))}
									</select>
									<h3>Selected Monuments:</h3>
									<ul className="creP-ul">
										{selectedMonuments.map((option) => (
											<button
												key={option}
												onClick={handleCancelSelection}
											>
												<li className="creP-li">{option}</li>
											</button>
										))}
									</ul>
								</div>
								<button className="creP-submitBtn" type="submit">
									Create
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
}

export default CreatePack;
