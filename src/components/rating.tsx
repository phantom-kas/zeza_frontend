
interface RatingProps {
    rating: number | string;
    maxStars?: number;
    size?: number;
}

export default ({ rating, maxStars = 5, size = 24 }: RatingProps) => {
    let nRating
    nRating = parseFloat(rating + '')
    return (
        <div
            className="rating"
            style={
                {
                    "--rating": nRating,
                    "--max-stars": maxStars,
                    fontSize: `${size}px`,
                } as React.CSSProperties
            }
            role="img"
            aria-label={`${nRating} out of ${maxStars}`}
        ></div>
    );
};

