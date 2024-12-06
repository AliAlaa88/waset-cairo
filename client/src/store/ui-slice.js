import { createSlice } from "@reduxjs/toolkit";
import logo from "../assets/Nile with pyramids   with some Egyptian hieroglyphs and boat in the Nile.jpg";
import profileAvatar from "../assets/Nile with pyramids   with some Egyptian hieroglyphs and boat in the Nile.jpg";

const events = [
	{
		id: 1,
		title: "Music Festival 2024",
		image: logo,
		shortDescription: "Join us for an unforgettable music experience.",
		longDescription: "Join us for an unforgettable music experience featuring top artists and bands.",
		rating: 4.8,
		price: 100,
		startDate: "2024-06-10",
		endDate: "2024-06-12",
		photos: ["music_festival_stage.jpg", "music_festival_crowd.jpg"],
		monumentIds: [1, 2],
	},
	{
		id: 2,
		title: "Art & Craft Expo",
		image: logo,
		shortDescription: "Explore unique handmade creations.",
		longDescription: "Explore unique handmade creations and connect with talented artists.",
		rating: 4.7,
		price: 50,
		startDate: "2024-07-05",
		endDate: "2024-07-07",
		photos: ["art_expo_stall.jpg", "art_expo_artwork.jpg"],
		monumentIds: [3, 4],
	},
	{
		id: 3,
		title: "Tech Innovation Summit",
		image: logo,
		shortDescription: "Discover the latest advancements in technology.",
		longDescription: "Discover the latest advancements in technology and network with industry leaders.",
		rating: 4.9,
		price: 200,
		startDate: "2024-08-15",
		endDate: "2024-08-17",
		photos: ["tech_summit_stage.jpg", "tech_summit_exhibit.jpg"],
		monumentIds: [5],
	},
	{
		id: 4,
		title: "Food Carnival",
		image: logo,
		shortDescription: "Savor delicious cuisines from around the world.",
		longDescription: "Savor delicious cuisines from around the world at this grand food event.",
		rating: 4.6,
		price: 30,
		startDate: "2024-09-10",
		endDate: "2024-09-12",
		photos: ["food_carnival_stall.jpg", "food_carnival_dishes.jpg"],
		monumentIds: [1, 3],
	},
	{
		id: 5,
		title: "Charity Run 2024",
		image: logo,
		shortDescription: "Participate in a run for a cause.",
		longDescription: "Participate in a run for a cause and support local communities in need.",
		rating: 4.5,
		price: 20,
		startDate: "2024-10-05",
		endDate: "2024-10-05",
		photos: ["charity_run_start.jpg", "charity_run_finish.jpg"],
		monumentIds: [2, 4],
	},
];

const packs = [
	{
		id: 1,
		title: "Mystical Nile River Cruise",
		image: logo,
		shortDescription: "Sail along the legendary Nile River.",
		longDescription:
			"Embark on a luxurious cruise along the Nile, visiting iconic temples and soaking in the beauty of Egypt's lifeline.",
		rating: 4.9,
		location: "Nile River, Egypt",
		duration: 7,
		price: 1200,
		monumentIds: [2, 5],
	},
	{
		id: 2,
		title: "Red Sea Beach Escape",
		image: logo,
		shortDescription: "Relax on stunning Red Sea beaches.",
		longDescription:
			"Unwind at world-class resorts, enjoy crystal-clear waters, and experience vibrant coral reefs in the Red Sea Riviera.",
		rating: 4.8,
		location: "Hurghada, Egypt",
		duration: 5,
		price: 1500,
		monumentIds: [],
	},
	{
		id: 3,
		title: "Pharaonic Heritage Expedition",
		image: logo,
		shortDescription: "Explore Egypt’s ancient wonders.",
		longDescription:
			"Delve into the history of ancient Egypt with visits to the Pyramids of Giza, the Sphinx, and the Egyptian Museum.",
		rating: 5.0,
		location: "Giza and Cairo, Egypt",
		duration: 4,
		price: 900,
		monumentIds: [1],
	},
	{
		id: 4,
		title: "Adventure in the White Desert",
		image: logo,
		shortDescription: "Discover Egypt's unique desert landscapes.",
		longDescription:
			"Experience an off-the-beaten-path adventure in the White Desert, with its surreal rock formations and star-filled skies.",
		rating: 4.7,
		location: "White Desert, Egypt",
		duration: 3,
		price: 700,
		monumentIds: [],
	},
	{
		id: 5,
		title: "Luxor and Karnak Temple",
		image: logo,
		shortDescription: "Visit Luxor's timeless temples.",
		longDescription:
			"Marvel at the grandeur of the Karnak and Luxor Temples, the Valley of the Kings, and the grandeur of ancient Thebes.",
		rating: 4.9,
		location: "Luxor, Egypt",
		duration: 5,
		price: 1100,
		monumentIds: [2, 5],
	},
];

