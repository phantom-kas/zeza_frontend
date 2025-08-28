import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";

interface Option {
  icon?: React.ReactNode;
  emit: string;
  label: string;
  hide?: boolean;
}

interface DropdownProps {
  options: Option[];
  mainIcon?: React.ReactNode;
  onAction?: (emit: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onAction,mainIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPositionClass, setDropdownPositionClass] = useState(
    "top-full mt-2 left-0"
  );
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setTimeout(adjustDropdownPosition, 0);
    }
  };

  const adjustDropdownPosition = () => {
    const triggerEl = triggerRef.current;
    const dropdownEl = dropdownRef.current;
    if (!triggerEl || !dropdownEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const dropdownRect = dropdownEl.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;

    const spaceRight = innerWidth - dropdownRect.left;
    const spaceLeft = dropdownRect.right;
    const spaceBelow = innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    let position = "";

    if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
      position = "bottom-full mb-2";
    } else {
      position = "top-full mt-2";
    }

    if (spaceRight < dropdownRect.width && spaceLeft > dropdownRect.width) {
      position += " right-0";
    } else {
      position += " left-0";
    }

    setDropdownPositionClass(position);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div onClick={toggleDropdown} ref={triggerRef} className="relative inline-block">
      {mainIcon ?? <button title="drop" type="button"
        className="px-2 py-1 rounded-sm dark:hover:bg-neutral-800 hover:bg-gray-200 cursor-pointer dark:text-white"
      >
        <EllipsisVertical size={20} />
      </button>}

      <div
        ref={dropdownRef}
        className={`absolute z-50 w-40 text-xs shadow-lg rounded dark:text-white dark:bg-neutral-950 bg-white cursor-pointer transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } ${dropdownPositionClass}`}
      >
        <ul className="w-full flex flex-col items-center py-1 gap-y-0">
          {options.map(
            (op, i) =>
              !op.hide && (
                <button
                  key={i}
                  onClick={() => onAction?.(op.emit)}
                  className="py-2 px-2 rounded-sm hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer w-[90%] gap-x-2 flex items-center"
                >
                  {op.icon?op.icon:''}
                  <span className="text-xs">{op.label}</span>
                </button>
              )
          )}
        </ul>
      </div>
    </div>
  );
};
