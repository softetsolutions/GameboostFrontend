export default function Verification() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-zinc-900 border border-zinc-700 rounded-lg ">
      <form className="space-y-5">
        <h1 className="flex text-2xl font-bold md-6 ml-12 text-gray-200">
          Verification
        </h1>
        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly ">
          <div className=" items-center justify-center  col-start-1 col-span-3 ">
            <h6 className="text-sm font-medium text-gray-300 ">
              Mobile number
            </h6>
            <p>(+91)95*****12</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="bg-zinc-600 text-white p-3 rounded-lg hover:bg-zinc-400 transition w-20 h-12">
              {" "}
              Verify{" "}
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3">
            <h6 className="text-sm font-medium text-gray-300 ">
              First and last name
            </h6>
            <p>Name</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="bg-zinc-600 text-white p-3 rounded-lg hover:bg-zinc-400 transition w-20 h-12">
              Verify
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3">
            <h6 className="text-sm font-medium text-gray-300 ">
              National identity number
            </h6>
            <p>20********59</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="bg-zinc-600 text-white p-3 rounded-lg hover:bg-zinc-400 transition w-20 h-12">
              Verify
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3">
            <h6 className="text-sm font-medium text-gray-300 ">
              Billing Address
            </h6>
            <p>Address</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="bg-zinc-600 text-white p-3 rounded-lg hover:bg-zinc-400 transition w-20 h-12">
              Verify
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3">
            <h6 className="text-sm font-medium text-gray-300 ">
              Date of birth
            </h6>
            <p>Date</p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="bg-zinc-600 text-white p-3 rounded-lg hover:bg-zinc-400 transition w-20 h-12">
              Verify
            </button>
          </div>
        </div>

        <div className="m-12 grid grid-cols-4 gap-2 justify-evenly">
          <div className=" items-center justify-center  col-start-1 col-span-3">
            <h6 className="text-sm font-medium text-gray-300 ">
              Electronic Know Your Customer (eKYC)
            </h6>
            <p>
              Please prepare your Government Issued ID, Driving License, or
              Passwort for the verification process, We will need your selfie to
              perform a match with you ID.
            </p>
          </div>
          <div className=" flex flex-row gap-2 justify-center">
            <button className="bg-zinc-600 text-white p-3 rounded-lg hover:bg-zinc-400 transition w-20 h-12">
              Verify
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
