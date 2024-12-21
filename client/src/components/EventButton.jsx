import { Link } from "react-router-dom";
import { useGetEventQuery } from "../store/eventSlice";

const EventButton = ({ eventID, classN }) => {
	const { data: event, isFetching } = useGetEventQuery(eventID);

	return isFetching ? (
		<p>Looding...</p>
	) : (
		<>
			<Link to={`/tourist-home/tour-packs/${event?.id}`} className={classN}>
				{/* <img
					src={
						pack.photos
							? pack.photos[0]
							: "https://th.bing.com/th/id/R.2351827d896995f1f6e12e89176f3d9b?rik=t258KJio4%2bo0PA&pid=ImgRaw&r=0"
					}
					alt={pack.name}
					className="w-24 h-24 rounded-full"
				/> */}
				<h4 className="mt-2 text-lg font-medium text-yellow-800">
					{event?.name}
				</h4>
			</Link>
		</>
	);
};

export default EventButton;
