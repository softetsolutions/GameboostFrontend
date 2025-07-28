import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchOffersByProductAndService, type ApiOffer } from '../api/offers';
import Navbar from './headerContent/HeaderComp';

interface ProductCardProps {
  offer: ApiOffer;
}

const ProductCard: React.FC<ProductCardProps> = ({ offer }) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative bg-gray-800/50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden m-2 flex flex-col items-center justify-center text-center max-w-[250px] w-full aspect-square border border-gray-700/50 hover:border-cyan-500/40 ease-in-out hover:translate-y-1 cursor-pointer"
      onClick={() => navigate(`/buy/${offer._id}`)}
    >
      {/* Offer Image */}
      <img
        src={offer.images && offer.images[0] ? offer.images[0] : `https://placehold.co/100x100/CCCCCC/000000?text=${offer.product.title.charAt(0)}`}
        alt={offer.product.title}
        className="absolute inset-0 w-full h-full object-cover blur-xs rounded-xl"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = `https://placehold.co/100x100/CCCCCC/000000?text=${offer.product.title.charAt(0)}`;
        }}
      />
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl z-[5]"></div>
      {/* Offers badge (show quantity available as offers) */}
      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
        {offer.quantityAvailable} available
      </span>
      {/* Product Name */}
      <p className="absolute bottom-10 left-0 right-0 text-center text-gray-50 font-semibold text-base z-10 px-2">
        {offer.product.title}
      </p>
      {/* Price */}
      <p className="absolute bottom-4 left-0 right-0 text-center text-cyan-400 font-bold text-lg z-10 px-2">
        ₹{offer.price} {offer.currency}
      </p>
    </div>
  );
};

const ProductPageComp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const productId = searchParams.get('productId');
  const serviceId = searchParams.get('serviceId');
  const serviceName = location.state?.serviceName;
  const [offers, setOffers] = useState<ApiOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (productId && serviceId) {
      setLoading(true);
      setError(null);
      fetchOffersByProductAndService(productId, serviceId)
        .then(setOffers)
        .catch((err) => setError(err.message || 'Failed to fetch offers'))
        .finally(() => setLoading(false));
    }
  }, [productId, serviceId]);

  // Filter offers by search term (case-insensitive, by product title)
  const filteredOffers = offers.filter((offer) =>
    offer.product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black font-sans p-4 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 grid-background"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 z-10"></div>
        <div className="max-w-7xl mx-auto relative z-20">
          <nav className="text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link> &gt;
            <Link to="/product" className="hover:text-cyan-400 transition-colors">Gift Cards</Link>
          </nav>
          <div className='flex items-center mb-6'>
            <div className='w-9 h-9 sm:w-10 sm:h-10 bg-cyan-400 flex justify-center items-center rounded-md mr-3 shadow-md'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                <path fillRule="evenodd" d="M12 2.25c-2.478 0-4.5 2.022-4.5 4.5v.75a.75.75 0 01-1.5 0v-.75a6 6 0 0112 0v.75a.75.75 0 01-1.5 0v-.75c0-2.478-2.022-4.5-4.5-4.5ZM4.5 9a.75.75 0 01.75-.75h13.5a.75.75 0 01.75.75v4.5a2.25 2.25 0 002.25-2.25V9A.75.75 0 0121 9v2.25a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9A.75.75 0 013 9v2.25c0 .193-.018.38-.052.562A2.25 2.25 0 004.5 14.25v2.25a2.25 2.25 0 002.25 2.25h1.5a.75.75 0 010 1.5h-1.5A3.75 3.75 0 013 16.5v-2.25A3.75 3.75 0 016.75 10.5h10.5a3.75 3.75 0 013.75 3.75v2.25a3.75 3.75 0 01-3.75 3.75H6.75a3.75 3.75 0 01-3.75-3.75v-2.25A2.25 2.25 0 002.25 12V9a.75.75 0 01.75-.75h.75z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold'>{serviceName}</h1>
          </div>
          {/* Search Bar (restored) */}
          <div className="bg-gray-800/50 p-2 shadow-lg mb-6 flex flex-col sm:flex-row rounded-full items-center space-y-4 sm:space-y-0 sm:space-x-4 border border-gray-700/50">
            <div className="relative w-full sm:w-auto flex-grow">
              <input
                type="text"
                placeholder="Search offers by product title"
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Available {serviceName}</h2>
          {loading && <p className="text-gray-400 text-lg text-center">Loading offers...</p>}
          {error && <p className="text-red-400 text-lg text-center">{error}</p>}
          {!loading && !error && filteredOffers.length === 0 && (
            <p className="text-gray-400 text-lg text-center">No offers found for this product and service.</p>
          )}
          <div className="flex flex-wrap justify-center -m-2">
            {filteredOffers.map((offer) => (
              <ProductCard key={offer._id} offer={offer} />
            ))}
          </div>
        </div>
      </div>
    </>

  );
};

export default ProductPageComp;