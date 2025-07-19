// src/pages/PaymentReturn.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Axios from "../utils/Axios";

const PaymentReturn = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const tid = params.get("transaction_id"); // or whatever Payunit returns
    if (!tid) return setStatus("error");
    Axios.get(`/payments/status/${tid}`)
      .then(({ data }) => {
        if (data.status === "SUCCESS") setStatus("success");
        else setStatus("failed");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <div>Checking payment status...</div>;
  if (status === "success") return <div>✅ Payment successful! Thank you for your order.</div>;
  if (status === "failed") return <div>❌ Payment failed or cancelled. Try again.</div>;
  return <div>⚠️ Payment error. Please contact support.</div>;
};

export default PaymentReturn;