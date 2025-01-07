"use client"

import {useMutation} from '@apollo/client';
import {UPDATE_EARTHQUAKE} from '@/graphql/mutations';
import {
    Earthquake,
    UpdateEarthquakeInput,
    UpdateEarthquakeMutation,
    UpdateEarthquakeMutationVariables
} from '@/types/graphql';
import EarthquakeForm from "@/components/EarthquakeForm";

interface ModifyEarthquakeFormProps {
    earthquake: Earthquake;
    refetch: () => void;
}

const ModifyEarthquakeForm: React.FC<ModifyEarthquakeFormProps> = ({earthquake, refetch}) => {
    const [updateEarthquake, {loading}] = useMutation<UpdateEarthquakeMutation, UpdateEarthquakeMutationVariables>(UPDATE_EARTHQUAKE, {
        onCompleted: () => refetch(),
    });

    const handleSubmit = (data: { location: string; magnitude: number; date: string }) => {
        const input: UpdateEarthquakeInput = {id: earthquake.id, ...data};
        updateEarthquake({variables: {input}});
    };

    return (
        <EarthquakeForm
            initialData={{
                location: earthquake.location,
                magnitude: earthquake.magnitude,
                date: new Date(earthquake.date).toISOString().split('T')[0],
            }}
            onSubmit={handleSubmit}
            submitButtonText={loading ? 'Updating...' : 'Update'}
        />
    );
};

export default ModifyEarthquakeForm;
