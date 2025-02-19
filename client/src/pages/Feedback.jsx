import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAddFeedbackMutation } from "../store/feedbackSlice";
function Feedback() {
	const [addFeedback] = useAddFeedbackMutation();
	const [discription, setdiscription] = useState("");
	const [type, settype] = useState("");
	const [rating, setrating] = useState(5);
	const navigate = useNavigate();
	const { tourID } = useParams();
	async function submit(event) {
		event.preventDefault();
		if (!discription || !rating || !type) {
			alert("Please fill in all the required information");
		} else {
			try {
				const res = await addFeedback({
					description: discription,
					rating: parseFloat(rating),
					type,
					tourID,
				}).unwrap();
				window.location.href = "/tourist-home/profile";
			} catch (error) {
				console.error("Failed to create Feedback:", error);
			}
		}
	}

	return (
		<div className="feedback-contaner">
			<form className="fdForm" onSubmit={submit}>
				<h2 className="feedback-tital">Feedback</h2>
				<div className="fd-inputs">
					<label className="fd-rateLable">Description</label>
					<textarea
						className="fd-input"
						type="text"
						cols="18"
						rows="5"
						placeholder="Description"
						value={discription}
						onChange={(e) => setdiscription(e.target.value)}
					/>
					<br></br>

					<label className="fd-rateLable">Rating (from 1 to 5)</label>
					<input
						className="fd-input"
						type="number"
						min="0"
						max="5"
						step="0.1"
						placeholder="rate from 1 to 5"
						required
						value={rating}
						onChange={(e) => setrating(parseFloat(e.target.value))}
					/>

					<div className="fd-radio-group">
						<span>Type</span>
						<br />
						<label>
							<input
								type="radio"
								name="type"
								value="Tour Guide"
								required
								checked={type === "Tour Guide"}
								onChange={(e) => settype(e.target.value)}
							/>
							Tour Guide
						</label>
						<label>
							<input
								type="radio"
								name="type"
								value="Tour"
								checked={type === "Tour"}
								onChange={(e) => settype(e.target.value)}
							/>
							Tour
						</label>
					</div>
				</div>
				<div className="fd-buttons">
					<Link to="/tourist-home/profile">
						<button className="fd-cancleBtn" type="button">
							Cancel
						</button>
					</Link>
					<button className="fd-submitBtn" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default Feedback;
