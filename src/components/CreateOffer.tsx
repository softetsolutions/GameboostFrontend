import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "./ui/CustomDropdown";

interface Service {
  _id: string;
  name: string;
}

interface Brand {
  _id: string;
  name: string;
}

interface DynamicField {
  fieldName: string;
  fieldType: "custom" | "text" | "range" | "number_dropdown";
  options?: string[];
  required: boolean;
  minValue?: number;
  maxValue?: number;
}

interface OfferFormData {
  service: string;
  brand: string;
  price: string;
  dynamicFields: Record<string, string>;
}

// Mock data - replace with actual API calls later
const MOCK_SERVICES: Service[] = [
  { _id: "1", name: "Game Accounts" },
  { _id: "2", name: "Game Items" },
  { _id: "3", name: "Game Currency" },
];

const MOCK_BRANDS: Brand[] = [
  { _id: "1", name: "PUBG Mobile" },
  { _id: "2", name: "Free Fire" },
  { _id: "3", name: "Call of Duty Mobile" },
];

// Mock dynamic fields - replace with actual fields from admin configuration
const MOCK_DYNAMIC_FIELDS: DynamicField[] = [
  {
    fieldName: "Account Number",
    fieldType: "number_dropdown",
    required: true,
    minValue: 0,
    maxValue: 50,
  },
  {
    fieldName: "Server",
    fieldType: "custom",
    options: ["Asia", "Europe", "North America", "South America"],
    required: true,
  },
  {
    fieldName: "Special Notes",
    fieldType: "text",
    required: false,
  },
];

function CreateOffer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<OfferFormData>({
    service: "",
    brand: "",
    price: "",
    dynamicFields: {},
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("dynamic_")) {
      setFormData((prev) => ({
        ...prev,
        dynamicFields: {
          ...prev.dynamicFields,
          [name.replace("dynamic_", "")]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCustomDropdownChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      dynamicFields: {
        ...prev.dynamicFields,
        [fieldName]: value,
      },
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));
  };

  const handleBrandChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      brand: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate required fields
      const requiredFields = MOCK_DYNAMIC_FIELDS.filter(
        (field) => field.required
      );
      for (const field of requiredFields) {
        if (!formData.dynamicFields[field.fieldName]) {
          throw new Error(`${field.fieldName} is required`);
        }
      }

      // TODO: API integration
      console.log("Form submitted:", formData);

      // Mock success
      navigate("/admin/offers");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateNumberRange = (min: number, max: number): number[] => {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  };

  const renderDynamicField = (field: DynamicField) => {
    const fieldValue = formData.dynamicFields[field.fieldName] || "";

    switch (field.fieldType) {
      case "number_dropdown":
        const numbers = generateNumberRange(
          field.minValue || 0,
          field.maxValue || 0
        );
        return (
          <CustomDropdown
            value={fieldValue}
            onChange={(value) =>
              handleCustomDropdownChange(field.fieldName, value)
            }
            options={numbers.map((num) => num.toString())}
            placeholder={`Select ${field.fieldName}`}
            required={field.required}
          />
        );

      case "custom":
        return (
          <CustomDropdown
            value={fieldValue}
            onChange={(value) =>
              handleCustomDropdownChange(field.fieldName, value)
            }
            options={field.options || []}
            placeholder={`Select ${field.fieldName}`}
            required={field.required}
          />
        );

      case "text":
        return (
          <textarea
            name={`dynamic_${field.fieldName}`}
            value={fieldValue}
            onChange={handleInputChange}
            required={field.required}
            rows={3}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
            placeholder={`Enter ${field.fieldName.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Offer</h1>
          <p className="mt-1 text-sm text-gray-400">
            List your product for sale
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-gray-700/50">
          <h3 className="text-base font-medium text-white">Offer Details</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Basic Details */}
          <div className="space-y-4">
            {/* Service Selection */}
            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Service
              </label>
              <CustomDropdown
                value={
                  MOCK_SERVICES.find((s) => s._id === formData.service)?.name ||
                  ""
                }
                onChange={(value) => {
                  const service = MOCK_SERVICES.find((s) => s.name === value);
                  if (service) handleServiceChange(service._id);
                }}
                options={MOCK_SERVICES.map((service) => service.name)}
                placeholder="Select a service"
                required={true}
              />
            </div>

            {/* Brand Selection */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Brand
              </label>
              <CustomDropdown
                value={
                  MOCK_BRANDS.find((b) => b._id === formData.brand)?.name || ""
                }
                onChange={(value) => {
                  const brand = MOCK_BRANDS.find((b) => b.name === value);
                  if (brand) handleBrandChange(brand._id);
                }}
                options={MOCK_BRANDS.map((brand) => brand.name)}
                placeholder="Select a brand"
                required={true}
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Price (INR)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white">Product Details</h4>
            {MOCK_DYNAMIC_FIELDS.map((field) => (
              <div key={field.fieldName}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {field.fieldName}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {renderDynamicField(field)}
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
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
                  Creating...
                </>
              ) : (
                "Create Offer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateOffer;
