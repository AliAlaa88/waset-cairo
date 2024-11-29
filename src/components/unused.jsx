import React, { useRef } from "react";

const SliderSection = () => {
	const sliderRef = useRef(null);

	const scrollLeft = () => {
		sliderRef.current.scrollBy({ left: -500, behavior: "smooth" });
	};

	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: 500, behavior: "smooth" });
	};

const cards = [
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
		<div className="relative">
			<h2 className="text-2xl font-bold mb-4">Tour Packages</h2>
			{/* Left Scroll Button */}
			<button
				onClick={scrollLeft}
				className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 z-10"
			>
				&lt;
			</button>

			{/* Slider */}
			<div
				ref={sliderRef}
				className="flex overflow-x-scroll scroll-smooth gap-5 p-2 scrollbar-hide"
			>
				{cards.map((card) => (
					<div
						key={card.id}
						className="min-w-[400px] max-w-[400px] h-[350px] bg-white rounded-lg shadow-md overflow-hidden"
					>
						<img
							src={card.image}
							alt={card.title}
							className="w-full h-[250px] object-cover"
						/>
						<div className="p-4">
							<h3 className="text-lg font-bold">{card.title}</h3>
							<p className="text-sm text-gray-600 mt-2 line-clamp-2">
								{card.description}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Right Scroll Button */}
			<button
				onClick={scrollRight}
				className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 z-10"
			>
				&gt;
			</button>
		</div>
	);
};
export default SliderSection;