import { API_BASE_URL } from "./config";
import { getAuthInfo } from "../utils/auth";

export interface ProductFormData {
  title: string;
  type: string;
  description: string;
  service: string;
  serviceName: string;
  productRequiredFields: Array<{
    fieldName: string;
    fieldType: string;
    options: string[];
    required: boolean;
  }>;
  additionalFields?: any[];
  images?: string[];
}

export interface Product {
  _id: string;
  title: string;
  type: string;
  description: string;
  service: string;
  serviceName: string;
  productRequiredFields: Array<{
    fieldName: string;
    fieldType: string;
    options: string[];
    required: boolean;
  }>;
  additionalFields?: any[];
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const createProduct = async (
  productData: ProductFormData
): Promise<Product> => {
  const { token } = getAuthInfo();

  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({
      ...productData,
      ...(!productData.service &&
        productData.serviceName && {
          serviceName: productData.serviceName,
          service: undefined,
        }),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  const data = await response.json();
  return data;
};
