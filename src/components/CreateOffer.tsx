import { useNavigate } from "react-router-dom";
import OfferForm from "./OfferForm";

function CreateOffer() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/seller/offers");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <OfferForm
      mode="create"
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}

export default CreateOffer;
