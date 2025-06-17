import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type {
  Service,
  ProductFormData,
  CreateProductResponse,
} from "../../../api/types.js";
import { fetchServices } from "../../../api/services.js";
import { createProduct } from "../../../api/products.js";
import ProductForm from "./ProductForm.js";
import ProductFields from "./ProductFields.js";
import FormHeader from "./FormHeader.js";
import FormActions from "./FormActions.js";

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

function CreateProduct() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<Service[]>([]);

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    type: "",
    description: "",
    service: "",
    serviceName: "",
    productRequiredFields: [],
  });

  // Fields configuration
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      name: "",
      type: "custom",
      customValues: [],
      minValue: 0,
      maxValue: 100,
      required: false,
    },
  ]);

  // Fetch services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        console.log("Loaded services from API:", data);
        setServices(
          data.map((service: any) => ({
            ...service,
            type: service.type ?? "",
          }))
        );
      } catch (error) {
        console.error("Error loading services:", error);
        setError("Failed to load services");
      }
    };
    loadServices();
  }, []);

  const transformFieldsForApi = () => {
    return fields.map((field) => ({
      fieldName: field.name,
      fieldType: field.type,
      options:
        field.type === "custom"
          ? field.customValues
          : field.type === "range"
          ? [`${field.minValue}-${field.maxValue}`]
          : [],
      required: field.required,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const productRequiredFields = transformFieldsForApi();

      const response = (await createProduct({
        ...formData,
        productRequiredFields,
      })) as unknown as CreateProductResponse;

      if (response.success) {
        navigate("/admin");
      } else {
        throw new Error(response.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  return (
    <div>
      <FormHeader />

      {/* Form Container */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-gray-700/50">
          <h3 className="text-base font-medium text-white">Product Details</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <ProductForm
            formData={formData}
            services={services}
            productTypes={PRODUCT_TYPES}
            onInputChange={handleInputChange}
            onServiceChange={handleServiceChange}
            onTypeChange={handleTypeChange}
          />

          <ProductFields fields={fields} setFields={setFields} />

          <FormActions isSubmitting={isSubmitting} onCancel={handleCancel} />
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
