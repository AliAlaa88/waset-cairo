import { useParams } from "react-router-dom";

const TourPackDetails = () => {
  const { id } = useParams();
  return (
    <div>
      {id}
    </div>
  );
}

export default TourPackDetails;