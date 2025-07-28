export default function Privacy() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-zinc-900 border border-zinc-700 rounded-lg ">
        <form className="space-y-5">
        <h1 className="flex text-2xl font-bold  ml-12 text-gray-200">
          Security
        </h1>
        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly ">
          <div className=" items-center justify-center  col-start-1 col-span-3 ">
            <h6 className="text-sm font-medium text-gray-300 ">Email</h6>
            <p>Your email address is son****@gmail.com</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="bg-zinc-600 text-white p-3 rounded-lg hover:bg-zinc-400 transition w-20 h-12">
              {" "}
              Edit{" "}
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3">
            <h6 className="text-sm font-medium text-gray-300 ">Password</h6>
            <p>
              Safeguard your password and do not disclose it to anyone.If you
              didn't create a password when signing up,please set one up.
            </p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="bg-zinc-600 text-white p-3 rounded-lg hover:bg-zinc-400 transition w-20 h-12">
              Edit
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3">
            <h6 className="text-sm font-medium text-gray-300 ">
              Mobile number
            </h6>
            <p>Your current mobile phone number is (+91)95*****12</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="bg-zinc-600 text-white p-3 rounded-lg hover:bg-zinc-400 transition w-20 h-12">
              Edit
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3 ">
            <h6 className="text-sm font-medium text-gray-300 ">
              Multi factor Authentication
            </h6>
            <p>
              Protect your G2G account with an extra layer of security by
              requiring to your mobile phone. Once configured, you are required
              to enter both your password and authentication code from your
              mobile in order to sign into your account.How to setup?
            </p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 bg-zinc-500"></button>
          </div>
        </div>

        <h1 className="flex text-2xl font-bold md-6 ml-12 text-gray-200">
          Privacy
        </h1>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3 ">
            <h6 className="text-sm font-medium text-gray-300 ">
              Show followers and following list
            </h6>
            <p>
              When togle off, other users will not be able to view your
              followers and following list.
            </p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 bg-zinc-500"></button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3 ">
            <h6 className="text-sm font-medium text-gray-300 ">
              Accept chat from profile page
            </h6>
            <p>
              When toggle off, the users will not be able to chat with you via
              your proile page.
            </p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 bg-zinc-500"></button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}
