"use client"

import { useMutation } from '@apollo/client';
import { ADD_EARTHQUAKE } from '@/graphql/mutations';

import { AddEarthquakeInput, AddEarthquakeMutation, AddEarthquakeMutationVariables } from '@/types/graphql';
import EarthquakeForm from "@/components/EarthquakeForm";
import React from "react";

interface CreateEarthquakeFormProps {
    refetch: () => void;
}

const CreateEarthquakeForm: React.FC<CreateEarthquakeFormProps> = ({ refetch }) => {
    const [addEarthquake, { loading }] = useMutation<AddEarthquakeMutation, AddEarthquakeMutationVariables>(ADD_EARTHQUAKE, {
        onCompleted: () => refetch(),
    });

    const handleSubmit = (data: { location: string; magnitude: number; date: string }) => {
        const input: AddEarthquakeInput = { ...data };
        addEarthquake({ variables: { input } });

    };


    return (

        <EarthquakeForm
            clearOnSubmit={true}
            title="Add new"
            initialData={{ location: '', magnitude: '', date: '' }}
            onSubmit={handleSubmit}
            submitButtonText={loading ? 'Adding...' : 'Add Earthquake'}
        />
    );
};

export default CreateEarthquakeForm;
