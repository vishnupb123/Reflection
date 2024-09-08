// app/components/Loader.tsx
"use client";

import React from "react";
import "../../../styles/loader.css"; // Import the styles

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="loader-circle"
            cx="50"
            cy="50"
            r="45"
            stroke="#4FAAFF"
            strokeWidth="5"
            fill="none"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="loader-text"
          >
            R
          </text>
        </svg>
      </div>
    </div>
  );
}
