import { useSelector } from "react-redux";
import SliderSection from "../components/SliderSection";

const Monuments = () => {
	const egyptianTemplates = useSelector((state) => state.ui.egyptianTemplates);

	return (
		<div className="py-10 bg-gray-200 h-[650px]">
			<SliderSection
				title={"Monuments"}
				description={"Explore the Pharonic Monuments and visit it"}
				cards={egyptianTemplates}
				route={"monuments"}
			/>
		</div>
	);
};

export default Monuments;
