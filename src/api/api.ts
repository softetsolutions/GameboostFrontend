const BASE_URL = "http://localhost:5000";

export const signupUser = async(userData : any) =>{
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body : JSON.stringify(userData),
    });

    const data = await res.json();
    if(!res.ok) throw new Error(data.message || "Signip failed");
    return data;
}

export const loginUser = async(credentials : any)=>{
    const res = await fetch(`${BASE_URL}/api/auth/login`,{
        method : "POST",
        headers: {"Content-Type" : "application/json"},
        body : JSON.stringify(credentials),  
    });

    const data = await res.json();
    if(!res.ok) throw new Error(data.message || "Login failed");
    return data;
}