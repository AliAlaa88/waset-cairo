import SliderSection from "../components/SliderSection";

const TourPacks = () => {
	const packs = [
		{
			id: 1,
			title: "Tour Package 1",
			image: "https://via.placeholder.com/480x320",
			description:
				"Explore the beautiful landscapes of this destination. Perfect for nature lovers.",
		},
		{
			id: 2,
			title: "Tour Package 2",
			image: "https://via.placeholder.com/480x320",
			description:
				"Enjoy an adventurous trip filled with thrilling activities and scenic views.",
		},
		{
			id: 3,
			title: "Tour Package 3",
			image: "https://via.placeholder.com/480x320",
			description:
				"Discover cultural treasures and local traditions in this amazing tour.",
		},
		{
			id: 4,
			title: "Tour Package 4",
			image: "https://via.placeholder.com/480x320",
			description:
				"Relax on sandy beaches and soak up the sun in this tropical getaway.",
		},
		{
			id: 5,
			title: "Tour Package 5",
			image: "https://via.placeholder.com/480x320",
			description:
				"Embark on a culinary adventure with delicious local cuisines and flavors.",
		},
		{
			id: 6,
			title: "Tour Package 6",
			image: "https://via.placeholder.com/480x320",
			description:
				"Witness breathtaking architecture and historic landmarks in this city tour.",
		},
		{
			id: 7,
			title: "Tour Package 7",
			image: "https://via.placeholder.com/480x320",
			description:
				"Escape to the mountains for a serene experience surrounded by nature.",
		},
		{
			id: 8,
			title: "Tour Package 8",
			image: "https://via.placeholder.com/480x320",
			description:
				"Experience a fun-filled family vacation with activities for all ages.",
		},
		{
			id: 9,
			title: "Tour Package 9",
			image: "https://via.placeholder.com/480x320",
			description:
				"Take a romantic getaway to a destination that sparks love and relaxation.",
		},
	];

	return (
		<div>
			<SliderSection
				title={"Tour Packs"}
				description={"Select the Tour-Pack you like and enjoy your tour"}
				cards={packs}
				route={"tour-packs"}
			/>
		</div>
	);
};

export default TourPacks;
