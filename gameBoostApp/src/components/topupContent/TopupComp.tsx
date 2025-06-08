import BoostArrow from "../../assets/svgIcons/boostingArrow.svg?react";

function TopupComp() {
  return (
    <div className="flex flex-col items-center justify-center bg-black gap-3 h-[200px] rounded-[10px]">
      <BoostArrow className='rotate-45'/>
      <span  className='text-sm text-[#ffffff] font-medium'>Top-Up</span>
      <p  className='text-sm text-[#ffffff] font-medium w-[255px] text-center pr-1 pl-1'>Easy and fast top-up for accounts</p>
      <button  className='text-sm text-[#ffffff] font-medium  w-[100px] h-[30px] bg-purple-700 rounded-[10px]'>View more</button>
    </div>
  );
}

export default TopupComp;