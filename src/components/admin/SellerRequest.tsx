import { useEffect, useState } from "react";
import { Check, X, Info } from "lucide-react";
import {
  fetchAllSellerRequests,
  approveSellerRequest,
  rejectSellerRequest,
} from "../../api/seller";

export interface SellerRequest {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  dob: string;
  Nationalidentitynumber?: string;
  Taxregistrationnumber?: string;
  Address: string;
  City: string;
  Postalcode: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export default function SellerRequestComponent() {
  const [requests, setRequests] = useState<SellerRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<SellerRequest | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await fetchAllSellerRequests();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch seller requests", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    id: string,
    action: "approved" | "rejected"
  ) => {
    try {
      if (action === "approved") {
        await approveSellerRequest(id);
      } else {
        await rejectSellerRequest(id);
      }

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: action } : req
        )
      );
    } catch (error) {
      console.error(`Failed to ${action} request`, error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Seller Requests</h1>
          <p className="mt-1 text-sm text-gray-400">
            Review and manage seller account applications
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-900 shadow-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-800 text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">Seller ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-t border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4">{req._id}</td>
                  <td className="px-6 py-4">
                    {req.user.firstName} {req.user.lastName}
                  </td>
                  <td className="px-6 py-4">{req.user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${req.status === "approved"
                        ? "bg-green-600/20 text-green-400"
                        : req.status === "rejected"
                          ? "bg-red-600/20 text-red-400"
                          : "bg-yellow-600/20 text-yellow-300"
                        }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button
                      className="p-1.5 rounded-md bg-green-600/20 text-green-400 hover:bg-green-600/30 transition"
                      onClick={() => handleAction(req._id, "approved")}
                      disabled={req.status !== "pending"}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-md bg-red-600/20 text-red-400 hover:bg-red-600/30 transition"
                      onClick={() => handleAction(req._id, "rejected")}
                      disabled={req.status !== "pending"}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 rounded-md bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition"
                      onClick={() => setSelectedRequest(req)}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}

      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800/90 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Seller Details</h2>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>
                <span className="font-medium text-white">Seller ID:</span>{" "}
                {selectedRequest._id}
              </p>
              <p>
                <span className="font-medium text-white">Name:</span>{" "}
                {selectedRequest.user.firstName} {selectedRequest.user.lastName}
              </p>
              <p>
                <span className="font-medium text-white">Email:</span>{" "}
                {selectedRequest.user.email}
              </p>
              <p>
                <span className="font-medium text-white">Date of Birth:</span>{" "}
                {new Date(selectedRequest.dob).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-white">National ID Number:</span>{" "}
                {selectedRequest.Nationalidentitynumber || "N/A"}
              </p>
              <p>
                <span className="font-medium text-white">Tax Registration Number:</span>{" "}
                {selectedRequest.Taxregistrationnumber || "N/A"}
              </p>
              <p>
                <span className="font-medium text-white">Address:</span>{" "}
                {selectedRequest.Address}
              </p>
              <p>
                <span className="font-medium text-white">City:</span>{" "}
                {selectedRequest.City}
              </p>
              <p>
                <span className="font-medium text-white">Postal Code:</span>{" "}
                {selectedRequest.Postalcode}
              </p>
              <p>
                <span className="font-medium text-white">Status:</span>{" "}
                <span
                  className={`font-medium ${selectedRequest.status === "approved"
                    ? "text-green-400"
                    : selectedRequest.status === "rejected"
                      ? "text-red-400"
                      : "text-yellow-300"
                    }`}
                >
                  {selectedRequest.status}
                </span>
              </p>
              <p>
                <span className="font-medium text-white">Submitted On:</span>{" "}
                {new Date(selectedRequest.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
