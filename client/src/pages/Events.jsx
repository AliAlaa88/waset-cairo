import SliderSection from "../components/SliderSection";
import { useGetEventsQuery } from "../store/eventSlice";

const Events = () => {
	const { data: events, isFetching } = useGetEventsQuery();

	return (
		<>
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<SliderSection
					title={"Events"}
					description={"Select the Event you like and enjoy your tour"}
					cards={events}
					route={"tourist-home/events"}
				/>
			)}
		</>
	);
};

export default Events;
