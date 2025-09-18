import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // replacing your IconEye/IconEyeSlash


type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  val?: string | number | null;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
  name: string;
  cols?:number
  icon?: React.ReactNode;
  className?:string
  disabled?: boolean;
  onInput?: (payload: { name: string; value: string }) => void;
};

export default function TextField3({
  label = "Label",
  type = "text",
  placeholder = "",
  val = null,
  required = false,
  data,
  name,
  cols=2,
  className,
  icon,
  disabled = false,
  onInput,
}: InputProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [passVisible, setPassVisible] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // local controlled value
  const [value, setValue] = useState<string>(
    (data?.[name] as string) ?? (val?.toString() ?? "")
  );

  useEffect(() => {
    // run initial validity check
    if (inputRef.current) {
      checkValid(value);
    }
  }, []);

  const checkValid = (val: string) => {
    if (!inputRef.current) return;
    if (!inputRef.current.checkValidity()) {
      setMsg(inputRef.current.validationMessage);
      setIsInvalid(true);
    } else {
      setMsg(null);
      setIsInvalid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setValue(newVal);
    checkValid(newVal);
    onInput?.({ name, value: newVal });
  };

  return (
    <div className={"relative theme1cont flex items-center gap-x-3 not-dark:bg-[#F5F5F5]! "+className}>
    

      <textarea
        ref={inputRef}
        id={`floating_${name}`}
        name={name}
        cols={cols}
        // type={passVisible ? "text" : type}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        className="peer w-full px-4 pt-5 pb-2  rounded text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue"
      />

      {type === "password" && (
        <div
          onClick={() => setPassVisible((p) => !p)}
          className="absolute right-2 cursor-pointer z-50 flex items-center justify-center theme2cont"
        >
          {passVisible ? (
            <EyeOff className="text-gray-500" size={18} />
          ) : (
            <Eye className="text-gray-500" size={18} />
          )}
        </div>
      )}

      <label
        htmlFor={`floating_${name}`}
        className="absolute left-3 top-0 pointer-events-none text-sm transition-all 
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
        peer-focus:-top-1 peer-focus:text-sm peer-focus:text-blue-500"
        dangerouslySetInnerHTML={{ __html: label }}
      />

      {isInvalid && msg && (
        <p className="absolute -bottom-5 left-0 text-red-500 text-xs">{msg}</p>
      )}
    </div>
  );
}
