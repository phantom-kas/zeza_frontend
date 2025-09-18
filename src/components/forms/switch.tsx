import React from "react";

type SwitchProps = {
  checked: boolean; // controlled state from parent
  onChange: (checked: boolean) => void; // callback to parent
  label?: string;
};

export default function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="relative w-11 h-6   rounded-full
          peer peer-focus:ring-4 peer-focus:ring-blue-300
          dark:peer-focus:ring-blue-800 theme2cont
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
          peer-checked:after:border-white dark:peer-checked:after:border-gray-800 after:content-[''] after:absolute after:top-0.5 
          after:start-[2px] after:bg-white dark:after:bg-neutral-950 after:border-gray-300 dark:after:border-gray-900 after:border after:rounded-full
          after:h-5 after:w-5 after:transition-all dark:border-gray-600
          peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
      />
      {label && (
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
}
