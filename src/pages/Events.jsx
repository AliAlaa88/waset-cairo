import { useSelector } from "react-redux";
import SliderSection from "../components/SliderSection";

const Events = () => {
	const events = useSelector((state) => state.ui.events);

	return (
		<SliderSection
			title={"Events"}
			description={"Select the Event you like and enjoy your tour"}
			cards={events}
			route={"home/events"}
		/>
	);
};

export default Events;
