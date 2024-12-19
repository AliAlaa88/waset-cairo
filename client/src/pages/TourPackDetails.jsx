import { useParams } from "react-router-dom";
import MonumentButton from "../components/MonumentButton";
import { useGetPackQuery } from "../store/packSlice";
// import { useGetMonumentsQuery } from "../store/monumentSlice";

const TourPackDetails = () => {
	const { id } = useParams();
	// const { data: monuments, isFetching: monFetch } = useGetMonumentsQuery();
	const { data: pack, isFetching } = useGetPackQuery(id);

	return (
		<div className="p-6">
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<>
					<h2 className="text-3xl font-bold text-center mb-4">{pack.name}</h2>
					<div className="mx-auto w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
						{/* Package image */}
						<div className="mb-4">
							<img
								src={pack.image}
								alt={pack.name}
								className="w-full h-64 object-cover rounded-t-lg"
							/>
						</div>

						<div className="p-6 text-black">
							{/* Description */}
							<h1 className="text-s font-semibold text-center mb-8">
								{pack.description}
							</h1>
							{/* Additional information */}
							<p className="text-md font-semibold mb-2">
								<strong>Name:</strong> {pack.name}
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Meeting Location:</strong> {pack.meetinglocation}
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Type:</strong> {pack.type}
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Duration:</strong> {pack.duration} days
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Rating:</strong> {pack.rating}
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Price:</strong> E{pack.price}
							</p>
						</div>
					</div>

					<>
						{/* {pack.monumentid?.length > 0 && (
							<div className="mt-8">
								<h3 className="text-2xl font-semibold text-center mb-4">
									Related Monuments
								</h3>
								<div className="flex justify-evenly gap-4">
									{pack.monumentids.map(
										(monument) =>
											monument && (
												<MonumentButton
													key={monument.id}
													monumentID={monument.id}
												/>
											)
									)}
								</div>
							</div>
						)} */}
					</>
				</>
			)}
		</div>
	);
};

export default TourPackDetails;
