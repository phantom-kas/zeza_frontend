import { CheckIcon } from "lucide-react"
import React from "react"

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      {/* Hidden native checkbox for accessibility */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />

      {/* Custom box */}
      <div
        className={`w-5 h-5 rounded-md border-1 flex items-center justify-center transition-colors
        ${checked ? " dark:bg-neutral-700 dark:border-neutral-800 not-dark:bg-blue-600 not-dark:border-blue-600" : "border-gray-400"}`}
      >
        {checked && (
         <CheckIcon className=" text-white"/>
         
        )}
      </div>

      {label && <span>{label}</span>}
    </label>
  )
}



