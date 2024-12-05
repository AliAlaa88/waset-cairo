import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MonumentButton from "../components/MonumentButton";

const TourPackDetails = () => {
	const { id } = useParams();
	const packs = useSelector((state) => state.ui.packs);
	const pack = packs.find((p) => p.id === parseInt(id));
	const monuments = useSelector((state) => state.ui.monuments);

	// Get related monuments
	const relatedMonuments = pack.monumentIds.map((monId) =>
		monuments.find((mon) => mon.id === monId)
	);
	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold text-center mb-4">{pack.title}</h2>
			<div className="mx-auto w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
				{/* Package image */}
				<div className="mb-4">
					<img
						src={pack.image}
						alt={pack.title}
						className="w-full h-64 object-cover rounded-t-lg"
					/>
				</div>

				<div className="p-6">
					{/* Short description */}
					<p className="text-lg font-semibold text-center mb-4">
						{pack.shortDescription}
					</p>

					{/* Long description */}
					<p className="text-gray-700 text-justify mb-4">
						{pack.longDescription}
					</p>

					{/* Additional information */}
					<p className="text-md font-semibold mb-2">
						<strong>Location:</strong> {pack.location}
					</p>
					<p className="text-md font-semibold mb-2">
						<strong>Duration:</strong> {pack.duration} days
					</p>
					<p className="text-md font-semibold mb-2">
						<strong>Price:</strong> E{pack.price}
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

export default TourPackDetails;
