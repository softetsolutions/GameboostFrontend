import Navbar from "../headerContent/HeaderComp";
import Footer from "../footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Order() {
  const [rows, setRows] = useState([
    {Orderdate: "1 June", product:"game account", type:"account",status:"completed",price:"$20"},
    {Orderdate: "1 June", product:"game account", type:"account",status:"completed",price:"$20"},
  
  ]);

  const [currentPage, setcurrentPage] = useState(1);
  const [filter , setFilter] = useState<string>("All");
  const rowsperPage = 10;


  const lastIndex = currentPage * rowsperPage;
  const firstIndex = lastIndex - rowsperPage;

  const filteredRows = filter==="All"? rows :
   filter==="pending"? rows.filter(row=>row.status ==="pending"):filter==="current"? rows.filter(row=>row.status ==="current"): filter==="completed"? rows.filter(row=>row.status ==="completed") : [];

  const currentPageRows = filteredRows.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(rows.length / rowsperPage);

  const nextPage = () =>
    setcurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () =>
    setcurrentPage((prev) => Math.min(prev - 1, totalPages));
  const setPage = (page: number) => setcurrentPage(page);

  

  const handleRows =( () => {
    setRows([
      ...rows,
      {
        Orderdate:"3 June",
        product:"youtube",
        type:"account",
        status:"pending",
        price : "$2",

      },
      {
        Orderdate:"3 June",
        product:"youtube",
        type:"account",
        status:"current",
        price : "$2",

      },
    ]);
  });

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-gray-900 to-black text-white ">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center  bg-gradient-to-b from-gray-800/20 to-gray-800/70 p-30">
    
        <div className=" w-full max-w-5xl px-2">
      
        <Link
            to="/"
            className="inline-flex items-center text-center text-sm text-gray-400 hover:text-blue-400 mb-6 "
          >

            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to homepage
          </Link>
          <div>
          <button
            onClick={handleRows}
            className="mb-4 px-4 py-2 text-white bg-white/10 border border-white/20 rounded hover:bg-white/20 transition"
          >
            Add Row
          </button>
          </div>
          
          <div className=" overflow-x-auto   px-2 py-2">
            <table className="w-full text-left border-collapse backdrop-blur-md bg-white/10 border  border-white/10 rounded-lg shadow-lg">
              <thead className="text-white uppercase tracking-wider text-sm bg-white/5">
                <tr>
                  <th className="col-span-2 px-6 py-4 border-b border-white/10 text-xl">
                    <i className="fa-solid fa-cart-shopping"></i> Purchase
                    Orders
                  </th>
                  <th className="px-6 py-4 border-b border-white/10"></th>
                  <th className="px-6 py-4 border-b border-white/10"></th>
                  <th className="px-6 py-4 border-b border-white/10"></th>
                  <th className="col-span-2 px-6 py-4 border-b border-white/10 ">
                    <p className="text-white/80 text-sm normal-case w-10 flex flex-col ">
                      Filter
                    </p>
                    <select
                    value={filter}
                    onChange={(e)=>setFilter((e.target as HTMLSelectElement).value)}
                    className="block w-35 px-3 py-2 pr-8 text-sm rounded-md border border-zinc-400 bg-zinc-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm appearance-none cursor-pointer">
                      <option value="All"  >All Types</option>
                      <option value="pending" >Pending</option>
                      <option value="current" >Current</option>
                      <option value="completed" >Completed</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <thead className="text-white uppercase tracking-wider text-sm bg-white/10">
                <tr>
                  <th className=" col-span-2 px-6 py-4 border-b border-white/10">
                    Order date
                  </th>
                  <th className=" col-span-2 px-6 py-4 border-b border-white/10">
                    Product
                  </th>
                  <th className="px-6 py-4 border-b border-white/10 text-center">
                    Type
                  </th>
                  <th className="px-6 py-4 border-b border-white/10 text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 border-b border-white/10 text-center">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="text-white/80 text-sm">
                {currentPageRows.map((row, index) => (
                  <tr key={index} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 border-b border-white/10">
                     {row.Orderdate}
                    </td>
                    <td className="px-6 py-4 border-b border-white/10">
                     {row.product}
                    </td>
                    <td className="px-6 py-4 border-b border-white/10 text-center">
                      {row.type}
                    </td>
                    <td className="px-6 py-4 border-b border-white/10 text-center">
                      {
                        row.status==="pending" &&<button className="mb-4 px-4 py-1 text-red-200 bg-white/10 border border-red-500 rounded-xl hover:bg-white/20 transition">pending</button>
                      }
                       {
                        row.status==="completed" &&<button className="mb-4 px-4 py-1 text-green-200 bg-white/10 border border-green-500 rounded-xl hover:bg-white/20 transition">completed</button>
                      }
                      {
                        row.status==="current" &&<button className="mb-4 px-4 py-1 text-yellow-200 bg-white/10 border border-yellow-500 rounded-xl hover:bg-white/20 transition">current</button>
                      }
                    </td>
                    <td className="px-6 py-4 border-b border-white/10 text-center">
                      {row.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

               
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 text-white bg-white/10 border border-white/20 rounded hover:bg-white/20 disabled:opacity-30"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-white bg-white/10 border border-white/20 rounded hover:bg-white/20 disabled:opacity-30"
          >
            Next
          </button>
        </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
