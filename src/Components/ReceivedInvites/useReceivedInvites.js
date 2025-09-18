import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const useReceivedInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await axiosInstance.get(
          "api/invites/received?page=0&size=10"
        );
        if (response.data.success && response.data.data?.items) {
          setInvites(response.data.data.items);
          console.log("Received Invites:", response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch invites");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);

  const handleResponse = async (inviteId, action) => {
    try {
      const response = await axiosInstance.post("api/invite/response", {
        inviteId,
        type: action,
      });

      if (response.data.success) {
        console.log(`Invite ${action}:`, response.data);

        toast.success(`Invite ${action.toLowerCase()} successfully`);

        setInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
      } else {
        toast.error(
          response.data.message || `Failed to ${action.toLowerCase()} invite`
        );
      }
    } catch (err) {
      console.error(`Error while ${action.toLowerCase()} invite:`, err);
      toast.error(
        err.message ||
          `Something went wrong while ${action.toLowerCase()} invite`
      );
    }
  };

  return { invites, loading, error, handleResponse };
};

export default useReceivedInvites;
