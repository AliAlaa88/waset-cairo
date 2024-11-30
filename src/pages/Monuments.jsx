import { useSelector } from "react-redux";
import SliderSection from "../components/SliderSection";

const Monuments = () => {
	const monuments = useSelector((state) => state.ui.monuments);

	return (
		<div className="py-10 bg-gray-200 h-[650px]">
			<SliderSection
				title={"Monuments"}
				description={"Explore the Pharonic Monuments and visit it"}
				cards={monuments}
				route={"begin/monuments"}
			/>
		</div>
	);
};

export default Monuments;
