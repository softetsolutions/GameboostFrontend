import { API_BASE_URL } from "./config";
import { getAuthInfo } from "../utils/auth";

export interface OfferFormData {
  brand: string; //productId
  dynamicFields: Record<string, string>;
  price: string;
  currency: string;
  quantityAvailable: string;
  deliveryTime: string;
  instantDelivery: boolean;
}

export interface Offer {
  _id: string;
  product: string;
  seller: string;
  fields: Record<string, string>;
  status: string;
}

export const createOffer = async (offerData: OfferFormData): Promise<Offer> => {
  const { token, userId: seller } = getAuthInfo();

  const payload = {
    product: offerData.brand,
    fields: offerData.dynamicFields,
    price: offerData.price,
    currency: offerData.currency,
    quantityAvailable: offerData.quantityAvailable,
    deliveryTime: offerData.deliveryTime,
    instantDelivery: offerData.instantDelivery,
    seller,
  };

  const response = await fetch(`${API_BASE_URL}/offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Offer creation failed: ${response.status}` }));
    throw new Error(errorData.message || "Failed to create offer");
  }

  return response.json();
}; 