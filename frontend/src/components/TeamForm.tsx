'use client';

import { addTeam } from "@/lib/api";
import { useForm } from "react-hook-form";

interface TeamFormProps {
    tournamentID: string;
    onSuccess: () => void;
  }
  
  interface FormData {
    name: string;
    coach: string;
  }
  
  export const TeamForm: React.FC<TeamFormProps> = ({ tournamentID, onSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
    const onSubmit = async (data: FormData) => {
      await addTeam(tournamentID, data);
      onSuccess();
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Team Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="border p-2 w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block">Coach</label>
          <input
            type="text"
            {...register('coach', { required: 'Coach is required' })}
            className="border p-2 w-full"
          />
          {errors.coach && <p className="text-red-500">{errors.coach.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Team
        </button>
      </form>
    );
  };