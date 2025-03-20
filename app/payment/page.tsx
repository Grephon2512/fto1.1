"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    if (sessionId) {
      setMessage("Payment successful! Thank you for your order.");
    } else {
      setMessage("Invalid payment session.");
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white">
      <div className="bg-white/20 p-6 rounded-lg shadow-lg backdrop-blur-md text-center">
        <h1 className="text-2xl font-bold">{message}</h1>
      </div>
    </div>
  );
}
