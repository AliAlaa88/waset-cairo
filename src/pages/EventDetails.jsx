import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MonumentButton from "../components/MonumentButton";

const EventDetails = () => {
	const { id } = useParams();
	const events = useSelector((state) => state.ui.events);
	const event = events.find((e) => e.id === parseInt(id));
	const monuments = useSelector((state) => state.ui.monuments);

	const relatedMonuments = event.monumentIds.map((monId) =>
		monuments.find((mon) => mon.id === monId)
	);
	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold text-center mb-4">{event.title}</h2>
			<div className="mx-auto w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
				{/* Event image */}
				<div className="mb-4">
					<img
						src={event.image}
						alt={event.title}
						className="w-full h-64 object-cover rounded-t-lg"
					/>
				</div>

				<div className="p-6">
					{/* Short description */}
					<p className="text-lg font-semibold text-center mb-4">
						{event.shortDescription}
					</p>

					{/* Long description */}
					<p className="text-gray-700 text-justify mb-4">
						{event.longDescription}
					</p>

					{/* Additional information */}
					<p className="text-md font-semibold mb-2">
						<strong>Date:</strong> {event.startDate} - {event.endDate}
					</p>
					<p className="text-md font-semibold mb-2">
						<strong>Price:</strong> E{event.price}
					</p>
				</div>
			</div>

			{relatedMonuments.length > 0 && (
				<div className="mt-8">
					<h3 className="text-2xl font-semibold text-center mb-4">
						Related Monuments
					</h3>
					<div className="flex justify-evenly gap-4">
						{relatedMonuments.map((monument) => (
							<MonumentButton key={monument.id} monument={monument} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default EventDetails;
