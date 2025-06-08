function HeaderComp() {
  return (
    <>
      <div className="flex items-center justify-between bg-[#1a1a1a] mr-5 ml-5 rounded-xl h-[55px] mt-8 p-2.5 font-montserrat">
        <span className="text-sm text-[#ffffff] font-black">Brand Logo</span>
        <div className="flex items-center gap-6">
          <button className="text-sm text-[#ffffff] font-medium hover:text-blue-400">
            Home
          </button>
          <button className="text-sm text-[#ffffff] font-medium hover:text-blue-400">
            Boosting
          </button>
          <button className="text-sm text-[#ffffff] font-medium hover:text-blue-400">
            Accounting
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-sm text-[#ffffff] font-medium hover:text-blue-400
           bg-[#2d2d2d] rounded-[12px] border border-[#4b5563] h-[30px] w-[65px]"
          >
            SignIn
          </button>
          <button
            className="text-sm text-[#ffffff] font-medium hover:text-blue-400
           bg-[#2d2d2d] rounded-[12px] border border-[#4b5563] h-[30px] w-[65px]"
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
export default HeaderComp;
