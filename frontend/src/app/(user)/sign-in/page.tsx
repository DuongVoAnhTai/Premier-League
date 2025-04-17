export default function SignInPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">SIGN IN</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#38003C]"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="block text-gray-700">Password</label>
                <a href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#38003C]"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#38003C] text-white py-2 rounded hover:bg-[#4A004F] transition"
            >
              Sign In
            </button>
          </form>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Create one
            </a>
          </p>
          <p className="text-center text-gray-500 text-sm mt-2">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }