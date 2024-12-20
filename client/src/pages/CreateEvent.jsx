import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMonumentsQuery } from "../store/monumentSlice";
import { useAddEventMutation } from "../store/eventSlice";
function CreateEvent() {
	const { data: monuments, isFetching } = useGetMonumentsQuery();
	const [createEvent] = useAddEventMutation();
	const [discription, setdiscription] = useState("");
	const [duration, setduration] = useState(0);
	const [hourOrday, sethourOrday] = useState("");
	const [name, setname] = useState("");
	const [price, setprice] = useState(0);
	const [mettingLoc, setmettingLoc] = useState("");
	const [selectedType, setselectedType] = useState("");
	const [selectedMonuments, setSelectedMonuments] = useState([]);
	const navigate = useNavigate();

	const eventTypes = [
		"Military Battles and Landmarks",
		"National Festivals and Celebrations",
		"Religious",
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
                const res = await createEvent({
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
				console.error("Failed to create Event:", error);
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
		setSelectedMonuments((prev) => [...prev, monument.name]);
	};
	const handleCancelSelection = (event) => {
		const monumentName = event.target.textContent;
		setSelectedMonuments((prev) =>
			prev.filter((name) => name !== monumentName)
		);
	};

	return (
		<div className="Ev-body">
			<div className="Ev-contaner">
				{isFetching ? (
					<p>Loading...</p>
				) : (
					<>
						<form className="Event" onSubmit={submit}>
							<h2 className="Ev-titel">Create Event</h2>
							<div className="Ev-inputs">
								<label className="Ev-rateLable">Name</label>
								<input
									className="Ev-input"
									type="text"
									placeholder="Enter the Event Name"
									required
									value={name}
									onChange={(e) => setname(e.target.value)}
								/>
								<label className="Ev-rateLable">Description</label>
								<textarea
									className="Ev-input"
									type="text"
									cols="18"
									rows="5"
									placeholder="Description"
									value={discription}
									onChange={(e) => setdiscription(e.target.value)}
								/>
								<label className="Ev-rateLable">Price</label>
								<input
									className="Ev-input"
									type="number"
									placeholder="Put the Event price"
									required
									value={price}
									onChange={(e) => setprice(e.target.value)}
								/>
								<label className="Ev-rateLable">Meeting Location</label>
								<input
									className="Ev-input"
									type="text"
									placeholder="Enter the Meeting Location"
									required
									value={mettingLoc}
									onChange={(e) => setmettingLoc(e.target.value)}
								/>

								<div className="Ev-duration">
									<label>Duration</label>
									<input
										className="Ev-input"
										type="number"
										placeholder="enter duration of event"
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

								<label className="packtype">Event Type</label>
								<select
									className="Ev-input"
									value={selectedType}
									onChange={handelchange1}
								>
									<option value="" disabled>
										Select Type
									</option>
									{eventTypes.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>

								<div className="Ev-input">
									<label className="eventtype">Choose Monuments:</label>
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
											<button key={option} onClick={handleCancelSelection}>
												<li className="creP-li">{option}</li>
											</button>
										))}
									</ul>
								</div>
								<button className="Ev-submitBtn" type="submit">
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

export default CreateEvent;
