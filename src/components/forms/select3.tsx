import React, { useEffect, useState } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  val?: string | number | null;
  required?: boolean;
  data?: Record<string, any>;
  name: string;
  options: Option[];
  className?: string
  onInputed?: (payload: { name: string; value: string }) => void;
}

const SelectField3: React.FC<SelectFieldProps> = ({
  label = "Select Label",
  placeholder = "",
  val = null,
  required = false,
  data,
  name,
  className = '',
  options,
  onInputed
}) => {
  const [vData, setVData] = useState<Record<string, any>>(data ?? {});
  const [value, setValue] = useState<string | number | "">(val ?? "");
  const [isInvalid, setIsInvalid] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Initialize from props.data
  useEffect(() => {
    if (data) {
      setValue(data[name] ?? "");
    }
  }, [data, name]);

  const checkValid = (val: string | number | "") => {
    if (!data?.validate) return;
    if (!val) {
      setMsg("This field is required");
      setIsInvalid(true);
    } else {
      setMsg(null);
      setIsInvalid(false);
    }
  };

  useEffect(() => {
    checkValid(value);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setVData((prev) => ({ ...prev, [name]: newValue }));

    onInputed?.({ name, value: newValue });
  };

  return (
    <div className={"relative  flex items-center  gap-x-3 not-dark:bg-[#F5F5F5]! theme1cont " + className}>


      <select
        id={name}
        required={required}
        value={value}
        onChange={handleChange}
        onBlur={() => checkValid(value)}
        className="peer w-full px-4 pt-5 pb-2 placeholder-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option className="dark:bg-black dark:text-white2" disabled value="">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option className="dark:bg-black dark:text-white2" key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={name}
        className={`absolute left-3 text-sm transition-all pointer-events-none
          ${!value ? "top-3.5 text-gray-400" : "top-0"}
          peer-placeholder-shown:text-base 
          peer-focus:-top-1 peer-focus:text-sm peer-focus:text-blue-500`}
      >
        {label}
      </label>

      {isInvalid && <p className="text-sm text-red-500 mt-1">{msg}</p>}
    </div>
  );
};

export default SelectField3;
