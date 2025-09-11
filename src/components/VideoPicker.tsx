import React, { useState } from "react";
import { X } from "lucide-react";

type Props = {
  submitText?: string;
  index?: number | null;
  onSelect?: (data: { video: File; index?: number | null }) => void;
  onRemove?: (data: { index?: number | null }) => void;
};

export const VideoPicker: React.FC<Props> = ({
  submitText = "OK",
  index = null,
  onSelect,
  onRemove,
}) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleConfirm = () => {
    if (videoFile && onSelect) {
      onSelect({ video: videoFile, index });
    }
  };

  const handleRemove = () => {
    setVideoFile(null);
    if (onRemove) onRemove({ index });
  };

  return (
    <div className="flex flex-col items-center w-full">
      {!videoFile ? (
        <label className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
          Select Video
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              if (file) setVideoFile(file);
            }}
          />
        </label>
      ) : (
        <>
          <video
            controls
            className="max-w-full max-h-[40vh] rounded mt-2"
            src={URL.createObjectURL(videoFile)}
          />

          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleConfirm}
            >
              {submitText}
            </button>

            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleRemove}
            >
              Clear
            </button>

            {/* <button
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              onClick={() => setPreviewOpen(true)}
            >
              Preview
            </button> */}
          </div>
        </>
      )}

      {previewOpen && videoFile && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="bg-white dark:bg-black rounded-xl p-4 max-w-[1000px] w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                type="button"
                className="text-red-500 text-2xl"
                onClick={() => setPreviewOpen(false)}
              >
                <X />
              </button>
            </div>
            <div className="flex justify-center items-center pt-4 pb-2">
              <video
                controls
                autoPlay
                className="max-w-full max-h-[80vh] rounded"
                src={URL.createObjectURL(videoFile)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
