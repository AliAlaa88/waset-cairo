import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { NavLink } from "react-router-dom";

function SliderSection({ title, description, cards, route }) {
	return (
		<div>
			<h2 className="text-center text-3xl font-bold mb-8 text-gray-800">
				{title}
			</h2>
			<h4 className="text-center text-xl mb-8 text-gray-600">{description}</h4>
			<Swiper
				effect={"coverflow"}
				grabCursor={true}
				centeredSlides={true}
				loop={true}
				slidesPerView={"auto"}
				coverflowEffect={{
					rotate: 0,
					stretch: 0,
					depth: 100,
					modifier: 2.5,
				}}
				pagination={{ el: ".swiper-pagination", clickable: true }}
				navigation={{
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
					clickable: true,
				}}
				modules={[EffectCoverflow, Pagination, Navigation]}
				className="swiper-container relative flex items-center justify-center"
			>
				{cards.map((card) => (
					<SwiperSlide
						key={card.id}
						className="slide flex items-center justify-center h-[350px]"
					>
						<div className="card min-w-[350px] max-w-[350px] h-[350px] bg-white shadow-lg overflow-hidden transform transition-transform hover:scale-105 rounded-3xl relative my-2.5 mx-auto">
							<NavLink to={`/${route}/${card.id}`}>
								<img
									src={card.image}
									alt={card.title}
									className="w-full h-[250px] object-cover"
								/>
								<div className="bg-gradient-to-r from-sky-100 to-sky-500 text-white p-4 h-[100px]">
									<h3 className="text-lg font-semibold text-gray-800">
										{card.title}
									</h3>
									<p className="text-sm text-gray-600 mt-1 line-clamp-2">
										{card.description}
									</p>
								</div>
							</NavLink>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Navigation Buttons */}
			<div className="slider-controler relative">
				{/* Navigation Arrows */}
				<div className="swiper-button-prev slider-arrow absolute top-1/2 left-[-20px] transform -translate-y-1/2 z-10"></div>
				<div className="swiper-button-next slider-arrow absolute top-1/2 right-[-20px] transform -translate-y-1/2 z-10"></div>

				{/* Pagination Indicators */}
				<div className="absolute bottom-[-50px] left-0 w-full">
					<div className="swiper-pagination"></div>
				</div>
			</div>
		</div>
	);
}

export default SliderSection;
