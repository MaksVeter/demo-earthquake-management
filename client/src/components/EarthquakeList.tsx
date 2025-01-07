"use client"

import {useQuery} from '@apollo/client';
import {GET_EARTHQUAKES} from '@/graphql/queries';
import EarthquakeItem from "@/components/EarthquakeItem";
import {GetEarthquakesQuery, GetEarthquakesQueryVariables} from "@/types/graphql";
import CreateEarthquakeForm from "@/components/CreateEarthquakeForm";
import React, {useState} from "react";


interface EarthquakeListProps {
    perPage: number;
    initialData: GetEarthquakesQuery
}

const EarthquakeList: React.FC<EarthquakeListProps> = ({initialData, perPage}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const {
        data = initialData,
        error,
        refetch
    } = useQuery<GetEarthquakesQuery, GetEarthquakesQueryVariables>(GET_EARTHQUAKES, {
        variables: {limit: perPage, offset: (currentPage - 1) * perPage},
        fetchPolicy: 'cache-and-network'
    });

    const totalPages = Math.ceil(data?.totalEarthquakes / perPage)
    const handleNextPage = () => {
        if (data && data.earthquakes.length === perPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 shadow rounded-lg">
                <b>Total Items: {data?.totalEarthquakes}</b>
                <ul className="mt-4 space-y-2">
                    {data?.earthquakes.map((earthquake) => (
                        <EarthquakeItem key={earthquake.id} earthquake={earthquake} refetch={refetch}/>
                    ))}
                </ul>
                <div className="mt-4 flex items-center justify-between">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-green-700 hover:bg-green-800 text-white"}`}
                    >
                        Prev
                    </button>
                    <span className="text-sm text-gray-700">
             {currentPage}/{totalPages}
          </span>
                    <button
                        onClick={handleNextPage}
                        disabled={totalPages <= currentPage}
                        className={`px-4 py-2 rounded-lg ${totalPages <= currentPage ? "bg-gray-300" : "bg-green-700 hover:bg-green-800 text-white"}`}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
                <CreateEarthquakeForm refetch={refetch}/>
            </div>
        </div>
    );
};

export default EarthquakeList;

