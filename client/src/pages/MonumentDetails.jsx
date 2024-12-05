import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MonumentDetails = () => {
	const { id } = useParams();
	const monuments = useSelector((state) => state.ui.monuments);
	const monument = monuments.find((mo) => mo.id === parseInt(id));
	return (
		<div className="">
			<h2 className="text-3xl font-bold text-center">{monument.title}</h2>
			<div
				style={{
					border: "1px solid #ccc",
					borderRadius: "8px",
					width: "480px",
					margin: "20px auto",
					padding: "16px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					backgroundColor: "white",
				}}
			>
				<img
					src={monument.image}
					alt={monument.title}
					style={{
						width: "100%",
						height: "auto",
						borderRadius: "8px 8px 0 0",
					}}
				/>
			</div>
			<p className="text-xl text-center font-semibold">
				{monument.description}
			</p>
		</div>
	);
};

export default MonumentDetails;
