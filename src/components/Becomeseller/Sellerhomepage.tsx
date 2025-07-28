import { Link } from "react-router-dom";
import Sellerheader from "./Sellerheader";
import { useEffect, useRef, useState } from "react";
import { isAuthenticated } from "../../utils/auth";

export default function Sellerhomepage() {


 
  const [isloggedIn, setisloggedIn] = useState(false);

  const features = [
    {
      title: "No Registration Fees",
      desc: "Start selling with ease without worrying about upfront costs.",
    },
    {
      title: "Comprehensive Seller Assistance",
      desc: "Our dedicated support team is available 24/7 to assist you with any queries or concerns.",
    },
    {
      title: "Utilize Tools from the Seller Center",
      desc: "Enhance your sales efficiency, customer management, and shop performance tracking.",
    },
    {
      title: "Seller Protection Guarantee",
      desc: "Sell confidently, knowing your transactions are secure and protected.",
    },
    {
      title: "Worldwide Exposure",
      desc: "Expand your reach to customers in 100 countries with free traffic and enhanced visibility.",
    },
    {
      title: "Convenient Withdrawal Options",
      desc: "Choose from 50 withdrawal methods for easy access to your funds.",
    },
  ];

  const reviews = [
    {
      title: "No Registration Fees",
      desc: "Start selling with ease without worrying about upfront costs.",
    },
    {
      title: "Comprehensive Seller Assistance",
      desc: "Our dedicated support team is available 24/7 to assist you with any queries or concerns.",
    },
    {
      title: "Utilize Tools from the Seller Center",
      desc: "Enhance your sales efficiency, customer management, and shop performance tracking.",
    },
    {
      title: "Seller Protection Guarantee",
      desc: "Sell confidently, knowing your transactions are secure and protected.",
    },
    {
      title: "Worldwide Exposure",
      desc: "Expand your reach to customers in 100 countries with free traffic and enhanced visibility.",
    },
    {
      title: "Convenient Withdrawal Options",
      desc: "Choose from 50 withdrawal methods for easy access to your funds.",
    },
  ];
  useEffect(() => {
    // Check authentication status on component mount
    setisloggedIn(isAuthenticated());
  }, []);

  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (styleRef.current) return;

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideUp {
        0% { transform: translateY(0%); }
        100% { transform: translateY(-50%); }
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;
  }, []);

  
  return (
    <div className="text-white min-h-screen  ">
      <Sellerheader />
      <div className=" relative justify-center top-20 ">
        <section className="relative inset-0 z-40 h-full ">
          {/* Gaming Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0  "></div>

            <div className="absolute inset-0 bg-gradient-to-b from-cyan-700/90 via-cyan-900/50 to-cyan-700/90">
              <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-cyan-500"></div>
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-700/90 via-cyan-900/50 to-cyan-700/90"></div>
            </div>
          </div>

          <div className="relative z-10 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto text-center ">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-500 bg-clip-text text-transparent">
                  Go Global Sell Smarter
                </span>
                <br />
                <span className="text-white text-3xl">
                  {" "}
                  Access millions of users worldwide without any registration
                  costs.
                </span>
              </h1>

              {/* Search */}
              <div className="max-w-2xl mx-auto mb-16 ">
                <div className="flex flex-col sm:flex-row gap-4 backdrop-blur-md rounded-2xl p-2">
                  <div className="flex-1 relative justify-center">
                    <div className="flex justify-center">
                      {isloggedIn ? (
                        <Link to="/sellerRegister">
                          <button className="ml-4 mt-5 bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                            Register Now
                          </button>
                        </Link>
                      ) : (
                        <Link to="/login">
                          <button className="ml-4 mt-5 bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                            Register Now
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <svg
              className="relative block w-full h-[80px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="#0f172a"
                // ← dark section color
                d="M0,60 C480,700 2000,0 1440,0 L1440,320 L0,320 Z"
              ></path>
            </svg>
          </div>
        </section>
        <div className=" pt-32 pb-10 px-0 relative z-10 backdrop-blur-md bg-[#0f172a] py-10   ">
          <h2 className=" text-3xl font-semibold text-center mb-8 ">
            Why sell with us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((item, index) => (
              <div
                key={index}
                className=" rounded-2xl  p-8 hover:shadow-lg hover:shadow-gray-800 transition"
              >
                <h3 className="text-xl font-bold text-gray-200 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-[560px] md:h-96 mt-5 bg-[#0f172a]  text-white p-8  flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h2 className="text-4xl md:text-2xl font-bold leading-tight">
                What our happy user says
                <br />
                <div className="text-2xl mt-4">
                  Discover the smiles behind our success - straight from the
                  word of our happy sellers!
                </div>
                <br />
              </h2>
            </div>

            <div className="overflow-hidden md:h-60 w-[330px] md:w-md  ">
              <div
                className="flex flex-col animate-slideUp backdrop-blur-lg "
                style={{
                  animation: "slideUp 20s linear infinite",
                }}
              >
                {/* Duplicate for smooth infinite loop */}
                {[...reviews, ...reviews].map((item, index) => (
                  <>
                    <div
                      key={index}
                      className="h-32 mt-10 flex flex-col justify-center transition duration-500  bg-gradient-to-r from-gray-600/40 to-gray-800/80 border border-gray-600/30 text-sm md:text-base rounded-2xl items-center p-4"
                    >
                      <div className="text-white font-semibold">
                        {item.title}
                      </div>
                      <p className="text-white text-sm">{item.desc}</p>
                    </div>
                    <br />
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-3 md:ml-15 lg:ml-20 mt-5">
            <div className="w-80 md:w-2xl lg:w-6xl h-115 sm:h-80 md:h-60 bg-gradient-to-r from-gray-600/40 to-gray-800/80 border border-gray-600/30 hover:border-cyan-700/60 transition-all duration-500 transform hover:scale-101 hover:-translate-y-2  hover:shadow-cyan-500/20 text-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
              <div className="flex-1">
                <h2 className="text-4xl md:text-4xl font-bold leading-tight">
                  SELLING AS A <br />
                  BUSINESS? IT'S <br />
                  EASY WITH US.
                </h2>
              </div>

              <div className="flex-1 text-sm md:text-base max-w-md">
                <p className="mb-4">
                  Sign up or upgrade your Business Account for seamless
                  financial management, greater visibility, and compliance.
                  Boost your trust and efficiency today.
                </p>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-cyan-500/30 hover:cursor-pointer text-white font-semibold py-2 px-6 rounded-md">
                  Learn more
                </button>
              </div>
            </div>
          </div>

          <h2 className=" text-3xl font-semibold text-center mb-8 mt-20">
            Frequently asked questions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {features.map((item, index) => (
              <div key={index} className=" rounded-2xl w-[330px]  md:w-[370px] lg:w-[500px] p-8 bg-gray-800 ">
                <h3 className="text-xl font-bold text-gray-200 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.desc}</p>
                <button className="text-cyan-600 underline hover:text-cyan-500  hover:cursor-pointer  font-semibold  ">
                  Learn more
                </button>
              </div>
            ))}
          </div>

          <div
            className="w-full mt-10  text-white h-[550px] md:h-96 flex flex-col md:flex-row justify-center items-center "
            style={{
              backgroundImage:
                "linear-gradient(to bottom left, #bfdbfe, #60a5fa, #06b6d4, #3b82f6, #6366f1)",
            }}
          >
            <div className="flex-1 px-8">
              <h2 className="text-6xl md:text-6xl font-bold leading-tight">
                START SELLING TODAY
                <br />
                <h5 className="text-2xl mt-4">
                  Join Our Seller Community: Connecting Sellers with Millions of
                  Global Buyers Register now
                </h5>
                <br />
              </h2>
              <Link to="/sellerRegister">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  Register Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function async(FormEvent: any) {
  throw new Error("Function not implemented.");
}

