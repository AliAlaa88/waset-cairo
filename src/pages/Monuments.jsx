import SliderSection from "../components/SliderSection";

const Monuments = () => {
	const egyptianTemplates = [
		{
			id: 1,
			title: "Pyramids of Giza Tour",
			image: "https://via.placeholder.com/480x320",
			description:
				"Experience the grandeur of the Great Pyramids and the Sphinx, marvels of ancient engineering.",
		},
		{
			id: 2,
			title: "Nile River Cruise",
			image: "https://via.placeholder.com/480x320",
			description:
				"Sail along the historic Nile River and visit iconic temples and ancient ruins.",
		},
		{
			id: 3,
			title: "Luxor & Karnak Temples",
			image: "https://via.placeholder.com/480x320",
			description:
				"Discover the magnificent temples of Luxor and Karnak, showcasing the glory of ancient Egypt.",
		},
		{
			id: 4,
			title: "Aswan and Abu Simbel Adventure",
			image: "https://via.placeholder.com/480x320",
			description:
				"Explore Aswan's beauty and the stunning Abu Simbel temples carved into the cliffs.",
		},
		{
			id: 5,
			title: "Siwa Oasis Escape",
			image: "https://via.placeholder.com/480x320",
			description:
				"Relax in the serene Siwa Oasis, surrounded by palm groves, hot springs, and desert landscapes.",
		},
	];

	return (
		<div>
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
