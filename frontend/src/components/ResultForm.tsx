'use client';

import { useForm } from 'react-hook-form';
import { saveResult } from '../lib/api';

interface ResultFormProps {
  matchID: string;
  onSuccess: () => void;
}

interface FormData {
  scoreTeam1: number;
  scoreTeam2: number;
}

export const ResultForm: React.FC<ResultFormProps> = ({ matchID, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await saveResult(matchID, data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Score Team 1</label>
        <input
          type="number"
          {...register('scoreTeam1', { required: 'Score is required', min: 0 })}
          className="border p-2 w-full"
        />
        {errors.scoreTeam1 && <p className="text-red-500">{errors.scoreTeam1.message}</p>}
      </div>
      <div>
        <label className="block">Score Team 2</label>
        <input
          type="number"
          {...register('scoreTeam2', { required: 'Score is required', min: 0 })}
          className="border p-2 w-full"
        />
        {errors.scoreTeam2 && <p className="text-red-500">{errors.scoreTeam2.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Result
      </button>
    </form>
  );
};