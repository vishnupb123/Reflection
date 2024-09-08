// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../../styles/auth.css";
import water from "../../../../public/water.mp4";
import Facebook from "../../../../public/assets/images/facebook.png";
import Google from "../../../../public/assets/images/google.png";

export default function Login() {
  const router = useRouter();
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [buttonText, setButtonText] = useState("Login");

  useEffect(() => {
    // Timer countdown when OTP section is shown
    let countdown: NodeJS.Timeout;
    if (showOTPSection && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    // Clear timer on component unmount
    return () => clearInterval(countdown);
  }, [showOTPSection, timer]);

  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    // Show the OTP section and change the button text when login is clicked
    setShowOTPSection(true);
    setButtonText("Verify and Login");
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
    // Reset OTP, Timer, and Resend Button
    setOtp(["", "", "", "", "", ""]);
    setTimer(60);
  };

  const navigateToSignUp = () => {
    router.push("/register");
  };

  return (
    <div className="login-container">
      <video autoPlay={true} muted loop playsInline className="branding-video">
        <source src={water} type="video/mp4" />
      </video>
      <div className="auth-heading">
        <h2>
          Hello, <span>Welcome Back</span>
        </h2>
      </div>
      <div className="auth-form-container">
        <div className="auth-form">
          <h3 className="heading">Sign-in</h3>
          <form className="form" onSubmit={handleLoginClick}>
            <label>Email</label>
            <input type="text" placeholder="Username" required />
            <label>Password</label>
            <input type="password" placeholder="Password" required />
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
                    <span className="timer"><p>00:{timer < 10 ? `0${timer}` : timer}</p></span>
                  ) : (
                    <button type="button" className="resend-otp" onClick={handleResendOtp}>
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}
            <button type="submit" className="login-button">
              {buttonText}
            </button>
            {/* Forgot password link */}
            <p className="forgot-password">
              Forgot your password? <span>Reset the password</span>
            </p>
          </form>
        </div>
        <div className="other-options">
        <h4>Or, you can sign in using</h4>
          <button className="social-login google-login">
            <Image src={Google} className="icon" alt="Google" /> Sign in with Google
          </button>
          <button className="social-login facebook-login">
            <Image src={Facebook} className="icon" alt="Facebook" /> Sign in with Facebook
          </button>
          <h4>If you are new to the account, create an account now</h4>
          <button className="sign-up-button" onClick={navigateToSignUp}>Sign-Up</button>
        </div>
      </div>
    </div>
  );
}
