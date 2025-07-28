import { Eye, SquareDashedBottom } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import LogoIcon from "../../assets/svgIcons/LogoIcon.svg?react";
import React, { useState } from "react";
import { submitSellerRequest, type SellerRequestPayload, type SellerRequestResponse } from "../../api/sellerRequestApi";



export default function Sellerlogin() {
  const [formData, setformData] = useState<SellerRequestPayload>({
    dob:"",
    Nationalidentitynumber: "",
    Taxregistrationnumber : "",
    Address: "",
    City:"",
    Postalcode:"",
  });
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [addressParts, setaddressParts] =useState({
    address1:"",
    address2:"",
  })

  const [showId, setShowId] = useState(false);
 
  const [openVerify, setopenVerify] = useState(false);

  // Billing address fields
 
  const [state, setState] = useState("");
 

  const handleNext = () => {
    // Optional: Validate before proceeding
    setopenVerify(true);
  };

  const handleBack = () => {
    setopenVerify(false);
  };

  const handledobChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  )=>{
    const {name , value} = e.target;
    setDob(prev=>({...prev,[name]:value}));
  };
  const handleaddressChange = (e: React.ChangeEvent<HTMLInputElement>
  )=>{
    const {name , value} = e.target;
    setaddressParts(prev=>({...prev,[name]:value}));
  };

const getformattedaddress=()=>{
  const addressline1 = addressParts.address1;
  const addressline2 = addressParts.address2;

  return `${addressline1} ${addressline2}`;
}

  const getformattedDob = ()=>{
   const monthIndex = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
   ].indexOf(dob.month)+1;

   if (!dob.day || !dob.month || !dob.year || monthIndex === 0) {
    throw new Error("Incomplete or invalid DOB");
  }

  const day = dob.day.padStart(2,'0');
  const month =String(monthIndex).padStart(2,"0");
  return `${dob.year}-${month}-${day}`;
  }
  
  const handleChange = (

    e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
      {
      const {name,value} = e.target;
      setformData({...formData, [name]:value});

    };

    const handleSubmit = async (e: React.FormEvent) =>{
      e.preventDefault();
      
   
      try{
        const formattedDob = getformattedDob();
        const formattedAddress = getformattedaddress();

        const Data = {
          ...formData,
          dob: formattedDob, // ✅ pass this ready-to-go
          Address: formattedAddress, // ✅ pass this ready-to-go
        };
        const result = await submitSellerRequest(Data);
        console.log("Submitted payload", result.data);
        alert(result.message);
      } catch(error: any){
        alert("Error: " + error.message);
      }

    };
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow flex-col items-center justify-center min-h-screen bg-black ">
        <div className="bg-blue-700 w-full h-96 relative top-0 text-blue-700 ">
          .
          <div className="flex items-center space-x-3  mt-8 justify-center ml-14">
            <div className="flex bg-black rounded-2xl  p-3">
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
          </div>
        </div>

        <div 
      
        className="absolute w-full max-w-lg  px-1 py-22 inset-0 z-40 mt-25   md:left-1/5 lg:left-1/3 space-y-3">
          <div className="border border-zinc-800 rounded-xl  bg-zinc-900 overflow-hidden shadow-lg ">
            <div className="max-w-xl mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg space-y-8">
              <h2 className="text-2xl font-bold text-center">
                Sign up as G2G seller
              </h2>

              {!openVerify ? (
                <div className="space-y-5">
                  {/* Progress Steps */}
                  <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
                    <span className="text-green-400 font-semibold">1</span>{" "}
                    Profile info
                    <span>→</span>
                    <span className="text-gray-500">2 Verification</span>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block  font-meduim mb-2">
                      Date of birth
                    </label>
                    <div className="flex space-x-3 ">
                      <input
                        type="text"
                        placeholder="Day"
                        name="day"
                        value={dob.day}
                        onChange= {handledobChange}
                        className="w-1/3 p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                      />
                      <select
                      name="month"
                        value={dob.month}
                        onChange={
                        handledobChange
                        }
                        className="w-1/3 p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                      >
                        <option value="">Month</option>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Year"
                        name="year"
                        value={dob.year}
                        onChange={
                          handledobChange
                        }
                        className="w-1/3 p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Please enter your date of birth that matches your identity
                      document. You must be at least 18 years and above to sell
                      at G2G.
                    </p>
                  </div>

                  {/* National ID */}
                  <div>
                    <label className="block  font-medium mb-2">
                      National identity number (optional)
                    </label>
                    <div className="relative">
                      <input
                        type={showId ? "text" : "password"}
                        placeholder="National identity number"
                        name="Nationalidentitynumber"
                        value={formData.Nationalidentitynumber}
                        onChange={ handleChange}
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center text-gray-400"
                        onClick={() => setShowId((prev) => !prev)}
                      >
                        👁️
                      </button>
                    </div>
                  </div>

                  {/* Tax ID */}
                  <div>
                    <label className="block  font-medium mb-2">
                      Tax registration number (optional)
                    </label>
                    <div className="flex items-center">
                      <div className="flex items-center bg-gray-800 border border-gray-700 px-3 py-2 rounded-l-md text-white space-x-1">
                        <span className="text-medium">🇮🇳</span>
                      
                      </div>
                      <input
                        type="text"
                        placeholder="Tax registration number"
                        name="Taxregistrationnumber"
                        value={formData.Taxregistrationnumber}
                        onChange={ handleChange}
                        className="flex-1 p-2 rounded-r-md bg-gray-800 border-t border-b border-r border-gray-700 text-white placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <h3 className="text-md font-medium mb-4">
                      Billing address
                    </h3>

                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Address 1"
                        name="address1"
                        value={addressParts.address1}
                        onChange={ handleaddressChange}
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="Address 2"
                        name="address2"
                        value={addressParts.address2}
                        onChange={ handleaddressChange}
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        name="City"
                        value={formData.City}
                        onChange={ handleChange}
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                      />

                      <div className="flex space-x-4">
                        <select
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-1/2 p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                        >
                          <option value="">Please select</option>
                          <option value="UP">Uttar Pradesh</option>
                          <option value="MH">Maharashtra</option>
                          <option value="TN">Tamil Nadu</option>
                          <option value="KA">Karnataka</option>
                          <option value="DL">Delhi</option>
                          {/* Add more states as needed */}
                        </select>
                        <input
                          type="text"
                          placeholder="Zip code"
                          name="Postalcode"
                          value={formData.Postalcode}
                          onChange={ handleChange}
                          className="w-1/2 p-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Progress Steps */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 ">
                    <span className="text-gray-500 font-semibold">1</span>{" "}
                    Profile info
                    <span>→</span>
                    <span className="text-green-400 font-semibold mr-1">2 </span>{" "}
                    Verification
                 
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    please verify your identity through the electronic Know Your
                    Customer (eKYC) process.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Please prepare your Government Issued ID, Driving License,
                    or Passport for the verification process. How do i complete
                    eKYC verification?
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handleBack}
                  className="px-20 py-2 border border-gray-500 rounded-md hover:bg-gray-800 text-white"
                >
                  Later
                </button>
                <button
                  onClick={(e)=>{
                    handleNext();
                    handleSubmit(e);
                  }}
                  className="px-20 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
                >
                  Next
                </button>
              </div>

              {/* Bottom Links */}
              <p className="text-sm text-center text-gray-400 mt-4">
                <a href="#" className="text-blue-400 hover:underline">
                  Register business seller account
                </a>{" "}
                or{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  learn more
                </a>{" "}
                about business account
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
