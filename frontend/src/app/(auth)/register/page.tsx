'use client'

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'coach';
}

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.name, data.email, data.password, data.role);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block">Name</label>
                <input type="text" {...register('name', { required: 'Name is required' })} className="border p-2 w-full"/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block">Email</label>
                <input type="email" {...register('email', { required: 'Email is required' })} className="border p-2 w-full"/>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block">Password</label>
                <input type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} className="border p-2 w-full"/>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div>
                <label className="block">Role</label>
                <select {...register('role', { required: 'Role is required' })} className="border p-2 w-full">
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="coach">Coach</option>
                </select>
                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
            
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                Register
            </button>
        </form>
    </div>
  );
}