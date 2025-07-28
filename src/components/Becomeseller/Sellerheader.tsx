
import { Link, useNavigate } from "react-router-dom";
import LogoIcon from "../../assets/svgIcons/LogoIcon.svg?react";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../utils/auth";
export default function Sellerheader(){
  const [isloggedIn, setisloggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on component mount
    setisloggedIn(isAuthenticated());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return(
        <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-800/90 border-b border-cyan-500/20 shadow-md py-2"
            : "bg-transparent backdrop-blur-xl py-4"
        }`}
        
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-blue-400/20 backdrop-blur-lg border border-cyan-700 rounded-2xl px-6 py-3"
              : "bg-blue-400/20 backdrop-blur-lg border border-cyan-700 rounded-2xl px-6 py-4"
          } `}
        >
          <div className="flex items-center justify-between">
            {/* Logo  */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-2 rounded-xl">
                <LogoIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  GameStore
                </h1>
                <p className="text-xs text-gray-400">Pro Gaming Services</p>
              </div>
            </div>

                <div>
                 <button   
                 onClick={() => navigate("/")}
                  className="px-4 py-2 text-sm text-white rounded-xl font-medium border border-cyan-200  hover:bg-gradient-to-r from-cyan-500 to-blue-700 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                    Shop now
                  </button>
                  
                  {!isloggedIn &&
                  <Link to="/login">
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                      Sign in/Register
                    </button>
                  </Link> 
                  }
                  </div>

                </div>

            </div>      
      </div>
    </nav>
    );
}