import { useState, useEffect } from "react";
import ManageProducts from "./ManageProducts";
import ProductForm from "./ProductForm.tsx";
import { API_BASE_URL } from "../../api/config";

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

function RenderProductOrProductForm() {
  const [isProductForm, setIsProductForm] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedProductId) {
      const loadProduct = async () => {
        setIsLoading(true);
        setError("");
        try {
          const response = await fetch(`${API_BASE_URL}/products/${selectedProductId}`, {
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to load product details");
          }

          const product = await response.json();
          setProductToEdit(product);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load product details");
        } finally {
          setIsLoading(false);
        }
      };
      loadProduct();
    }
  }, [selectedProductId]);

  const handleEditProduct = (productId: string) => {
    setSelectedProductId(productId);
    setIsProductForm(true);
  };

  const handleBackToList = () => {
    setIsProductForm(false);
    setSelectedProductId(null);
    setProductToEdit(null);
  };

  const handleFormSuccess = () => {
    setIsProductForm(false);
    setSelectedProductId(null);
    setProductToEdit(null);
  };

  if (isProductForm) {
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
    if (productToEdit) {
      return (
        <ProductForm
          mode="edit"
          productData={productToEdit}
          onSuccess={handleFormSuccess}
          onCancel={handleBackToList}
        />
      );
    }
    return null; 
  }

  return (
    <ManageProducts
      onEditProduct={handleEditProduct}
    />
  );
}

export default RenderProductOrProductForm; 