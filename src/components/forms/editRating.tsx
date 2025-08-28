import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  title?: string | null;
  description?: string | null;
  num_stars?: number;
  showButtons?: boolean;
  onStar?: (rating: number) => void;
  onClose?: () => void;
  onOk?: () => void;
}

export default function StarRating({
  title = null,
  description = null,
  num_stars = 0,
  showButtons = true,
  onStar,
  onClose,
  onOk,
}: StarRatingProps) {
  const [stars, setStars] = useState<number>(num_stars);
  const [hovered, setHovered] = useState<number>(0);

  const handleClick = (index: number) => {
    setStars(index);
    if (onStar) onStar(index);
  };

  return (
    <div className="flex flex-col w-[300px]">
      {title && <span className="font-semibold text-lg">{title}</span>}
      {description && <span>{description}</span>}

      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="cursor-pointer"
            onClick={() => handleClick(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(0)}
          >
            <Star 
              
            
              className={`transition-colors duration-200   ${
                (hovered ? i <= hovered : i <= stars)
                  ? "text-yellow-400 fill-yellow-400 stroke-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </div>
        ))}
      </div>

      {showButtons && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={onOk}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}
