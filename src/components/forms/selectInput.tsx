import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  type?: string; // kept for compatibility, not used for <select>
  placeholder?: string;
  val?: string | number | null;
  required?: boolean;
  data?: Record<string, any> & { validate?: boolean };
  name: string;
  options?: Option[];
  onInput?: (payload: { name: string; value: string }) => void;
};

export const SelectInput: React.FC<Props> = ({
  label = "Label",
  placeholder = "",
  val = null,
  required = false,
  data,
  name,
  options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
  ],
  onInput,
}) => {
  const inputRef = useRef<HTMLSelectElement | null>(null);
  const [value, setValue] = useState<string>(val ? String(val) : "");
  const [msg, setMsg] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const checkValid = (val: string) => {
    if (!data?.validate || !inputRef.current) return;
    if (!inputRef.current.checkValidity()) {
      setMsg(inputRef.current.validationMessage);
      setIsInvalid(true);
    } else {
      setMsg(null);
      setIsInvalid(false);
    }
  };

  useEffect(() => {
    if (data && data[name] !== undefined) {
      setValue(data[name]);
      checkValid(data[name]);
    } else {
      checkValid(value);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    setValue(newVal);
    checkValid(newVal);
    if (onInput) onInput({ name, value: newVal });
  };

  return (
    <label className="flex flex-col items-start justify-start relative w-full">
      <span className={isInvalid ? "text-red-500" : ""}>{label}</span>
      {msg && (
        <span className="text-xs leading-3 text-red-500 text-right w-full mb-1">
          {msg}
        </span>
      )}

      <div
        className={`w-full h-10 inputel rounded-lg flex items-center justify-start relative ${
          isInvalid ? "border-2 border-red-600 ring-red-500" : ""
        }`}
      >
        <select
          ref={inputRef}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          className="theme1cont grow h-full px-2 rounded-lg bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
          <option disabled value="">
            -- {placeholder || "Select an option"} --
          </option>
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-2 text-gray-400">
          <ChevronDown size={16} />
        </div>
      </div>
    </label>
  );
};

export default SelectInput;
