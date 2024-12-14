import SliderSection from "../components/SliderSection";
import { useGetPacksQuery } from "../store/packSlice";

const TourPacks = () => {
	const { data, isFetching } = useGetPacksQuery();

	return (
		<div className="">
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<SliderSection
					title={"Tour Packs"}
					description={"Select the Tour-Pack you like and enjoy your tour"}
					cards={data}
					route={"home/tour-packs"}
				/>
			)}
		</div>
	);
};

export default TourPacks;