const monuments = [
	{
		id: 1,
		title: "Pyramids of Giza and Sphinx",
		image: logo,
		photos: [logo, "pyramids_day.jpg", "pyramids_night.jpg"],
		shortDescription: "Explore the ancient Pyramids and the Sphinx.",
		longDescription:
			"Marvel at the grandeur of the Great Pyramids of Giza and the Sphinx, iconic symbols of ancient Egyptian civilization.",
		location: "Giza, Egypt",
		openingHours: "8:00 AM - 5:00 PM",
		era: "Pharaonic",
	},
	{
		id: 2,
		title: "Temples of Luxor and Karnak",
		image: logo,
		photos: [logo, "luxor_temple.jpg", "karnak_temple.jpg"],
		shortDescription: "Discover Luxor's majestic temples.",
		longDescription:
		"Visit the ancient temples of Luxor and Karnak, showcasing Egypt's rich heritage and architectural brilliance.",
		location: "Luxor, Egypt",
		openingHours: "6:00 AM - 8:00 PM",
		era: "Pharaonic",
	},
	{
		id: 3,
		title: "Abu Simbel Temples",
		image: logo,
		photos: [logo, "abu_simbel_temple.jpg", "aswan_view.jpg"],
		shortDescription: "Experience the grandeur of Abu Simbel.",
		longDescription:
		"Admire the magnificent Abu Simbel temples, carved into cliffs to honor Ramses II and his queen Nefertari.",
		location: "Aswan, Egypt",
		openingHours: "7:00 AM - 6:00 PM",
		era: "Pharaonic",
	},
	{
		id: 4,
		title: "Siwa Oasis",
		image: logo,
		photos: [logo, "siwa_oasis_palm.jpg", "siwa_oasis_sunset.jpg"],
		shortDescription: "Relax in the tranquil Siwa Oasis.",
		longDescription:
		"Escape to the serene Siwa Oasis, surrounded by palm groves, natural springs, and the beauty of the desert.",
		location: "Siwa, Egypt",
		openingHours: "24 hours (Best time: 6:00 AM - 6:00 PM)",
		era: "Pharaonic",
	},
	{
		id: 5,
		title: "Valley of the Kings",
		image: logo,
		photos: [logo, "valley_of_kings.jpg", "luxor_sunset.jpg"],
		shortDescription: "Explore the tombs of Egyptian pharaohs.",
		longDescription:
		"Visit the Valley of the Kings, the burial site of Egypt’s greatest pharaohs, featuring intricate tomb art.",
		location: "Luxor, Egypt",
		openingHours: "6:00 AM - 4:00 PM",
		era: "Pharaonic",
	},
];

const tours = [
	{
		id: 1,
		startDate: "2024-01-10",
		endDate: "2024-01-17",
		packId: 1,
	},
	{
		id: 2,
		startDate: "2024-02-15",
		endDate: "2024-02-20",
		packId: 2,
	},
	{
		id: 3,
		startDate: "2024-03-01",
		endDate: "2024-03-04",
		packId: 3,
	},
	{
		id: 4,
		startDate: "2024-04-05",
		endDate: "2024-04-08",
		packId: 4,
	},
	{
		id: 5,
		startDate: "2024-05-12",
		endDate: "2024-05-17",
		packId: 5,
	},
];

const groups = [
	{
		id: 1,
		preferredMonumentIds: [1, 2],
		name: "The Explorers",
		commonLanguage: "English",
		participantCount: 20,
	},
	{
		id: 2,
		preferredMonumentIds: [3, 4],
		name: "Art Enthusiasts",
		commonLanguage: "French",
		participantCount: 15,
	},
	{
		id: 3,
		preferredMonumentIds: [5],
		name: "History Buffs",
		commonLanguage: "Spanish",
		participantCount: 25,
	},
	{
		id: 4,
		preferredMonumentIds: [1, 3],
		name: "Adventure Seekers",
		commonLanguage: "German",
		participantCount: 18,
	},
	{
		id: 5,
		preferredMonumentIds: [2, 5],
		name: "Cultural Connoisseurs",
		commonLanguage: "Italian",
		participantCount: 22,
	},
];


	const profileData = {
		name: "Tourist Name",
		firstName: "Tourist",
		lastName: "Name",
		email: "tourist@test.com",
		username: "tourist",
		password: "password",
		birthdate: "1990-01-01",
		gender: "male",

		avatar: profileAvatar,
		nationality: "Egypt",
		languages: ["English", "Arabic"],
		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ultricies elit, quis tincidunt dui. Sed sagittis ex turpis, a tempor magna hendrerit non. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
		accountInsights: {
			totalTrips: 3,
			totalSpent: "2,345 LE",
			memberSince: "March 2024",
		},
		favoriteExperience: {
			name: "Exploring the Pyramids of Giza",
			date: "October 2024",
			rating: 5,
		},
		tickets: [
			{
				id: "1",
				destination: "Luxor Temple",
				date: "October 15, 2024",
				status: "Completed",
			},
			{
				id: "2",
				destination: "Cairo Museum Tour",
				date: "October 18, 2024",
				status: "Upcoming",
			},
			{
				id: "3",
				destination: "Nile River Cruise",
				date: "October 22, 2024",
				status: "Booked",
			},
		],
		ratings: {
			overall: 4.8,
			tourGuides: 4.9,
			experiences: 4.7,
		},
		groupIDs: [1, 2],
};
	
const uiSlice = createSlice({
	name: "ui",
	initialState: { events, packs, monuments, tours, groups, profileData },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
