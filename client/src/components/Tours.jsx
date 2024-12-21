import { useState } from "react";
// import PackageButton from "../components/PackageButton";
// import EventButton from "../components/EventButton";
import { useGetToursQuery } from "../store/tourSlice";
import { useGetPacksQuery } from "../store/packSlice";
import { useGetEventsQuery } from "../store/eventSlice";
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
		if (!quantity[tour.id]) alert("select tickets number");
		else
			setActiveModal({
				type: "checkout",
				params: {
					tourID: tour.id,
					ticketsNum: quantity[tour.id],
				},
			});
	};

	const { data: tours, isFetching: tourFetching } = useGetToursQuery();
	const { data: packs, isFetching: packsFetch } = useGetPacksQuery();
	const { data: events, isFetching: eventsFetch } = useGetEventsQuery();

	const showTourModal = (tour) => {
		return (
			<div
				className="relative z-10"
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				{/*makes the background gray to give the modal effect*/}
				<div
					className="fixed inset-0 bg-gray-500/75 transition-opacity"
					aria-hidden="true"
				></div>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
							<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								<div className="flex items-start">
									<div className="mx-auto flex size-12 shrink-0 items-center justify-center bg-amber-100 rounded-full sm:mx-0 sm:size-10">
										<Wand size={26} color="#B8860B" />
									</div>
									<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
										<h3
											className="text-base font-semibold text-gray-900"
											id="modal-title"
										>
											What’s Next for This Tour?
										</h3>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Keep the tour fresh by updating its details, or remove
												it completely if it's no longer needed. The choice is
												yours!
											</p>
										</div>
									</div>
									<div
										onClick={() => setActiveModal({ type: "", params: {} })}
										className="flex justify-end items-end ml-28 cursor-pointer hover:bg-slate-300 rounded-lg"
									>
										<X size={26} />
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<button
									onClick={() => {
										handleDeleteTour(tour.id);
									}}
									type="button"
									className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 sm:ml-3 sm:w-auto"
								>
									Delete Tour
								</button>
								<button
									onClick={() => {
										setActiveModal({
											type: "launch",
											params: {
												id: tour.eventid || tour.tourpackageid,
												type: tour.eventid ? "editevent" : "editpackage",
												tourID: tour.id,
											},
										});
									}}
									type="button"
									className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto"
								>
									Edit Tour
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	if (!userInfo || userInfo.role !== "tourist") return <UnauthorizedPage />; //still not working as it should but for now..

	return (
		<div className="p-4">
			{tourFetching || packsFetch || eventsFetch ? (
				<p>Loading...</p>
			) : (
				<>
					<h2 className="text-2xl font-bold text-center mb-6">
						Available Tours
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
						{tours?.map((tour) => {
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
										{/* <PackageButton
															key={pack.id}
															pack={pack}
															classN="flex items-center gap-4 w-full bg-yellow-500 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
														/> */}
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
										{/* <EventButton
															key={pack.id}
															pack={pack}
															classN="flex items-center gap-4 w-full bg-yellow-500 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
														/> */}
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
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Tours;
