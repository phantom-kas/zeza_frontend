import { useState, useEffect } from "react";

interface AvatarProps {
  url?: string;
}

export default function Avatar({ url }: AvatarProps) {
  const [error, setError] = useState(false);

  const onError = () => setError(true);

  // Reset error when URL changes
  useEffect(() => {
    setError(false);
  }, [url]);

  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-transparent flex items-center justify-center">
      {!error && url ? (
        <img
          src={url}
          onError={onError}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      ) : (<>
        <div className="text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
            />
          </svg>
        </div>
        <span className='hidden'>{url}</span>
      </>
      )}
    </div>
  );
}
