import React, { useState } from "react";
import "./GetStarted.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import useAuthStore from "../store/authStore";
import { Phone, Lock, Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../components/MetaDataCom";

const GetStarted = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const setToken = useAuthStore((state) => state.setToken);

  const handleSendOtp = async () => {
    if (!phoneNumber) return toast.warn("Please enter a phone number");
    setLoading(true);
    
    console.log(phoneNumber)

    try {
      const response = await axiosInstance.post("/auth/sendOtp", {
        phoneNumber : phoneNumber,
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
        toast.success("OTP verified successfully");
        const { token, profileId } = response.data.data;

        setToken(token);

        setTimeout(() => {
          if (profileId && profileId !== "null") {
            navigate("/home");
          } else {
            navigate("/metadata");
          }
        }, 1500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader2 className="loader-icon" size={50} />
        </div>
      )}

      <div className="getstarted-container">
        <div className="getstarted-box">
          <h2 className="getstarted-title">Get Started</h2>
          <p className="getstarted-subtitle">
            {step === 1
              ? "Enter your phone number to begin"
              : "Enter the OTP sent to your phone"}
          </p>

          <label htmlFor="phone" className="getstarted-label">
            Phone Number
          </label>
          <div className="input-group">
            <Phone className="phone-icon" size={24} color="#8a6969" />
            <input
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91xxxxxxxxxx"
              className="getstarted-input"
            />
          </div>

          {step === 2 && (
            <>
              <label htmlFor="verification" className="getstarted-label">
                Verification Code
              </label>
              <div className="input-group">
                <Lock className="phone-icon" size={22} color="#8a6969" />
                <input
                  type="text"
                  id="verification"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter code"
                  className="getstarted-input"
                />
              </div>
            </>
          )}

          <button
            className="getstarted-button"
            onClick={step === 1 ? handleSendOtp : handleVerifyOtp}
            disabled={loading}
          >
            {step === 1 ? "Send Verification Code" : "Verify OTP"}
          </button>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

export default GetStarted;
