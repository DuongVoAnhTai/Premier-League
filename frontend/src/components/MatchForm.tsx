'use client';

import { useForm } from 'react-hook-form';
import { addMatch } from '../lib/api';
import { Team } from '../lib/types';
import Button from './Button';

interface MatchFormProps {
  scheduleID: string;
  teams: Team[];
  onSuccess: () => void;
}

interface FormData {
  team1ID: string;
  team2ID: string;
  matchDate: string;
}

export const MatchForm: React.FC<MatchFormProps> = ({ scheduleID, teams, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await addMatch(scheduleID, data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Team 1</label>
        <select
          {...register('team1ID', { required: 'Team 1 is required' })}
          className="border p-2 w-full"
        >
          <option value="">Select Team 1</option>
          {teams.map((team) => (
            <option key={team.teamID} value={team.teamID}>
              {team.name}
            </option>
          ))}
        </select>
        {errors.team1ID && <p className="text-red-500">{errors.team1ID.message}</p>}
      </div>
      <div>
        <label className="block">Team 2</label>
        <select
          {...register('team2ID', { required: 'Team 2 is required' })}
          className="border p-2 w-full"
        >
          <option value="">Select Team 2</option>
          {teams.map((team) => (
            <option key={team.teamID} value={team.teamID}>
              {team.name}
            </option>
          ))}
        </select>
        {errors.team2ID && <p className="text-red-500">{errors.team2ID.message}</p>}
      </div>
      <div>
        <label className="block">Match Date</label>
        <input
          type="date"
          {...register('matchDate', { required: 'Match date is required' })}
          className="border p-2 w-full"
        />
        {errors.matchDate && <p className="text-red-500">{errors.matchDate.message}</p>}
      </div>
      <Button>Add Match</Button>
      
    </form>
  );
};