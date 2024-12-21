import { useParams } from "react-router-dom";
import MonumentButton from "../components/MonumentButton";
import { useGetEventQuery } from "../store/eventSlice";
import { useGetMonumentQuery } from "../store/monumentSlice";

const EventDetails = () => {
	const { id } = useParams();
	const { data: event, isFetching } = useGetEventQuery(id);
	const { data: firstMon, isFetching: monumentFetch } = useGetMonumentQuery(
		event?.monumentids[0]
	);
	return (
		<div className="p-6">
			{isFetching || monumentFetch ? (
				<p>Loading...</p>
			) : (
				<>
					<h2 className="text-3xl font-bold text-center mb-4">{event.name}</h2>
					<div className="mx-auto w-full max-w-xl bg-white text-black rounded-lg shadow-md overflow-hidden">
						{/* Event image */}
						<div className="mb-4">
							<img
								src={firstMon.photos[0]}
								alt={event.name}
								className="w-full h-64 object-cover rounded-t-lg"
							/>
						</div>

						<div className="p-6 text-black">
							{/* Short description */}
							<h1 className="text-s font-semibold text-center mb-8">
								{event.description}
							</h1>

							{/* Additional information */}
							<p className="text-md font-semibold mb-2">
								<strong>Name:</strong> {event.name}
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Location:</strong> {event.meetinglocation}
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Type:</strong> {event.type}
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Duration:</strong> {event.duration} hours
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Rating:</strong> {event.rating}
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Price:</strong> E{event.price}
							</p>
						</div>
					</div>
					<>
						<div className="mt-8">
							<h3 className="text-2xl font-semibold text-center mb-4">
								Related Monuments
							</h3>
							{event.monumentids?.length > 0 && (
								<div className="flex justify-evenly gap-4">
									{event.monumentids.map((monumentID) => (
										<MonumentButton key={monumentID} monumentID={monumentID} />
									))}
								</div>
							)}
						</div>
					</>
				</>
			)}
		</div>
	);
};

export default EventDetails;
