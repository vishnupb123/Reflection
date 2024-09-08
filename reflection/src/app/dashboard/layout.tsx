'use client';

import React from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../../styles/dashboard.css";

import water from "../../../public/water.mp4";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    return (
        <>
       <div className="dashboard-layout">
        <div className="dashboard-sidebar">
        <video autoPlay={true} muted loop playsInline className="branding-video">
            <source src={water} type="video/mp4" />
        </video>
        <h2 className="Logo">Reflections</h2>
        <div className="sidebar-container">
            
        </div>
        </div>
        <div className="dashboard-content">
        {children}
       </div>
       </div>
       
       </>
    );
}