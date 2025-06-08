import AccountsComp from "../components/accountsContent/AccountsComp";
import BoostingComp from "../components/boostingContent/BoostingComp";
import CurrencyComp from "../components/currencyContent/CurrencyComp";
import HeaderComp from "../components/headerContent/HeaderComp";
import TopupComp from "../components/topupContent/TopupComp";

function Homepage() {
  return (
    <>
      <div className="flex flex-col bg-[#faebd7]">
        <div className="flex flex-col gap-4">
          <HeaderComp />
          <div className="flex justify-center mt-6">
            {" "}
            <p className="font-bold text-5xl text-white w-[400px] text-center">
              GAME BOOSTING SERVICE
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <input
              placeholder="Search..."
              type='text'
              className="rounded-md bg-white h-[40px] w-[400px] pl-2.5"
            />
            <button className="bg-purple-600 text-white rounded-xl h-[30px] w-[80px] flex items-center justify-center">
              Search
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between pr-8 pl-8 mt-6">
          <BoostingComp />
          <AccountsComp />
          <CurrencyComp />
          <TopupComp />
        </div>
      </div>
    </>
  );
}
export default Homepage;
