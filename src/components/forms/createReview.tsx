import { useState } from "react";
import StarRating from "./editRating";
import QuillEditor from "./quill-editor";
import { BlueButton } from "../ButtonBlue";

interface RatingFormProps {
  onSubmit: (data: { rating: number; review: string }) => Promise<void> | void;
  onClose: () => void;
}

export default function RatingForm({ onSubmit }: RatingFormProps) {
  const [showRatingEdit, setShowRatingEdit] = useState(true);
  const [ratingData, setRatingData] = useState({
    rating: 0,
    review: "",
    loading: false,
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setRatingData((prev) => ({ ...prev, loading: true }));
      await onSubmit({
        rating: ratingData.rating,
        review: ratingData.review,
      });
    } finally {
      setRatingData((prev) => ({ ...prev, loading: false }));
      setShowRatingEdit(false);
    }
  };

  if (!showRatingEdit) return null;

  return (
    <form
      onSubmit={handleSubmitReview}
      className="z-20 flex flex-col  gap-4 w-full items-start justify-center overflow-clip  mt-5 px-0 rounded  "
    >

      <h1 className="text-3xl">Rate This Product</h1>

      <StarRating
        showButtons={false}
        num_stars={ratingData.rating}
        onStar={(e) => setRatingData((prev) => ({ ...prev, rating: e }))}
        key={ratingData.rating}
      />

      <QuillEditor
        placeholder="Review (Optional)"
        onInputed={(e: string) =>
          setRatingData((prev) => ({ ...prev, review: e }))
        }
      />

      <BlueButton loading={ratingData.loading} className="w-full " label="Submit" />
    </form>
  );
}
