import { useState } from "react";
import PackageButton from "../components/PackageButton";
import EventButton from "../components/EventButton";
import { useGetToursQuery, useGetToursThatDidntStartQuery } from "../store/tourSlice";
import { useGetPacksQuery } from "../store/packSlice";
import { useGetEventsQuery } from "../store/eventSlice";
import { useGetMonumentsQuery } from "../store/monumentSlice";
import { useSelector } from "react-redux";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import CheckOut from "../pages/CheckOut";

const Tours = ({ itemID }) => {
	const [quantity, setQuantity] = useState({});
	const [activeModal, setActiveModal] = useState({
		type: "",
		params: {},
	});

	const { userInfo } = useSelector((state) => state.auth);

	const handleIncrease = (tour) => {
		let value = quantity[tour.id] || 0;
		if(tour.ticketcapacity - parseInt(tour.bookedtickets) <= value) return null;
		setQuantity((prevStates) => ({
			...prevStates,
			[tour.id]: value + 1,
		}))
	};

	const handleDecrease = (id) => {
		let value = quantity[id] || 0;
		if (value > 0) {
			setQuantity((prevStates) => ({
				...prevStates,
				[id]: value - 1,
			}));
		}
	};

	const handleBuy = (tour) => {
		if (tour.ticketcapacity - parseInt(tour.ticket_count) < quantity[tour.id])
			alert("Not enough tickets available");
		else if (!quantity[tour.id]) alert("select tickets number");
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

	const { data: tours, isFetching: tourFetching } = useGetToursThatDidntStartQuery();
	const { data: packs, isFetching: packsFetch } = useGetPacksQuery();
	const { data: events, isFetching: eventsFetch } = useGetEventsQuery();
	const { data: monuments, isFetching: monumentsFetch } = useGetMonumentsQuery();

	if (!userInfo || userInfo.role !== "tourist") return <UnauthorizedPage />; //still not working as it should but for now..
	if(tourFetching || packsFetch || eventsFetch || monumentsFetch) return (<p>Loading...</p>);
	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold text-center mb-6">
				Available Tours
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
				{tours?.map((tour) => {
					if (tour.status !== "assigned") return null;
					const remainingTickets = tour.ticketcapacity - parseInt(tour.bookedtickets);
					const pack = packs.find((pack) => pack.id === tour.tourpackageid);

					if (remainingTickets <= 0) return null;

					if (itemID && (tour.tourpackageid !== parseInt(itemID) || tour.eventid !== parseInt(itemID)))
						return null;
					else
						return (
							<div
								key={tour.id}
								className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
							>
								<h3 className="text-xl font-semibold mb-2">
									{tour.name}
								</h3>
								<p className="text-sm text-gray-500 mb-1">
									Start Date: {tour.startdate.split("T")[0]}
								</p>
								<p className="text-sm text-gray-500 mb-1">
									End Date: {tour.enddate.split("T")[0]}
								</p>
								<p className="text-sm text-gray-500 mb-1">
									Price: {tour.price} LE
								</p>
								<p className={`text-sm font-semibold text-center text-${remainingTickets < 10? "red" : "green"}-500 mb-6`}>
									Only {remainingTickets} tickets left!
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
										onClick={() => handleIncrease(tour)}
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
								{!itemID? tour.tourpackageid? 
									<> 
										<h3 className="text-l font-semibold mb-2">
											Tour Pack:
										</h3>
										<PackageButton
											key={tour.id}
											packID={tour.tourpackageid}
											classN="flex items-center gap-4 w-full bg-yellow-500 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
											relatedMonument={monuments.find(
												(m) => m.id === pack.monumentids[0]
											)}
										/>
									</> : 
									<>
										<h3 className="text-l font-semibold mb-2">Tour Event:</h3>
										<EventButton
											key={tour.id}
											eventID={tour.eventid}
											classN="flex items-center gap-4 w-full bg-yellow-500 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
										/>
									</> :
									null
								}
							</div>
						); 
				})}

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
		</div>
	</div>
	);
};

export default Tours;
