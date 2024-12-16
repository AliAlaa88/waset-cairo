import SliderSection from "../components/SliderSection";
import { useGetMonumentsQuery } from "../store/monumentSlice";

const Monuments = () => {
	const { data: monuments, isFetching } = useGetMonumentsQuery();

	return (
		<div className="">
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<SliderSection
					title={"Monuments"}
					description={"Explore the Pharonic Monuments and visit it"}
					cards={monuments}
					route={"tourist-home/monuments"}
				/>
			)}
		</div>
	);
};

export default Monuments;
