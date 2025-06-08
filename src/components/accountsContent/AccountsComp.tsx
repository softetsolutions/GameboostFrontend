import UserIcon from "../../assets/svgIcons/userIcon.svg?react";

function AccountsComp() {
  return (
    <div className="flex flex-col items-center justify-center bg-black gap-3 h-[200px] rounded-[10px] w-[255px]">
      <UserIcon />
      <span className="text-sm text-[#ffffff] font-medium">Accounts</span>
      <p className="text-sm text-[#ffffff] font-medium w-[249px] text-center pr-1 pl-1">
        Buy and sell game accounts securely
      </p>
      <button className="text-sm text-[#ffffff] font-medium w-[100px] h-[30px] bg-purple-700 rounded-[10px]">
        View more
      </button>
    </div>
  );
}

export default AccountsComp;
