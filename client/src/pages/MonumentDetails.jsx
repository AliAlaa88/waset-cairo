import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PackageButton from "../components/PackageButton";
import EventButton from "../components/EventButton";

const MonumentDetails = () => {
	const { id } = useParams();
	const monuments = useSelector((state) => state.ui.monuments);
	const monument = monuments.find((mo) => mo.id === parseInt(id));

	const packs = useSelector((state) => state.ui.packs);
	const relatedPacks = packs.filter((pack) =>
		pack.monumentIds.includes(monument.id)
	);

	const events = useSelector((state) => state.ui.events);
	const relatedEvents = events.filter((event) =>
		event.monumentIds.includes(monument.id)
	);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold text-center mb-4">{monument.title}</h2>
			<div className="mx-auto w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
				{/* Photos carousel or main image */}
				<div className="mb-4">
					<img
						src={monument.image} // Display the first photo
						alt={monument.title}
						className="w-full h-64 object-cover rounded"
					/>
				</div>

				<div className="p-6">
					{/* Short description */}
					<p className="text-lg font-semibold text-center mb-4">
						{monument.shortDescription}
					</p>

					{/* Long description */}
					<p className="text-gray-700 text-justify mb-4">
						{monument.longDescription}
					</p>

					{/* Location */}
					<p className="text-md font-semibold mb-2">
						<strong>Location:</strong> {monument.location}
					</p>

					{/* Opening hours */}
					<p className="text-md font-semibold mb-2">
						<strong>Opening Hours:</strong> {monument.openingHours}
					</p>
				</div>
			</div>

			{/* Related Tour Packages */}
			{relatedPacks.length > 0 && (
				<div className="mt-8">
					<h3 className="text-2xl font-semibold text-center mb-4">
						Related Tour Packages
					</h3>
					<div className="flex justify-evenly gap-4">
						{relatedPacks.map((pack) => (
							<PackageButton
								key={pack.id}
								pack={pack}
								classN="flex flex-col items-center w-[250px] bg-gray-100 border rounded-lg shadow hover:bg-gray-200 transition duration-200 p-4"
							/>
						))}
					</div>
				</div>
			)}

			{/* Related Events */}
			{relatedEvents.length > 0 && (
				<div className="mt-8">
					<h3 className="text-2xl font-semibold text-center mb-4">
						Related Events
					</h3>
					<div className="flex justify-evenly gap-4">
						{relatedEvents.map((event) => (
							<EventButton
								key={event.id}
								event={event}
								classN="flex flex-col items-center w-[250px] bg-gray-100 border rounded-lg shadow hover:bg-gray-200 transition duration-200 p-4"
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default MonumentDetails;
