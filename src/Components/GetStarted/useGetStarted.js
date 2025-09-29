import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";

const useGetStarted = () => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const setToken = useAuthStore((state) => state.setToken);
  const setUserId = useAuthStore((state) => state.setUserId);

  const handleSendOtp = async () => {
    if (!phoneNumber) return toast.warn("Please enter a phone number");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/sendOtp", {
        phoneNumber,
      });

      if (response.data.success) {
        toast.success("OTP sent successfully");
        setStep(2);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.warn("Please enter the OTP");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/verifyOtp", {
        phoneNumber,
        otp,
      });

      if (response.data.success) {
        // toast.success("OTP verified successfully");
        const { token, profileId } = response.data.data;

        setToken(token);
        setUserId(profileId);

        if (profileId && profileId !== "null") {
          navigate("/discover");
        } else {
          navigate("/register");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return {
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    step,
    setStep,
    loading,
    handleSendOtp,
    handleVerifyOtp,
  };
};

export default useGetStarted;

