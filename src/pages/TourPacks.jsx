import SliderSection from "../components/SliderSection";
import { useSelector } from "react-redux";

const TourPacks = () => {
	const packs = useSelector((state) => state.ui.packs);

	return (
		<div className="">
			<SliderSection
				title={"Tour Packs"}
				description={"Select the Tour-Pack you like and enjoy your tour"}
				cards={packs}
				route={"home/tour-packs"}
			/>
		</div>
	);
};

export default TourPacks;
