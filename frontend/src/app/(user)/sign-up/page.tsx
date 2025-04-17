"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: "USER", // Assuming a default role for public users
      });
      router.push("/sign-in");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">SIGN UP</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 uppercase text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#38003C]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 uppercase text-sm mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Yours"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#38003C]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 uppercase text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#38003C]"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-[#38003C] text-white py-2 rounded hover:bg-[#4A004F] transition uppercase"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
        <p className="text-center text-gray-500 text-sm mt-2">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}