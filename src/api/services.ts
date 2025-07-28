import { API_BASE_URL } from "./config";
import { getAuthInfo } from "../utils/auth";

export interface Service {
  _id: string;
  name: string;
  type?: string;
  icon?: string;
}

export interface CreateServiceRequest {
  name: string;
  type: string;
  icon: string;
}

export const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_BASE_URL}/services/`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];0
};

export const getallServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_BASE_URL}/services`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const createService = async (service: CreateServiceRequest): Promise<Service> => {
  try {
    const { token } = getAuthInfo();

    const response = await fetch(`${API_BASE_URL}/services/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Service creation failed:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Failed to create service: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    if (!data.success || !data.data) {
      throw new Error(data.message || "Failed to create service");
    }

    return data.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};
