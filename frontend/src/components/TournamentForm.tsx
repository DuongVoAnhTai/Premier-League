'use client';

import { useForm } from "react-hook-form";
import { createTournament } from "@/lib/api";

interface TournamentFormProps {
    onSuccess: () => void;
}

interface FormData {
    name: string;
    startDate: string;
    endDate: string;
}

export const TournamentForm: React.FC<TournamentFormProps> = ({ onSuccess }) => {
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        await createTournament(data);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block">Tournament Name</label>
                <input type="text" {...register('name', { required: 'Name is required' })} className="border p-2 w-full" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div>
                <label className="block">Start Date</label>
                <input type="date" {...register('endDate', { required: 'Start date is required' })} className="border p-2 w-full" />
                {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
            </div>
            <div>
                <label className="block">End Date</label>
                <input type="date" {...register('startDate', { required: 'End date is required' })} className="border p-2 w-full" />
                {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Create Tournament
            </button>
        </form>
    );
};