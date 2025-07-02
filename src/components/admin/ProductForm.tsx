import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImageUpload from "../ui/ImageUpload";
import CustomDropdown from "../ui/CustomDropdown";
import ProductFields from "../admin/CreateProduct/ProductFields";
import { fetchServices } from "../../api/services";
import { createProduct, updateProduct } from "../../api/products";

interface Product {
  _id: string;
  title: string;
  type: string;
  description: string;
  service: {
    _id: string;
    name: string;
  };
  productRequiredFields: Array<{
    fieldName: string;
    fieldType: string;
    options: string[];
    isrequired: boolean;
  }>;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

interface Service {
  _id: string;
  name: string;
  icon: string;
}

interface ProductFormData {
  title: string;
  type: string;
  description: string;
  service: string;
  serviceName: string;
  productRequiredFields: Array<{
    fieldName: string;
    fieldType: string;
    options: string[];
    isrequired: boolean;
  }>;
  images?: string[];
}

interface ProductFormProps {
  mode: 'create' | 'edit';
  productData?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface Field {
  id: number;
  name: string;
  type: "custom" | "range" | "text";
  customValues: string[];
  minValue: number;
  maxValue: number;
  required: boolean;
}

// Product types
const PRODUCT_TYPES = ["Account", "Item", "Currency", "Service"];

function ProductForm({ mode, productData, onSuccess, onCancel }: ProductFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    type: "",
    description: "",
    service: "",
    serviceName: "",
    productRequiredFields: [],
    images: [],
  });

  // Helper function to transform fields for API
  const transformFieldsForApi = () => {
    return fields.map((field) => ({
      fieldName: field.name,
      fieldType: field.type,
      options: field.type === "range" 
        ? [`${field.minValue}-${field.maxValue}`] 
        : field.customValues,
      isrequired: field.required,
    }));
  };

  // Helper function to transform API fields to local format
  const transformApiFieldsToLocal = (apiFields: any[]) => {
    return apiFields.map((field, index) => {
      let type: "custom" | "range" | "text" = "text";
      let customValues: string[] = [];
      let minValue = 0;
      let maxValue = 100;

      if (field.fieldType === "range") {
        type = "range";
        if (field.options && field.options.length > 0) {
          const rangeStr = field.options[0];
          const [min, max] = rangeStr.split("-").map(Number);
          minValue = min || 0;
          maxValue = max || 100;
        }
      } else if (field.fieldType === "custom") {
        type = "custom";
        customValues = field.options || [];
      }

      return {
        id: index + 1,
        name: field.fieldName,
        type,
        customValues,
        minValue,
        maxValue,
        required: field.isrequired,
      };
    });
  };

  // Fetch services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading services:", error);
        setError("Failed to load services");
      }
    };
    loadServices();
  }, []);

  // Initialize fields for create mode
  useEffect(() => {
    if (mode === 'create' && fields.length === 0) {
      setFields([{
        id: 1,
        name: "",
        type: "custom",
        customValues: [],
        minValue: 0,
        maxValue: 100,
        required: false,
      }]);
    }
  }, [mode, fields.length]);

  useEffect(() => {
    if (mode === 'edit' && productData) {
      setFormData({
        title: productData.title,
        type: productData.type,
        description: productData.description,
        service: productData.service._id,
        serviceName: productData.service.name,
        productRequiredFields: productData.productRequiredFields || [],
        images: productData.images || [],
      });
      
      // Transform and set fields from product data
      if (productData.productRequiredFields && productData.productRequiredFields.length > 0) {
        const transformedFields = transformApiFieldsToLocal(productData.productRequiredFields);
        setFields(transformedFields);
      } else {
        // Set default field if no fields exist
        setFields([{
          id: 1,
          name: "",
          type: "custom",
          customValues: [],
          minValue: 0,
          maxValue: 100,
          required: false,
        }]);
      }
    }
  }, [mode, productData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (value: string) => {
    const service = services.find((s) => s.name === value);
    setFormData((prev) => ({
      ...prev,
      service: service?._id || "",
      serviceName: value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!formData.title.trim()) {
        throw new Error("Product title is required");
      }

      if (!formData.service) {
        throw new Error("Service is required");
      }

      if (!formData.type) {
        throw new Error("Product type is required");
      }

      // Transform fields for API
      const productRequiredFields = transformFieldsForApi();

      if (mode === 'create') {
        const createPayload = {
          ...formData,
          productRequiredFields,
        };
        await createProduct(createPayload);
        toast.success("Product created successfully!");
      } else if (mode === 'edit' && productData) {
        const updatePayload = {
          title: formData.title,
          type: formData.type,
          description: formData.description,
          service: { _id: formData.service, name: formData.serviceName },
          productRequiredFields,
          images: formData.images,
        };
        await updateProduct(productData._id, updatePayload);
        toast.success("Product updated successfully!");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/admin/manageProducts");
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
              {mode === 'create' ? 'Create New Product' : 'Edit Product'}
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              {mode === 'create' ? 'Add a new product to your platform' : 'Update product details'}
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-lg py-16 pb-32">
        <div className="px-5 py-4 border-b border-gray-700/50">
          <h3 className="text-base font-medium text-white">Product Details</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Product Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
              placeholder="Enter product title"
            />
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Service
            </label>
            <CustomDropdown
              value={formData.serviceName}
              onChange={handleServiceChange}
              options={services.map((service) => service.name)}
              placeholder="Select a service"
              required={true}
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Product Type
            </label>
            <CustomDropdown
              value={formData.type}
              onChange={handleTypeChange}
              options={PRODUCT_TYPES}
              placeholder="Select product type"
              required={true}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
              placeholder="Enter product description"
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Product Images
            </label>
            <ImageUpload
              images={formData.images || []}
              onImagesChange={handleImagesChange}
              maxImages={5}
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-400">
              Upload product images (PNG, JPG, GIF up to 5MB each)
            </p>
          </div>

          {/* Product Fields */}
          <ProductFields fields={fields} setFields={setFields} />

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
                mode === 'create' ? 'Create Product' : 'Update Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm; 