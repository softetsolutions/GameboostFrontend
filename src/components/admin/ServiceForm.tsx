import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../api/config";
import ImageUpload from "../ui/ImageUpload";

interface Service {
  _id: string;
  name: string;
  icon: string;
  showOnHome?: boolean;
  createdAt: string;
  __v: number;
}

interface ServiceFormData {
  name: string;
}

interface ServiceFormProps {
  mode: 'create' | 'edit';
  serviceData?: Service;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function ServiceForm({ mode, serviceData, onSuccess, onCancel }: ServiceFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
  });

  // Handle icon as File object for new uploads or string for existing URLs
  const [icon, setIcon] = useState<File | string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && serviceData) {
      setFormData({
        name: serviceData.name,
      });
      // Set existing icon URL
      setIcon(serviceData.icon || null);
    }
  }, [mode, serviceData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (images: (File | string)[]) => {
    if (images.length > 0) {
      setIcon(images[0]);
    } else {
      setIcon(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!formData.name.trim()) {
        throw new Error("Service name is required");
      }

      if (mode === 'create') {
        if (!icon) {
          throw new Error("Please upload a service icon");
        }

        // Create FormData for file upload
        const data = new FormData();
        data.append("name", formData.name);
        if (icon instanceof File) {
          data.append("icon", icon);
        }

        const response = await fetch(`${API_BASE_URL}/services/create`, {
          method: "POST",
          credentials: "include",
          body: data,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: "Failed to create service" }));
          throw new Error(errorData.message || "Failed to create service");
        }

        toast.success("Service created successfully!");
      } else if (mode === 'edit' && serviceData) {
        // Create FormData for update
        const data = new FormData();
        data.append("name", formData.name);
        
        if (icon instanceof File) {
          data.append("icon", icon);
        } else if (typeof icon === 'string' && icon) {
          // If it's an existing URL, send it as a form field
          data.append("icon", icon);
        }

        const response = await fetch(`${API_BASE_URL}/services/${serviceData._id}`, {
          method: "PUT",
          credentials: "include",
          body: data,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: "Failed to update service" }));
          throw new Error(errorData.message || "Failed to update service");
        }

        toast.success("Service updated successfully!");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/admin/manageServices");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onCancel || (() => navigate(-1))}
            className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {mode === 'create' ? 'Create New Service' : 'Edit Service'}
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              {mode === 'create' ? 'Add a new service to your platform' : 'Update service details'}
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-lg py-16 pb-32">
        <div className="px-5 py-4 border-b border-gray-700/50">
          <h3 className="text-base font-medium text-white">Service Details</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Service Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Service Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
              placeholder="Enter service name"
            />
          </div>

          {/* Service Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Service Icon
            </label>
            <ImageUpload
              images={icon ? [icon] : []}
              onImagesChange={handleIconChange}
              maxImages={1}
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-400">
              Upload a single icon image for your service (PNG, JPG, GIF up to 5MB)
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 mt-8">
            <button
              type="button"
              onClick={onCancel || (() => navigate(-1))}
              className="px-4 py-2 border border-gray-600 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 cursor-pointer hover:border-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white"
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
                  {mode === 'create' ? 'Creating...' : 'Updating...'}
                </>
              ) : (
                mode === 'create' ? 'Create Service' : 'Update Service'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceForm; 