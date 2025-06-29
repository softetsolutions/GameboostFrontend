import { useState, useEffect } from "react";
import ManageServices from "./ManageServices";
import ServiceForm from "./ServiceForm.tsx";
import { API_BASE_URL } from "../../api/config";

interface Service {
  _id: string;
  name: string;
  icon: string;
  showOnHome?: boolean;
  createdAt: string;
  __v: number;
}

function RenderServiceOrServiceForm() {
  const [isServiceForm, setIsServiceForm] = useState<boolean>(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedServiceId) {
      const loadService = async () => {
        setIsLoading(true);
        setError("");
        try {
          const response = await fetch(`${API_BASE_URL}/services/${selectedServiceId}`, {
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to load service details");
          }

          const service = await response.json();
          setServiceToEdit(service);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load service details");
        } finally {
          setIsLoading(false);
        }
      };
      loadService();
    }
  }, [selectedServiceId]);

  const handleEditService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsServiceForm(true);
  };

  const handleBackToList = () => {
    setIsServiceForm(false);
    setSelectedServiceId(null);
    setServiceToEdit(null);
  };

  const handleFormSuccess = () => {
    setIsServiceForm(false);
    setSelectedServiceId(null);
    setServiceToEdit(null);
  };

  if (isServiceForm) {
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
    if (serviceToEdit) {
      return (
        <ServiceForm
          mode="edit"
          serviceData={serviceToEdit}
          onSuccess={handleFormSuccess}
          onCancel={handleBackToList}
        />
      );
    }
    return null; 
  }

  return (
    <ManageServices
      onEditService={handleEditService}
    />
  );
}

export default RenderServiceOrServiceForm; 