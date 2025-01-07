"use client"

import {useMutation} from '@apollo/client';
import {DELETE_EARTHQUAKE} from '@/graphql/mutations';
import ModifyEarthquakeForm from './ModifyEarthquakeForm';
import styles from './EarthquakeItem.module.css';
import {DeleteEarthquakeMutation, DeleteEarthquakeMutationVariables, Earthquake} from "@/types/graphql";
import {formatDate} from "@/utils/format";

interface EarthquakeItemProps {
    earthquake: Earthquake;
    refetch: () => void;
}

const EarthquakeItem: React.FC<EarthquakeItemProps> = ({earthquake, refetch}) => {
    const [deleteEarthquake] = useMutation<DeleteEarthquakeMutation, DeleteEarthquakeMutationVariables>(DELETE_EARTHQUAKE, {
        onCompleted: () => refetch(),
    });

    const handleDelete = () => {
        deleteEarthquake({variables: {id: earthquake.id}});
    };


    return (
        <li className="flex flex-col p-4 mb-4 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <ul className="text-m text-gray-700 space-y-1 w-80">
                    <li>
                        <b>Location:</b> {earthquake.location}
                    </li>
                    <li>
                        <b>Magnitude:</b> {earthquake.magnitude}
                    </li>
                    <li>
                        <b>Date:</b> {formatDate(earthquake.date)}
                    </li>
                </ul>
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
            <div>
                <ModifyEarthquakeForm earthquake={earthquake} refetch={refetch}/>
            </div>
        </li>
    );
};

export default EarthquakeItem;
