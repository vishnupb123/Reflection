// app/signup.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../../styles/auth.css";
// import { FaGoogle, FaFacebook } from "react-icons/fa"; // Importing icons for social login
import Facebook from "../../../../public/assets/images/facebook.png";
import Google from "../../../../public/assets/images/google.png";
import water from "../../../../public/water.mp4";

export default function Signup() {
    const router = useRouter();
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [buttonText, setButtonText] = useState("Sign-up");

  useEffect(() => {
    // Timer countdown for OTP verification
    let countdown: NodeJS.Timeout;
    if (showOTPSection && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    // Clear the timer on component unmount
    return () => clearInterval(countdown);
  }, [showOTPSection, timer]);

  const handleSignupClick = (e: React.FormEvent) => {
    e.preventDefault();
    // Show the OTP section and change the button text
    setShowOTPSection(true);
    setButtonText("Verify and Sign-up");
  };

  const handleOtpChange = (value: string, index: number) => {
    // Update the OTP input values
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input field if a number is entered
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleResendOtp = () => {
    // Reset the OTP input values and timer
    setOtp(["", "", "", "", "", ""]);
    setTimer(60);
  };

    // Function to navigate to the sign-in page
    const navigateToSignin = () => {
        router.push("/login");
      };
    

  return (
    <div className="login-container">
      <video autoPlay={true} muted loop playsInline className="branding-video">
        <source src={water} type="video/mp4" />
      </video>
      <div className="auth-heading">
        <h2>
          Hello, <span>Create Your Account</span>
        </h2>
      </div>
      <div className="auth-form-container">
        <div className="auth-form">
          <h3 className="heading">Sign-up</h3>
          <form className="form" onSubmit={handleSignupClick}>
            <label>Email</label>
            <input type="text" placeholder="email" required />
            <label>Password</label>
            <input type="password" placeholder="Password" required />
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm Password" required />
            {showOTPSection && (
              <>
                <p className="otp-message">
                  A six-digit OTP is sent to the entered email. Enter the OTP
                  below and verify the account.
                </p>
                <div className="otp-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      className="otp-box"
                    />
                  ))}
                </div>
                <div className="timer-container">
                  {timer > 0 ? (
                    <span className="timer">
                      <p>00:{timer < 10 ? `0${timer}` : timer}</p>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="resend-otp"
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}
            <button type="submit" className="login-button">
              {buttonText}
            </button>
          </form>
        </div>
        <div className="other-options">
          <h4>Or, sign-up using</h4>
          <button className="social-login google-login">
            <Image src={Google} className="icon" alt="Google" /> Sign up with Google
          </button>
          <button className="social-login facebook-login">
            <Image src={Facebook} className="icon"  alt="Facebook"/> Sign up with Facebook
          </button>
          <h4>Already have an account? Login</h4>
          <button className="sign-up-button" onClick={navigateToSignin}>Sign-in</button>
        </div>
      </div>
    </div>
  );
}
