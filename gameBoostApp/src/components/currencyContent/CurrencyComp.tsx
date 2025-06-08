import CurrencyIcon from "../../assets/svgIcons/currencyIcon.svg?react";

function CurrencyComp() {
  return (
    <div className="flex flex-col items-center justify-center bg-black gap-3 h-[200px] rounded-[10px]">
      <CurrencyIcon />
      <span className="text-sm text-[#ffffff] font-medium">Currency</span>
      <p className="text-sm text-[#ffffff] font-medium w-[255px] text-center pr-1 pl-1">
        Purchase in game currency hassle free
      </p>
      <button className="text-sm text-[#ffffff] font-medium  w-[100px] h-[30px] bg-purple-700 rounded-[10px]">View more</button>
    </div>
  );
}

export default CurrencyComp;
