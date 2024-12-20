import React, { useState } from "react";
import Lanch from "./Lanch";
import {Link} from 'react-router-dom';
import { useGetOperatorPackagesQuery } from "../store/userSlice";

function MyPackes() {
    const [activeModal, setActiveModal] = useState(null);

    const {data: packages, isFetching: packagesFetching, isError: packagesError} = useGetOperatorPackagesQuery();

    const openModal = (packageId) => setActiveModal(packageId);
    const closeModal = () => setActiveModal(null);
    const handelDelete = {};

    if(packagesFetching) return (<p>Loading...</p>);
    return (
        <>
            <div className="flex items-center bg-amber-50 rounded-xl p-6 shadow-md border border-gold-300">
                        <div className="flex-grow">
                            <h2 className="text-3xl text-center font-bold text-yellow-800 mb-2">My Packages</h2>
                        </div>
            </div>
            <div className="tourToLanch">
                <div className="m-4 flex justify-end">
                    <Link to="/insert-monument">
                        <button className="w-40 mr-2 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700">
                            Add a Monument
                        </button>
                    </Link>
                    <Link to="/create-pack">
                        <button className="w-48 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700">
                            Create a Tour Package
                        </button>
                    </Link>
                </div>
                
                
                <div className="space-y-6">
                    {packages?.map((pack) => (
                    <div 
                        key={pack.id} 
                        className="flex items-center bg-amber-50 rounded-xl p-6 shadow-md border border-gold-300 hover:bg-amber-100 transition-all duration-300"
                    >
                        <div className="flex-grow">
                            <h2 className="text-2xl text-yellow-700 mb-2">
                                {pack.name}
                            </h2>
                        </div>
                        <button onClick={() => {openModal(pack.id)}}
                        className="ml-6 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 hover:text-white transition-colors duration-300"
                        >
                            Launch Tour
                        </button>
                        <Lanch
                            visible={activeModal === pack.id}
                            closeModal={closeModal}
                            type="package"
                            id={pack.id}
                        />
                    </div>))}
                </div>
            </div>
        </>
    );
}

export default MyPackes;