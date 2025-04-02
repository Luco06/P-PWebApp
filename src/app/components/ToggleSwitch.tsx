"use client";
import React from "react";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export default function ToggleSwitch({
  checked,
  onChange,
  label,
}: ToggleSwitchProps) {
  return (
    <label className="flex flex-col items-center cursor-pointer gap-2">
      {label && <span className="text-gray-700">{label}</span>}
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onChange(!checked);
          }
        }}
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all cursor-pointer m-3 ${
          checked ? "bg-redpapilles" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </div>
    </label>
  );
}
