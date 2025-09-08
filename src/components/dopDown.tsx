import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Option {
  icon?: React.ReactNode;
  emit?: string;
  label: string;
  isLink?: boolean;
  link?: string;
  hide?: boolean;
}

interface DropdownProps {
  options: Option[];
  mainIcon?: React.ReactNode;
  onAction?: (emit: string) => void;
  dropClasses?: string,
  className?:string

}

export const Dropdown: React.FC<DropdownProps> = ({ dropClasses,className, options, onAction, mainIcon }) => {
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

    const spaceBelow = innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const spaceRight = innerWidth - triggerRect.left;
    const spaceLeft = triggerRect.right;

    let position = "";

    // vertical placement
    if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
      position = "bottom-full mb-2"; // place above
    } else {
      position = "top-full mt-2"; // place below
    }

    // horizontal placement
    if (spaceRight < dropdownRect.width && spaceLeft > dropdownRect.width) {
      position += " right-0"; // align right
    } else {
      position += " left-0"; // align left
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
    requestAnimationFrame(() => {
      adjustDropdownPosition();
    });
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div onClick={toggleDropdown} ref={triggerRef} className={"relative inline-block "+className}>
      {mainIcon ?? <button title="drop" type="button"
        className="px-2 py-1 rounded-sm dark:hover:bg-neutral-800 hover:bg-gray-200 cursor-pointer dark:text-white"
      >
        <EllipsisVertical size={20} />
      </button>}

      <div
        ref={dropdownRef}
        className={`absolute z-50 w-40 text-xs shadow-lg rounded dark:text-white dark:bg-neutral-950 bg-white cursor-pointer transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } ${dropdownPositionClass} ${dropClasses}`}
      >
        <ul className="w-full flex flex-col items-center py-1 gap-y-0">
          {options.map(
            (op, i) =>
              !op.hide && (
                !op.isLink ? <button
                  key={i}
                  onClick={() => op.emit && onAction?.(op.emit)}
                  className="py-2 px-2 rounded-sm hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer w-[90%] gap-x-2 flex items-center"
                >
                  {op.icon ? op.icon : ''}
                  <span className="text-xs">{op.label}</span>
                </button> :
                  <Link to={op.link}
                    key={i}
                    className="py-2 px-2 rounded-sm hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer w-[90%] gap-x-2 flex items-center"
                  >
                    {op.icon ? op.icon : ''}
                    <span className="text-xs">{op.label}</span>
                  </Link>
              )
          )}
        </ul>
      </div>
    </div>
  );
};
