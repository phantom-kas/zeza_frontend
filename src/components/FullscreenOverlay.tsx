import React from "react";

interface FullscreenOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?:string
}
const FullscreenOverlay = ({ isOpen, onClose, children,className }:FullscreenOverlayProps) => {
  if (!isOpen) return null; // don't render if closed

  const handleOverlayClick = (e) => {
    // only close if clicking directly on the overlay, not inside content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center  w-screen h-dvh z-80"
      onClick={handleOverlayClick}
    >
      <div className={`${className}  p-6 rounded-2xl shadow-xl `}>
        {children}
      </div>
    </div>
  );
};

export default FullscreenOverlay;
