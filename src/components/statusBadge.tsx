import React from "react";

type OrderStatus = "pending" | "succeeded" | "failed" | "paid";

interface Props {
  status: OrderStatus;
  className?: string;
}

const statusStyles: Record<OrderStatus, string> = {
  pending:
    "bg-yellow-100 dark:bg-yellow-500 dark:text-yellow-950 text-yellow-800  border-yellow-300 dark:border-yellow-950",
  succeeded:
    "bg-green-100 text-green-800  border-green-300",
  paid:
    "bg-blue-100 dark:bg-blue-500 dark:text-blue-950 text-blue-800 dark:text-blue-950  border-blue-300 dark:border-blue-950",
  failed:
    "bg-red-100  text-red-800  border-red-300 dark:border-red-950",
};

export default ({ status, className }:Props) => {
  return (
    <span className={ ` h-fit flex justify-center items-center border px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]} ${className || ""}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};