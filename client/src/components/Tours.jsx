import { useState } from "react";
import PackageButton from "../components/PackageButton";
import EventButton from "../components/EventButton";
import { useGetToursQuery } from "../store/tourSlice";
import { useGetPacksQuery } from "../store/packSlice";
import { useGetEventsQuery } from "../store/eventSlice";
import { useGetMonumentsQuery } from "../store/monumentSlice";
import { useSelector } from "react-redux";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import CheckOut from "../pages/CheckOut";

const Tours = () => {
	const [quantity, setQuantity] = useState({});
	const [activeModal, setActiveModal] = useState({
		type: "",
		params: {},
	});

	const { userInfo } = useSelector((state) => state.auth);

	const handleIncrease = (id) => {
		let value = quantity[id] ? quantity[id] : 0;
		if (value < 10) {
			setQuantity((prevStates) => ({
				...prevStates,
				[id]: value + 1,
			}));
		}
	};

	const handleDecrease = (id) => {
		let value = quantity[id] ? quantity[id] : 0;
		if (value > 0) {
			setQuantity((prevStates) => ({
				...prevStates,
				[id]: value - 1,
			}));
		}
	};
	const handleBuy = (tour) => {
		console.log(tour);
		if (!quantity[tour.id]) alert("select tickets number");
		else
			setActiveModal({
				type: "checkout",
				params: {
					tourID: tour.id,
					ticketsNum: quantity[tour.id],
					packPrice: packs.find((p) => p.id === tour.tourpackageid)?.price,
					eventPrice: events.find((e) => e.id === tour.eventid)?.price,
				},
			});
	};

	const { data: tours, isFetching: tourFetching } = useGetToursQuery();
	const { data: packs, isFetching: packsFetch } = useGetPacksQuery();
	const { data: events, isFetching: eventsFetch } = useGetEventsQuery();
	const { data: monuments, isFetching: monumentsFetch } = useGetMonumentsQuery();

	if (!userInfo || userInfo.role !== "tourist") return <UnauthorizedPage />; //still not working as it should but for now..

	return (
		<div className="p-4">
			{tourFetching || packsFetch || eventsFetch || monumentsFetch ? (
				<p>Loading...</p>
			) : (
				<>
					<h2 className="text-2xl font-bold text-center mb-6">
						Available Tours
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
						{tours?.map((tour) => {
							if (tour.status !== "assigned") return null;
							const pack = packs.find((pack) => pack.id === tour.tourpackageid);
							const event = events.find((event) => event.id === tour.eventid);
							if (pack)
								return (
									<div
										key={tour.id}
										className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
									>
										<h3 className="text-xl font-semibold mb-2">{pack.name}</h3>
										<p className="text-sm text-gray-500 mb-1">
											Start Date: {tour.startdate.split("T")[0]}
										</p>
										<p className="text-sm text-gray-500 mb-6">
											End Date: {tour.enddate.split("T")[0]}
										</p>

										<div className="flex items-center justify-between mb-4">
											<button
												className="bg-red-500 text-black font-medium py-1 px-3 rounded-lg hover:bg-red-600 transition"
												onClick={() => handleDecrease(tour.id)}
											>
												-
											</button>
											<span className="mx-4">{quantity[tour.id]}</span>
											<button
												className="bg-green-500 text-black font-medium py-1 px-3 rounded-lg hover:bg-green-600 transition"
												onClick={() => handleIncrease(tour.id)}
											>
												+
											</button>
										</div>
										<button
											className="w-full bg-sky-600 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition mb-6"
											onClick={() => handleBuy(tour)}
										>
											Buy
										</button>
										<h3 className="text-l font-semibold mb-2">Tour Pack:</h3>
										<PackageButton
											key={pack.id}
											packID={pack.id}
											classN="flex items-center gap-4 w-full bg-yellow-500 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
											relatedMonument={monuments.find(
												(m) => m.id === pack.monumentids[0]
											)}
										/>
									</div>
								);
							else if (event)
								return (
									<div
										key={tour.id}
										className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
									>
										<h3 className="text-xl font-semibold mb-2">{event.name}</h3>
										<p className="text-sm text-gray-500 mb-1">
											Start Date: {tour.startdate.split("T")[0]}
										</p>
										<p className="text-sm text-gray-500 mb-6">
											End Date: {tour.enddate.split("T")[0]}
										</p>

										<div className="flex items-center justify-between mb-4">
											<button
												className="bg-red-500 text-black font-medium py-1 px-3 rounded-lg hover:bg-red-600 transition"
												onClick={() => handleDecrease(tour.id)}
											>
												-
											</button>
											<span className="mx-4">{quantity[tour.id]}</span>
											<button
												className="bg-green-500 text-black font-medium py-1 px-3 rounded-lg hover:bg-green-600 transition"
												onClick={() => handleIncrease(tour.id)}
											>
												+
											</button>
										</div>
										<button
											className="w-full bg-sky-600 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition mb-6"
											onClick={() => handleBuy(tour)}
										>
											Buy
										</button>
										<h3 className="text-l font-semibold mb-2">Tour Event:</h3>
										<EventButton
											key={event.id}
											eventID={event.id}
											classN="flex items-center gap-4 w-full bg-yellow-500 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
										/>
									</div>
								);
						})}
					</div>

					{activeModal.type && (
						<CheckOut
							visible={activeModal.type === "checkout"}
							closeModal={() => setActiveModal({ type: "", params: {} })}
							tourID={activeModal.params.tourID}
							ticketsNum={activeModal.params.ticketsNum}
							packPrice={activeModal.params.packPrice}
							evetPrice={activeModal.params.eventPrice}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Tours;
