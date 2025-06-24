import { useState, useEffect } from "react";
import ManageOffers from "./ManageOffers";
import OfferForm from "./OfferForm";
import { fetchOfferById, type ApiOffer } from "../api/offers";

function RenderOfferOrOfferForm() {
  const [isOfferForm, setIsOfferForm] = useState<boolean>(false);
  const [offerToEdit, setOfferToEdit] = useState<ApiOffer | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (formMode === 'edit' && selectedOfferId) {
      const loadOffer = async () => {
        setIsLoading(true);
        setError("");
        try {
          const offer = await fetchOfferById(selectedOfferId);
          setOfferToEdit(offer);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load offer details");
        } finally {
          setIsLoading(false);
        }
      };
      loadOffer();
    }
  }, [selectedOfferId, formMode]);

  const handleEditOffer = (offerId: string) => {
    setSelectedOfferId(offerId);
    setFormMode('edit');
    setIsOfferForm(true);
  };

  const handleCreateNew = () => {
    setSelectedOfferId(null);
    setOfferToEdit(null);
    setFormMode('create');
    setIsOfferForm(true);
  };

  const handleBackToList = () => {
    setIsOfferForm(false);
    setSelectedOfferId(null);
    setOfferToEdit(null);
  };

  const handleFormSuccess = () => {
    setIsOfferForm(false);
    setSelectedOfferId(null);
    setOfferToEdit(null);
  };

  if (isOfferForm) {
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
            <span className="text-gray-400">Loading Form...</span>
          </div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm mb-6">
          {error}
          <button
            onClick={handleBackToList}
            className="ml-4 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-sm transition-colors"
          >
            Back
          </button>
        </div>
      );
    }
    if (formMode === 'create' || (formMode === 'edit' && offerToEdit)) {
      return (
        <OfferForm
          mode={formMode}
          offerData={formMode === 'edit' ? offerToEdit! : undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleBackToList}
        />
      );
    }
    return null; 
  }

  return (
    <ManageOffers
      onEditOffer={handleEditOffer}
      onCreateNew={handleCreateNew}
    />
  );
}

export default RenderOfferOrOfferForm; 