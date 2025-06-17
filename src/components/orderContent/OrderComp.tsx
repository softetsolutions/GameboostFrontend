import { useState } from 'react';
import BuyCardComp from './BuyCardComp';

function OrderComp() {
   
    const [onlineSellersOnly, setOnlineSellersOnly] = useState(false);
    const [sortBy, setSortBy] = useState('Recommended'); 

    // Dummy data
    const otherSellers = [
        {
            name: 'Etechsquads',
            level: 91,
            profilePic: 'https://placehold.co/40x40/4a90e2/ffffff?text=ES', // Themed placeholder
            rating: '100.00%',
            sold: 758,
            min: 1,
            available: 61,
            delivery: 'Instant',
            volumeDiscount: true,
            price: '10.59',
            isOnline: true // Example for online status
        },
        {
            name: 'HaythamQS',
            level: 120,
            profilePic: 'https://placehold.co/40x40/6366f1/ffffff?text=HQ', // Themed placeholder
            rating: '98.86%',
            sold: 1521,
            min: 1,
            available: 42,
            delivery: 'Instant',
            volumeDiscount: true,
            price: '10.93',
            isOnline: true
        },
        {
            name: 'Shazam47',
            level: 137,
            profilePic: 'https://placehold.co/40x40/c084fc/ffffff?text=SH', // Themed placeholder
            rating: '100.00%',
            sold: 1,
            min: 1,
            available: 18,
            delivery: 'Instant',
            volumeDiscount: false,
            price: '16.42',
            isOnline: false
        },
        {
            name: 'ExpressKodes',
            level: 123,
            profilePic: 'https://placehold.co/40x40/22d3ee/ffffff?text=EK', // Themed placeholder
            rating: '100.00%',
            sold: 1,
            min: 1,
            available: 3,
            delivery: 'Instant',
            volumeDiscount: false,
            price: '21.72',
            isOnline: true
        },
        {
            name: 'D7MYHIMSELF',
            level: 90,
            profilePic: 'https://placehold.co/40x40/fb7185/ffffff?text=D7', // Themed placeholder
            rating: '0.00%',
            sold: 0,
            min: 1,
            available: 1,
            delivery: 'Instant',
            volumeDiscount: false,
            price: '10.75',
            isOnline: false
        },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 pb-16 relative">

            {/* Top Navigation */}
            <div className="bg-gray-900/80 backdrop-blur-sm py-4 px-8 text-sm text-gray-400 border-b border-gray-800 relative z-10">
                <a href="#" className="hover:text-cyan-400 transition-colors">Home</a> &gt;
                <a href="#" className="hover:text-cyan-400 transition-colors">Gift Cards</a> &gt;
                <a href="#" className="hover:text-cyan-400 transition-colors">eGift Cards</a> &gt;
                <a href="#" className="hover:text-cyan-400 transition-colors">Xbox</a>
            </div>

            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-8 px-4 lg:px-8 relative z-10">
                {/* Main Content Area */}

                <div className="flex-1 lg:pr-8 rounded-xl shadow-lg border border-gray-700 bg-gray-900/80 backdrop-blur-lg">
                    {/* Product Title */}
                    <div className="p-6 mb-6">
                        <h1 className="text-2xl font-bold text-gray-100 mb-2 leading-tight">
                            Xbox Game Pass Ultimate (US) &gt; Xbox Game Pass Ultimate Membership 1 Month (US)
                        </h1>
                        {/* Share button */}
                        <button className="flex items-center px-4 py-2 border border-gray-700 rounded-md text-gray-400 text-sm hover:bg-gray-800 hover:text-cyan-400 transition duration-150">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 110 2.684m0-2.684a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            Share
                        </button>
                    </div>

                    {/* Product Image */}
                    <div className="p-6 rounded-xl mb-6 flex justify-center">
                        <img
                            src="https://assets.g2g.com/img/offer/d_2a3bf543.webp"
                            alt="Xbox Game Pass Ultimate"
                            className="max-w-full h-auto rounded-md"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-100 mb-4">Product info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 text-sm">
                            <div>
                                <p className="text-gray-400">Delivery speed</p>
                                <p className="font-semibold text-gray-200">Instant</p>
                                <p className="text-red-500 text-xs">Can't activate in India</p> 
                            </div>
                            <div>
                                <p className="text-gray-400">Delivery method</p>
                                <p className="font-semibold text-gray-200 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Auto delivery
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-sm">
                            <div>
                                <p className="text-gray-400">Product Type</p>
                                <p className="font-semibold text-gray-200">Xbox Game Pass Ultimate (US)</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Denomination</p>
                                <p className="font-semibold text-gray-200">Xbox Game Pass Ultimate Membership 1 Month (US)</p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            Works with both the OLD and NEW Xbox accounts as long as there is no active subscription, the previous subscription has to be cancelled. In order to activate the code, a payment method must be added to the Xbox account.
                        </p>
                        <a href="#" className="text-cyan-400 text-sm hover:underline">View more</a>
                    </div>
                </div>


                {/* Right Sidebar */}
                <div className="lg:w-96 lg:flex-shrink-0 lg:sticky lg:top-8 lg:self-start mt-6 lg:mt-0">
                    <BuyCardComp />
                </div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 mb-6 max-w-7xl mx-auto py-8 px-4 lg:px-8 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-100 mb-3 sm:mb-0">Other sellers ({otherSellers.length})</h2>
                    <div className="flex items-center space-x-4">
                        {/* Checkbox for online sellers  */}
                        <label className="flex items-center text-gray-400 text-sm cursor-pointer">
                            Online sellers
                            <input
                                type="checkbox"
                                className="ml-2 w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500 focus:ring-offset-gray-900"
                                checked={onlineSellersOnly}
                                onChange={() => setOnlineSellersOnly(!onlineSellersOnly)}
                            />
                        </label>
                        {/* Radio buttons for sorting preference */}
                        <div className="flex items-center text-gray-400 text-sm">
                            Sort by
                            <label className="ml-2 flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort-by"
                                    value="Recommended"
                                    checked={sortBy === 'Recommended'}
                                    onChange={() => setSortBy('Recommended')}
                                    className="mr-1 text-cyan-500 bg-gray-800 border-gray-600 focus:ring-cyan-500 focus:ring-offset-gray-900" 
                                /> Recommended
                            </label>
                            <label className="ml-2 flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="sort-by"
                                    value="Lowest Price"
                                    checked={sortBy === 'Lowest Price'}
                                    onChange={() => setSortBy('Lowest Price')}
                                    className="mr-1 text-cyan-500 bg-gray-800 border-gray-600 focus:ring-cyan-500 focus:ring-offset-gray-900" 
                                /> Lowest Price
                            </label>
                        </div>
                    </div>
                </div>

                {/* List of Other Sellers */}
                <div className="space-y-4">
                    {otherSellers.map((seller, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-800 pb-4 last:border-b-0 last:pb-0">
                            <div className="flex items-center">
                                <div className="relative">
                                    <img
                                        src={seller.profilePic}
                                        alt={seller.name}
                                        className="w-10 h-10 rounded-full mr-3 border-2 border-gray-700 object-cover"
                                    />
                                    {/* Online/Offline indicator with themed border */}
                                    <div className={`absolute bottom-0 right-2 w-3 h-3 rounded-full border-2 border-gray-900 ${seller.isOnline ? 'bg-emerald-500' : 'bg-gray-500'}`}></div>
                                </div>
                                <div>
                                    {/* Seller name and level text colors adjusted */}
                                    <p className="font-semibold text-gray-200">{seller.name}</p>
                                    <p className="text-gray-400 text-sm">Level {seller.level}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                                {/* Rating and sold count text colors adjusted */}
                                <p className="text-emerald-400 font-bold flex items-center">
                                    👍 {seller.rating} <span className="text-gray-400 ml-1">{seller.sold} sold</span>
                                </p>
                                {/* Min, available, delivery text colors adjusted */}
                                <span className="text-gray-400">Min.{seller.min}</span>
                                <span className="text-gray-400">{seller.available}</span>
                                <span className="text-gray-400 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {seller.delivery}
                                </span>
                                {seller.volumeDiscount && (
                                    <span className="bg-cyan-500/20 text-cyan-400 text-xs font-semibold px-2 py-1 rounded-full">
                                        Volume discount
                                    </span>
                                )}
                                <span className="font-bold text-cyan-400">{seller.price} USD</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderComp;