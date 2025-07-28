import { API_BASE_URL } from "./config";
import { getAuthInfo } from "../utils/auth";

export interface SellerRequestPayload {
    dob: string;
    Nationalidentitynumber: string;
    Taxregistrationnumber: string;
    Address: string;
    City: string;
    Postalcode: string;
  }

  export interface SellerRequestResponse {
    success: boolean;
    message: string;
    data: SellerRequestPayload; 
  }

export const submitSellerRequest = async(payload: SellerRequestPayload):Promise<SellerRequestResponse> =>{
    const {token} = getAuthInfo();
    
    
        const res = await fetch(`${API_BASE_URL}/seller/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        const result:SellerRequestResponse = await res.json();

        if(!res.ok){
            throw new Error(result.message || "Submission Failed");
        }
        return result;
   
};