import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchOffersBySellerId, deleteOffer, type ApiOffer } from "../api/offers";
import { Trash2 } from 'lucide-react';

interface ManageOffersProps {
  onCreateNew?: () => void;
  onEditOffer?: (offerId: string) => void;
}

function ManageOffers({ onEditOffer }: ManageOffersProps) {
  const [offers, setOffers] = useState<ApiOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOffers = async () => {
      setIsLoading(true);
      try {
        const fetchedOffers = await fetchOffersBySellerId();
        // Ensure offers is always an array
        const offersArray = Array.isArray(fetchedOffers) ? fetchedOffers : [];
        setOffers(offersArray);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load offers");
        setOffers([]); 
      } finally {
        setIsLoading(false);
      }
    };
    loadOffers();
  }, []);

  const handleOfferClick = (offerId: string) => {
    if (onEditOffer) {
      onEditOffer(offerId);
    }
  };

  const handleDelete = async (offerId: string) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await deleteOffer(offerId);
        setOffers((prevOffers) => prevOffers.filter((o) => o._id !== offerId));
        toast.success("Offer deleted successfully!");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete offer");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-6 w-6 text-cyan-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-gray-400">Loading offers...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Offers</h1>
          <p className="mt-1 text-sm text-gray-400">
            View and edit your product offers
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm mb-6">
          {error}
        </div>
      )}

      {/* Offers Grid */}
      {(!offers || offers.length === 0) ? (
        <div className="text-center py-12">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">No offers found</h3>
            <p className="text-gray-400 mb-4">
              No offers available at the moment
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.isArray(offers) && offers.map((offer) => (
            <div
              key={offer._id}
              onClick={() => handleOfferClick(offer._id)}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 cursor-pointer hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200 group"
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    offer.status === 'active'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : offer.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {offer.status}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(offer._id);
                    }}
                    className="p-1 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete Offer"
                  >
                    <Trash2 size={16} />
                  </button>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {offer.product.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {offer.product.service}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-cyan-400">
                    ₹{offer.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {offer.currency}
                  </span>
                </div>

                {/* Additional Info */}
                <div className="pt-3 border-t border-gray-700/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quantity:</span>
                    <span className="text-white">{offer.quantityAvailable}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">Delivery Time:</span>
                    <span className="text-white">{offer.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageOffers; 