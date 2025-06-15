import { ArrowLeft } from "lucide-react";
import Navbar from "../headerContent/HeaderComp";
import { Link } from "react-router-dom";
import Account from "./Account";
import { useState } from "react";
import Social from "./Social";
import Privacy from "./Privacy";
import Verification from "./Verification";

export default function Setting() {
  const [activeform, setactiveform] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center min-h-screen bg-black px-4 py-30">
        <div className="w-full ">
          <Link
            to="/"
            className="inline-flex items-center text-center text-sm text-gray-400 hover:text-blue-400 mb-6 ml-12"
          >

            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to homepage
          </Link>
          <div className="m-4 sm:m-6 md:m-8 lg:m-12 grid grid-cols-1 md:grid-cols-4 gap-4 justify-evenly">
            <div className="flex flex-col">
              <button className=" text-gray-200 p-3 rounded-lg hover:bg-zinc-700 transition w-50 h-12"
               onClick={() => setactiveform(1)}> <i className="fa-solid fa-user"></i>{" "} Account</button>
              <button className=" text-gray-200 p-3 rounded-lg hover:bg-zinc-700 transition w-50 h-12"
              onClick={() => setactiveform(2)}> <i className="fa-solid fa-share-nodes"></i>{" "} Social Contact</button>
              <button className="text-gray-200 p-3 rounded-lg hover:bg-zinc-700 transition w-50 h-12"
               onClick={() => setactiveform(3)}>  <i className="fa-solid fa-shield-halved"></i>
              {" "}   Privacy & Security
              </button>
              <button className=" text-gray-200 p-3 rounded-lg hover:bg-zinc-700 transition w-50 h-12"
              onClick={() => setactiveform(4)}><i className="fa-solid fa-calendar-check"></i> {" "} Verification</button>
            </div>
            <div className="mt-6 md:mt-0 items-center justify-center md:col-start-2 md:col-span-3">
              {activeform === 1 && <Account />}
              {activeform === 2 && <Social />}
              {activeform === 3 && <Privacy />}
              {activeform === 4 && <Verification />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
