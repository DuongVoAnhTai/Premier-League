'use client'

import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { login } = useAuth();
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            await login(data.email, data.password);
            router.push('/');
        } 
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block">Email</label>
                    <input type="email" {...register('email', { required: 'Email is required' })} className="border p-2 w-full"/>
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block">Password</label>
                    <input type="password" {...register('password', { required: 'Password is required' })} className="border p-2 w-full"/>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <Button className="w-full">Login</Button>
            </form>
        </div>
    );
}