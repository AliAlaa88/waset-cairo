import MyTouristGroup from "./MyTouristGroup";
import OtherGroups from "./OtherGroups";
const TouristGroup = () => {
  return ( 
    <div>
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Tourist Groups</h2>
      <MyTouristGroup />
      <OtherGroups />
    </div>
  );
}

export default TouristGroup;