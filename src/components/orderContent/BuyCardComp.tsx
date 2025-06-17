import { useState } from "react"

function BuyCardComp() {

    const [count, setCount] = useState(1)

    function handleInc() {
        setCount(prevCount => prevCount + 1)
    }
    function handleDec() {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1))
    }

    const pricePerItem = 10.59;
    const totalAmount = (count * pricePerItem).toFixed(2);

    return (
        // The outer div's background gradient is already good for the theme
        <div className="flex flex-col items-center p-4 min-h-screen">
            {/* Box 1: Product Details Card */}
            {/* Background changed to a darker shade with blur, border added for definition */}
            <div id="box-1" className="shadow-lg p-6 w-full max-w-sm mb-6 bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    {/* Text color adjusted for dark background */}
                    <h3 className="text-gray-400 text-sm">61 available</h3>
                    {/* Volume discount button styled with a subtle blue border and text */}
                    <button className="text-cyan-400 text-xs font-semibold px-2 py-1 rounded-full border border-cyan-500/50 hover:bg-cyan-500/10 transition-colors">
                        Volume discount
                    </button>
                </div>

                {/* Counter input section with dark background and rounded style */}
                <div className="flex items-center justify-center space-x-2 mb-6 shadow-inner shadow-gray-700/30 rounded-2xl p-2 bg-gray-800 border border-gray-700">
                    {/* Decrement button: Disabled state dark gray, Enabled state vibrant gradient */}
                    <button
                        onClick={handleDec} 
                        disabled={count <= 1} // Disable when count is 1 or less
                        className={`
                            flex items-center justify-center w-8 h-8 rounded-full border
                            text-lg font-bold transition duration-300
                            ${
                                count <= 1
                                    ? "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed" // Darker disabled state
                                    : "bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 border-none text-white"
                            }
                        `}
                    >
                        -
                    </button>
                    {/* Count display text color adjusted for dark background */}
                    <p className="w-12 text-center text-lg font-semibold text-gray-200">{count}</p>
                    {/* Increment button: Always vibrant gradient */}
                    <button
                        onClick={handleInc}
                        className="
                            flex items-center justify-center w-8 h-8 rounded-full border
                            text-lg font-bold transition duration-300
                            bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 border-none text-white
                        "
                    >
                        +
                    </button>
                </div>

                {/* Total amount section, text colors adjusted */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-gray-200 text-lg">Total Amount</h2>
                    <h2 className="text-cyan-400 text-xl font-bold">{totalAmount} USD</h2> {/* Accent color for total */}
                </div>

                {/* Buy Now button with vibrant gradient */}
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-md shadow-cyan-500/30">
                    Buy now
                </button>
            </div>

            {/* Box 2: Seller Information Card */}
            {/* Background changed to a darker shade with blur, border added for definition */}
            <div id="box-2" className="rounded-2xl shadow-lg p-6 w-full max-w-sm bg-gray-900/80 backdrop-blur-lg border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    {/* Text colors adjusted for dark background. Green for rating is made slightly more vibrant for visibility */}
                    <p className="text-gray-400 text-sm">
                        <span className="text-emerald-400 font-bold mr-1">👍 100.00%</span> {/* Adjusted to emerald for visibility */}
                        <span className="text-gray-400">758 sold</span>
                    </p>
                    {/* "Other sellers" link using accent color */}
                    <a href="#" className="text-cyan-400 text-sm hover:underline">
                        Other sellers (5)
                    </a>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {/* Placeholder image with a border for theme consistency */}
                        <img
                            src="https://placehold.co/40x40/4a90e2/ffffff?text=ES" // Placeholder with a themed background
                            alt="Etechsquad"
                            className="w-10 h-10 rounded-full mr-3 border-2 border-cyan-500"
                        />
                        <div>
                            {/* Seller name and level text colors adjusted */}
                            <p className="font-semibold text-gray-200">Etechsquads</p>
                            <p className="text-gray-400 text-sm">Level 91</p>
                        </div>
                    </div>
                    {/* Chat button with a distinct, themed green background */}
                    <button className="bg-emerald-600 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-emerald-700 transition duration-300 flex items-center shadow-md shadow-emerald-600/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Chat
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BuyCardComp;