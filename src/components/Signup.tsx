import { ArrowLeft ,Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { signupUser } from "../api/api"; 
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import Navbar from "./headerContent/HeaderComp";


export default function Signup() {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const userPayload = {
        username: `${formData.firstname} ${formData.lastname}`,
        email: formData.email,
        password: formData.password,
       
      };
  
      const response = await signupUser(userPayload);
      if (response) {
        console.log("User registered:", response);
        alert("Signup successful!");
        navigate("/login");
      }
    
  
    } catch (err : any) {
      console.error(err);
      alert(err.message || "Signup error");
    }
  };
  
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar/>
    <div className="flex-grow flex items-center justify-center min-h-screen bg-black px-4 py-30">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-100 to-cyan-500"></div>

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

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1.5 text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value = {formData.firstname}
                  onChange={handleChange}
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
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  type={showPassword? "text": "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-zinc-800  border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-400  hover:text-cyan-400"
                  onClick={()=>setshowPassword(!showPassword)}
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
                 type={showPassword? "text": "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-zinc-800  border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blye-300 "
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-400  hover:text-cyan-400"
                  onClick={()=>setshowPassword(!showPassword)}
                >
                  <Eye size={18} />
                </button>
                </div>
                <div className="flex justify-center">
                <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" theme="dark" />
              </div>

              <div className="text-sm text-gray-400 text-center mb-4">
              By registering for this service, you agree to our{" "}
              <Link to={"/signup"} className="text-blue-400 hover:text-blue-300">
            Terms & Conditions{" "}
              </Link>
              and {" "}
              <Link to={"/signup"} className="text-blue-400 hover:text-blue-300">
              Privacy Policy</Link>
              .
              </div>
              <button type="submit"
              className="w-full py-3 bg-blue-300 text-black font-medium rounded-lg hover:cursor-pointer hover:bg-cyan-400 transition">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
