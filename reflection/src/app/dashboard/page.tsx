'use client';
import React from 'react';
import { redirect } from 'next/navigation';

export default function Dashboard() {
    return (
        redirect('/dashboard/home')
    );
}