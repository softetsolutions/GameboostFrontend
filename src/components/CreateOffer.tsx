import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "./ui/CustomDropdown";
import { fetchServices } from "../api/services";
import type { Service } from "../api/services";
import {
  fetchProductsByService,
  fetchProductById,
} from "../api/products";
import type { Product } from "../api/products";
import { createOffer } from "../api/offers";

interface Brand extends Product {}

interface DynamicField {
  fieldName: string;
  fieldType: "custom" | "text" | "range"| string;
  options?: string[];
  isrequired: boolean;
  minValue?: number;
  maxValue?: number;
}

interface OfferFormData {
  brand: string;
  dynamicFields: Record<string, string>;
  price: string;
  currency: string;
  quantityAvailable: string;
  deliveryTime: string;
  instantDelivery: boolean;
}

function CreateOffer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [services, setServices] = useState<Service[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);

  const [selectedService, setSelectedService] = useState<string>("");

  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);

  const [formData, setFormData] = useState<OfferFormData>({
    brand: "",
    dynamicFields: {},
    price: "",
    currency: "INR",
    quantityAvailable: "1",
    deliveryTime: "",
    instantDelivery: false,
  });

  useEffect(() => {
    const loadServices = async () => {
      setIsLoadingServices(true);
      try {
        const fetchedServices = await fetchServices();
        setServices(fetchedServices);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load services"
        );
      } finally {
        setIsLoadingServices(false);
      }
    };
    loadServices();
  }, []);

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
        [name]: name === 'instantDelivery' ? (e.target as HTMLInputElement).checked : value,
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

  const handleServiceChange = async (serviceId: string) => {
    setSelectedService(serviceId);
    setFormData((prev) => ({
      ...prev,
      brand: "",
      dynamicFields: {},
    }));
    setBrands([]);
    setDynamicFields([]);
    if (serviceId) {
      setIsLoadingBrands(true);
      try {
        const fetchedBrands = await fetchProductsByService(serviceId);
        setBrands(fetchedBrands);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load brands"
        );
      } finally {
        setIsLoadingBrands(false);
      }
    }
  };

  const handleBrandChange = async (brandId: string) => {
    setFormData((prev) => ({
      ...prev,
      brand: brandId,
      dynamicFields: {},
    }));
    setDynamicFields([]);
    if (brandId) {
      try {
        const productDetails = await fetchProductById(brandId);
        if (productDetails.productRequiredFields) {
          // TODO: Fix this type casting
          setDynamicFields(
            productDetails.productRequiredFields as DynamicField[]
          );
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load product fields"
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate required fields
      const requiredFields = dynamicFields.filter((field) => field.isrequired);
      for (const field of requiredFields) {
        if (!formData.dynamicFields[field.fieldName]) {
          throw new Error(`${field.fieldName} is required`);
        }
      }

      await createOffer(formData);
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
      case "range": {
        let min = 0;
        let max = 100;

        if (field.fieldType === "range" && field.options && field.options.length > 0) {
          const rangeParts = field.options[0].split("-");
          if (rangeParts.length === 2) {
            const parsedMin = parseInt(rangeParts[0], 10);
            const parsedMax = parseInt(rangeParts[1], 10);
            if (!isNaN(parsedMin) && !isNaN(parsedMax)) {
              min = parsedMin;
              max = parsedMax;
            }
          }
        } else {
          min = field.minValue || 0;
          max = field.maxValue || 100;
        }

        const numbers = generateNumberRange(min, max);
        return (
          <CustomDropdown
            value={fieldValue}
            onChange={(value) =>
              handleCustomDropdownChange(field.fieldName, value)
            }
            options={numbers.map((num) => num.toString())}
            placeholder={`Select ${field.fieldName}`}
            required={field.isrequired}
          />
        );
      }

      case "custom":
        return (
          <CustomDropdown
            value={fieldValue}
            onChange={(value) =>
              handleCustomDropdownChange(field.fieldName, value)
            }
            options={field.options || []}
            placeholder={`Select ${field.fieldName}`}
            required={field.isrequired}
          />
        );

      case "text":
        return (
          <textarea
            name={`dynamic_${field.fieldName}`}
            value={fieldValue}
            onChange={handleInputChange}
            required={field.isrequired}
            rows={3}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
            placeholder={`Enter ${field.fieldName.toLowerCase()}`}
          />
        );

      default:
        return null;
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
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-lg py-16 pb-32">
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
                  services.find((s) => s._id === selectedService)?.name || ""
                }
                onChange={(value) => {
                  const service = services.find((s) => s.name === value);
                  if (service) handleServiceChange(service._id);
                }}
                options={services.map((service) => service.name)}
                placeholder={
                  isLoadingServices ? "Loading..." : "Select a service"
                }
                required={true}
                disabled={isLoadingServices}
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
                value={brands.find((b) => b._id === formData.brand)?.title || ""}
                onChange={(value) => {
                  const brand = brands.find((b) => b.title === value);
                  if (brand) handleBrandChange(brand._id);
                }}
                options={brands.map((brand) => brand.title)}
                placeholder={
                  isLoadingBrands
                    ? "Loading..."
                    : selectedService
                    ? "Select a brand"
                    : "Select a service first"
                }
                required={true}
                disabled={isLoadingBrands || !selectedService}
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
                placeholder="Enter price"
              />
            </div>

            {/* Currency */}
            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Currency
              </label>
              <input
                type="text"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
                placeholder="e.g., INR"
              />
            </div>

            {/* Quantity Available */}
            <div>
              <label
                htmlFor="quantityAvailable"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Quantity Available
              </label>
              <input
                type="number"
                id="quantityAvailable"
                name="quantityAvailable"
                value={formData.quantityAvailable}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
                placeholder="Enter quantity"
              />
            </div>

            {/* Delivery Time */}
            <div>
              <label
                htmlFor="deliveryTime"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Delivery Time
              </label>
              <input
                type="text"
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
                placeholder="e.g., 24 hours"
              />
            </div>

            {/* Instant Delivery */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="instantDelivery"
                name="instantDelivery"
                checked={formData.instantDelivery}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700/50 text-cyan-600 focus:ring-cyan-500"
              />
              <label
                htmlFor="instantDelivery"
                className="ml-2 block text-sm text-gray-300"
              >
                Instant Delivery
              </label>
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white">Product Details</h4>
            {dynamicFields.map((field) => (
              <div key={field.fieldName}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {field.fieldName}
                  {field.isrequired && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {renderDynamicField(field)}
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 mt-8">
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
