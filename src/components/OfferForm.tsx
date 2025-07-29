import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomDropdown from "./ui/CustomDropdown";
import ImageUpload from "./ui/ImageUpload";
import { fetchServices } from "../api/services";
import type { Service } from "../api/services";
import {
  fetchProductsByService,
  fetchProductById,
} from "../api/products";
import type { Product } from "../api/products";
import { createOffer, updateOffer, type ApiOffer } from "../api/offers";

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
  images: (File | string)[];
}

interface OfferFormProps {
  mode: 'create' | 'edit';
  offerData?: ApiOffer;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function OfferForm({ mode, offerData, onSuccess, onCancel }: OfferFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [services, setServices] = useState<Service[]>([]);
  const [brands, setBrands] = useState<Product[]>([]);
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
    images: [],
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

  useEffect(() => {
    if (mode === 'edit' && offerData) {
      const loadEditData = async () => {
        if (!offerData.product?._id) return;

        try {
          // 1. Load product details, which includes service and field definitions
          const productDetails = await fetchProductById(offerData.product._id);
          const serviceId = productDetails.service._id;

          if (!serviceId) {
            setError("The product for this offer is not associated with a service.");
            return;
          }
          
          const brandsForService = await fetchProductsByService(serviceId);
          const fieldDefinitions = (productDetails.productRequiredFields as DynamicField[]) || [];

          // 2. Prepare pre-filled data, including dynamic fields from offerData
          const dynamicFieldsRecord: Record<string, string> = {};
          if (offerData.offerDetails && Array.isArray(offerData.offerDetails)) {
            offerData.offerDetails.forEach((field: any) => {
              if (field.fieldName && field.value !== undefined) {
                dynamicFieldsRecord[field.fieldName] = field.value.toString();
              }
            });
          }

          // 3. Set all related state at once to ensure consistency
          setFormData({
            brand: offerData.product._id,
            dynamicFields: dynamicFieldsRecord,
            price: offerData.price?.toString() || "",
            currency: offerData.currency || "INR",
            quantityAvailable: offerData.quantityAvailable?.toString() || "1",
            deliveryTime: offerData.deliveryTime || "",
            instantDelivery: offerData.instantDelivery || false,
            images: offerData.images || [],
          });
          
          setSelectedService(serviceId);
          setBrands(brandsForService);
          setDynamicFields(fieldDefinitions);

        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Failed to load offer data for editing.";
          setError(errorMessage);
          console.error("Error loading edit data:", err);
        }
      };

      loadEditData();
    }
  }, [mode, offerData]);

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
    }));
    setDynamicFields([]);
    if (brandId) {
      try {
        const productDetails = await fetchProductById(brandId);
        if (productDetails.productRequiredFields) {
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

  const handleImagesChange = (newImages: (File | string)[]) => {
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
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

      // Build FormData for file upload
      const data = new FormData();
      data.append("product", formData.brand);
      data.append("price", formData.price);
      data.append("currency", formData.currency);
      data.append("quantityAvailable", formData.quantityAvailable);
      data.append("deliveryTime", formData.deliveryTime);
      data.append("instantDelivery", String(formData.instantDelivery));
      // Offer details as JSON string
      data.append(
        "offerDetails",
        JSON.stringify(
          Object.entries(formData.dynamicFields).map(([fieldName, value]) => ({ fieldName, value }))
        )
      );
      // Only append new files (not existing URLs)
      formData.images.forEach((image) => {
        if (image instanceof File) {
          data.append("images", image);
        }
      });

      if (mode === 'create') {
        await createOffer(data);
      } else if (mode === 'edit' && offerData) {
        await updateOffer(offerData._id, data);
      }

      toast.success(mode === 'create' ? 'Offer created successfully!' : 'Offer updated successfully!');

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/admin/offers");
      }
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
              {mode === 'create' ? 'Create New Offer' : 'Edit Offer'}
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              {mode === 'create' ? 'List your product for sale' : 'Update your product offer details'}
            </p>
          </div>
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

          {/* Image Upload */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white">Product Images</h4>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Upload Images {formData.images.length > 0 && `(${formData.images.length} uploaded)`}
              </label>
              <ImageUpload
                images={formData.images}
                onImagesChange={handleImagesChange}
                maxImages={10}
                disabled={isSubmitting}
              />
            </div>
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
                mode === 'create' ? 'Create Offer' : 'Update Offer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OfferForm; 