import { useGetTourQuery } from "../store/tourSlice";
import { useAddTicketMutation } from "../store/ticketSlice";
function CheckOut({
	visible,
	closeModal,
	tourID,
	ticketsNum,
	packPrice,
	eventPrice,
}) {
	const { data: tour, isFetching } = useGetTourQuery(tourID);
	const [insertTicket] = useAddTicketMutation();

	const discount = ticketsNum > 3 ? ticketsNum : 0;
	const price = tour
		? (
				ticketsNum * (packPrice || eventPrice) -
				(discount / 100) * ticketsNum * (packPrice || eventPrice)
		  ).toFixed(2)
		: 0;

	async function submit(event) {
		event.preventDefault();
		try {
			for (let i = 0; i < ticketsNum; ++i) {
				const res = await insertTicket({
					price: price / ticketsNum,
					tourID: tourID,
				}).unwrap();
			}
			closeModal();
		} catch (err) {
			console.log(err);
		}
	}

	if (!visible) return null; // Render nothing if the modal is not visible
	return (
		<div className="modal-overlay" onClick={closeModal}>
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<div className="La-container">
							<form className="La-form" onSubmit={submit}>
								<div className="summary">
									<p className="ckout-tourName">
										{/* Selected Tour Name: {tourname || "None"} */}
									</p>
									<p className="ckout-Ntic">Number of Tickets: {ticketsNum}</p>
									<p className="ckout-discount">Discount: {discount}%</p>
									<p className="ckout-totalcost">Total Cost: ${price}</p>
								</div>
								<button className="ckout-btn" type="submit">
									Checkout
								</button>
							</form>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default CheckOut;
