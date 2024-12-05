import { useSelector } from "react-redux";
import PackageButton from "../components/PackageButton";

const Tours = () => {
	const tours = useSelector((state) => state.ui.tours); // Replace 'tours' with your actual slice name in the Redux store
	const packs = useSelector((state) => state.ui.packs);
	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold text-center mb-6">Available Tours</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
				{tours.map((tour) => {
					const pack = packs.find((p) => p.id === parseInt(tour.packId));
					return (
						<div
							key={tour.id}
							className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
						>
							<h3 className="text-xl font-semibold mb-2">{pack.title}</h3>
							<p className="text-sm text-gray-500 mb-1">
								Start Date: {tour.startDate}
							</p>
							<p className="text-sm text-gray-500 mb-6">
								End Date: {tour.endDate}
							</p>
							<button className="w-full bg-sky-600 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition mb-6">
								Join Tour
							</button>
							<h3 className="text-l font-semibold mb-2">Tour Pack:</h3>
							<PackageButton
								key={pack.id}
								pack={pack}
								classN="flex items-center gap-4 w-full bg-yellow-500 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Tours;
