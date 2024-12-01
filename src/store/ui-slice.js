import { createSlice } from "@reduxjs/toolkit";
import logo from "../assets/Nile with pyramids   with some Egyptian hieroglyphs and boat in the Nile.jpg";

const events = [
	{
		id: 1,
		title: "Music Festival 2024",
		image: logo,
		description:
			"Join us for an unforgettable music experience featuring top artists and bands.",
	},
	{
		id: 2,
		title: "Art & Craft Expo",
		image: logo,
		description:
			"Explore unique handmade creations and connect with talented artists.",
	},
	{
		id: 3,
		title: "Tech Innovation Summit",
		image: logo,
		description:
			"Discover the latest advancements in technology and network with industry leaders.",
	},
	{
		id: 4,
		title: "Food Carnival",
		image: logo,
		description:
			"Savor delicious cuisines from around the world at this grand food event.",
	},
	{
		id: 5,
		title: "Charity Run 2024",
		image: logo,
		description:
			"Participate in a run for a cause and support local communities in need.",
	},
];
const packs = [
	{
		id: 1,
		title: "Tour Package 1",
		image: logo,
		description:
			"Explore the beautiful landscapes of this destination. Perfect for nature lovers.",
	},
	{
		id: 2,
		title: "Tour Package 2",
		image: logo,
		description:
			"Enjoy an adventurous trip filled with thrilling activities and scenic views.",
	},
	{
		id: 3,
		title: "Tour Package 3",
		image: logo,
		description:
			"Discover cultural treasures and local traditions in this amazing tour.",
	},
	{
		id: 4,
		title: "Tour Package 4",
		image: logo,
		description:
			"Relax on sandy beaches and soak up the sun in this tropical getaway.",
	},
	{
		id: 5,
		title: "Tour Package 5",
		image: logo,
		description:
			"Embark on a culinary adventure with delicious local cuisines and flavors.",
	},
	{
		id: 6,
		title: "Tour Package 6",
		image: logo,
		description:
			"Witness breathtaking architecture and historic landmarks in this city tour.",
	},
	{
		id: 7,
		title: "Tour Package 7",
		image: logo,
		description:
			"Escape to the mountains for a serene experience surrounded by nature.",
	},
	{
		id: 8,
		title: "Tour Package 8",
		image: logo,
		description:
			"Experience a fun-filled family vacation with activities for all ages.",
	},
	{
		id: 9,
		title: "Tour Package 9",
		image: logo,
		description:
			"Take a romantic getaway to a destination that sparks love and relaxation.",
	},
];
const monuments = [
	{
		id: 1,
		title: "Pyramids of Giza Tour",
		image: logo,
		description:
			"Experience the grandeur of the Great Pyramids and the Sphinx, marvels of ancient engineering.",
	},
	{
		id: 2,
		title: "Nile River Cruise",
		image: logo,
		description:
			"Sail along the historic Nile River and visit iconic temples and ancient ruins.",
	},
	{
		id: 3,
		title: "Luxor & Karnak Temples",
		image: logo,
		description:
			"Discover the magnificent temples of Luxor and Karnak, showcasing the glory of ancient Egypt.",
	},
	{
		id: 4,
		title: "Aswan and Abu Simbel Adventure",
		image: logo,
		description:
			"Explore Aswan's beauty and the stunning Abu Simbel temples carved into the cliffs.",
	},
	{
		id: 5,
		title: "Siwa Oasis Escape",
		image: logo,
		description:
			"Relax in the serene Siwa Oasis, surrounded by palm groves, hot springs, and desert landscapes.",
	},
];

const uiSlice = createSlice({
	name: "ui",
	initialState: { events, packs, monuments },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
