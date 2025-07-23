// src/components/SubmitSitemapToIndexNow.jsx
import React from "react";
import { submitBulkToIndexNow } from "../utils/indexNow";

export default function SubmitSitemapToIndexNow() {
  return (
    <button onClick={submitBulkToIndexNow}>
      Submit All URLs to IndexNow
    </button>
  );
}