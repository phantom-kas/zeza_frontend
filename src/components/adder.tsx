import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AdderProps = {
  value?: number;
  title?: string;
  w?: string;
  h?: string;
  onChange?: (value: number) => void;
  onIncrease?: () => void;
  onReduce?: () => void;
};

export const Adder: React.FC<AdderProps> = ({
  value = 0,
  w = "w-[120px]",
  h = "h-[48px]",
  onChange,
  onIncrease,
  onReduce,
}) => {
  const [val, setVal] = useState<number>(value);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleDecrement = () => {
    if (val <= 0) return;
    setDirection("down");
    const newVal = val - 1;
    setVal(newVal);
    onChange?.(newVal);
    onReduce?.();
  };

  const handleIncrement = () => {
    setDirection("up");
    const newVal = val + 1;
    setVal(newVal);
    onChange?.(newVal);
    onIncrease?.();
  };

  return (
    <div className={`${w} ${h} flex flex-row justify-between items-center theme1cont not-dark:bg-lightblue`}>
      <button
        type="button"
        onClick={handleDecrement}
        className="fs10 round1 hov_glow w-[50px] grow cursor-pointer hover:text-orange hover:font-[900]"
      >
        -
      </button>

      {/* AnimatePresence for transitions */}
      <div className="w-[50px] flex flex-col items-center justify-center text-center grow relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={val} // important for animation
            initial={{ opacity: 0, y: direction === "up" ? 30 : -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === "up" ? -30 : 30 }}
            transition={{ duration: 0.1 }}
            className=" relative"
          >
            {val}
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        className="w-[50px] grow cursor-pointer hover:text-orange hover:font-[900]"
      >
        +
      </button>
    </div>
  );
};
