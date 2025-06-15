export default function Account(){
    return(

        <div className="px-4 sm:px-6 lg:px-8">
             <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-zinc-900 border border-zinc-700 rounded-lg ">
                <form className="space-y-5">
                  <h1 className="flex text-2xl font-bold md-6 text-gray-200">
                    Personal
                  </h1>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="Last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      National identity Number
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="2739263748"
                    />
                  </div>
                  <div >
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Gender
                    </label>
                    <input type="radio" className="p-3 bg-zinc-800 " />
                    Male
                    {"    "}
                    <input type="radio" className="p-3 bg-zinc-800 " />
                    Female
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Date of Birth
                    </label>
                    <input
                      list="numbers"
                      id="number"
                      name="number"
                       className="w-50 p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="13"
                    />
                    <datalist id="numbers">
                      <option value="1" />
                      <option value="2" />
                      <option value="3" />
                      <option value="4" />
                      <option value="5" />
                      <option value="6" />
                      <option value="7" />
                      <option value="8" />
                      <option value="9" />
                      <option value="10" />
                      <option value="11" />
                      <option value="12" />
                      <option value="13" />
                      <option value="14" />
                      <option value="15" />
                      <option value="16" />
                      <option value="17" />
                      <option value="18" />
                      <option value="19" />
                      <option value="20" />
                      <option value="21" />
                      <option value="22" />
                      <option value="23" />
                      <option value="24" />
                      <option value="25" />
                      <option value="26" />
                      <option value="27" />
                      <option value="28" />
                      <option value="29" />
                      <option value="30" />
                    </datalist>
                    {"    "}
                    <input
                      list="months"
                      id="month"
                      name="month"
                       className="w-50 p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="February"
                    />
                    <datalist id="months">
                      <option value="January" />
                      <option value="February" />
                      <option value="March" />
                      <option value="April" />
                      <option value="May" />
                      <option value="June" />
                      <option value="July" />
                      <option value="August" />
                      <option value="September" />
                      <option value="October" />
                      <option value="November" />
                      <option value="December" />
                    </datalist>
                    {"   "}
                    <input
                      list="years"
                      id="year"
                      name="year"
                       className="w-50 p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="2023"
                    />
                    <datalist id="years">
                      <option value="2001" />
                      <option value="2002" />
                      <option value="2003" />
                      <option value="2004" />
                      <option value="2005" />
                      <option value="2006" />
                      <option value="2007" />
                      <option value="2008" />
                      <option value="2009" />
                      <option value="2010" />
                      <option value="2011" />
                      <option value="2012" />
                    </datalist>
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                      Instant Messenger
                    </label>
                  <input
                      list="messsengers"
                      id="messenger"
                      name="mesenger"
                       className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="Please Select"
                    />
                    <datalist id="messengers">
                      <option value="Whatsapp" />
                      <option value="Facbook" />
                      <option value="Instagram" />
                    </datalist>
                  </div>

                  <h1 className="flex text-2xl font-bold md-6 text-gray-200">
                    Billing Address
                  </h1>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="Streets"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="City name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      State/Zip code
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="State name"
                    />
                     <input
                      type="text"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="211004"
                    />
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                      Country/Region
                    </label>
                  <input
                      type="text"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="211004"
                    />
                  </div>
                  <h1 className="flex text-2xl font-bold md-6 text-gray-200">
                    Tax
                  </h1>

                  <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                      Tax reistration number
                    </label>
                  <input
                      type="text"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      placeholder="211004"
                    />
                  </div>
                </form>
              </div>
        </div>
    );
}