"use client";

import { useEffect } from 'react';

export default function TestEnv() {
  useEffect(() => {
    console.log("Environment variables check:");
    console.log("NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY:", process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY);
  }, []);

  return null;
} 