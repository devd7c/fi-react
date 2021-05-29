import React from "react";

export const VoucherDateColumnFormatter = (cellContent, row) => 
<>{new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  }).format(new Date(row.voucherDate))}</>;
