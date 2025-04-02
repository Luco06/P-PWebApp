"use client";
import React, { ReactNode } from "react";

type ButtonProps = {
  txt: string | ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  active?: boolean;
};

export default function Button({
  type = "button",
  txt,
  className = "",
  onClick,
  active = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`drop-shadow-md flex flex-row justify-center items-center gap-3 cursor-pointer block m-auto mt-4 rounded-full px-3.5 py-2.5 text-center text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
        active ? "bg-redpapilles text-white" : "bg-white text-colortxt"
      } ${className}`}
    >
      {txt}
    </button>
  );
}
