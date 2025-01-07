"use client"

import {useEffect, useState} from 'react';
import {isValidLocation} from '@/utils/validation';

interface EarthquakeFormProps {
    title?: string;
    clearOnSubmit?: boolean;
    initialData: {
        location: string;
        magnitude: number | string;
        date: string;
    };
    onSubmit: (data: { location: string; magnitude: number; date: string }) => void;
    submitButtonText: string;
}

const EarthquakeForm: React.FC<EarthquakeFormProps> = ({
                                                           clearOnSubmit,
                                                           title,
                                                           initialData,
                                                           onSubmit,
                                                           submitButtonText,
                                                       }) => {
    const [location, setLocation] = useState(initialData.location);
    const [magnitude, setMagnitude] = useState(String(initialData.magnitude));
    const [date, setDate] = useState(initialData.date);
    const [submitEnabled, setSubmitEnabled] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (submitEnabled) {
            onSubmit({
                location,
                magnitude: parseFloat(magnitude),
                date: new Date(date).toISOString(),
            });
            if (clearOnSubmit) {
                clearForm();
            }
        }
    };
    const clearForm = () => {
        setLocation('');
        setMagnitude('');
        setDate('');
        setSubmitEnabled(false);
    };

    useEffect(() => {
        setSubmitEnabled(!!location && isValidLocation(location) && !!magnitude && !!date)
    }, [location, magnitude, date])

    return (
        <> {title && <h4 className="text-xl font-semibold mb-4">{title}</h4>}
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location (e.g., lat,lon)"
                    required
                />
                <input
                    className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                    type="number"
                    value={magnitude}
                    onChange={(e) => setMagnitude(e.target.value)}
                    placeholder="Magnitude"
                    step="0.1"
                    min="0"
                    max="9"
                    required
                />
                <input
                    className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button className={`w-full p-1 rounded text-white ${submitEnabled ? "bg-green-700 hover:bg-green-800" : "bg-gray-300 cursor-not-allowed"}`} type="submit" disabled={!submitEnabled}>
                    {submitButtonText}
                </button>
            </form>
        </>
    );
};

export default EarthquakeForm;
