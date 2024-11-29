import SliderSection from "../components/SliderSection";

const Events = () => {
	const events = [
		{
			id: 1,
			title: "Music Festival 2024",
			image: "https://via.placeholder.com/480x320",
			description:
				"Join us for an unforgettable music experience featuring top artists and bands.",
		},
		{
			id: 2,
			title: "Art & Craft Expo",
			image: "https://via.placeholder.com/480x320",
			description:
				"Explore unique handmade creations and connect with talented artists.",
		},
		{
			id: 3,
			title: "Tech Innovation Summit",
			image: "https://via.placeholder.com/480x320",
			description:
				"Discover the latest advancements in technology and network with industry leaders.",
		},
		{
			id: 4,
			title: "Food Carnival",
			image: "https://via.placeholder.com/480x320",
			description:
				"Savor delicious cuisines from around the world at this grand food event.",
		},
		{
			id: 5,
			title: "Charity Run 2024",
			image: "https://via.placeholder.com/480x320",
			description:
				"Participate in a run for a cause and support local communities in need.",
		},
	];

	return (
		<div>
			<SliderSection
				title={"Events"}
				description={"Select the Event you like and enjoy your tour"}
				cards={events}
				route={"events"}
			/>
		</div>
	);
};

export default Events;
