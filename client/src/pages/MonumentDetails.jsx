import { useParams } from "react-router-dom";
// import PackageButton from "../components/PackageButton";
import { useGetMonumentQuery } from "../store/monumentSlice";

const MonumentDetails = () => {
	const { id } = useParams();
	const { data: monument, isFetching } = useGetMonumentQuery(id);

	return (
		<div className="p-6">
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<>
					<h2 className="text-3xl font-bold text-center mb-4">
						{monument.name}
					</h2>
					<div className="mx-auto w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
						{/* Photos carousel or main image */}
						<div className="mb-4">
							<img
								// Display the first photo
								alt={monument.name}
								className="w-full h-64 object-cover rounded"
							/>
						</div>

						<div className="p-6 text-black">
							<h1 className="text-s font-semibold mb-8">
								{monument.description}
							</h1>
							<p className="text-lg font-semibold">
								<strong>Name:</strong> {monument.name}
							</p>
							<p className="text-lg font-semibold">
								<strong>Location:</strong> {monument.location}
							</p>
							<p className="text-lg font-semibold">
								<strong>Era:</strong> {monument.era}
							</p>
							<p className="text-lg font-semibold">
								<strong>Family:</strong> {monument.family}
							</p>
							<p className="text-lg font-semibold">
								<strong>Opening Hours:</strong> {monument.openinghours}
							</p>
						</div>
					</div>

					{/* Related Tour Packages */}
					{/* {relatedPacks.length > 0 && (
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
					)} */}

					{/* Related Events */}
					{/* {relatedEvents.length > 0 && (
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
					)} */}
				</>
			)}
		</div>
	);
};

export default MonumentDetails;
