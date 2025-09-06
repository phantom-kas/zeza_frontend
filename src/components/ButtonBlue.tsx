import { Loader } from "lucide-react";
import type React from "react";

export const BlueButton = ({
  icon,
  label,
  loading,
  type,
  onClick,
  className,
}: {
  loading?: boolean;
  icon?: React.ReactNode;
  label: string;
  type?: HTMLButtonElement["type"],
  className?: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button onClick={onClick} type={type} className={" cursor-pointer items-center gap-2 px-4 py-2 rounded-lg dark:bg-gray-900 dark:hover:bg-gray-800 not-dark:bg-blue text-white hover:bg-blue-700 flex justify-center " + className}>
      {loading ? (
        <Loader className="animate-spin w-6 h-6 mx-auto" />
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span className=" text-center mx-auto">{label}</span>
        </>
      )}
    </button>
  );
};
