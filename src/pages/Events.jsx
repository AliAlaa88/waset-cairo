import { useSelector } from "react-redux";
import SliderSection from "../components/SliderSection";

const Events = () => {
	const events = useSelector((state) => state.ui.events);

	return (
		<div className="py-10 bg-gray-200 h-[650px]">
			<SliderSection
				title={"Events"}
				description={"Select the Event you like and enjoy your tour"}
				cards={events}
				route={"begin/events"}
			/>
		</div>
	);
};

export default Events;
