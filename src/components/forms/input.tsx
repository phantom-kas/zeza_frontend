import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // using lucide-react instead of custom icons

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  val?: string | number | null;
  required?: boolean;
  data?: Record<string, any>;
  name: string;
  onChange?: (payload: { name: string; value: string }) => void;
}

export const ValidatedInput: React.FC<InputProps> = ({
  label = "Label",
  type = "text",
  placeholder = "",
  val = null,
  required = false,
  data,
  name,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [vData, setVData] = useState<Record<string, any>>(data ?? {});
  const [isInvalid, setIsInvalid] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [passVisible, setPassVisible] = useState(false);

  // Initialize local value
  useEffect(() => {
    if (data) {
      setVData({ ...data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValidation = (value: string) => {
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
    handleValidation(vData[name] ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleValidation(value);
    const newData = { ...vData, [name]: value };
    setVData(newData);
    onChange?.({ name, value });
  };

  const togglePassword = () => {
    if (!inputRef.current) return;
    setPassVisible((prev) => {
      const newVal = !prev;
      inputRef.current.type = newVal ? "text" : "password";
      inputRef.current.focus();
      return newVal;
    });
  };

  return (
    <label className="flex flex-col items-start justify-start relative w-full ">
      <span className={isInvalid ? "text-red-500" : ""}>{label}</span>
      <span className="text-xs leading-3 text-red-500 text-right w-full mb-1">
        {msg}
      </span>
      <div
        className={`w-full h-10 rounded-lg flex flex-row items-center justify-start relative shadow-md  ${
          isInvalid ? "border-2 border-red-600 ring-red-500" : ""
        }`}
      >
        <input
          ref={inputRef}
          className=" not-dark:bg-lightblue theme1cont grow h-full px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          type={(type == 'password' && passVisible)?'text':type == 'password'?'password':'text'}
          name={name}
          placeholder={placeholder}
          required={required}
          value={vData[name] ?? ""}
          onInput={handleInput}
        />
        {type === "password" && (
          <div
            onClick={togglePassword}
            className="absolute right-2 cursor-pointer flex items-center justify-center"
          >
            {passVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        )}
      </div>
    </label>
  );
};

export default ValidatedInput;
