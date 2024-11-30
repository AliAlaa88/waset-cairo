import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EventDetails = () => {
	const { id } = useParams();
	const events = useSelector((state) => state.ui.events);
	const event = events.find((ev) => ev.id === parseInt(id));

	return (
		<div className="py-10 bg-gray-200 h-[650px]">
			<h2 className="text-3xl font-bold text-center">{event.title}</h2>
			<div
				style={{
					border: "1px solid #ccc",
					borderRadius: "8px",
					width: "480px",
					margin: "20px auto",
					padding: "16px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					backgroundColor: "white",
				}}
			>
				<img
					src={event.image}
					alt={event.title}
					style={{
						width: "100%",
						height: "auto",
						borderRadius: "8px 8px 0 0",
					}}
				/>
			</div>
			<p className="text-xl text-center font-semibold">{event.description}</p>
		</div>
	);
};

export default EventDetails;
