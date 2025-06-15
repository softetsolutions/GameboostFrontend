export default function Social() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-zinc-900 border border-zinc-700 rounded-lg ">
      <form className="space-y-5">
        <h1 className="flex text-2xl font-bold md-6 ml-12 text-gray-200">
          Social Connect
        </h1>
        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly ">
          <div className=" items-center justify-center  col-start-1 col-span-3 ">
            <h6 className="text-sm font-medium text-gray-300 ">Facebook</h6>
            <p>Your account is not linked to Facebook</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <p className="mt-6 justify-center  w-12 h-6"> Link to </p>
            <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition w-12 h-12">
              <i className="fa-brands fa-facebook-f"></i>
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3">
            <h6 className="text-sm font-medium text-gray-300 ">Google</h6>
            <p>Your account is not linked to Google</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <p className="mt-6 justify-center  w-12 h-6"> Link to </p>
            <button className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition w-12 h-12">
              <i className="fa-brands fa-google"></i>
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3">
            <h6 className="text-sm font-medium text-gray-300 ">PayPal</h6>
            <p>Your account is not linked to PayPal</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <p className="mt-6 justify-center  w-12 h-6"> Link to </p>
            <button className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition w-12 h-12">
              <i className="fa-brands fa-paypal"></i>
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3 ">
            <h6 className="text-sm font-medium text-gray-300 ">Twitter</h6>
            <p>Your account is not linked to Twitter</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <p className=" block mt-6 items-center justify-self  w-12 h-6">
              {" "}
              Link to{" "}
            </p>
            <button className="bg-sky-500 text-white p-3 rounded-lg hover:bg-sky-600 transition w-12 h-12">
              <i className="fa-brands fa-x-twitter"></i>
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
