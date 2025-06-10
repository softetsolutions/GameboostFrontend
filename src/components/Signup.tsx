import { ArrowLeft ,Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Signup() {
  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12 text-white">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-pink-500 to-red-500"></div>

          <div className="p-8">
            <Link to="/"
             className="inline-flex items-center text-center text-sm text-gray-400 hover:text-blue-400 mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Homepage
            </Link>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create user Account</h1>
              <p className="text-gray-400">Fill your details to get started</p>
            </div>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1.5 text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstname"
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="First Name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className=" block text-sm font-medium mb-1.5 text-gray-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full p-3 bg-zinc-800  border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className=" block text-sm font-medium mb-1.5 text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-zinc-800  border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className=" block text-sm font-medium mb-1.5 text-gray-300"
                >
                  Password
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-zinc-800  border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-400 hover:text-pink-400"
                >
                  <Eye size={18} />
                </button>
              </div>

              <div className="relative"> 
                <label
                  htmlFor="password"
                  className=" block text-sm font-medium mb-1.5 text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-zinc-800  border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blye-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-400 hover:text-pink-400"
                >
                  <Eye size={18} />
                </button>
                </div>
                <div className="flex justify-center">
                <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" theme="dark" />
              </div>

              <div className="text-sm text-gray-400 text-center mb-4">
              By registering for this service, you agree to our{" "}
              <Link to={"/signup"} className="text-pink-400 hover:text-pink-300">
            Terms & Conditions{" "}
              </Link>
              and {" "}
              <Link to={"/signup"} className="text-pink-400 hover:text-pink-300">
              Privacy Policy</Link>
              .
              </div>
              <button type="submit"
              className="w-full py-3 bg-pink-400 text-black font-medium rounded-lg hover:cursor-pointer hover:bg-pink-300 transition">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
