import { useSelector } from "react-redux";
import SliderSection from "../components/SliderSection";

const Monuments = () => {
	const monuments = useSelector((state) => state.ui.monuments);

	return (
		<div className="">
			<SliderSection
				title={"Monuments"}
				description={"Explore the Pharonic Monuments and visit it"}
				cards={monuments}
				route={"home/monuments"}
			/>
		</div>
	);
};

export default Monuments;
